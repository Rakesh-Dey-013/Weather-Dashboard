import { createContext, useContext, useState, useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

const WeatherContext = createContext()

export const WeatherProvider = ({ children }) => {
  const [locations, setLocations] = useState([])
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [unit, setUnit] = useState('metric')
  const queryClient = useQueryClient()

  useEffect(() => {
    const savedLocations = localStorage.getItem('weatherLocations')
    if (savedLocations) {
      const parsedLocations = JSON.parse(savedLocations)
      setLocations(parsedLocations)
      if (parsedLocations.length > 0) {
        setSelectedLocation(parsedLocations[0])
      }
    }
  }, [])

  const addLocation = (newLocation) => {
    if (locations.some(loc => loc.id === newLocation.id)) {
      toast.warning('Location already added')
      return
    }
    
    const updatedLocations = [...locations, newLocation]
    setLocations(updatedLocations)
    localStorage.setItem('weatherLocations', JSON.stringify(updatedLocations))
    
    if (!selectedLocation) {
      setSelectedLocation(newLocation)
    }
    
    toast.success('Location added successfully')
  }

  const removeLocation = (locationId) => {
    const updatedLocations = locations.filter(loc => loc.id !== locationId)
    setLocations(updatedLocations)
    localStorage.setItem('weatherLocations', JSON.stringify(updatedLocations))
    
    if (selectedLocation?.id === locationId) {
      setSelectedLocation(updatedLocations.length > 0 ? updatedLocations[0] : null)
    }
    
    toast.info('Location removed')
  }

  const refreshWeatherData = () => {
    queryClient.invalidateQueries(['weather'])
    toast.info('Weather data refreshed')
  }

  return (
    <WeatherContext.Provider
      value={{
        locations,
        selectedLocation,
        setSelectedLocation,
        addLocation,
        removeLocation,
        unit,
        setUnit,
        refreshWeatherData
      }}
    >
      {children}
    </WeatherContext.Provider>
  )
}

export const useWeatherContext = () => useContext(WeatherContext)