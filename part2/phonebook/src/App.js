import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/personService";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [personsToShow, setPersonsToShow] = useState(persons);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService.getData().then((personData) => {
      setPersons(personData);
      setPersonsToShow(personData);
    });
  }, []);

  const handleSearchChange = (event) => {
    const currentFilter = event.target.value;
    setFilter(currentFilter);

    if (currentFilter === "") {
      setPersonsToShow(persons);
    } else {
      const filteredPersons = persons.filter((person) =>
        person.name.toLowerCase().includes(currentFilter.toLowerCase())
      );

      setPersonsToShow(filteredPersons);
    }
  };

  const handleDeleteof = (id) => {
    if (
      window.confirm(
        `Delete ${persons.find((person) => person.id === id).name}?`
      )
    ) {
      personService.deleteData(id).then((response) => {
        setPersonsToShow(persons.filter((person) => person.id !== id));
        setPersons(persons.filter((person) => person.id !== id));
      });
      console.log(`deleted id ${id}`);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const object = {
      name: newName,
      number: newNumber,
    };

    //checking if this name already exists in persons

    const isFound = persons.find((element) => element.name === object.name);
    if (isFound === undefined) {
      personService.saveData(object).then((savedData) => {
        setPersonsToShow(persons.concat(savedData));
        setFilter("");
        setPersons(persons.concat(savedData));
      });
    } else {
      if (isFound.number === object.number) {
        alert(`${newName} is already added to phonebook`);
      } else {
        if (
          window.confirm(
            `${newName} is already added to phonebook, replace the old number with a new one?`
          )
        ) {
          const id = isFound.id;
          personService.putData(id, object).then((updatedData) => {
            const newData = persons.map((person) =>
              person.id !== id ? person : updatedData
            );
            setPersonsToShow(newData);
            setPersons(newData);
          });
        }
      }
    }

    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchParam={filter} handleSearchChange={handleSearchChange} />
      <h2>add a new</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>

      <Persons personsToShow={personsToShow} handleDeleteof={handleDeleteof} />
    </div>
  );
};

export default App;
