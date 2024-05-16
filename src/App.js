import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [input, setInput] = useState("");
  const [filterArr, setFilterArr] = useState([]);
  console.log("gogul".includes(""));
  useEffect(
    function () {
      let fil = countries.slice().filter((val) => {
        return val.name.common.toLowerCase().includes(input);
      });
      setFilterArr(fil);
    },
    [input]
  );
  useEffect(function () {
    async function getData() {
      try {
        let req = await fetch("https://restcountries.com/v3.1/all");
        if (!req.ok) {
          throw new Error("Failed to fetch data");
        }
        let res = await req.json();
        setCountries(res);
        setFilterArr(res);
      } catch (error) {
        console.error(error.message);
      }
    }
    getData();
  }, []);

  return (
    <div className="App">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value.toLowerCase())}
      />
      <div className="container">
        {filterArr.map((val) => (
          <Country
            key={crypto.randomUUID()}
            name={val.name.common}
            flag={val.flags.png}
          />
        ))}
      </div>
    </div>
  );
}
function Country({ name, flag }) {
  return (
    <div className="countryCard">
      <img src={flag} alt="flagimage" />
      <p>{name}</p>
    </div>
  );
}
export default App;
