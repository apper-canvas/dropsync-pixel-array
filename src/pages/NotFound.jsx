import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md mx-auto"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-upload"
        >
          <ApperIcon name="FileX" className="w-12 h-12 text-white" />
        </motion.div>
        
        <h1 className="text-6xl font-bold text-gradient mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-surface-800 mb-4">File Not Found</h2>
        <p className="text-surface-600 mb-8">
          The file you're looking for seems to have been moved or deleted.
        </p>
        
        <Link 
          to="/" 
          className="btn-primary inline-flex items-center space-x-2"
        >
          <ApperIcon name="Home" className="w-5 h-5" />
          <span>Back to DropSync</span>
        </Link>
      </motion.div>
    </div>
  )
}

export default NotFound