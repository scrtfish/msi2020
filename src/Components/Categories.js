import React, { useState, useEffect } from "react";
import axios from "axios";

const Categories = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("https://api.chucknorris.io/jokes/categories");

      setData(result.data);
    };
    fetchData();
  }, []);

  console.log(props.categoryType);

  return (
    <ul>
      {data.slice(0, 4).map((item) => (
        <div onClick={() => props.setCategoryType(item)}>{item}</div>
      ))}
    </ul>
  );
};

export default Categories;
