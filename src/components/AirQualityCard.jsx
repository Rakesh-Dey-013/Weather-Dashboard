import { FiWind, FiAlertTriangle } from 'react-icons/fi'
import { motion } from 'framer-motion'

const getAQICategory = (aqi) => {
  if (aqi <= 50) return { level: 'Good', color: 'text-green-500', bg: 'bg-green-500/10' }
  if (aqi <= 100) return { level: 'Moderate', color: 'text-yellow-500', bg: 'bg-yellow-500/10' }
  if (aqi <= 150) return { level: 'Unhealthy for Sensitive', color: 'text-orange-500', bg: 'bg-orange-500/10' }
  if (aqi <= 200) return { level: 'Unhealthy', color: 'text-red-500', bg: 'bg-red-500/10' }
  if (aqi <= 300) return { level: 'Very Unhealthy', color: 'text-purple-500', bg: 'bg-purple-500/10' }
  return { level: 'Hazardous', color: 'text-red-700', bg: 'bg-red-700/10' }
}

const AirQualityCard = ({ airQuality }) => {
  if (!airQuality || !airQuality.list) return null

  const aqi = airQuality.list[0].main.aqi
  const { level, color, bg } = getAQICategory(aqi)
  const components = airQuality.list[0].components

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="widget bg-gradient-to-tr from-black to-violet-700/10 border-emerald-500"
    >
      <h3 className="text-lg font-semibold text-gray-300 mb-4">Air Quality</h3>
      <div className={`p-4 rounded-lg ${bg} mb-4`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">US AQI</p>
            <p className={`text-3xl font-bold ${color}`}>{aqi}</p>
            <p className={`text-sm font-medium ${color}`}>{level}</p>
          </div>
          <div className="text-4xl">
            {aqi > 100 ? (
              <FiAlertTriangle className="text-orange-500" />
            ) : (
              <FiWind className="text-blue-500" />
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="bg-zinc-900/70 p-2 rounded">
          <p className="text-xs text-gray-400">PM2.5</p>
          <p className="text-gray-300">{components.pm2_5.toFixed(1)} µg/m³</p>
        </div>
        <div className="bg-zinc-900/70 p-2 rounded">
          <p className="text-xs text-gray-400">PM10</p>
          <p className="text-gray-300">{components.pm10.toFixed(1)} µg/m³</p>
        </div>
        <div className="bg-zinc-900/70 p-2 rounded">
          <p className="text-xs text-gray-400">NO₂</p>
          <p className="text-gray-300">{components.no2.toFixed(1)} µg/m³</p>
        </div>
        <div className="bg-zinc-900/70 p-2 rounded">
          <p className="text-xs text-gray-400">SO₂</p>
          <p className="text-gray-300">{components.so2.toFixed(1)} µg/m³</p>
        </div>
        <div className="bg-zinc-900/70 p-2 rounded">
          <p className="text-xs text-gray-400">O₃</p>
          <p className="text-gray-300">{components.o3.toFixed(1)} µg/m³</p>
        </div>
        <div className="bg-zinc-900/70 p-2 rounded">
          <p className="text-xs text-gray-400">CO</p>
          <p className="text-gray-300">{components.co.toFixed(1)} µg/m³</p>
        </div>
      </div>
    </motion.div>
  )
}

export default AirQualityCard