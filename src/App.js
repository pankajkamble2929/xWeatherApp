import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = "51a0959387994db3a9865211252411";

  const handleSearch = async () => {
    if (!city.trim()) return;

    setLoading(true);
    setWeather(null);

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
      );

      if (!response.ok) {
        throw new Error("Invalid city");
      }

      const data = await response.json();
      setWeather(data);
    } catch (error) {
      alert("Failed to fetch weather data");
    }

    setLoading(false);
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="title">🌤 Weather App</h1>

        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Enter city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button onClick={handleSearch} className="search-btn">
            🔍
          </button>
        </div>

        {loading && <p className="loading">Loading...</p>}

        {weather && (
          <div className="weather-box fade-in">
            <h2 className="city">
              {weather.location.name}, {weather.location.country}
            </h2>

            <div className="weather-main">
              <img
                src={weather.current.condition.icon}
                alt="icon"
                className="icon"
              />
              <h1>{weather.current.temp_c}°C</h1>
              <p className="condition">{weather.current.condition.text}</p>
            </div>

            <div className="weather-cards">
              <div className="card">
                <h3>Humidity</h3>
                <p>{weather.current.humidity}%</p>
              </div>

              <div className="card">
                <h3>Wind</h3>
                <p>{weather.current.wind_kph} km/h</p>
              </div>

              <div className="card">
                <h3>Feels Like</h3>
                <p>{weather.current.feelslike_c}°C</p>
              </div>

              <div className="card">
                <h3>Pressure</h3>
                <p>{weather.current.pressure_mb} mb</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
