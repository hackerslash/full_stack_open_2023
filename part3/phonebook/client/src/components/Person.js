const Person = ({ name, number, id, handleDeleteof }) => {
  return (
    <div>
      {name} {number} <button onClick={() => handleDeleteof(id)}>delete</button>
    </div>
  );
};

export default Person;
