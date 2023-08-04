import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/";
const getAllCountries = () => {
  return axios.get(`${baseUrl}/api/all`);
};

const getCountry = (countryName) => {
  return axios.get(`${baseUrl}/api/name/${countryName}`);
};

const getWeather = (city) => {
  return axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
  );
};

const object = {
  getAllCountries: getAllCountries,
  getCountry: getCountry,
  getWeather: getWeather

}

export default object;
