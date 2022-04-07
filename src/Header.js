import React,{useState, useEffect} from "react";
import "./Header.css";
import { Button } from "@mui/material";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useHistory } from "react-router-dom";
import { uniqueNamesGenerator, Config, animals } from 'unique-names-generator';


const Header = () => {
  const randomDogName =  Math.floor(Math.random() * (355 - 0) + 0)
  const randomSize = Math.floor(Math.random() * (4 - 0) + 0)
  const sizes = ['XS','SM','MD','LG','XL']
 
  const [formState, setFormState] = useState({});
  const [breed, setBreed] = useState("");
  const [owner, setOwner] = useState("");
  const [description, setDescription] = useState("");
  const [state, dispatch] = useStateValue();
  const history = useHistory();

console.log(randomDogName)
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState({
      ...formState,
      id: uuidv4(),
      name: animals[randomDogName],
      breed,
      owner,
      size:sizes[randomSize],
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
    
      history.push("/dog-generator-app");
    }
  }, [formState]);
  return (
    <div className="header">
      <Link to={"/dog-generator-app"}>
        <img
          className="header__icon"
          src="https://t3.ftcdn.net/jpg/01/12/61/38/360_F_112613854_pw8ZkYdUo0zD4za7Fk1IcoXknuFNhdGM.jpg"
        />
      </Link>

      <div className="header__center">
        <Link
          style={{ color: "inherit", textDecoration: "inherit" }}
          to={"/dog-generator-app"}
        >
          <Button onClick={handleSubmit}>Random Dog Maker</Button>
        </Link>
      </div>
      <div className="header__right">
        <Link
          style={{ color: "inherit", textDecoration: "inherit" }}
          to={"/dog-generator-app/create"}
        >
          <Button>Add New Dog</Button>
        </Link>
      </div>
     
    </div>
  );
};

export default Header;
