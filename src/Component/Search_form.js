// SearchForm.jsx
import React from "react"
//Weather Forecasting Project Using React-Developed By Pragin T
import "./Search_form.css"
//Used to recive user input and updates value dynamically
function SearchForm({ city, setCity, onSearch, onUseLocation }) {
  return (
    <div>
      <h3 className="in-head">Enter a city name:</h3>
      <input
        type="text"
        className="City-hold"
        placeholder="E.g., New York, London, Tokyo"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <br />
      <button className="Search-btn" onClick={onSearch} disabled={!city.trim()}>
        Search
      </button>

        <div className="separator">
          <span className="in-headie">or</span>
        </div>
      <button className="Location-btn" onClick={onUseLocation}>
        Use Current Location
      </button>
    </div>
  );
}

export default SearchForm;
