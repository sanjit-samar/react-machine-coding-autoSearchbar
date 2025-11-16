import { useState } from "react";
import "./styles.css";
import { useEffect } from "react";
import { useCallback, useMemo } from "react";

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

  const fetchData = async () => {
    const data = await fetch(`https://dummyjson.com/recipes/search?q=${input}`);
    const result = await data.json();
    setData(result.recipes);
  };

  const debouncSearch = useCallback(debounce(fetchData, 400), []);

  useEffect(() => {
    if (input) {
      debouncSearch(input);
    }
  }, [input, debouncSearch]);

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
