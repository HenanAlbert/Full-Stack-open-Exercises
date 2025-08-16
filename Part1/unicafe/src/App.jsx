import { useState } from 'react'

const Button = ({ text, onClick }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const sum = good + neutral + bad
  const average = sum / 3;
  const positive = sum === 0 ? 0 : good / sum;
  return (
    sum === 0 ? (<p>No feedback given</p>) : (
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive} />
        </tbody>
      </table>
    )
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const handleAdd = (setFeedback) => {
    return () => setFeedback(prev => prev + 1);
  }

  return (
    <div>
      <p>give feedback</p>
      <Button text="good" onClick={handleAdd(setGood)} />
      <Button text="neutral" onClick={handleAdd(setNeutral)} />
      <Button text="bad" onClick={handleAdd(setBad)} />
      <p>statistics</p>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App