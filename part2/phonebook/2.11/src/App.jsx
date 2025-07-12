import { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3001/notes")
      .then(response => {
        console.log("Fetched notes:", response.data)
        setNotes(response.data)
      })
      .catch(error => console.log("Error fetching notes:", error))
  }, [])

  return (
    <div>
      <h2>persons</h2>
      <ul>
        {notes.map(note => (
          <li key={note.id}>{note.content}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
