import { FiPlus, FiRefreshCw, FiTrash2, FiSettings, FiMapPin } from 'react-icons/fi'
import { useWeatherContext } from '../contexts/WeatherContext'
import SearchBar from './SearchBar'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'

const Sidebar = () => {
  const {
    locations,
    selectedLocation,
    setSelectedLocation,
    removeLocation,
    refreshWeatherData,
    unit,
    setUnit
  } = useWeatherContext()

  return (
    <div className="w-full md:w-64 bg-gradient-to-tr from-black/70 to-zinc-800/70 p-4 rounded-xl h-full flex flex-col">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-300 mb-5">Weather Dashboard</h1>
        <SearchBar />
      </div>

      <div className="flex items-center justify-between mb-4">
        <button
          onClick={refreshWeatherData}
          className="flex items-center text-sm text-gray-400 hover:text-gray-300 transition-colors"
        >
          <FiRefreshCw className="mr-1" /> Refresh
        </button>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setUnit('metric')}
            className={`text-sm px-2 py-1 rounded ${unit === 'metric' ? 'bg-blue-600 text-white' : 'bg-zinc-700 text-gray-400'}`}
          >
            °C
          </button>
          <button
            onClick={() => setUnit('imperial')}
            className={`text-sm px-2 py-1 rounded ${unit === 'imperial' ? 'bg-blue-600 text-white' : 'bg-zinc-700 text-gray-400'}`}
          >
            °F
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <h2 className="text-sm font-semibold text-gray-500 mb-2">SAVED LOCATIONS</h2>
        {locations.length === 0 ? (
          <p className="text-sm text-gray-500 italic">No locations added yet</p>
        ) : (
          <ul className="space-y-2">
            {locations.map((location) => (
              <motion.li
                key={location.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className={`flex items-center justify-between p-2 rounded-lg cursor-pointer ${selectedLocation?.id === location.id ? 'bg-zinc-800' : 'hover:bg-zinc-800'}`}
                  onClick={() => setSelectedLocation(location)}
                >
                  <div className="flex items-center">
                    <FiMapPin className="mr-2 text-blue-500" />
                    <span className="text-gray-300">
                      {location.name}
                      {location.region && `, ${location.region}`}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      removeLocation(location.id)
                    }}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <FiTrash2 size={14} />
                  </button>
                </div>
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Sidebar
