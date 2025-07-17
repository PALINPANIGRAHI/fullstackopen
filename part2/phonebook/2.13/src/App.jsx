import { useEffect, useState } from 'react'
import personService from './sevices/persons'

const FilterT = ({ value, onChange }) => {
  return (
    <div>
      filter shown with: <input value={value} onChange={onChange} />
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons);
    });
  }, []);

  const filteredP = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addPerson = (event) => {
    event.preventDefault();

    const nameExists = persons.some(person => person.name === newName);

    if (nameExists) {
      alert(`${newName} is already added to the phonebook`);
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber
    };

    personService.create(newPerson).then(addedPerson => {
      setPersons(persons.concat(addedPerson));
      setNewName('');
      setNewNumber('');
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterT value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h3>Numbers</h3>
      <ul>
        {filteredP.map(person => (
          <li key={person.id}>{person.name}: {person.number}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
