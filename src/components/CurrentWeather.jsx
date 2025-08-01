import { WiDaySunny, WiRain, WiCloudy, WiSnow, WiThunderstorm, WiFog } from 'react-icons/wi'
import { FiDroplet, FiWind, FiEye } from 'react-icons/fi'
import { useWeatherContext } from '../contexts/WeatherContext'
import { motion } from 'framer-motion'

const getWeatherIcon = (condition) => {
  const weather = condition.toLowerCase()
  if (weather.includes('rain')) return <WiRain size={64} />
  if (weather.includes('cloud')) return <WiCloudy size={64} />
  if (weather.includes('snow')) return <WiSnow size={64} />
  if (weather.includes('thunderstorm')) return <WiThunderstorm size={64} />
  if (weather.includes('fog') || weather.includes('mist')) return <WiFog size={64} />
  return <WiDaySunny size={64} />
}

const CurrentWeather = ({ data }) => {
  const { unit } = useWeatherContext()
  if (!data) return null

  const tempUnit = unit === 'metric' ? '°C' : '°F'
  const windUnit = unit === 'metric' ? 'm/s' : 'mph'

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="widget spotlight bg-gradient-to-tr from-black/70 to-emerald-400/10 "
    >
      <div className="relative z-10">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-400  to-blue-700 bg-clip-text text-transparent">{data.name}</h2>
            <p className="text-gray-500">
              {new Date(data.dt * 1000).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric'
              })}
            </p>
            <div className="flex items-center mt-2">
              {getWeatherIcon(data.weather[0].main)}
              <span className="text-5xl font-bold text-gray-300 ml-2">
                {Math.round(data.main.temp)}
                <span className="text-2xl">{tempUnit}</span>
              </span>
            </div>
            <p className="text-gray-400 capitalize">{data.weather[0].description}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-500">
              Feels like: {Math.round(data.main.feels_like)}{tempUnit}
            </p>
            <p className="text-gray-500">
              High: {Math.round(data.main.temp_max)}{tempUnit}
            </p>
            <p className="text-gray-500">
              Low: {Math.round(data.main.temp_min)}{tempUnit}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="flex items-center">
            <FiDroplet className="text-blue-400 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Humidity</p>
              <p className="text-gray-300">{data.main.humidity}%</p>
            </div>
          </div>
          <div className="flex items-center">
            <FiWind className="text-blue-400 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Wind</p>
              <p className="text-gray-300">
                {Math.round(data.wind.speed)} {windUnit}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <FiEye className="text-blue-400 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Visibility</p>
              <p className="text-gray-300">
                {unit === 'metric' 
                  ? `${(data.visibility / 1000).toFixed(1)} km` 
                  : `${(data.visibility / 1609).toFixed(1)} mi`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default CurrentWeather