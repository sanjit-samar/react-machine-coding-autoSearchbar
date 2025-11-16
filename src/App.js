import { useState } from "react";
import "./styles.css";
import { useEffect } from "react";

export default function App() {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const data = await fetch(`https://dummyjson.com/recipes/search?q=${input}`);
    const result = await data.json();
    setData(result.recipes);
  };

  useEffect(() => {
    fetchData();
  }, [input]);

  return (
    <div className="App">
      <input
        className="input-box"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      {data &&
        data?.map((el) => (
          <div key={el.id} className="search-container">
            <div className="search-box">{el.name}</div>
          </div>
        ))}
    </div>
  );
}
