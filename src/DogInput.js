import { Button } from "@mui/material";
import React from "react";
import "./DogInput.css";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
import { Link } from "react-router-dom";

const DogInput = ({ id, name, breed, owner, size, description, photo }) => {
  const [state, dispatch] = useStateValue();

  return (
    <div className="dogInput">
      <img src={photo} />
      <div className="dogInput__info">
        <h3>Name: {name}</h3>
        <h2>Size: {size}</h2>
        <h2>Breed: {breed}</h2>
        <h4>Owner: {owner}</h4>
        <h4>Description: {description}</h4>
        <Button
          onClick={() => {
            dispatch({ type: actionTypes.DELETE_DOG, result: id });
          }}
        >
          Delete Dog
        </Button>
        <Link
          style={{ color: "inherit", textDecoration: "inherit" }}
          to={`/dog-generator-app/edit/${id}`}
        >
          <Button>Edit</Button>
        </Link>
      </div>
    </div>
  );
};

export default DogInput;
