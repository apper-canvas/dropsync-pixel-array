import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Chart from 'react-apexcharts'
import Header from '../components/Header'
import { format, subDays, startOfDay } from 'date-fns'

function StorageDashboard() {
  const [darkMode, setDarkMode] = useState(false)
  const [storageData, setStorageData] = useState({
    totalStorage: 5 * 1024 * 1024 * 1024, // 5GB in bytes
    usedStorage: 2.4 * 1024 * 1024 * 1024, // 2.4GB in bytes
    totalFiles: 247,
    totalFolders: 18
  })

  // Mock data for charts
  const [fileTypeData] = useState([
    { type: 'Images', size: 856 * 1024 * 1024, count: 89, color: '#10b981' },
    { type: 'Documents', size: 542 * 1024 * 1024, count: 67, color: '#3b82f6' },
    { type: 'Videos', size: 724 * 1024 * 1024, count: 23, color: '#8b5cf6' },
    { type: 'Audio', size: 298 * 1024 * 1024, count: 34, color: '#f59e0b' },
    { type: 'PDFs', size: 156 * 1024 * 1024, count: 28, color: '#ef4444' },
    { type: 'Others', size: 98 * 1024 * 1024, count: 6, color: '#6b7280' }
  ])

  const [largestFiles] = useState([
    { name: 'presentation.mp4', size: 145 * 1024 * 1024, type: 'video' },
    { name: 'project_backup.zip', size: 98 * 1024 * 1024, type: 'archive' },
    { name: 'design_files.psd', size: 87 * 1024 * 1024, type: 'image' },
    { name: 'database_export.sql', size: 76 * 1024 * 1024, type: 'database' },
    { name: 'video_tutorial.mov', size: 65 * 1024 * 1024, type: 'video' },
    { name: 'annual_report.pdf', size: 54 * 1024 * 1024, type: 'document' }
  ])

  // Generate usage trend data for the last 30 days
  const [usageTrend] = useState(() => {
    const days = []
    const usage = []
    for (let i = 29; i >= 0; i--) {
      const date = startOfDay(subDays(new Date(), i))
      days.push(format(date, 'MMM dd'))
      // Simulate gradual increase in storage usage
      const baseUsage = 1.8 + (29 - i) * 0.02
      const variance = Math.random() * 0.1 - 0.05
      usage.push(Math.max(0, baseUsage + variance))
    }
    return { days, usage }
  })

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  const formatBytes = (bytes) => {
    if (!bytes) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
  }

  const usagePercentage = (storageData.usedStorage / storageData.totalStorage) * 100

  // Chart configurations
  const pieChartOptions = {
    chart: {
      type: 'pie',
      height: 350,
      toolbar: { show: false }
    },
    labels: fileTypeData.map(item => item.type),
    colors: fileTypeData.map(item => item.color),
    legend: {
      position: 'bottom',
      fontSize: '14px'
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return Math.round(val) + '%'
      }
    },
    tooltip: {
      y: {
        formatter: function (val, { seriesIndex }) {
          return formatBytes(fileTypeData[seriesIndex].size) + ' (' + fileTypeData[seriesIndex].count + ' files)'
        }
      }
    }
  }

  const donutChartOptions = {
    chart: {
      type: 'donut',
      height: 300,
      toolbar: { show: false }
    },
    labels: ['Used', 'Available'],
    colors: ['#4338ca', '#e2e8f0'],
    legend: {
      position: 'bottom',
      fontSize: '14px'
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return Math.round(val) + '%'
      }
    },
    tooltip: {
      y: {
        formatter: function (val, { seriesIndex }) {
          const values = [storageData.usedStorage, storageData.totalStorage - storageData.usedStorage]
          return formatBytes(values[seriesIndex])
        }
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%'
        }
      }
    }
  }

  const lineChartOptions = {
    chart: {
      type: 'line',
      height: 300,
      toolbar: { show: false },
      zoom: { enabled: false }
    },
    stroke: {
      curve: 'smooth',
      width: 3
    },
    colors: ['#4338ca'],
    xaxis: {
      categories: usageTrend.days,
      labels: {
        rotate: -45,
        style: {
          fontSize: '12px'
        }
      }
    },
    yaxis: {
      title: {
        text: 'Storage (GB)'
      },
      labels: {
        formatter: function (val) {
          return val.toFixed(1) + ' GB'
        }
      }
    },
    grid: {
      borderColor: '#e2e8f0'
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val.toFixed(2) + ' GB'
        }
      }
    }
  }

  const barChartOptions = {
    chart: {
      type: 'bar',
      height: 300,
      toolbar: { show: false }
    },
    colors: ['#0891b2'],
    xaxis: {
      categories: largestFiles.map(file => file.name.length > 15 ? file.name.substring(0, 15) + '...' : file.name),
      labels: {
        rotate: -45,
        style: {
          fontSize: '12px'
        }
      }
    },
    yaxis: {
      title: {
        text: 'File Size (MB)'
      },
      labels: {
        formatter: function (val) {
          return Math.round(val) + ' MB'
        }
      }
    },
    tooltip: {
      y: {
        formatter: function (val, { dataPointIndex }) {
          return formatBytes(largestFiles[dataPointIndex].size)
        }
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false
      }
    }
  }

return (
<div className="min-h-screen">
      <Header 
        title="Storage Dashboard"
        subtitle="Storage Analytics & Insights"
        icon="BarChart3"
        showDarkMode={true}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
        showStats={true}
        stats={{
          storage: `${formatBytes(storageData.usedStorage)} / ${formatBytes(storageData.totalStorage)} Used`,
          files: `${storageData.totalFiles} Files`
        }}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Storage Overview Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <div className="neu-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-surface-600">Total Storage</p>
                <p className="text-2xl font-bold text-surface-900">{formatBytes(storageData.totalStorage)}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <ApperIcon name="HardDrive" className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>

          <div className="neu-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-surface-600">Used Storage</p>
                <p className="text-2xl font-bold text-surface-900">{formatBytes(storageData.usedStorage)}</p>
                <p className="text-sm text-surface-500">{usagePercentage.toFixed(1)}% used</p>
              </div>
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                <ApperIcon name="Database" className="w-6 h-6 text-secondary" />
              </div>
            </div>
          </div>

          <div className="neu-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-surface-600">Total Files</p>
                <p className="text-2xl font-bold text-surface-900">{storageData.totalFiles}</p>
              </div>
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                <ApperIcon name="Files" className="w-6 h-6 text-accent" />
              </div>
            </div>
          </div>

          <div className="neu-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-surface-600">Available Space</p>
                <p className="text-2xl font-bold text-surface-900">{formatBytes(storageData.totalStorage - storageData.usedStorage)}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <ApperIcon name="CheckCircle" className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Storage by File Type */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="neu-card p-6"
          >
            <h3 className="text-lg font-semibold text-surface-900 mb-4 flex items-center space-x-2">
              <ApperIcon name="PieChart" className="w-5 h-5 text-primary" />
              <span>Storage by File Type</span>
            </h3>
            <Chart
              options={pieChartOptions}
              series={fileTypeData.map(item => item.size)}
              type="pie"
              height={350}
            />
          </motion.div>

          {/* Storage Capacity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="neu-card p-6"
          >
            <h3 className="text-lg font-semibold text-surface-900 mb-4 flex items-center space-x-2">
              <ApperIcon name="Gauge" className="w-5 h-5 text-primary" />
              <span>Storage Capacity</span>
            </h3>
            <Chart
              options={donutChartOptions}
              series={[usagePercentage, 100 - usagePercentage]}
              type="donut"
              height={300}
            />
            <div className="text-center mt-4">
              <p className="text-2xl font-bold text-surface-900">{usagePercentage.toFixed(1)}%</p>
              <p className="text-sm text-surface-600">Storage Used</p>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Usage Trend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="neu-card p-6"
          >
            <h3 className="text-lg font-semibold text-surface-900 mb-4 flex items-center space-x-2">
              <ApperIcon name="TrendingUp" className="w-5 h-5 text-primary" />
              <span>Storage Usage Trend (30 Days)</span>
            </h3>
            <Chart
              options={lineChartOptions}
              series={[{ name: 'Storage Usage', data: usageTrend.usage }]}
              type="line"
              height={300}
            />
          </motion.div>

          {/* Largest Files */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="neu-card p-6"
          >
            <h3 className="text-lg font-semibold text-surface-900 mb-4 flex items-center space-x-2">
              <ApperIcon name="BarChart3" className="w-5 h-5 text-primary" />
              <span>Largest Files</span>
            </h3>
            <Chart
              options={barChartOptions}
              series={[{ name: 'File Size', data: largestFiles.map(file => Math.round(file.size / (1024 * 1024))) }]}
              type="bar"
              height={300}
            />
          </motion.div>
        </div>

        {/* File Type Breakdown Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="neu-card p-6"
        >
          <h3 className="text-lg font-semibold text-surface-900 mb-4 flex items-center space-x-2">
            <ApperIcon name="Table" className="w-5 h-5 text-primary" />
            <span>File Type Breakdown</span>
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-200">
                  <th className="text-left py-3 font-semibold text-surface-900">File Type</th>
                  <th className="text-left py-3 font-semibold text-surface-900">Files</th>
                  <th className="text-left py-3 font-semibold text-surface-900">Size</th>
                  <th className="text-left py-3 font-semibold text-surface-900">Percentage</th>
                  <th className="text-left py-3 font-semibold text-surface-900">Usage</th>
                </tr>
              </thead>
              <tbody>
                {fileTypeData.map((item, index) => {
                  const percentage = (item.size / storageData.usedStorage) * 100
                  return (
                    <tr key={index} className="border-b border-surface-100 hover:bg-surface-50">
                      <td className="py-3">
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="font-medium text-surface-900">{item.type}</span>
                        </div>
                      </td>
                      <td className="py-3 text-surface-600">{item.count}</td>
                      <td className="py-3 text-surface-600">{formatBytes(item.size)}</td>
                      <td className="py-3 text-surface-600">{percentage.toFixed(1)}%</td>
                      <td className="py-3">
                        <div className="w-full bg-surface-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full"
                            style={{ 
                              width: `${percentage}%`,
                              backgroundColor: item.color
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      </main>
    </div>
)
}

export default StorageDashboard