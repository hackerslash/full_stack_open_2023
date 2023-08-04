import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/personService";

const Notification = ({ message, isError }) => {
  const currColor = isError ? "red" : "green";

  const styles = {
    color: currColor,
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  if (message === null) {
    return null;
  }

  return <div style={styles}>{message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [personsToShow, setPersonsToShow] = useState(persons);
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);
  const [isError, setisError] = useState(false);

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
    const personName = persons.find((person) => person.id === id).name;
    if (window.confirm(`Delete ${personName} ?`)) {
      personService
        .deleteData(id)
        .then((response) => {
          setPersonsToShow(persons.filter((person) => person.id !== id));
          setPersons(persons.filter((person) => person.id !== id));
          setisError(true);
          setMessage(`Successfully Deleted ${personName}`);

          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
        .catch(() => {
          setisError(true);
          setMessage(
            `Information of ${personName} has already been removed from server`
          );

          setTimeout(() => {
            setMessage(null);
          }, 5000);
          setPersonsToShow(persons.filter((person) => person.id !== id));
          setPersons(persons.filter((person) => person.id !== id));
        });
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
        setisError(false);
        setMessage(`Added ${savedData.name}`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
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
          personService
            .putData(id, object)
            .then((updatedData) => {
              const newData = persons.map((person) =>
                person.id !== id ? person : updatedData
              );
              setPersonsToShow(newData);
              setPersons(newData);
              setisError(false);
              setMessage(`Updated ${newData.name}`);

              setTimeout(() => {
                setMessage(null);
              }, 5000);
            })
            .catch(() => {
              setisError(true);
              setMessage(
                `Information of ${newName} has already been removed from server`
              );

              setTimeout(() => {
                setMessage(null);
              }, 5000);
              setPersonsToShow(persons.filter((person) => person.id !== id));
              setPersons(persons.filter((person) => person.id !== id));
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
      <Notification message={message} isError={isError} />
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
