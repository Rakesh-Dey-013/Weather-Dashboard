import { Line } from 'react-chartjs-2'
import { motion } from 'framer-motion'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const TemperatureChart = ({ data, unit }) => {
  if (!data || !data.list) return null

  // Get next 24 hours of forecast
  const hourlyData = data.list.slice(0, 8)
  const labels = hourlyData.map((hour) =>
    new Date(hour.dt * 1000).toLocaleTimeString([], { hour: 'numeric' })
  )
  const temps = hourlyData.map((hour) => Math.round(hour.main.temp))
  const feelsLike = hourlyData.map((hour) => Math.round(hour.main.feels_like))

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Temperature',
        data: temps,
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: 'rgba(59, 130, 246, 1)',
        pointRadius: 4,
        pointHoverRadius: 6
      },
      {
        label: 'Feels Like',
        data: feelsLike,
        borderColor: 'rgba(168, 85, 247, 1)',
        backgroundColor: 'rgba(168, 85, 247, 0.2)',
        tension: 0.4,
        fill: false,
        borderDash: [5, 5],
        pointBackgroundColor: 'rgba(168, 85, 247, 1)',
        pointRadius: 4,
        pointHoverRadius: 6
      }
    ]
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#9ca3af'
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.dataset.label}: ${context.raw}${unit === 'metric' ? '°C' : '°F'}`
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(63, 63, 70, 0.5)'
        },
        ticks: {
          color: '#9ca3af'
        }
      },
      y: {
        grid: {
          color: 'rgba(63, 63, 70, 0.5)'
        },
        ticks: {
          color: '#9ca3af',
          callback: (value) => `${value}${unit === 'metric' ? '°C' : '°F'}`
        }
      }
    },
    maintainAspectRatio: false
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="widget h-80 bg-gradient-to-tr from-black to-violet-700/10 border-emerald-500"
    >
      <h3 className="text-lg font-semibold text-gray-300 mb-4">Temperature Trend</h3>
      <div className="h-64">
        <Line data={chartData} options={options} />
      </div>
    </motion.div>
  )
}

export default TemperatureChart