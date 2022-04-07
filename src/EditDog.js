import "./EditDog.css";
import React, { useEffect, useState } from "react";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
import { Button } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { useParams, useHistory } from "react-router-dom";

const EditDog = () => {
  const [state, dispatch] = useStateValue();
  const history = useHistory();
  const params = useParams();

  const dogInfo = state.result.find((res) => {
    return res.id === params.id;
  });

  const [formState, setFormState] = useState({});
  const [input, setInput] = useState(dogInfo.name);
  const [breed, setBreed] = useState(dogInfo.breed);
  const [owner, setOwner] = useState(dogInfo.owner);
  const [size, setSize] = useState(dogInfo.size);
  const [description, setDescription] = useState(dogInfo.description);

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormState({
      ...formState,
      id: params.id,
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
        type: actionTypes.EDIT_DOG,
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
    <div className="editDog">
      <h1>Edit Dog </h1>
      <div className="editDog__Info">
        <form action="">
          <input
            value={input}
            type="text"
            onChange={(e) => setInput(e.target.value)}
          />
          <input
            value={breed}
            type="text"
            onChange={(e) => setBreed(e.target.value)}
          />
          <input
            value={owner}
            type="text"
            onChange={(e) => setOwner(e.target.value)}
          />
          <select value={size} onChange={(e) => setSize(e.target.value)}>
            <option value="XS">XS</option>
            <option value="SM">SM</option>
            <option value="MD">MD</option>
            <option value="LG">LG</option>
            <option value="XL">XL</option>
          </select>
          <input
            value={description}
            type="text"
            onChange={(e) => setDescription(e.target.value)}
          />

          <Button onClick={handleSubmit} type="submit">
            Edit Dog
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditDog;
