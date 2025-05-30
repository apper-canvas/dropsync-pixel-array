import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import ApperIcon from './ApperIcon'

function Header({ 
  title = "DropSync", 
  subtitle = "File Management Platform",
  icon = "Upload",
  showDarkMode = false,
  darkMode = false,
  onToggleDarkMode,
  showStats = false,
  stats = {}
}) {
  const location = useLocation()

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="glass-effect sticky top-0 z-50 px-4 sm:px-6 lg:px-8 py-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-card">
            <ApperIcon name={icon} className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gradient">{title}</h1>
            <p className="text-xs text-surface-600 hidden sm:block">{subtitle}</p>
          </div>
        </div>
        
<nav className="hidden md:flex items-center space-x-2">
          <Link
            to="/"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              location.pathname === '/'
                ? 'bg-white text-primary shadow-card'
                : 'text-surface-600 hover:text-surface-800 hover:bg-surface-50'
            }`}
          >
            <span className="flex items-center space-x-2">
              <ApperIcon name="Upload" className="w-4 h-4" />
              <span>Files</span>
            </span>
          </Link>
<Link
            to="/dashboard"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              location.pathname === '/dashboard'
                ? 'bg-white text-primary shadow-card'
                : 'text-surface-600 hover:text-surface-800 hover:bg-surface-50'
            }`}
          >
            <span className="flex items-center space-x-2">
              <ApperIcon name="BarChart3" className="w-4 h-4" />
              <span>Dashboard</span>
            </span>
          </Link>
          <Link
            to="/dashboard"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              location.pathname === '/dashboard'
                ? 'bg-white text-primary shadow-card'
                : 'text-surface-600 hover:text-surface-800 hover:bg-surface-50'
            }`}
          >
            <span className="flex items-center space-x-2">
              <ApperIcon name="BarChart3" className="w-4 h-4" />
              <span>Dashboard</span>
            </span>
          </Link>
          <Link
            to="/archive"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              location.pathname === '/archive'
                ? 'bg-white text-primary shadow-card'
                : 'text-surface-600 hover:text-surface-800 hover:bg-surface-50'
            }`}
          >
            <span className="flex items-center space-x-2">
              <ApperIcon name="Archive" className="w-4 h-4" />
              <span>Archive</span>
            </span>
          </Link>
          <Link
            to="/policies"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              location.pathname === '/policies'
                ? 'bg-white text-primary shadow-card'
                : 'text-surface-600 hover:text-surface-800 hover:bg-surface-50'
            }`}
          >
            <span className="flex items-center space-x-2">
              <ApperIcon name="Shield" className="w-4 h-4" />
              <span>Policies</span>
            </span>
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          {showStats && (
            <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-surface-600">
              <span className="flex items-center space-x-2">
                <ApperIcon name="HardDrive" className="w-4 h-4" />
                <span>{stats.storage || '2.4GB / 5GB Used'}</span>
              </span>
              <span className="flex items-center space-x-2">
                <ApperIcon name="Files" className="w-4 h-4" />
                <span>{stats.files || '247 Files'}</span>
              </span>
            </div>
          )}
          
          {showDarkMode && (
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-lg bg-surface-100 hover:bg-surface-200 transition-colors duration-200"
            >
              <ApperIcon 
                name={darkMode ? "Sun" : "Moon"} 
                className="w-5 h-5 text-surface-600" 
              />
            </button>
          )}
        </div>
      </div>
    </motion.header>
  )
}

export default Header