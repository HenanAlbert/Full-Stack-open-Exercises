import { useState } from 'react'

const Person = ({ name, number }) => <li key={name}>{name} {number}</li>

const Persons = ({ persons }) => {
  return (
    <>
      <h1>Numbers</h1>
      <ul>
        {persons.map(person => <Person key={person.name} name={person.name} number={person.number} />)}
      </ul>
    </>
  )
}

const Filter = ({ name, number, handleFilterChange, handleSearch }) => {
  return (
    <div>
      <label htmlFor="filter">filter shown with</label>
      <input value={name} name='filter' id='filter' onChange={handleFilterChange} />
      <button onClick={handleSearch}>Search</button>
      {number && <p>The numer is: {number}</p>}
    </div>
  )
}

const Form = ({ name, number, addName, handlePhonebookChange }) => {
  return (
    <>
      <h1>add a new</h1>
      <form onSubmit={addName}>
        <div>
          <label htmlFor="name">name:</label>
          <input value={name} name='name' id='name' onChange={handlePhonebookChange} />
        </div>
        <div>
          <label htmlFor="number">number:</label>
          <input value={number} name='number' id='number' onChange={handlePhonebookChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newPerson, setNewPerson] = useState({ name: '', number: '' });
  const [filter, setFilter] = useState({ name: '', number: '' });
  const handleFilterChange = (evt) => {
    setFilter({ ...filter, name: evt.target.value })
  }
  const handlePhonebookChange = (evt) => {
    const attribute = evt.target.name;
    setNewPerson({ ...newPerson, [attribute]: evt.target.value });
  }
  const addName = (evt) => {
    evt.preventDefault();
    if (persons.some(person => person.name === newPerson.name)) {
      alert(`${person.name}is already added to phonebook`);
    } else {
      setPersons(prev => prev.concat({ name: newPerson.name, number: newPerson.number }));
    }
    setNewPerson({ name: '', number: '' });
  }
  const handleSearch = () => {
    const searchRestult = persons.find(person => person.name.toLowerCase() === filter.name.toLowerCase());
    searchRestult && setFilter({ ...filter, number: searchRestult.number });
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter name={filter.name} number={filter.number} handleFilterChange={handleFilterChange} handleSearch={handleSearch} />
      <Form name={newPerson.name} number={newPerson.number} addName={addName} handlePhonebookChange={handlePhonebookChange} />
      <Persons persons={persons} />
    </div>
  )
}

export default App