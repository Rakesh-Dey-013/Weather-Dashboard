import { FiAlertTriangle } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center p-6 bg-zinc-800 rounded-lg max-w-md">
        <FiAlertTriangle className="mx-auto text-yellow-500 text-5xl mb-4" />
        <h1 className="text-2xl font-bold text-gray-300 mb-2">404 - Page Not Found</h1>
        <p className="text-gray-400 mb-4">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/Weather-Dashboard"
          className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  )
}

export default NotFound