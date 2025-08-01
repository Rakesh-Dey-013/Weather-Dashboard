import axios from 'axios'

// const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

export const fetchCurrentWeather = async (lat, lon, unit = 'metric') => {
  const response = await axios.get(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}`
  )
  return response.data
}

export const fetchForecast = async (lat, lon, unit = 'metric') => {
  const response = await axios.get(
    `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}`
  )
  return response.data
}

export const fetchAirQuality = async (lat, lon) => {
  const response = await axios.get(
    `${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  )
  return response.data
}

export const fetchUVIndex = async (lat, lon) => {
  const response = await axios.get(
    `${BASE_URL}/uvi?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  )
  return response.data
}

export const fetchWeatherAlerts = async (lat, lon) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,daily&appid=${API_KEY}`
    )
    return response.data.alerts || []
  } catch (error) {
    return []
  }
}