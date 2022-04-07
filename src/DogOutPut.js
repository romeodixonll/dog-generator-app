import React, { useEffect, useState } from "react";
import "./DogOutPut.css";
import API from "./utils/API";
import DogInput from "./DogInput";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
import SearchIcon from "@mui/icons-material/Search";

const DogOutPut = () => {
  const [photo, setPhoto] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [filterTerm, setFilterTerm] = useState("");

  const [state, dispatch] = useStateValue();

  const dog = async () => {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    if (response.status === 200) {
      const data = await response.json();
      setPhoto(data.message);
    }
  };

  useEffect(() => {
    dog();
  }, []);

  return (
    <div className="dogOutput">
      <div className="dogOutput__sectionOne">
        <div className="dogOutput__search">
          <input
            type="text"
            placeholder="Search Dog By Name"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
          <SearchIcon />
        </div>
        <div className="dogOutput__filter">
          <select
            onChange={(e) => {
              setFilterTerm(e.target.value);
            }}
          >
            <option>Choose Size...</option>
            <option value="XS">XS</option>
            <option value="SM">SM</option>
            <option value="MD">MD</option>
            <option value="LG">LG</option>
            <option value="XL">XL</option>
          </select>
        </div>
        <div className="dogOutput__filter">
          <select
            onChange={(e) => {
              setSortBy(e.target.value);
            }}
          >
            <option>Sort By Alphabetical Order</option>
            <option value="Yes">Yes</option>
          </select>
        </div>

        <div className="dogOutput__section">
          {state.result
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.name.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return val;
              }
            })
            .filter((filter) => {
              if (filterTerm === "" || filterTerm === "Choose Size...") {
                return filter;
              } else if (filter.size.includes(filterTerm)) {
                return filter;
              }
            })
            .sort((a, b) => {
              if (sortBy === "Yes") {
                if (a.name < b.name) {
                  return -1;
                }
                if (a.name > b.name) {
                  return 1;
                }
              }
            })
            ?.map((res, i) => (
              <DogInput key={i} photo={photo} {...res} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default DogOutPut;
