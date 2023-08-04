import WeatherData from "./WeatherData";

const Country = ({ countryData }) => {
  if (countryData != null) {
    return (
      <>
        <h1>{countryData.name.common}</h1>

        <div>capital {countryData.capital[0]}</div>

        <div>area {countryData.area} km²</div>

        <h4>languages</h4>

        <ul>
          {Object.values(countryData.languages).map((element) => {
            return <li key={element}>{element}</li>;
          })}
        </ul>

        <img
          src={countryData.flags.svg}
          alt="flag"
          width="150"
          height="150"
        ></img>

        <WeatherData city={countryData.capital[0]} />
      </>
    );
  }
};

export default Country;
