import axios from 'axios'
import { useState } from 'react'

const App = () => { 
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState([])

  const handleSearch = (event) => {
    const value = event.target.value
    setQuery(value)

    if (value) {
      axios
        .get(`https://restcountries.com/v3.1/name/${value}`)
        .then(response => {
          setCountries(response.data)
        })
        .catch(error => {
          console.log('Error fetching countries:', error)
          setCountries([])
        })
    } else {
      setCountries([])
    }
  }

  return (
    <div>
      find countries with:<input value={query} onChange={handleSearch} placeholder="Search country" />
      {countries.length === 1 && (
        <CountryDetails country={countries[0]} />
      )}
      {countries.length > 1 && countries.length <= 10 && (
        <ul>
          {countries.map(country => (
            <li key={country.cca3}>{country.name.common}</li>
          ))}
        </ul>
      )}
      {countries.length > 10 && <p>Too many matches, please refine your search.</p>}
    </div>
  )
}

const CountryDetails = ({ country }) => (
  <div>
    <h2>{country.name.common}</h2>
    <p>Capital: {country.capital}</p>
    <p>Area: {country.area} km²</p>
    <h4>Languages:</h4>
    <ul>
      {Object.values(country.languages).map(lang => (
        <li key={lang}>{lang}</li>
      ))}
    </ul>
    <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="150" />
  </div>
)

export default App
