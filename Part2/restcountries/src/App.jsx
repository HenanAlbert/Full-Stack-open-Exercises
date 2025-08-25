import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
const apiKey = import.meta.env.VITE_WEATHER_KEY;


const Form = ({ handleSearch, queryCountry, handleChange }) => {
  return (
    <form onSubmit={handleSearch}>
      <label htmlFor="querycountry">find countries</label>
      <input type="text" value={queryCountry} onChange={handleChange} id='querycountry' />
    </form>
  )
}

const CountryLi = ({ country, handleShow }) => {
  return (
    <li key={country.name.common}>
      {country.name.common}
      <button onClick={() => handleShow(country)}>Show</button>
    </li>
  )
}

const CountryDetail = ({ country }) => {
  const languages = Object.values(country.languages);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${apiKey}&units=metric`
    axios.get(apiurl)
      .then(response => setWeather(response.data));
  }, [country])

  if (weather) {
    return (
      <>
        <h1>{country.name.common}</h1>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>
        <h1>Language</h1>
        <ul>
          {languages.map(language => <li key={language}>{language}</li>)}
        </ul>
        <img src={country.flags.png} alt={country.flags.alt} />
        <h1>Weather in {country.name.common}</h1>
        <p>Temperature {weather.main.temp} Celsius</p>
        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="weather icon" />
        <p>Wind {weather.wind.speed} m/s</p>
      </>
    )
  }
}

const SearchResult = ({ showcountires, handleShow }) => {
  if (!showcountires) {
    return;
  }
  const num = showcountires.length;
  if (num === 0) {
    return <p>country not found</p>;
  } else if (num === 1) {
    return < CountryDetail country={showcountires[0]} />
  } else if (num <= 10) {
    return (
      <ul>
        {showcountires.map(country => <CountryLi key={country.name.common} country={country} handleShow={handleShow} />)}
      </ul>
    )
  } else {
    <p>Too many matches, specify another filter</p>
  }
}


function App() {
  const [queryCountry, setQueryCountry] = useState('');
  const [allCountries, setAllCountries] = useState(null);
  const [showcountires, setShowCountries] = useState(null);

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setAllCountries(response.data)
      })
  }, [])

  const handleChange = (evt) => {
    setQueryCountry(evt.target.value);
  }
  const handleSearch = (evt) => {
    evt.preventDefault();
    setShowCountries(() => {
      return allCountries.filter(country => country.name.common.toLowerCase().includes(queryCountry.toLowerCase()));
    })
  }

  const handleShow = (country) => {
    setShowCountries([country]);
  }

  return (
    <>
      {!allCountries && <p>loading</p>}
      <Form handleSearch={handleSearch} queryCountry={queryCountry} handleChange={handleChange} />
      <SearchResult showcountires={showcountires} handleShow={handleShow} />
    </>
  )
}

export default App
