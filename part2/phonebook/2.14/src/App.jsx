import {useEffect,useState} from 'react'
import axios from 'axios'

const FilterT=({value,onChange})=>{
  return(
  <div>
    filter shown with: <input value={value} onChange={onChange} />
  </div>)

}

const App=()=>{
  const[persons,setPersons]=useState([])
  const[newName,setNewName]=useState('')
  const[newNumber,setNewNumber]=useState('')
  const[searchTerm,setSearchTerm]=useState('')

  useEffect(()=>{
    axios.get("http://localhost:3001/persons").then(response=>{setPersons(response.data)});
  },[]);


  const addPerson=(event)=>{
    event.preventDefault();
    const nameExists=persons.some(person=>person.name===newName)
    if(nameExists){
      alert(`${newName} is already in the phonebook`)
      return
    }
    const newPerson={
      name:newName,
      number:newNumber
    }

    axios.post("http://localhost:3001/persons",newPerson).then(response=>{
      setPersons(persons.concat(response.data))
      setNewName('')
      setNewNumber('')
    })

  }
  const handleDelete=(id,name)=>{
    if(window.confirm(`Delete ${name}`)){
      axios.delete(`http://localhost:3001/persons/${id}`).then(()=>{
        setPersons(persons.filter(person=>person.id !== id));
      })
    }
  }

  
  const filterP=persons.filter(person=>person.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return(
    <div>
      <h2>Phonebook</h2>

      <FilterT value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} />

      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
        </div>
         <button type="submit">add</button>
        
      </form> 
      <h3>Add a new Person</h3>
      <ul>
        {
          filterP.map(person=>(
            <li key={person.id}>{person.name} {person.number}
            <button onClick={()=>handleDelete(person.id,person.name)}>delete</button></li>
          ))
        }
        
        </ul> 
    </div>
  )
}
export default App