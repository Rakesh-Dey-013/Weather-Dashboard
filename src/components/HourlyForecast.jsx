import { WiDaySunny, WiRain, WiCloudy, WiSnow, WiThunderstorm, WiFog } from 'react-icons/wi'
import { motion } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const getHourlyIcon = (condition) => {
  const weather = condition.toLowerCase()
  if (weather.includes('rain')) return <WiRain size={24} />
  if (weather.includes('cloud')) return <WiCloudy size={24} />
  if (weather.includes('snow')) return <WiSnow size={24} />
  if (weather.includes('thunderstorm')) return <WiThunderstorm size={24} />
  if (weather.includes('fog') || weather.includes('mist')) return <WiFog size={24} />
  return <WiDaySunny size={24} />
}

const HourlyForecast = ({ data, unit }) => {
  const scrollRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  if (!data || !data.list) return null

  // Get next 12 hours of forecast
  const hourlyData = data.list.slice(0, 12)
  const tempUnit = unit === 'metric' ? '°C' : '°F'

  const handleMouseDown = (e) => {
    setIsDragging(true)
    setStartX(e.pageX - scrollRef.current.offsetLeft)
    setScrollLeft(scrollRef.current.scrollLeft)
    scrollRef.current.style.cursor = 'grabbing'
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
    if (scrollRef.current) {
      scrollRef.current.style.cursor = 'grab'
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    if (scrollRef.current) {
      scrollRef.current.style.cursor = 'grab'
    }
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX) * 2 // Scroll speed multiplier
    scrollRef.current.scrollLeft = scrollLeft - walk
  }

  useEffect(() => {
    const scrollElement = scrollRef.current
    if (scrollElement) {
      scrollElement.style.cursor = 'grab'
    }
  }, [])

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="widget bg-gradient-to-tr from-black/70 to-blue-700/10"
    >
      <h3 className="text-lg font-semibold text-gray-300 mb-4">Hourly Forecast</h3>
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-hide -mx-2 select-none flex-wrap gap-5 ml-2"
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none',
          cursor: 'grab'
        }}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {hourlyData.map((hour, index) => (
          <div key={index} className="flex-shrink-0">
            <div className="flex flex-col items-center p-2 rounded-lg bg-zinc-800/50 min-w-[70px] pointer-events-none">
              <p className="text-sm text-gray-400">
                {new Date(hour.dt * 1000).toLocaleTimeString([], {
                  hour: 'numeric'
                })}
              </p>
              <div className="my-1">{getHourlyIcon(hour.weather[0].main)}</div>
              <p className="text-gray-300 font-medium">
                {Math.round(hour.main.temp)}
                {tempUnit}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {Math.round(hour.pop * 100)}%
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </motion.div>
  )
}

export default HourlyForecast