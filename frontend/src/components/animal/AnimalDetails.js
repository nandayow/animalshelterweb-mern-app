import React, { Fragment, useEffect, useState } from "react";
import { Button, Carousel } from "react-bootstrap";

import Loader from "../layouts/Loader";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  getAnimalDetails,
  newReview,
  newAdopt,
  clearErrors,
} from "../../actions/animalActions";
import {
  NEW_REVIEW_RESET,
  NEW_ADOPTION_RESET,
} from "../../constants/animalConstant";
import ListReviews from "../review/ListReviews";
import Filter from "bad-words";

const AnimalDetails = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  let { id } = useParams();
  let navigate = useNavigate();
  const { loading, error, animal } = useSelector(
    (state) => state.animalDetails
  );

  const { error: reviewError, success } = useSelector(
    (state) => state.newReview
  );

  const { error: adoptError, isAdopted } = useSelector(
    (state) => state.newAdopt
  );
  const { user } = useSelector((state) => state.auth);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    dispatch(getAnimalDetails(id));

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }
    if (adoptError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Reivew posted successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    if (isAdopted) {
      navigate("/adoptions/me");
      alert.success("Adoption Request Submitted");
      dispatch({ type: NEW_ADOPTION_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    reviewError,
    success,
    id,
    adoptError,
    isAdopted,
    navigate,
  ]);

  // Adopt Process Function

  // Reviews
  function setUserRatings() {
    const stars = document.querySelectorAll(".star");

    stars.forEach((star, index) => {
      star.starValue = index + 1;

      ["click", "mouseover", "mouseout"].forEach(function (e) {
        star.addEventListener(e, showRatings);
      });
    });

    function showRatings(e) {
      stars.forEach((star, index) => {
        if (e.type === "click") {
          if (index < this.starValue) {
            star.classList.add("orange");

            setRating(this.starValue);
          } else {
            star.classList.remove("orange");
          }
        }

        if (e.type === "mouseover") {
          if (index < this.starValue) {
            star.classList.add("yellow");
          } else {
            star.classList.remove("yellow");
          }
        }

        if (e.type === "mouseout") {
          star.classList.remove("yellow");
        }
      });
    }
  }
  const filter = new Filter();
  const reviewHandler = () => {
    const formData = new FormData();

    formData.set("rating", rating);
    formData.set("comment", filter.clean(comment));
    formData.set("animalId", id);

    console.log(formData);
    dispatch(newReview(formData));
  };

  // console.log(id);
  const adoptHandler = () => {
    const formData = new FormData();

    formData.set("animalId", id);

    console.log(formData);
    dispatch(newAdopt(formData));
  };
  //   console.log(filter.clean("String I'd like to fuck for inappropriate words."));

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="row d-flex justify-content-around detail-page ">
            <div className="col-12 col-lg-5 img-fluid" id="animal_image">
              <Carousel>
                {animal.images &&
                  animal.images.map((image) => (
                    <Carousel.Item key={image.public_id}>
                      <img
                        className="d-block w-100"
                        style={{
                          width: "auto",
                          height: "500px",
                          borderRadius: 10,
                        }}
                        src={image.url}
                        alt={animal.title}
                      />
                    </Carousel.Item>
                  ))}
              </Carousel>
            </div>
            <div className="col-12 col-lg-5 mt-5">
              <h3>{animal.name}</h3>
              <h3>
                {animal.category}||
                {animal.breed} || {animal.gender}
              </h3>

              <p id="animal_id">Animal # {animal._id}</p>
              <p>Aprroximate Age : {animal.age} years old</p>
              <hr />

              <div className="rating-outer">
                <div
                  className="rating-inner"
                  style={{ width: `${(animal.ratings / 5) * 100}%` }}
                ></div>
              </div>
              <span id="no_of_reviews">({animal.numOfReviews} Reviews)</span>
              <hr />
              {/* <h5 id="product_price">${animal.age}</h5> */}

              {user ? (
                <>
                  <Button
                    // type="button"
                    id="cart_btn"
                    className="btn btn-primary"
                    disabled={user.role !== "Adopter"}
                    onClick={adoptHandler}
                  >
                    Request for Adoption
                  </Button>
                </>
              ) : (
                <Link to="/login">
                  <Button
                    // type="button"
                    id="cart_btn"
                    className="btn btn-primary"
                  >
                    Request for Adoption
                  </Button>
                </Link>
              )}
              {"       "}
              {user ? (
                <Button
                  id="review_btn"
                  className="btn btn-warning  "
                  data-toggle="modal"
                  data-target="#ratingModal"
                  onClick={setUserRatings}
                >
                  Submit Your Review
                </Button>
              ) : (
                <div className="alert alert-danger mt-5" type="alert">
                  Login to post your review.
                </div>
              )}
              <hr />
              <p>
                Status:{" "}
                <span
                  id="adoption_status"
                  style={{ color: "rgb(98, 7, 98)", fontWeight: "bold" }}
                  className={
                    animal.healthstatus === "Not Cured"
                      ? "Healing"
                      : "Adoptable"
                  }
                >
                  {animal.healthstatus === "Cured"
                    ? "Adoptable"
                    : "Rehabilation Ongoing"}
                </span>
                {"   "} Rescued by: <strong>{animal.rescuer}</strong>
              </p>
              <div className="ex1">
                {animal.reviews && animal.reviews.length > 0 && (
                  <ListReviews reviews={animal.reviews} />
                )}
                <div className="row mt-2 mb-5">
                  <div className="rating w-50">
                    <div
                      className="modal fade"
                      id="ratingModal"
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="ratingModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="ratingModalLabel">
                              Submit Review
                            </h5>
                            <button
                              type="button"
                              className="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <ul className="stars">
                              <li className="star">
                                <i className="fa fa-star"></i>
                              </li>
                              <li className="star">
                                <i className="fa fa-star"></i>
                              </li>
                              <li className="star">
                                <i className="fa fa-star"></i>
                              </li>
                              <li className="star">
                                <i className="fa fa-star"></i>
                              </li>
                              <li className="star">
                                <i className="fa fa-star"></i>
                              </li>
                            </ul>

                            <textarea
                              name="review"
                              id="review"
                              className="form-control mt-3"
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                            ></textarea>

                            <Button
                              className="btn my-3 float-right review-btn px-4 text-white"
                              onClick={reviewHandler}
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              Submit
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* EndDiv */}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default AnimalDetails;
