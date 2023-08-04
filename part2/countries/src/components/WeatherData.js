import React, { useState, useEffect } from "react";

import apiServices from "../services/apiServices";



const WeatherData = ({ city }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    apiServices
      .getWeather(city.toLowerCase())
      .then((response) => {
        setWeather(response.data);
      })
      .catch(() => {
        console.log("Error in API call");
      });
  }, []);

  if (weather != null)
    return (
      <>
        <h2>Weather in {city}</h2>

        <div>Temperature {weather.main.temp} °C</div>

        <img
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt="weather icon"
        ></img>

        <div>wind {weather.wind.speed} m/s</div>
      </>
    );
};

export default WeatherData;
