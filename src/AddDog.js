import React, { useEffect, useState } from "react";
import "./AddDog.css";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
import { Button } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { useHistory } from "react-router-dom";

const AddDog = () => {
  const [formState, setFormState] = useState({});
  const [input, setInput] = useState("");
  const [breed, setBreed] = useState("");
  const [owner, setOwner] = useState("");
  const [size, setSize] = useState("");
  const [description, setDescription] = useState("");
  const [state, dispatch] = useStateValue();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormState({
      ...formState,
      id: uuidv4(),
      name: input,
      breed,
      owner,
      size,
      description,
    });
  };

  useEffect(() => {
    if (formState.name) {
      dispatch({
        type: actionTypes.ADD_DOG,
        result: formState,
      });
      setFormState({});
      setInput("");
      setBreed("");
      setOwner("");
      setSize("");
      setDescription("");
      history.push("/");
    }
  }, [formState]);

  return (
    <div className="addDog">
      <h1>Add Dog </h1>
      <div className="addDog__Info">
        <form action="">
          <input
            placeholder="Name of Dog"
            required
            value={input}
            type="text"
            onChange={(e) => setInput(e.target.value)}
          />
          <input
            placeholder="Breed"
            value={breed}
            type="text"
            onChange={(e) => setBreed(e.target.value)}
          />

          <input
            placeholder="Owner"
            value={owner}
            type="text"
            onChange={(e) => setOwner(e.target.value)}
          />
          <select value={size} onChange={(e) => setSize(e.target.value)}>
            <option>Choose Size...</option>
            <option value="XS">XS</option>
            <option value="SM">SM</option>
            <option value="MD">MD</option>
            <option value="LG">LG</option>
            <option value="XL">XL</option>
          </select>

          <input
            placeholder="Description"
            value={description}
            type="text"
            onChange={(e) => setDescription(e.target.value)}
          />

          <Button onClick={handleSubmit} type="submit">
            Add Dog
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddDog;
