import React from "react";
// import {FiSearch} from "react-icons";
import {FiSearch} from "react-icons/all";
import "./Search.style.css";

const Search = (props) => {
    return (
        <div className="searchDiv">
            <FiSearch className="searchIcon" color="#00B188"/>
            <input className="searchTable" onChange={props.onChangeTableData} type="text"
                   placeholder="Search"/>
        </div>

    );
};

export default Search;