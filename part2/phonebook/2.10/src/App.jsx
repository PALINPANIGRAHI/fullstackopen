import { useState } from 'react';

// Component: Filter
const Filter = ({ value, onChange }) => (
  <div>
    Filter shown with: <input value={value} onChange={onChange} />
  </div>
);

// Component: PersonForm
const PersonForm = ({ onSubmit, newName, handleNameChange, newNumber, handleNumberChange }) => (
  <form onSubmit={onSubmit}>
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
);

// Component: Persons
const Persons = ({ persons }) => (
  <ul>
    {persons.length > 0 ? (
      persons.map((person, index) => (
        <li key={index}>
          {person.content} {person.number}
        </li>
      ))
    ) : (
      <li>No Result Found</li>
    )}
  </ul>
);

// Main App component
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
  };

  const filteredPersons = persons.filter(person =>
    person.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

      <h3>Add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        handleNameChange={(e) => setNewName(e.target.value)}
        newNumber={newNumber}
        handleNumberChange={(e) => setNewNumber(e.target.value)}
      />

      <h3>Numbers</h3>
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
