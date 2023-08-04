const SearchCountries = ({ countriesToShow, showHandle }) => {
  if (countriesToShow != null) {
    if (countriesToShow.length > 10) {
      return <div> Too many matches, specify another filter</div>;
    } else
      return (
        <>
          {countriesToShow.map((element) => {
            return (
              <div key={element}>
                {element}

                <button onClick={() => showHandle(element.toLowerCase())}>
                  show
                </button>
              </div>
            );
          })}
        </>
      );
  }
};


export default SearchCountries;