import { useState, useEffect, useCallback, useRef } from "react";
import "./styles.css";

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

  //for Data cache
  const cache = useRef({});

  const fetchData = async (serchText) => {
    const key = serchText;
    if (cache.current[key]) {
      setData(cache.current[key]);
      return;
    }

    if (!key) {
      setData([]);
      return;
    }

    const data = await fetch(`https://dummyjson.com/recipes/search?q=${key}`);
    const result = await data.json();
    cache.current[serchText] = result.recipes;
    setData(result.recipes);
  };

  const debouncSearch = useCallback(debounce(fetchData, 400), []);

  useEffect(() => {
    if (input) {
      debouncSearch(input);
    }
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
