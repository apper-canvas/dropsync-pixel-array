import { useState } from 'react'
import MainFeature from '../components/MainFeature'
import Header from '../components/Header'
import { motion } from 'framer-motion'

function Home() {
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
<div className="min-h-screen">
      <Header 
        title="DropSync"
        subtitle="File Management Platform"
        icon="Upload"
        showDarkMode={true}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
        showStats={true}
        stats={{
          storage: '2.4GB / 5GB Used',
          files: '247 Files'
        }}
      />

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