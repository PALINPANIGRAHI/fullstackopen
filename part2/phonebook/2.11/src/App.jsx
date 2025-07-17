import { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3001/persons")
      .then(response => {
        console.log("Fetched notes:", response.data)
        setPersons(response.data)
      })
      .catch(error => console.log("Error fetching notes:", error))
  }, [])

  return (
    <div>
      <h2>persons</h2>
      <ul>
        {persons.map(person => (
          <li key={person.id}>{person.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
