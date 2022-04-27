import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  let navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };

  return (
    <Form onSubmit={searchHandler}>
      <div className="input-group">
        <input
          type="text"
          id="search_field"
          className="form-control"
          placeholder="Enter Product Name ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <div className="input-group-append">
          <Button id="search_btn" type="submit">
            <i className="fa fa-search" aria-hidden="true"></i>
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default Search;
