import Note from "./components/Note";
import { useState } from "react";

const App = (props) => {
  const [notes, setNotes] = useState(props.notes);

  const [newNote, setNewNote] = useState("");

  const [showAll, setShowAll] = useState(true);

  const addNote = (event) => {
    event.preventDefault();

    const noteObject = {
      content: newNote,
      id: notes.length + 1,
      important: Math.random() < 0.5,
    };

    setNotes(notes.concat(noteObject));
    setNewNote("");
    console.log("button clicked", event.target);
  };

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

  const handleToggle = (event) => {
    let current = !showAll;
    setShowAll(current);
    console.log("checked: ", current);
  };

  const notesToShow=showAll?notes:notes.filter((note)=>note.important);
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        <ul>
          {notesToShow.map((note) => (
            <Note key={note.id} note={note} />
          ))}
        </ul>
      </ul>

      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>

      <label>
        Toggle Important{" "}
        <input type="checkbox" onChange={handleToggle} defaultChecked={true} />
      </label>
    </div>
  );
};

export default App;
