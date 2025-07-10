import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { content: 'Arto Hellas', number: '1234' }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const addPerson = (event) => {
    event.preventDefault();
    const nameExists = persons.some(person => person.content === newName);

    if (nameExists) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const nameObject = {
      content: newName,
      number: newNumber,
      id: String(persons.length + 1)
    };

    setPersons(persons.concat(nameObject));
    setNewName('');
    setNewNumber('');
    setSearchTerm('')
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // filter by name based on search term
  const filteredPersons = persons.filter(person =>
    person.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>

      <div>
        Filter shown with: <input value={searchTerm} onChange={handleSearchChange} />
      </div>

      <h3>Add a new</h3>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h3>Numbers</h3>
      <ul>
        {filteredPersons.length > 0 ? (
          filteredPersons.map((person, index) => (
            <li key={index}>
              {person.content} {person.number}
            </li>
          ))
        ) : (
          <li>No Result Found</li>
        )}
      </ul>
    </div>
  );
};

export default App;
