import Note from "./components/Note";
import { useState } from "react";

const App = (props) => {
  const [notes, setNotes] = useState(props.notes);

  const addNote = (event) => {
    event.preventDefault();

    const noteObject = {
      content: event.target[0].value,
      id: notes.length + 1,
      important: Math.random() > 0.5,
    };

    setNotes(notes.concat(noteObject));
    console.log("button clicked", event.target);
  };
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        <ul>
          {notes.map((note) => (
            <Note key={note.id} note={note} />
          ))}
        </ul>
      </ul>

      <form onSubmit={addNote}>
        <input />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;
