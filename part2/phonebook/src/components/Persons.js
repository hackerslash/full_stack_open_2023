import Person from "./Person";

const Persons = ({ personsToShow, handleDeleteof }) => {
  return (
    <>
      {personsToShow.map((person) => (
        <Person
          name={person.name}
          number={person.number}
          id={person.id}
          key={person.id}
          handleDeleteof={handleDeleteof}
        />
      ))}
    </>
  );
};

export default Persons;
