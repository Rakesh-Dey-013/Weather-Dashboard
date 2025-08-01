import { useState, useEffect } from 'react'
import { FiSearch, FiX } from 'react-icons/fi'
import { useWeatherContext } from '../contexts/WeatherContext'
import { searchCities } from '../services/geoDBService'
import { toast } from 'react-toastify'

const SearchBar = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const { addLocation } = useWeatherContext()

  useEffect(() => {
    if (query.trim().length > 2) {
      const timer = setTimeout(async () => {
        setIsSearching(true)
        const cities = await searchCities(query)
        setResults(cities)
        setIsSearching(false)
      }, 500)

      return () => clearTimeout(timer)
    } else {
      setResults([])
    }
  }, [query])

  const handleAddLocation = (city) => {
    addLocation({
      id: `${city.latitude}-${city.longitude}`,
      name: city.name,
      region: city.region,
      country: city.country,
      lat: city.latitude,
      lon: city.longitude
    })
    setQuery('')
    setResults([])
  }

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative flex items-center">
        <FiSearch className="absolute left-3 text-gray-500" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a city..."
          className="w-full pl-10 pr-10 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-300"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('')
              setResults([])
            }}
            className="absolute right-3 text-gray-500 hover:text-gray-300"
          >
            <FiX />
          </button>
        )}
      </div>

      {results.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-zinc-800 border border-zinc-700 rounded-lg shadow-lg max-h-60 overflow-auto">
          {results.map((city) => (
            <div
              key={`${city.latitude}-${city.longitude}`}
              className="px-4 py-2 hover:bg-zinc-700 cursor-pointer flex justify-between items-center"
              onClick={() => handleAddLocation(city)}
            >
              <div>
                <span className="font-medium text-gray-300">{city.name}</span>
                <span className="text-sm text-gray-500 ml-2">
                  {city.region && `${city.region}, `}
                  {city.country}
                </span>
              </div>
              <div className="text-xs text-gray-500">
                {Math.round(city.latitude)}, {Math.round(city.longitude)}
              </div>
            </div>
          ))}
        </div>
      )}

      {isSearching && query && (
        <div className="absolute z-10 w-full mt-1 bg-zinc-800 border border-zinc-700 rounded-lg p-4 text-center text-gray-500">
          Searching...
        </div>
      )}
    </div>
  )
}

export default SearchBar