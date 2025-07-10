import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { content: 'Arto Hellas',number: 1234 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber]=useState('')

  const addPerson=(event)=>{
    event.preventDefault()
    const nameExists=persons.some((person)=>person.content===newName)

    if(nameExists){
      alert(`${newName} is already added to phonebook`)
      return
    }
    const nameObject={
      content:newName,
      number:newNumber,
      important: Math.random()<0.5,
      id:String(persons.length+1)
    }
    
    setPersons(persons.concat(nameObject))
    setNewName('')
    
    setNewNumber('')
  }

  const handleNameChange=(event)=>{
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange=(event)=>{
    console.log(event.target.value)
    setNewNumber(event.target.value)

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
          
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person, index) => (
          <li key={index}>{person.content} {person.number}</li>
        ))}
      </ul>
      
      
    </div>
  )
}

export default App
