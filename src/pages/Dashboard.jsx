import { useEffect } from 'react'
import { useWeatherContext } from '../contexts/WeatherContext'
import { useGeolocation } from '../hooks/useGeolocation'
import { useWeatherData } from '../hooks/useWeather'
import SideBar from '../components/SideBar'
import CurrentWeather from '../components/CurrentWeather'
import HourlyForecast from '../components/HourlyForecast'
import DailyForecast from '../components/DailyForecast'
import TemperatureChart from '../components/TemperatureChart'
import AirQualityCard from '../components/AirQualityCard'
import UVIndexCard from '../components/UVIndexCard'
import AlertBanner from '../components/AlertBanner'
import MapComponent from '../components/MapComponent'

const Dashboard = () => {
  const { location: userLocation, error: locationError } = useGeolocation()
  const { selectedLocation, addLocation, unit } = useWeatherContext()
  
  // Use selected location or fall back to user's current location
  const locationToUse = selectedLocation || 
    (userLocation ? { lat: userLocation.lat, lon: userLocation.lon } : null)
  
  const { data, isLoading, isError } = useWeatherData(
    locationToUse?.lat, 
    locationToUse?.lon, 
    unit
  )

  // Add user's current location if available and no locations are saved
  useEffect(() => {
    if (userLocation && !selectedLocation) {
      addLocation({
        id: `${userLocation.lat}-${userLocation.lon}`,
        name: 'Your Location',
        lat: userLocation.lat,
        lon: userLocation.lon
      })
    }
  }, [userLocation, selectedLocation, addLocation])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (isError || locationError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-4 bg-zinc-800 rounded-lg">
          <h2 className="text-xl font-bold text-red-500 mb-2">Error Loading Data</h2>
          <p className="text-gray-400">
            {locationError || 'Failed to fetch weather data. Please try again later.'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* SideBar */}
        <div className="md:w-64 flex-shrink-0">
          <SideBar />
        </div>
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl opacity-20"></div>

        {/* Main Content */}
        <div className="flex-1">
          {data?.alerts && data.alerts.length > 0 && (
            <AlertBanner alerts={data.alerts} />
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Current Weather */}
            <div className="lg:col-span-2">
              {data?.current && (
                <CurrentWeather data={data.current} />
              )}
            </div>

            {/* Hourly Forecast */}
            {data?.forecast && (
              <HourlyForecast data={data.forecast} unit={unit} />
            )}

            {/* Daily Forecast */}
            {data?.forecast && (
              <DailyForecast data={data.forecast} unit={unit} />
            )}

            {/* Temperature Chart */}
            {data?.forecast && (
              <TemperatureChart data={data.forecast} unit={unit} />
            )}

            {/* Air Quality */}
            {data?.airQuality && (
              <AirQualityCard airQuality={data.airQuality} />
            )}

            {/* UV Index */}
            {data?.uvIndex && (
              <UVIndexCard uvIndex={data.uvIndex} />
            )}

            {/* Map */}
            {locationToUse && (
              <MapComponent 
                lat={locationToUse.lat} 
                lon={locationToUse.lon} 
                name={selectedLocation?.name || 'Your Location'} 
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
