import { useState } from 'react'
import axios from 'axios'

const App = () => {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)

  const handleSearch = async (e) => {
  const value = e.target.value
  setQuery(value)
  setSelectedCountry(null)

  if (value === '') {
    setCountries([])
    return
  }

  try {
    const response = await axios.get(`https://restcountries.com/v3.1/name/${value}`)
    setCountries(response.data)
  } catch (error) {
    console.error('No countries found')
    setCountries([])
  }
}
const handleShow = (country) => {
  setSelectedCountry(country)
}



  const countryToShow = selectedCountry || (countries.length === 1 ? countries[0] : null)

  return (
    <div>
      find countries with:<input value={query} onChange={handleSearch} placeholder="Search for a country" />

      {countries.length > 10 && <p>Too many matches, specify another filter</p>}

      {countries.length <= 10 && countries.length > 1 && !selectedCountry && (
        <ul>
          {countries.map((country) => (
            <li key={country.cca3}>
              {country.name.common}
              <button onClick={() => handleShow(country)}>show</button>
            </li>
          ))}
        </ul>
      )}

      {countryToShow && <CountryDetails country={countryToShow} />}
    </div>
  )
}

const CountryDetails = ({ country }) => (
  <div>
    <h2>{country.name.common}</h2>
    <p>Capital: {country.capital?.[0]}</p>
    <p>Area: {country.area} km²</p>

    <h4>Languages:</h4>
    <ul>
      {country.languages &&
        Object.values(country.languages).map((lang) => <li key={lang}>{lang}</li>)}
    </ul>

    <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="150px" />
  </div>
)

export default App

