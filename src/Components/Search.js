import React from "react";

const Search = (props) => {
  console.log(props.search);

  return (
    <div>
      <input
        onKeyPress={(e) => props.setSearch(e.target.value)}
        type="search"
      ></input>
    </div>
  );
};

export default Search;
