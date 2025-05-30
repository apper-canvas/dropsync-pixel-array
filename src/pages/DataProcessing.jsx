import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import {
  Upload, FileText, Image, Video, Music, Archive, FileIcon,
  Play, Pause, X, Download, RefreshCw, Search, Filter,
  CheckCircle2, AlertCircle, Clock, Trash2, Eye, Settings,
  BarChart3, Zap, Layers, Database, ArrowLeft, Plus,
  FileCheck, FileCog, FileX, Loader2
} from 'lucide-react'
import Header from '../components/Header'

const DataProcessing = () => {
  const [files, setFiles] = useState([])
  const [selectedFiles, setSelectedFiles] = useState([])
  const [processingJobs, setProcessingJobs] = useState([])
  const [selectedOperation, setSelectedOperation] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showJobHistory, setShowJobHistory] = useState(false)

  // Mock data for demonstration
  useEffect(() => {
    setProcessingJobs([
      {
        id: 1,
        name: 'Image Compression Batch',
        files: 15,
        status: 'completed',
        progress: 100,
        startTime: new Date(Date.now() - 300000),
        endTime: new Date(Date.now() - 60000),
        operation: 'compress',
        results: { processed: 15, succeeded: 15, failed: 0 }
      },
      {
        id: 2,
        name: 'Video Format Conversion',
        files: 3,
        status: 'processing',
        progress: 45,
        startTime: new Date(Date.now() - 120000),
        operation: 'convert',
        results: { processed: 1, succeeded: 1, failed: 0 }
      },
      {
        id: 3,
        name: 'Document Metadata Extraction',
        files: 8,
        status: 'pending',
        progress: 0,
        startTime: null,
        operation: 'metadata',
        results: { processed: 0, succeeded: 0, failed: 0 }
      }
    ])
  }, [])

  const operations = [
    {
      id: 'compress',
      name: 'Compress Files',
      description: 'Reduce file sizes while maintaining quality',
      icon: Archive,
      color: 'primary',
      supportedTypes: ['image', 'video', 'document']
    },
    {
      id: 'convert',
      name: 'Format Conversion',
      description: 'Convert files to different formats',
      icon: RefreshCw,
      color: 'secondary',
      supportedTypes: ['image', 'video', 'audio', 'document']
    },
    {
      id: 'metadata',
      name: 'Extract Metadata',
      description: 'Extract detailed file information',
      icon: Database,
      color: 'accent',
      supportedTypes: ['image', 'video', 'audio', 'document']
    },
    {
      id: 'rename',
      name: 'Batch Rename',
      description: 'Rename multiple files with patterns',
      icon: FileText,
      color: 'success',
      supportedTypes: ['all']
    }
  ]

  const handleDragOver = (e) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDragOver(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    const droppedFiles = Array.from(e.dataTransfer.files)
    addFiles(droppedFiles)
  }

  const handleFileSelect = (e) => {
    const selectedFilesList = Array.from(e.target.files)
    addFiles(selectedFilesList)
  }

  const addFiles = (newFiles) => {
    const processedFiles = newFiles.map((file, index) => ({
      id: Date.now() + index,
      name: file.name,
      size: file.size,
      type: getFileType(file.name),
      lastModified: file.lastModified,
      file: file,
      selected: false
    }))
    
    setFiles(prev => [...prev, ...processedFiles])
    toast.success(`Added ${newFiles.length} file(s) for processing`)
  }

  const getFileType = (filename) => {
    const ext = filename.split('.').pop().toLowerCase()
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext)) return 'image'
    if (['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm'].includes(ext)) return 'video'
    if (['mp3', 'wav', 'flac', 'aac', 'ogg'].includes(ext)) return 'audio'
    if (['pdf', 'doc', 'docx', 'txt', 'rtf'].includes(ext)) return 'document'
    if (['zip', 'rar', '7z', 'tar', 'gz'].includes(ext)) return 'archive'
    return 'other'
  }

  const getFileIcon = (type) => {
    switch (type) {
      case 'image': return Image
      case 'video': return Video
      case 'audio': return Music
      case 'document': return FileText
      case 'archive': return Archive
      default: return FileIcon
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const toggleFileSelection = (fileId) => {
    setFiles(prev => prev.map(file => 
      file.id === fileId ? { ...file, selected: !file.selected } : file
    ))
  }

  const selectAllFiles = () => {
    const allSelected = files.every(file => file.selected)
    setFiles(prev => prev.map(file => ({ ...file, selected: !allSelected })))
  }

  const removeFile = (fileId) => {
    setFiles(prev => prev.filter(file => file.id !== fileId))
    toast.info('File removed from processing queue')
  }

  const startProcessing = () => {
    if (!selectedOperation) {
      toast.error('Please select an operation')
      return
    }

    const selectedFilesList = files.filter(file => file.selected)
    if (selectedFilesList.length === 0) {
      toast.error('Please select files to process')
      return
    }

    const newJob = {
      id: Date.now(),
      name: `${operations.find(op => op.id === selectedOperation)?.name} - ${selectedFilesList.length} files`,
      files: selectedFilesList.length,
      status: 'processing',
      progress: 0,
      startTime: new Date(),
      operation: selectedOperation,
      results: { processed: 0, succeeded: 0, failed: 0 }
    }

    setProcessingJobs(prev => [newJob, ...prev])
    
    // Simulate processing progress
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 15
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
        
        setProcessingJobs(prev => prev.map(job => 
          job.id === newJob.id 
            ? { 
                ...job, 
                status: 'completed', 
                progress: 100, 
                endTime: new Date(),
                results: { 
                  processed: selectedFilesList.length, 
                  succeeded: selectedFilesList.length, 
                  failed: 0 
                }
              }
            : job
        ))
        
        toast.success('Processing completed successfully!')
      } else {
        setProcessingJobs(prev => prev.map(job => 
          job.id === newJob.id ? { ...job, progress: Math.round(progress) } : job
        ))
      }
    }, 500)

    // Clear selections
    setFiles(prev => prev.map(file => ({ ...file, selected: false })))
    setSelectedOperation('')
    
    toast.info('Processing started!')
  }

  const cancelJob = (jobId) => {
    setProcessingJobs(prev => prev.map(job => 
      job.id === jobId && job.status === 'processing' 
        ? { ...job, status: 'cancelled' }
        : job
    ))
    toast.warning('Processing job cancelled')
  }

  const deleteJob = (jobId) => {
    setProcessingJobs(prev => prev.filter(job => job.id !== jobId))
    toast.info('Job removed from history')
  }

  const restartJob = (jobId) => {
    setProcessingJobs(prev => prev.map(job => 
      job.id === jobId 
        ? { 
            ...job, 
            status: 'processing', 
            progress: 0, 
            startTime: new Date(),
            endTime: null 
          }
        : job
    ))
    
    // Simulate restart processing
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 12
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
        
        setProcessingJobs(prev => prev.map(job => 
          job.id === jobId 
            ? { 
                ...job, 
                status: 'completed', 
                progress: 100, 
                endTime: new Date()
              }
            : job
        ))
        
        toast.success('Job restarted and completed!')
      } else {
        setProcessingJobs(prev => prev.map(job => 
          job.id === jobId ? { ...job, progress: Math.round(progress) } : job
        ))
      }
    }, 400)
    
    toast.info('Job restarted!')
  }

  const downloadResults = (jobId) => {
    toast.success('Download started! Files will be saved to your downloads folder.')
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return CheckCircle2
      case 'processing': return Loader2
      case 'cancelled': return X
      case 'failed': return AlertCircle
      default: return Clock
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success-600'
      case 'processing': return 'text-primary-600'
      case 'cancelled': return 'text-surface-500'
      case 'failed': return 'text-error-600'
      default: return 'text-warning-600'
    }
  }

  const filteredJobs = processingJobs.filter(job => {
    const matchesSearch = job.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || job.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const stats = {
    totalFiles: files.length,
    selectedFiles: files.filter(f => f.selected).length,
    completedJobs: processingJobs.filter(j => j.status === 'completed').length,
    activeJobs: processingJobs.filter(j => j.status === 'processing').length
  }

  if (showJobHistory) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-surface-50 via-white to-surface-100">
        <Header />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowJobHistory(false)}
                  className="p-2 rounded-xl bg-white shadow-depth-1 hover:shadow-depth-2 transition-all duration-200"
                >
                  <ArrowLeft className="w-5 h-5 text-surface-600" />
                </button>
                <div>
                  <h1 className="text-3xl font-bold text-surface-900">Processing History</h1>
                  <p className="text-surface-600 mt-1">View and manage your processing jobs</p>
                </div>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-surface-400" />
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-surface-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 rounded-xl border border-surface-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="processing">Processing</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
                <option value="failed">Failed</option>
              </select>
            </div>

            {/* Jobs List */}
            <div className="space-y-4">
              <AnimatePresence>
                {filteredJobs.map((job) => {
                  const StatusIcon = getStatusIcon(job.status)
                  const operation = operations.find(op => op.id === job.operation)
                  const OperationIcon = operation?.icon || Settings
                  
                  return (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="professional-card p-6"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 flex-1">
                          <div className={`icon-badge icon-badge-${operation?.color || 'primary'}`}>
                            <OperationIcon className="w-6 h-6" />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center space-x-3">
                              <h3 className="font-semibold text-surface-900">{job.name}</h3>
                              <div className={`flex items-center space-x-1 ${getStatusColor(job.status)}`}>
                                <StatusIcon className={`w-4 h-4 ${job.status === 'processing' ? 'animate-spin' : ''}`} />
                                <span className="text-sm font-medium capitalize">{job.status}</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-4 mt-2 text-sm text-surface-600">
                              <span>{job.files} files</span>
                              {job.startTime && (
                                <span>Started: {job.startTime.toLocaleTimeString()}</span>
                              )}
                              {job.endTime && (
                                <span>Completed: {job.endTime.toLocaleTimeString()}</span>
                              )}
                            </div>
                            
                            {job.status === 'processing' && (
                              <div className="mt-3">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm text-surface-600">Progress</span>
                                  <span className="text-sm font-medium text-surface-900">{job.progress}%</span>
                                </div>
                                <div className="progress-bar">
                                  <motion.div
                                    className="progress-fill"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${job.progress}%` }}
                                    transition={{ duration: 0.3 }}
                                  />
                                </div>
                              </div>
                            )}
                            
                            {job.status === 'completed' && (
                              <div className="mt-2 text-sm text-surface-600">
                                Results: {job.results.succeeded} succeeded, {job.results.failed} failed
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          {job.status === 'completed' && (
                            <button
                              onClick={() => downloadResults(job.id)}
                              className="p-2 rounded-lg bg-success-50 text-success-600 hover:bg-success-100 transition-colors duration-200"
                              title="Download Results"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                          )}
                          
                          {job.status === 'processing' && (
                            <button
                              onClick={() => cancelJob(job.id)}
                              className="p-2 rounded-lg bg-error-50 text-error-600 hover:bg-error-100 transition-colors duration-200"
                              title="Cancel Job"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                          
                          {(job.status === 'completed' || job.status === 'cancelled') && (
                            <button
                              onClick={() => restartJob(job.id)}
                              className="p-2 rounded-lg bg-primary-50 text-primary-600 hover:bg-primary-100 transition-colors duration-200"
                              title="Restart Job"
                            >
                              <RefreshCw className="w-4 h-4" />
                            </button>
                          )}
                          
                          <button
                            onClick={() => deleteJob(job.id)}
                            className="p-2 rounded-lg bg-surface-50 text-surface-600 hover:bg-surface-100 transition-colors duration-200"
                            title="Delete Job"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
              
              {filteredJobs.length === 0 && (
                <div className="text-center py-12">
                  <Clock className="w-16 h-16 text-surface-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-surface-900 mb-2">No jobs found</h3>
                  <p className="text-surface-600">
                    {searchTerm || filterStatus !== 'all' 
                      ? 'Try adjusting your search or filter criteria'
                      : 'Start processing files to see jobs here'
                    }
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 via-white to-surface-100">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gradient-enhanced mb-4">
              Data Processing Center
            </h1>
            <p className="text-xl text-surface-600 max-w-2xl mx-auto">
              Upload, process, and transform your files with powerful batch operations
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="stat-card">
              <div className="flex items-center">
                <div className="icon-badge icon-badge-primary">
                  <FileIcon className="w-6 h-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-surface-600">Total Files</p>
                  <p className="text-2xl font-bold text-surface-900">{stats.totalFiles}</p>
                </div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="flex items-center">
                <div className="icon-badge icon-badge-secondary">
                  <FileCheck className="w-6 h-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-surface-600">Selected</p>
                  <p className="text-2xl font-bold text-surface-900">{stats.selectedFiles}</p>
                </div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="flex items-center">
                <div className="icon-badge icon-badge-accent">
                  <Zap className="w-6 h-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-surface-600">Active Jobs</p>
                  <p className="text-2xl font-bold text-surface-900">{stats.activeJobs}</p>
                </div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="flex items-center">
                <div className="icon-badge" style={{ backgroundColor: '#22c55e20', color: '#22c55e' }}>
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-surface-600">Completed</p>
                  <p className="text-2xl font-bold text-surface-900">{stats.completedJobs}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* File Upload Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Upload Zone */}
              <div className="professional-card p-6">
                <h2 className="text-xl font-semibold text-surface-900 mb-4">Upload Files</h2>
                
                <div
                  className={`file-upload-zone ${dragOver ? 'drag-over' : ''}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <div className="text-center">
                    <Upload className="w-12 h-12 text-surface-400 mx-auto mb-4" />
                    <p className="text-lg font-medium text-surface-900 mb-2">
                      Drop files here or click to browse
                    </p>
                    <p className="text-surface-600 mb-4">
                      Support for images, videos, documents, and more
                    </p>
                    <input
                      type="file"
                      multiple
                      onChange={handleFileSelect}
                      className="hidden"
                      id="file-input"
                    />
                    <label
                      htmlFor="file-input"
                      className="btn-primary cursor-pointer inline-block"
                    >
                      Choose Files
                    </label>
                  </div>
                </div>
              </div>

              {/* File List */}
              {files.length > 0 && (
                <div className="professional-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-surface-900">
                      Files ({files.length})
                    </h2>
                    <button
                      onClick={selectAllFiles}
                      className="text-sm font-medium text-primary-600 hover:text-primary-700"
                    >
                      {files.every(f => f.selected) ? 'Deselect All' : 'Select All'}
                    </button>
                  </div>
                  
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {files.map((file) => {
                      const FileIcon = getFileIcon(file.type)
                      
                      return (
                        <motion.div
                          key={file.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex items-center p-3 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                            file.selected 
                              ? 'border-primary-400 bg-primary-50' 
                              : 'border-surface-200 hover:border-primary-300'
                          }`}
                          onClick={() => toggleFileSelection(file.id)}
                        >
                          <div className="flex items-center flex-1">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              file.type === 'image' ? 'bg-green-100 text-green-600' :
                              file.type === 'video' ? 'bg-purple-100 text-purple-600' :
                              file.type === 'audio' ? 'bg-yellow-100 text-yellow-600' :
                              file.type === 'document' ? 'bg-blue-100 text-blue-600' :
                              'bg-surface-100 text-surface-600'
                            }`}>
                              <FileIcon className="w-5 h-5" />
                            </div>
                            
                            <div className="ml-3 flex-1">
                              <p className="font-medium text-surface-900 truncate">{file.name}</p>
                              <p className="text-sm text-surface-600">
                                {formatFileSize(file.size)} • {file.type}
                              </p>
                            </div>
                          </div>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              removeFile(file.id)
                            }}
                            className="p-2 rounded-lg text-surface-400 hover:text-error-600 hover:bg-error-50 transition-colors duration-200"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Operations Panel */}
            <div className="space-y-6">
              {/* Operations */}
              <div className="professional-card p-6">
                <h2 className="text-xl font-semibold text-surface-900 mb-4">Processing Operations</h2>
                
                <div className="space-y-3">
                  {operations.map((operation) => {
                    const OperationIcon = operation.icon
                    
                    return (
                      <motion.div
                        key={operation.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                          selectedOperation === operation.id
                            ? 'border-primary-400 bg-primary-50 shadow-glow-primary'
                            : 'border-surface-200 hover:border-primary-300'
                        }`}
                        onClick={() => setSelectedOperation(operation.id)}
                      >
                        <div className="flex items-center">
                          <div className={`icon-badge icon-badge-${operation.color}`}>
                            <OperationIcon className="w-5 h-5" />
                          </div>
                          <div className="ml-3">
                            <h3 className="font-medium text-surface-900">{operation.name}</h3>
                            <p className="text-sm text-surface-600">{operation.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={startProcessing}
                  disabled={!selectedOperation || files.filter(f => f.selected).length === 0}
                  className="w-full mt-6 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Processing
                </motion.button>
              </div>

              {/* Active Jobs */}
              <div className="professional-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-surface-900">Active Jobs</h2>
                  <button
                    onClick={() => setShowJobHistory(true)}
                    className="text-sm font-medium text-primary-600 hover:text-primary-700"
                  >
                    View All
                  </button>
                </div>
                
                <div className="space-y-3">
                  {processingJobs.filter(job => job.status === 'processing').slice(0, 3).map((job) => {
                    const operation = operations.find(op => op.id === job.operation)
                    const OperationIcon = operation?.icon || Settings
                    
                    return (
                      <div key={job.id} className="p-3 rounded-lg bg-surface-50 border border-surface-200">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <OperationIcon className="w-4 h-4 text-primary-600 mr-2" />
                            <span className="text-sm font-medium text-surface-900 truncate">
                              {job.name}
                            </span>
                          </div>
                          <button
                            onClick={() => cancelJob(job.id)}
                            className="p-1 rounded text-surface-400 hover:text-error-600"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                        
                        <div className="progress-bar mb-1">
                          <motion.div
                            className="progress-fill"
                            initial={{ width: 0 }}
                            animate={{ width: `${job.progress}%` }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                        
                        <div className="flex justify-between text-xs text-surface-600">
                          <span>{job.files} files</span>
                          <span>{job.progress}%</span>
                        </div>
                      </div>
                    )
                  })}
                  
                  {processingJobs.filter(job => job.status === 'processing').length === 0 && (
                    <div className="text-center py-8">
                      <Zap className="w-8 h-8 text-surface-300 mx-auto mb-2" />
                      <p className="text-sm text-surface-600">No active jobs</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default DataProcessing