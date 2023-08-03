const Filter = ({ searchParam, handleSearchChange }) => {
    return (
      <div>
        filter shown with
        <input value={searchParam} onChange={handleSearchChange} />
      </div>
    );
  };


export default Filter;