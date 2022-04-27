import React, { Fragment, useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";

import Pagination from "react-js-pagination";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import { getAnimals } from "../actions/animalActions";
import Animal from "./animal/Animal";
import Loader from "./layouts/Loader";
import { Carousel } from "react-bootstrap";

const Home = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  let { keyword } = useParams();
  const bituin = [5, 4, 3, 2, 1, 0];
  const {
    loading,
    animals,
    error,
    animalsCount,
    resPerPage,
    filteredAnimalsCount,
  } = useSelector((state) => state.animals);

  const [currentPage, setCurrentPage] = useState(1);
  const [age, setAge] = useState([1, 100]);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);
  const [breed, setBreed] = useState("");
  const [gender, setGender] = useState("");

  const categories = ["Cat", "Dog"];
  const breeds = [
    "Bulldog",
    "German Shepherd",
    "French Bulldog",
    "Labrador Retriever",
    "Poodle",
    "Beagle",
    "Domestic Shorthair",
    "Balinese",
    "American Shorthair",
    "Siamese",
    "Russian Blue",
    "Ragdoll",
    "Bengal",
  ];
  const genders = ["Male", "Female"];

  const createSliderWithTooltip = Slider.createSliderWithTooltip;
  const Range = createSliderWithTooltip(Slider.Range);

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(
      getAnimals(keyword, currentPage, age, category, breed, gender, rating)
    );
  }, [
    dispatch,
    alert,
    error,
    currentPage,
    keyword,
    age,
    breed,
    gender,
    category,
    rating,
  ]);

  let count = animalsCount;

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  if (keyword) {
    count = filteredAnimalsCount;
  }
  return (
    <Fragment>
      <div className=" ">
        <Carousel variant="dark" className="home-carousel ">
          <Carousel.Item interval={1500}>
            <img
              className="d-block w-100"
              src="/images/carousel_1.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              <h1>Find your new best friend</h1>
              <p>
                “Whoever declared that love at first sight doesn’t exist has
                never witnessed the purity of a puppy or looked deep into a
                puppy’s eyes. If they did, their lives would change
                considerably.” <br></br>- Elizabeth Parker.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/images/carousel_1.jpg"
              alt="Second slide"
            />
            <Carousel.Caption>
              <h1>Find your new best friend</h1>
              <p>
                “Whoever declared that love at first sight doesn’t exist has
                never witnessed the purity of a puppy or looked deep into a
                puppy’s eyes. If they did, their lives would change
                considerably.” <br></br>- Elizabeth Parker.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/images/carousel_1.jpg"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h1>Find your new best friend</h1>
              <p>
                {" "}
                “Whoever declared that love at first sight doesn’t exist has
                never witnessed the purity of a puppy or looked deep into a
                puppy’s eyes. If they did, their lives would change
                considerably.” <br></br> - Elizabeth Parker.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      {/* <div> */}
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          {/* <MetaData title={"Find your new best friend"} /> */}
          <h1 id="animals_heading">Pets Available for Adoption</h1>

          <section
            id="animals"
            className="container mt-5"
            style={{ marginTop: 30 }}
          >
            <div className="row">
              {keyword ? (
                <Fragment>
                  <div className="col-6 col-md-3 mt-5 mb-5">
                    <div className="px-5">
                      <h4 className="mb-3">Approximate Age</h4>
                      <Range
                        marks={{
                          1: `Min`,
                          10: `Max`,
                        }}
                        min={1}
                        max={10}
                        defaultValue={[1, 10]}
                        tipFormatter={(value) => `${value}`}
                        tipProps={{
                          placement: "top",
                          visible: true,
                        }}
                        value={age}
                        onChange={(age) => setAge(age)}
                      />

                      <hr className="my-3" />

                      <div className="mt-5">
                        <h4 className="mb-3">Ratings</h4>

                        <ul className="pl-0">
                          {bituin.map((star) => (
                            <li
                              style={{
                                cursor: "pointer",
                                listStyleType: "none",
                              }}
                              key={star}
                              onClick={() => setRating(star)}
                            >
                              <div className="rating-outer">
                                <div
                                  className="rating-inner"
                                  style={{
                                    width: `${star * 20}%`,
                                  }}
                                ></div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <hr className="my-5" />
                      <div className="mt-5">
                        <h4 className="mb-3">Categories</h4>
                        <ul className="pl-0">
                          {categories.map((category) => (
                            <li
                              style={{
                                cursor: "pointer",
                                listStyleType: "none",
                              }}
                              key={category}
                              onClick={() => setCategory(category)}
                            >
                              {category}
                            </li>
                          ))}
                        </ul>
                        <h4 className="mb-3">
                          Breed{" "}
                          <i
                            className="fa fa-paw"
                            style={{ fontSize: 20, color: "red" }}
                          ></i>
                        </h4>
                        <ul className="pl-0">
                          {breeds.map((breed) => (
                            <li
                              style={{
                                cursor: "pointer",
                                listStyleType: "none",
                              }}
                              key={breed}
                              onClick={() => setBreed(breed)}
                            >
                              {breed}
                            </li>
                          ))}
                        </ul>
                        <h4 className="mb-3">
                          Gender
                          <i
                            className="fa fa-venus-mars"
                            style={{ fontSize: 20, color: "red" }}
                          ></i>
                        </h4>
                        <ul className="pl-0">
                          {genders.map((gender) => (
                            <li
                              style={{
                                cursor: "pointer",
                                listStyleType: "none",
                              }}
                              key={gender}
                              onClick={() => setGender(gender)}
                            >
                              {gender}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="col">
                    <div className="row">
                      {animals.map((animal) => (
                        <Animal key={animal._id} animal={animal} col={4} />
                      ))}
                    </div>
                  </div>
                </Fragment>
              ) : (
                animals.map((animal) => (
                  <Animal key={animal._id} animal={animal} col={3} />
                ))
              )}
            </div>
          </section>

          {resPerPage <= count && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={animalsCount}
                onChange={setCurrentPageNo}
                nextPageText={"Next"}
                prevPageText={"Prev"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
