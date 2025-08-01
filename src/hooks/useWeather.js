import { useQuery } from '@tanstack/react-query'
import {
  fetchCurrentWeather,
  fetchForecast,
  fetchAirQuality,
  fetchUVIndex,
  fetchWeatherAlerts
} from '../services/weatherService'

export const useWeatherData = (lat, lon, unit) => {
  return useQuery({
    queryKey: ['weather', lat, lon, unit],
    queryFn: async () => {
      const [current, forecast, airQuality, uvIndex, alerts] = await Promise.all([
        fetchCurrentWeather(lat, lon, unit),
        fetchForecast(lat, lon, unit),
        fetchAirQuality(lat, lon),
        fetchUVIndex(lat, lon),
        fetchWeatherAlerts(lat, lon)
      ])
      
      return {
        current,
        forecast,
        airQuality,
        uvIndex,
        alerts
      }
    },
    enabled: !!lat && !!lon,
    staleTime: 15 * 60 * 1000, // 15 minutes
    refetchOnWindowFocus: false
  })
}