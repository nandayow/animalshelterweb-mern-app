import React from "react";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { Link } from "react-router-dom";

const Animal = ({ animal }) => {
  return (
    <div className="col-sm-12 col-md-6 col-lg-3 my-3">
      <Card className="text-center">
        <Card.Img variant="top" src={animal.images[0].url} />
        <Card.Body>
          <Card.Title>
            <Link
              to={`/animal/${animal._id}`}
              style={{
                color: " rgb(98, 7, 98) ",
                fontSize: 20,
                fontStyle: "bold",
              }}
            >
              {animal.name}
            </Link>
            <br></br>
            {animal.category}||
            {animal.breed}|| Age:{animal.age} ||
            {animal.gender}
          </Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>
            <div className="ratings ">
              <div className="rating-outer">
                <div
                  className="rating-inner"
                  style={{ width: `${(animal.ratings / 5) * 100}%` }}
                ></div>
              </div>
              <span id="no_of_reviews">({animal.numOfReviews} reviews)</span>
            </div>
          </ListGroupItem>
        </ListGroup>
        <Card.Body></Card.Body>
      </Card>
    </div>
  );
};
export default Animal;
