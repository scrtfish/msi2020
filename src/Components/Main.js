import React, { useState } from "react";
import "../App.css";
import Categories from "./Categories";
import Search from "./Search";
import axios from "axios";

const Main = () => {
  const [showResults, setShowResults] = useState(0);

  const [categoryType, setCategoryType] = useState("");

  const [search, setSearch] = useState("");

  const [quote, setQuote] = useState("");

  // changing state depending on what radio button clicked

  const changeEdit = () => {
    setShowResults(1);
  };
  const changeEdit2 = () => {
    setShowResults(2);
  };
  const changeEdit3 = () => {
    setShowResults(3);
  };

  // state for Random button

  const randomSearch = () => {
    axios.get("https://api.chucknorris.io/jokes/random").then((res) => {
      setQuote(res.data);
      // console.log(res.data);
    });
  };

  // state for From categories button

  const categorySearch = () => {
    axios
      .get(`https://api.chucknorris.io/jokes/random?category=${categoryType}`)
      .then((res) => {
        setQuote(res.data);
        console.log(res.data);
      });
  };

  // state for Search button. Trying to show all results depending on search word, but no success :(

  const inputSearch = () => {
    axios
      .get(`https://api.chucknorris.io/jokes/search?query=${search}`)
      .then((res) => {
        // let a = res.data.result.map((item) => item.value);
        // let b = a.join("\n");
        let a = res.data.result.filter((item) => item.value.includes(search));
        // let b = a.map((item) => item.value);
        // a.filter((item) => item.index < 3);
        // return console.log(a);
        console.log(Object.assign({}, ...a));
        // res.data.result.map((item) => console.log(item.value));
        // console.log(item)
        // );
        // let c = a.map((item) => ({ [item.key]: item.value }));
        // let d = Object.assign({}, ...c);
        // let e = a.find[0];
        // let f = Object.fromEntries(a);
        // let g = a.reduce();
        // let h = a.join("\n");
        // setQuote(e);
        // console.log(a);
      });
  };

  // showing additional menu for radio button

  const handleOnClick = () => {
    if (showResults === 1) {
      randomSearch();
    } else if (showResults === 2) {
      categorySearch();
    } else if (showResults === 3) {
      inputSearch();
    } else {
      console.log("nothing");
    }
  };

  return (
    <div className="main">
      <header className="header">
        <h3>MSI 2020</h3>
        <h1>Hey!</h1>
        <h2>Let's try to find a joke for you:</h2>
      </header>
      <form className="form">
        <label>
          <input
            type="radio"
            name="api"
            value="random"
            onClick={changeEdit}
          ></input>
          Random
          {showResults === 1}
        </label>

        {/* to select category need to click on category name an then Get a joke */}

        <label>
          <input
            type="radio"
            name="api"
            value="fromCategories"
            onClick={changeEdit2}
          ></input>
          From categories
          {showResults === 2 && (
            <div>
              <Categories
                categoryType={categoryType}
                setCategoryType={setCategoryType}
              />
            </div>
          )}
        </label>

        {/* search only gives array of objects of jokes in console */}

        <label>
          <input
            type="radio"
            name="api"
            value="search"
            onClick={changeEdit3}
          ></input>
          Search
          {showResults === 3 && (
            <Search search={search} setSearch={setSearch} />
          )}
        </label>
        <input type="button" value="Get a joke" onClick={handleOnClick}></input>
      </form>
      <div>
        <div>{quote.categories}</div>
        <div>{quote.id}</div>
        <div>{quote.value}</div>
        <div>{quote.updated_at}</div>
      </div>
    </div>
  );
};

export default Main;
