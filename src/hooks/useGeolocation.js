import { useState, useEffect } from 'react'

export const useGeolocation = () => {
  const [location, setLocation] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser')
      setIsLoading(false)
      return
    }

    const handleSuccess = (position) => {
      setLocation({
        lat: position.coords.latitude,
        lon: position.coords.longitude
      })
      setIsLoading(false)
    }

    const handleError = (error) => {
      setError(error.message)
      setIsLoading(false)
    }

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError)
  }, [])

  return { location, error, isLoading }
}