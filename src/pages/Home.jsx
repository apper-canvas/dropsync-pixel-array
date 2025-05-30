import { useState } from 'react'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'

function Home() {
const location = useLocation()
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-effect sticky top-0 z-50 px-4 sm:px-6 lg:px-8 py-4"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-card">
              <ApperIcon name="Upload" className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gradient">DropSync</h1>
              <p className="text-xs text-surface-600 hidden sm:block">File Management Platform</p>
            </div>
          </div>
{/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1 bg-surface-100 rounded-xl p-1">
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
          </nav>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-surface-600">
              <span className="flex items-center space-x-2">
                <ApperIcon name="HardDrive" className="w-4 h-4" />
                <span>2.4GB / 5GB Used</span>
              </span>
              <span className="flex items-center space-x-2">
                <ApperIcon name="Files" className="w-4 h-4" />
                <span>247 Files</span>
              </span>
            </div>
            
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-surface-100 hover:bg-surface-200 transition-colors duration-200"
            >
              <ApperIcon 
                name={darkMode ? "Sun" : "Moon"} 
                className="w-5 h-5 text-surface-600" 
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <MainFeature />
      </main>

      {/* Footer Stats */}
      <motion.footer 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-12 border-t border-surface-200 bg-white/50 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="space-y-1">
              <div className="text-2xl font-bold text-primary">247</div>
              <div className="text-sm text-surface-600">Total Files</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-secondary">2.4GB</div>
              <div className="text-sm text-surface-600">Storage Used</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-accent">18</div>
              <div className="text-sm text-surface-600">Folders</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-green-600">99.9%</div>
              <div className="text-sm text-surface-600">Uptime</div>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}

export default Home