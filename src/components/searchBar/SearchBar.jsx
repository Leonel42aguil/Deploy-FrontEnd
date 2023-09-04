import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRaza } from "../../actions";
import "./SearchBar.css";
 
export default function SearchBar({setCurrentPage}) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  
  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  } 
  
  function handleSubmit(e) {
    e.preventDefault();
    if (name) {
      (async () => {
        await dispatch(getRaza(name));
        setCurrentPage(1);
        setName("");
      })();
    }
  }
 
  function handleClick(e) {
    e.preventDefault()
  }

  return (
    <form className="from" onClick={(e) => handleSubmit(e)}>
      <div className="headerSeach">
        <div className="main">
          <input
            className="input"
            type="text"
            placeholder="🔎 Search breed..."
            value={name}
            onChange={(e) => handleInputChange(e)}
            />
          <button
            className="button"
            type="submit"
            onClick={handleClick}
            >
            Search
          </button>
        </div>
      </div>
    </form>
  );
}
