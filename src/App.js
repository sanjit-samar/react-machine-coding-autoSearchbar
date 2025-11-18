import { useState } from "react";
import "./styles.css";
import { useEffect } from "react";
import { useCallback } from "react";

function debounce(func, delay) {
  let timmer;

  return function (...args) {
    clearTimeout(timmer);
    timmer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

export default function App() {
  const [showInput, setshowInput] = useState(false);
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);

  // const fetchData = async () => {
  //   const data = await fetch(`https://dummyjson.com/recipes/search?q=${input}`);
  //   const result = await data.json();
  //   setData(result.recipes);
  // };
  const fetchData = async (searchText) => {
    if (!searchText) {
      setData([]); // clear results when input empty
      return;
    }
    const data = await fetch(
      `https://dummyjson.com/recipes/search?q=${searchText}`
    );
    const result = await data.json();
    setData(result.recipes);
  };

  const debouncSearch = useCallback(debounce(fetchData, 400), []);

  useEffect(() => {
    debouncSearch(input);
  }, [input, debouncSearch]);

  //Either use if not using debounce function
  // useEffect(() => {
  //   let timmer = setTimeout(fetchData, 400);

  //   return () => {
  //     clearTimeout(timmer);
  //   };
  // }, [input]);

  return (
    <div className="App">
      <input
        className="input-box"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onFocus={() => setshowInput(true)}
        onBlur={() => setshowInput(false)}
      />
      <div className="search-container">
        {data &&
          showInput &&
          data?.map((el) => (
            <div className="search-box" key={el.id}>
              {el.name}
            </div>
          ))}
      </div>
    </div>
  );
}
