import { useState, useEffect } from "react";

import apiServices from "./services/apiServices";
import SearchCountries from "./components/SearchCountries";
import Country from "./components/Country";








const App = () => {
  const [countries, setCountries] = useState([]);
  const [countriesToShow, setcountriesToShow] = useState([]);
  const [countryData, setcountryData] = useState(null);

  const showCountry = (countryName) => {
    apiServices.getCountry(countryName).then((response) => {
      setcountriesToShow(null);
      setcountryData(response.data);
    });
  };

  const showHandle = (countryName) => {
    showCountry(countryName);
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value;

    if (searchTerm === "") {
      setcountriesToShow([]);
    } else {
      const currCountriesToShow = countries.filter((element) =>
        element.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (currCountriesToShow.length === 1) {
        showCountry(currCountriesToShow[0]);
      } else {
        setcountriesToShow(currCountriesToShow);
        setcountryData(null);
      }
    }
  };

  useEffect(() => {
    apiServices.getAllCountries().then((response) => {
      const countryNames = response.data.map((element) => element.name.common);
      setCountries(countryNames);
    });
  }, []);

  return (
    <div>
      <label>
        find countries <input onChange={handleSearch} />
      </label>

      <SearchCountries
        countriesToShow={countriesToShow}
        showHandle={showHandle}
      />
      <Country countryData={countryData} />
    </div>
  );
};

export default App;
