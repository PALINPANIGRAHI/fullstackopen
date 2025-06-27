import { useState } from 'react'

const Button=({handleClick,text})=>{
  return <button onClick={handleClick}>{text}</button>
}

const StatisticsLine=({text,value})=>{
  return(
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>)
}
const Statistics=({good,neutral,bad})=>{
  const total= good+bad+neutral
  const average = (good - bad) / total
  const positive = (good / total) * 100 + ' %'
  return(
    <table>
      <tbody>
        <StatisticsLine text="good" value={good}/>
        <StatisticsLine text="neutral" value={neutral}/>
        <StatisticsLine text="bad" value={bad}/>
        <StatisticsLine text="all" value={total} />
        <StatisticsLine text="average" value={average.toFixed(1)} />
        <StatisticsLine text="positive" value={positive} />

      </tbody>
    </table>
  )
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={()=>setGood(good+1)} text="good" />
      <Button handleClick={()=>setNeutral(neutral+1)} text="neutral" />
      <Button handleClick={()=>setBad(bad+1)} text="bad" />

      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}
export default App
