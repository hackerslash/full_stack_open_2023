import { useState } from "react";

const Button = ({ handleClick, button_text }) => {
  return <button onClick={handleClick}>{button_text}</button>;
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [points, setPoints] = useState(Array(8).fill(0));
  // vote data storage array
  const [selected, setSelected] = useState(0);

  const [hasVoted, setHasVoted] = useState(false);
  //for preventing multiple votes

  const [mostVoted, setMostVoted] = useState(0);

  const handleNext = () => {
    const randomInt = Math.floor(Math.random() * 8);
    console.log(randomInt);
    setSelected(randomInt);
    setHasVoted(false);
  };

  const handleVotes = () => {
    if (!hasVoted) {
      const copy = [...points];
      copy[selected] += 1;

      if (copy[selected] > copy[mostVoted]) {
        setMostVoted(selected);
      }

      setPoints(copy);
      setHasVoted(true);
    }
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>

      <Button handleClick={handleVotes} button_text="vote" />
      <Button handleClick={handleNext} button_text="next anecdote" />

      <h1>Anecdote with most votes</h1>
      <p> {anecdotes[mostVoted]}</p>
    </div>
  );
};

export default App;
