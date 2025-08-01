import { FiAlertTriangle } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

const AlertBanner = ({ alerts }) => {
  useEffect(() => {
    if (alerts && alerts.length > 0) {
      alerts.forEach((alert) => {
        toast.warning(
          <div>
            <h4 className="font-bold">{alert.event}</h4>
            <p className="text-sm">{alert.description}</p>
            <p className="text-xs mt-1">
              {new Date(alert.start * 1000).toLocaleString()} -{' '}
              {new Date(alert.end * 1000).toLocaleString()}
            </p>
          </div>,
          {
            autoClose: false,
            closeOnClick: false
          }
        )
      })
    }
  }, [alerts])

  if (!alerts || alerts.length === 0) return null

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-red-600/20 border border-red-600 rounded-lg p-3 mb-4"
    >
      <div className="flex items-start">
        <FiAlertTriangle className="text-red-500 mt-1 mr-2 flex-shrink-0" />
        <div>
          <h3 className="font-bold text-red-300">Weather Alert</h3>
          <p className="text-sm text-red-200">{alerts[0].description}</p>
          <p className="text-xs text-red-300 mt-1">
            Effective: {new Date(alerts[0].start * 1000).toLocaleString()} to{' '}
            {new Date(alerts[0].end * 1000).toLocaleString()}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default AlertBanner