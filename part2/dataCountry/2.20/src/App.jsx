import { useState } from 'react'
import axios from 'axios'

const App = () => {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [weather, setWeather] = useState(null)

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY

  const handleSearch = async (e) => {
    const value = e.target.value
    setQuery(value)
    setSelectedCountry(null)
    setWeather(null)

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

  const fetchWeather = async (capital) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${apiKey}`
      )
      setWeather(response.data)
    } catch (error) {
      console.error("Error fetching weather:", error)
      setWeather(null)
    }
  }

  const handleShow = (country) => {
    setSelectedCountry(country)
    setWeather(null)
    if (country.capital && country.capital.length > 0) {
      fetchWeather(country.capital[0])
    }
  }

  return (
    <div>
      <h1>Country Finder</h1>
      <input value={query} onChange={handleSearch} placeholder="Enter country name" />

      {selectedCountry ? (
        <div>
          <h2>{selectedCountry.name.common}</h2>
          <p>Capital: {selectedCountry.capital[0]}</p>
          <p>Population: {selectedCountry.population}</p>
          <h3>Languages:</h3>
          <ul>
            {Object.values(selectedCountry.languages).map((lang) => (
              <li key={lang}>{lang}</li>
            ))}
          </ul>
          <img src={selectedCountry.flags.png} alt="flag" width="150" />

          {weather ? (
            <div>
              <h3>Weather in {selectedCountry.capital[0]}</h3>
              <p>Temperature: {weather.main.temp} °C</p>
              <p>Wind: {weather.wind.speed} m/s</p>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="Weather icon"
              />
            </div>
          ) : (
            <p>Loading weather...</p>
          )}
        </div>
      ) : (
        countries.map((country) => (
          <div key={country.cca3}>
            {country.name.common}
            <button onClick={() => handleShow(country)}>Show</button>
          </div>
        ))
      )}
    </div>
  )
}

export default App
