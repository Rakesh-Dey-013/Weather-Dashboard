import { FiSun } from 'react-icons/fi'
import { motion } from 'framer-motion'

const getUVIndexLevel = (uvi) => {
  if (uvi <= 2) return { level: 'Low', color: 'text-green-500', bg: 'bg-green-500/10' }
  if (uvi <= 5) return { level: 'Moderate', color: 'text-yellow-500', bg: 'bg-yellow-500/10' }
  if (uvi <= 7) return { level: 'High', color: 'text-orange-500', bg: 'bg-orange-500/10' }
  if (uvi <= 10) return { level: 'Very High', color: 'text-red-500', bg: 'bg-red-500/10' }
  return { level: 'Extreme', color: 'text-purple-500', bg: 'bg-purple-500/10' }
}

const UVIndexCard = ({ uvIndex }) => {
  if (!uvIndex) return null

  const uvi = Math.round(uvIndex.value)
  const { level, color, bg } = getUVIndexLevel(uvi)

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
      className="widget bg-gradient-to-tr from-black/70 to-blue-700/10"
    >
      <h3 className="text-lg font-semibold text-gray-300 mb-4">UV Index</h3>
      <div className={`p-4 rounded-lg ${bg}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">Current UV Index</p>
            <p className={`text-3xl font-bold ${color}`}>{uvi}</p>
            <p className={`text-sm font-medium ${color}`}>{level}</p>
          </div>
          <div className="text-4xl text-yellow-500">
            <FiSun />
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="relative h-2 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-full overflow-hidden">
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white" 
            style={{ left: `${Math.min(uvi * 10, 100)}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>0</span>
          <span>10+</span>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-400">
        {uvi <= 2 && (
          <p>Low risk of harm from unprotected sun exposure.</p>
        )}
        {uvi > 2 && uvi <= 5 && (
          <p>Moderate risk of harm. Wear sunscreen and a hat.</p>
        )}
        {uvi > 5 && uvi <= 7 && (
          <p>High risk. Seek shade during midday hours.</p>
        )}
        {uvi > 7 && uvi <= 10 && (
          <p>Very high risk. Extra protection needed.</p>
        )}
        {uvi > 10 && (
          <p>Extreme risk. Avoid sun exposure if possible.</p>
        )}
      </div>
    </motion.div>
  )
}

export default UVIndexCard