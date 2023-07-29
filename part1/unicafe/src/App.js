import { useState } from "react";

const Button = ({ button_name, handleClick }) => {
  return <button onClick={handleClick}>{button_name}</button>;
};

const StatisticLine = ({ stat_name, stat_value }) => {
  if (stat_name === "positive") {
    return (
      <tr>
        <td>{stat_name}</td>
        <td>{stat_value}%</td>
      </tr>
    );
  } else
    return (
      <tr>
        <td>{stat_name}</td>
        <td>{stat_value}</td>
      </tr>
    );
};

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = (good - bad) / all;
  const positive = (good / all) * 100;

  if (all === 0) {
    return <p>No feedback given</p>;
  } else
    return (
      <>
        <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticLine stat_name="good" stat_value={good} />
            <StatisticLine stat_name="neutral" stat_value={neutral} />
            <StatisticLine stat_name="bad" stat_value={bad} />
            <StatisticLine stat_name="all" stat_value={all} />
            <StatisticLine stat_name="average" stat_value={average} />
            <StatisticLine stat_name="positive" stat_value={positive} />
          </tbody>
        </table>
      </>
    );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
  };

  const handleBad = () => {
    setBad(bad + 1);
  };
  const handleNeutral = () => {
    setNeutral(neutral + 1);
  };

  return (
    <>
      <h1>give feedback</h1>
      <Button button_name="good" handleClick={handleGood} />
      <Button button_name="neutral" handleClick={handleNeutral} />
      <Button button_name="bad" handleClick={handleBad} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

export default App;
