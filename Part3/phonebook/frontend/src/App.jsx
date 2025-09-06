import { useState, useEffect } from 'react'
import axios from 'axios'
import { getAll, create, deleteRequest, update } from './phonebook'

const Person = ({ id, name, number, handleDeletePerson }) => {
  return <li>{name} {number} <button onClick={() => handleDeletePerson(id, name)}>Delete</button></li>
}

const Persons = ({ persons, handleDeletePerson }) => {
  return (
    <>
      <h1>Numbers</h1>
      <ul>
        {persons.map(person => <Person key={person.id} id={person.id} name={person.name} number={person.number} handleDeletePerson={handleDeletePerson} />)}
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

const Notification = ({ notification }) => {
  const style = {
    color: 'green',
    fontStyle: 'italic',
    margin: "12px 0",
    padding: "14px 18px",
    borderRadius: "8px",
    fontSize: "18px",
    fontWeight: "600",
    background: "#e5e7eb", // 灰色背景
    border: "3px solid",
    boxShadow: "0 1px 2px rgba(0,0,0,.06)"
  }
  return notification && <p style={style}>{notification}</p>
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: '', number: '' });
  const [filter, setFilter] = useState({ name: '', number: '' });
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    getAll()
      .then(data => setPersons(data));
  }, [])

  const handleFilterChange = (evt) => {
    setFilter({ ...filter, name: evt.target.value })
  }
  const handlePhonebookChange = (evt) => {
    const attribute = evt.target.name;
    setNewPerson({ ...newPerson, [attribute]: evt.target.value });
  }
  const addName = (evt) => {
    evt.preventDefault();
    const existingPerson = persons.find(person => person.name === newPerson.name);
    if (existingPerson && window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
      update({ ...existingPerson, number: newPerson.number })
        .then(() => getAll())
        .then(data => setPersons(data))
        .catch(error => {
          setNotification(`Information of ${existingPerson.name} has already been removed from server`)
        })
    } else {
      create(newPerson)
        .then(response => {
          setPersons(prev => prev.concat({ ...response }))
        })
        .catch(error => {
          setNotification(`Person validation failed: name: Path name (${name}) is shorter than the minimum allowed length (3).`)
        });
    }
    setNotification(`Added ${newPerson.name}`);
    setNewPerson({ name: '', number: '' });
    setTimeout(() => setNotification(''), 5000);
  }
  const handleSearch = () => {
    const searchRestult = persons.find(person => person.name.toLowerCase() !== filter.name.toLowerCase());
    searchRestult && setFilter({ ...filter, number: searchRestult.number });
  }

  const handleDeletePerson = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      deleteRequest(id)
        .catch(error => {
          setNotification(`Information of ${name} has already been removed from server`)
        })
      setPersons(prev => prev.filter(person => person.id !== id));
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification notification={notification} />
      <Filter name={filter.name} number={filter.number} handleFilterChange={handleFilterChange} handleSearch={handleSearch} />
      <Form name={newPerson.name} number={newPerson.number} addName={addName} handlePhonebookChange={handlePhonebookChange} />
      <Persons persons={persons} handleDeletePerson={handleDeletePerson} />
    </div>
  )
}

export default App