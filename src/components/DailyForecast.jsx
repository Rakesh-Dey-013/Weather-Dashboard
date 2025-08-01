import { WiDaySunny, WiRain, WiCloudy, WiSnow, WiThunderstorm, WiFog } from 'react-icons/wi'
import { motion } from 'framer-motion'

const getDailyIcon = (condition) => {
  const weather = condition.toLowerCase()
  if (weather.includes('rain')) return <WiRain size={32} />
  if (weather.includes('cloud')) return <WiCloudy size={32} />
  if (weather.includes('snow')) return <WiSnow size={32} />
  if (weather.includes('thunderstorm')) return <WiThunderstorm size={32} />
  if (weather.includes('fog') || weather.includes('mist')) return <WiFog size={32} />
  return <WiDaySunny size={32} />
}

const DailyForecast = ({ data, unit }) => {
  if (!data || !data.list) return null

  // Group by day
  const dailyData = {}
  data.list.forEach((item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString('en-US', {
      weekday: 'short'
    })
    if (!dailyData[date]) {
      dailyData[date] = {
        temp_min: item.main.temp_min,
        temp_max: item.main.temp_max,
        weather: item.weather[0],
        date: date
      }
    } else {
      if (item.main.temp_min < dailyData[date].temp_min) {
        dailyData[date].temp_min = item.main.temp_min
      }
      if (item.main.temp_max > dailyData[date].temp_max) {
        dailyData[date].temp_max = item.main.temp_max
      }
    }
  })

  const tempUnit = unit === 'metric' ? '°C' : '°F'

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="widget bg-gradient-to-tr from-black/70 to-blue-700/10"
    >
      <h3 className="text-lg font-semibold text-gray-300 mb-4">5-Day Forecast</h3>
      <div className="space-y-3">
        {Object.values(dailyData).slice(0, 5).map((day, index) => (
          <div key={index} className="flex items-center justify-between py-2 border-b border-zinc-700 last:border-0">
            <div className="flex items-center">
              <span className="w-20 text-gray-300">{day.date}</span>
              <div className="ml-2">{getDailyIcon(day.weather.main)}</div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm">
                {Math.round(day.temp_min)}
                {tempUnit}
              </span>
              <div className="w-20 bg-zinc-700 h-1 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500" 
                  style={{ width: '50%' }}
                />
              </div>
              <span className="text-gray-300">
                {Math.round(day.temp_max)}
                {tempUnit}
              </span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default DailyForecast