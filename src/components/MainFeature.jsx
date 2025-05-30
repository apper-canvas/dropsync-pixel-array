import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'
import { format } from 'date-fns'

function MainFeature() {
  const [files, setFiles] = useState([])
  const [uploadProgress, setUploadProgress] = useState({})
  const [dragOver, setDragOver] = useState(false)
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('name') // 'name', 'size', 'date'
  const [filterType, setFilterType] = useState('all')
  const fileInputRef = useRef(null)

  // File type detection and icon mapping
  const getFileType = (filename) => {
    const ext = filename.split('.').pop()?.toLowerCase()
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext)) return 'img'
    if (['pdf'].includes(ext)) return 'pdf'
    if (['doc', 'docx', 'txt', 'rtf'].includes(ext)) return 'doc'
    if (['mp4', 'avi', 'mov', 'wmv', 'flv'].includes(ext)) return 'vid'
    if (['mp3', 'wav', 'ogg', 'flac'].includes(ext)) return 'audio'
    if (['zip', 'rar', '7z', 'tar', 'gz'].includes(ext)) return 'zip'
    return 'default'
  }

  const getFileIcon = (type) => {
    const icons = {
      img: 'Image',
      pdf: 'FileText',
      doc: 'FileType',
      vid: 'Video',
      audio: 'Music',
      zip: 'Archive',
      default: 'File'
    }
    return icons[type] || 'File'
  }

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
  }

  // Simulate file upload with progress
  const simulateUpload = useCallback((file) => {
    const fileId = Date.now() + Math.random()
    const newFile = {
      id: fileId,
      name: file.name,
      originalName: file.name,
      size: file.size,
      mimeType: file.type,
      uploadDate: new Date(),
      lastModified: new Date(file.lastModified),
      type: getFileType(file.name),
      progress: 0,
      uploading: true
    }

    setFiles(prev => [...prev, newFile])
    setUploadProgress(prev => ({ ...prev, [fileId]: 0 }))

    // Simulate upload progress
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
        setFiles(prev => prev.map(f => 
          f.id === fileId ? { ...f, uploading: false, progress: 100 } : f
        ))
        setUploadProgress(prev => {
          const newProgress = { ...prev }
          delete newProgress[fileId]
          return newProgress
        })
        toast.success(`${file.name} uploaded successfully!`)
      }
      setUploadProgress(prev => ({ ...prev, [fileId]: Math.min(progress, 100) }))
    }, 200)
  }, [])

  // Handle file selection
  const handleFiles = useCallback((selectedFiles) => {
    const fileArray = Array.from(selectedFiles)
    
    // Validate files
    const maxSize = 100 * 1024 * 1024 // 100MB
    const validFiles = fileArray.filter(file => {
      if (file.size > maxSize) {
        toast.error(`${file.name} is too large. Maximum size is 100MB.`)
        return false
      }
      return true
    })

    if (validFiles.length === 0) return

    // Upload files
    validFiles.forEach(simulateUpload)
    toast.info(`Starting upload of ${validFiles.length} file(s)`)
  }, [simulateUpload])

  // Drag and drop handlers
  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    setDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e) => {
    e.preventDefault()
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDragOver(false)
    }
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setDragOver(false)
    const droppedFiles = e.dataTransfer.files
    handleFiles(droppedFiles)
  }, [handleFiles])

  // File operations
  const handleRename = (fileId, newName) => {
    if (!newName.trim()) return
    setFiles(prev => prev.map(f => 
      f.id === fileId ? { ...f, name: newName.trim() } : f
    ))
    toast.success('File renamed successfully!')
  }

  const handleDelete = (fileId) => {
    const file = files.find(f => f.id === fileId)
    setFiles(prev => prev.filter(f => f.id !== fileId))
    toast.success(`${file.name} deleted successfully!`)
  }

  const handleDownload = (file) => {
    // Simulate download
    toast.info(`Downloading ${file.name}...`)
  }

  // Filter and sort files
  const filteredAndSortedFiles = files
    .filter(file => {
      if (filterType === 'all') return true
      return file.type === filterType
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'size':
          return b.size - a.size
        case 'date':
          return new Date(b.uploadDate) - new Date(a.uploadDate)
        case 'name':
        default:
          return a.name.localeCompare(b.name)
      }
    })

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Upload Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`file-upload-zone ${dragOver ? 'drag-over' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        
        <div className="text-center space-y-4">
          <motion.div
            animate={{ y: dragOver ? -5 : 0 }}
            className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-upload"
          >
            <ApperIcon 
              name={dragOver ? "Download" : "Upload"} 
              className="w-8 h-8 sm:w-10 sm:h-10 text-white" 
            />
          </motion.div>
          
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-surface-800 mb-2">
              {dragOver ? 'Drop files here' : 'Upload your files'}
            </h2>
            <p className="text-surface-600 text-sm sm:text-base mb-4">
              Drag and drop files here, or click to select files
            </p>
            <div className="flex flex-wrap justify-center gap-2 text-xs text-surface-500">
              <span className="px-2 py-1 bg-surface-100 rounded">PDF</span>
              <span className="px-2 py-1 bg-surface-100 rounded">Images</span>
              <span className="px-2 py-1 bg-surface-100 rounded">Documents</span>
              <span className="px-2 py-1 bg-surface-100 rounded">Videos</span>
              <span className="px-2 py-1 bg-surface-100 rounded">Max 100MB</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* File Management Controls */}
      {files.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between p-4 sm:p-6 neu-card"
        >
          <div className="flex flex-wrap gap-2 sm:gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 bg-white border border-surface-300 rounded-lg text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            >
              <option value="name">Sort by Name</option>
              <option value="size">Sort by Size</option>
              <option value="date">Sort by Date</option>
            </select>
            
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 bg-white border border-surface-300 rounded-lg text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            >
              <option value="all">All Files</option>
              <option value="img">Images</option>
              <option value="pdf">PDFs</option>
              <option value="doc">Documents</option>
              <option value="vid">Videos</option>
              <option value="audio">Audio</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-primary text-white' 
                  : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
              }`}
            >
              <ApperIcon name="Grid3X3" className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' 
                  ? 'bg-primary text-white' 
                  : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
              }`}
            >
              <ApperIcon name="List" className="w-4 h-4" />
            </button>
            
            <div className="ml-4 text-sm text-surface-600">
              {filteredAndSortedFiles.length} file(s)
            </div>
          </div>
        </motion.div>
      )}

      {/* Files Display */}
      <AnimatePresence>
        {filteredAndSortedFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6'
                : 'space-y-3'
            }
          >
            {filteredAndSortedFiles.map((file, index) => (
              <FileCard
                key={file.id}
                file={file}
                index={index}
                viewMode={viewMode}
                uploadProgress={uploadProgress[file.id]}
                onRename={handleRename}
                onDelete={handleDelete}
                onDownload={handleDownload}
                getFileIcon={getFileIcon}
                formatFileSize={formatFileSize}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty State */}
      {files.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 sm:py-16"
        >
          <div className="w-24 h-24 mx-auto mb-6 bg-surface-100 rounded-2xl flex items-center justify-center animate-float">
            <ApperIcon name="FolderOpen" className="w-12 h-12 text-surface-400" />
          </div>
          <h3 className="text-lg font-semibold text-surface-800 mb-2">No files uploaded yet</h3>
          <p className="text-surface-600 max-w-md mx-auto">
            Start by uploading your first file using the upload zone above. 
            You can drag and drop multiple files at once.
          </p>
        </motion.div>
      )}
    </div>
  )
}

// File Card Component
function FileCard({ file, index, viewMode, uploadProgress, onRename, onDelete, onDownload, getFileIcon, formatFileSize }) {
  const [isRenaming, setIsRenaming] = useState(false)
  const [newName, setNewName] = useState(file.name)
  const [showMenu, setShowMenu] = useState(false)

  const handleRenameSubmit = (e) => {
    e.preventDefault()
    if (newName !== file.name) {
      onRename(file.id, newName)
    }
    setIsRenaming(false)
  }

  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
        className="file-card flex items-center gap-4 relative"
      >
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center file-type-${file.type}`}>
          <ApperIcon name={getFileIcon(file.type)} className="w-5 h-5" />
        </div>
        
        <div className="flex-1 min-w-0">
          {isRenaming ? (
            <form onSubmit={handleRenameSubmit} className="flex-1">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full px-2 py-1 border border-primary rounded focus:outline-none focus:ring-1 focus:ring-primary"
                autoFocus
                onBlur={() => setIsRenaming(false)}
              />
            </form>
          ) : (
            <h4 className="font-medium text-surface-800 truncate">{file.name}</h4>
          )}
          <div className="flex items-center gap-4 text-sm text-surface-500">
            <span>{formatFileSize(file.size)}</span>
            <span>{format(file.uploadDate, 'MMM dd, yyyy')}</span>
          </div>
        </div>

        {file.uploading && (
          <div className="w-24">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${uploadProgress || 0}%` }}
              />
            </div>
            <div className="text-xs text-surface-500 mt-1">{Math.round(uploadProgress || 0)}%</div>
          </div>
        )}

        {!file.uploading && (
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 hover:bg-surface-100 rounded-lg transition-colors"
            >
              <ApperIcon name="MoreVertical" className="w-4 h-4 text-surface-500" />
            </button>
            
            {showMenu && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-surface-200 rounded-lg shadow-soft py-1 z-10 min-w-[120px]">
                <button
                  onClick={() => {
                    onDownload(file)
                    setShowMenu(false)
                  }}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-surface-50 flex items-center gap-2"
                >
                  <ApperIcon name="Download" className="w-4 h-4" />
                  Download
                </button>
                <button
                  onClick={() => {
                    setIsRenaming(true)
                    setShowMenu(false)
                  }}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-surface-50 flex items-center gap-2"
                >
                  <ApperIcon name="Edit" className="w-4 h-4" />
                  Rename
                </button>
                <button
                  onClick={() => {
                    onDelete(file.id)
                    setShowMenu(false)
                  }}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-surface-50 text-red-600 flex items-center gap-2"
                >
                  <ApperIcon name="Trash2" className="w-4 h-4" />
                  Delete
                </button>
              </div>
            )}
          </div>
        )}
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="file-card relative group"
    >
      <div className="flex items-center justify-between mb-3">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center file-type-${file.type}`}>
          <ApperIcon name={getFileIcon(file.type)} className="w-6 h-6" />
        </div>
        
        {!file.uploading && (
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-surface-100 rounded"
            >
              <ApperIcon name="MoreVertical" className="w-4 h-4 text-surface-500" />
            </button>
            
            {showMenu && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-surface-200 rounded-lg shadow-soft py-1 z-10 min-w-[120px]">
                <button
                  onClick={() => {
                    onDownload(file)
                    setShowMenu(false)
                  }}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-surface-50 flex items-center gap-2"
                >
                  <ApperIcon name="Download" className="w-4 h-4" />
                  Download
                </button>
                <button
                  onClick={() => {
                    setIsRenaming(true)
                    setShowMenu(false)
                  }}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-surface-50 flex items-center gap-2"
                >
                  <ApperIcon name="Edit" className="w-4 h-4" />
                  Rename
                </button>
                <button
                  onClick={() => {
                    onDelete(file.id)
                    setShowMenu(false)
                  }}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-surface-50 text-red-600 flex items-center gap-2"
                >
                  <ApperIcon name="Trash2" className="w-4 h-4" />
                  Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        {isRenaming ? (
          <form onSubmit={handleRenameSubmit}>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full px-2 py-1 border border-primary rounded focus:outline-none focus:ring-1 focus:ring-primary text-sm"
              autoFocus
              onBlur={() => setIsRenaming(false)}
            />
          </form>
        ) : (
          <h4 className="font-medium text-surface-800 text-sm leading-tight line-clamp-2">{file.name}</h4>
        )}
        
        <div className="text-xs text-surface-500 space-y-1">
          <div>{formatFileSize(file.size)}</div>
          <div>{format(file.uploadDate, 'MMM dd, yyyy')}</div>
        </div>
        
        {file.uploading && (
          <div className="space-y-1">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${uploadProgress || 0}%` }}
              />
            </div>
            <div className="text-xs text-surface-500">{Math.round(uploadProgress || 0)}%</div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default MainFeature