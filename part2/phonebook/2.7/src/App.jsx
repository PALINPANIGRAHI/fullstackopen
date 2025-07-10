import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { content: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  

  const addPerson=(event)=>{
    const nameExists=persons.some((person)=>person.content===newName)

    if(nameExists){
      alert(`${newName} is already added to phonebook`)
      return
    }
    event.preventDefault()
    const nameObject={
      content:newName,
      important: Math.random()<0.5,
      id:String(persons.length+1)
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
  }

  const handleNameChange=(event)=>{
    console.log(event.target.value)
    setNewName(event.target.value)
  }



  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person, index) => (
          <li key={index}>{person.content}</li>
        ))}
      </ul>
      
    </div>
  )
}

export default App