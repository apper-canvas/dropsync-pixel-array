import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import ApperIcon from '../components/ApperIcon'
import { format, addDays } from 'date-fns'

function ArchiveManagement() {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState('rules')
  const [showRuleModal, setShowRuleModal] = useState(false)
  const [editingRule, setEditingRule] = useState(null)
  const [archivalRules, setArchivalRules] = useState([
    {
      id: 1,
      name: 'Old Documents Archive',
      description: 'Archive documents older than 1 year',
      criteria: {
        type: 'age',
        value: 365,
        unit: 'days'
      },
      fileTypes: ['pdf', 'doc', 'docx'],
      enabled: true,
      lastRun: new Date('2024-01-15'),
      filesArchived: 145,
      schedule: 'weekly'
    },
    {
      id: 2,
      name: 'Large Files Cleanup',
      description: 'Archive files larger than 100MB',
      criteria: {
        type: 'size',
        value: 100,
        unit: 'MB'
      },
      fileTypes: ['all'],
      enabled: true,
      lastRun: new Date('2024-01-10'),
      filesArchived: 23,
      schedule: 'monthly'
    },
    {
      id: 3,
      name: 'Unused Media Files',
      description: 'Archive media files not accessed in 6 months',
      criteria: {
        type: 'access',
        value: 180,
        unit: 'days'
      },
      fileTypes: ['jpg', 'png', 'mp4', 'mov'],
      enabled: false,
      lastRun: null,
      filesArchived: 0,
      schedule: 'monthly'
    }
  ])

  const [ruleForm, setRuleForm] = useState({
    name: '',
    description: '',
    criteria: {
      type: 'age',
      value: 30,
      unit: 'days'
    },
    fileTypes: ['all'],
    schedule: 'weekly',
    enabled: true
  })

  const ruleTemplates = [
    {
      name: 'Old Documents',
      description: 'Archive documents older than 1 year',
      criteria: { type: 'age', value: 365, unit: 'days' },
      fileTypes: ['pdf', 'doc', 'docx'],
      schedule: 'monthly'
    },
    {
      name: 'Large Files',
      description: 'Archive files larger than 500MB',
      criteria: { type: 'size', value: 500, unit: 'MB' },
      fileTypes: ['all'],
      schedule: 'weekly'
    },
    {
      name: 'Temporary Files',
      description: 'Archive temp files older than 7 days',
      criteria: { type: 'age', value: 7, unit: 'days' },
      fileTypes: ['tmp', 'temp', 'cache'],
      schedule: 'daily'
    },
    {
      name: 'Unused Media',
      description: 'Archive media files not accessed in 3 months',
      criteria: { type: 'access', value: 90, unit: 'days' },
      fileTypes: ['jpg', 'png', 'gif', 'mp4', 'avi'],
      schedule: 'monthly'
    }
  ]

  const handleCreateRule = () => {
    if (!ruleForm.name.trim()) {
      toast.error('Rule name is required')
      return
    }

    const newRule = {
      id: Date.now(),
      ...ruleForm,
      lastRun: null,
      filesArchived: 0
    }

    if (editingRule) {
      setArchivalRules(prev => prev.map(rule => 
        rule.id === editingRule.id ? { ...newRule, id: editingRule.id } : rule
      ))
      toast.success('Archival rule updated successfully!')
    } else {
      setArchivalRules(prev => [...prev, newRule])
      toast.success('Archival rule created successfully!')
    }

    setShowRuleModal(false)
    setEditingRule(null)
    setRuleForm({
      name: '',
      description: '',
      criteria: { type: 'age', value: 30, unit: 'days' },
      fileTypes: ['all'],
      schedule: 'weekly',
      enabled: true
    })
  }

  const handleEditRule = (rule) => {
    setEditingRule(rule)
    setRuleForm(rule)
    setShowRuleModal(true)
  }

  const handleDeleteRule = (ruleId) => {
    if (window.confirm('Are you sure you want to delete this archival rule?')) {
      setArchivalRules(prev => prev.filter(rule => rule.id !== ruleId))
      toast.success('Archival rule deleted successfully!')
    }
  }

  const handleToggleRule = (ruleId) => {
    setArchivalRules(prev => prev.map(rule => 
      rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule
    ))
    toast.success('Rule status updated!')
  }

  const handleRunRule = (ruleId) => {
    const rule = archivalRules.find(r => r.id === ruleId)
    const simulatedFiles = Math.floor(Math.random() * 20) + 1
    
    setArchivalRules(prev => prev.map(r => 
      r.id === ruleId 
        ? { 
            ...r, 
            lastRun: new Date(), 
            filesArchived: r.filesArchived + simulatedFiles 
          } 
        : r
    ))
    
    toast.success(`Archival rule executed! ${simulatedFiles} files archived.`)
  }

  const handleApplyTemplate = (template) => {
    setRuleForm({
      name: template.name,
      description: template.description,
      criteria: template.criteria,
      fileTypes: template.fileTypes,
      schedule: template.schedule,
      enabled: true
    })
  }

  const formatCriteria = (criteria) => {
    switch (criteria.type) {
      case 'age':
        return `Older than ${criteria.value} ${criteria.unit}`
      case 'size':
        return `Larger than ${criteria.value} ${criteria.unit}`
      case 'access':
        return `Not accessed for ${criteria.value} ${criteria.unit}`
      default:
        return 'Unknown criteria'
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
className="header-gradient shadow-professional text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-between">
          <nav className="hidden md:flex items-center space-x-2 bg-gradient-to-r from-surface-100 to-surface-50 rounded-2xl p-2 shadow-depth-1">
            <Link
              to="/"
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                location.pathname === '/'
                  ? 'bg-white text-primary shadow-depth-2 border border-primary/20'
                  : 'text-surface-600 hover:text-surface-800 hover:bg-white/70 hover:shadow-depth-1'
              }`}
            >
              <span className="flex items-center space-x-2">
                <ApperIcon name="Upload" className="w-4 h-4" />
                <span>Files</span>
              </span>
            </Link>
            <Link
              to="/dashboard"
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                location.pathname === '/dashboard'
                  ? 'bg-white text-primary shadow-depth-2 border border-primary/20'
                  : 'text-surface-600 hover:text-surface-800 hover:bg-white/70 hover:shadow-depth-1'
              }`}
            >
              <span className="flex items-center space-x-2">
                <ApperIcon name="BarChart3" className="w-4 h-4" />
                <span>Dashboard</span>
              </span>
            </Link>
            <Link
              to="/archive"
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                location.pathname === '/archive'
                  ? 'bg-white text-primary shadow-depth-2 border border-primary/20'
                  : 'text-surface-600 hover:text-surface-800 hover:bg-white/70 hover:shadow-depth-1'
              }`}
            >
              <span className="flex items-center space-x-2">
                <ApperIcon name="Archive" className="w-4 h-4" />
                <span>Archive</span>
              </span>
            </Link>
            <Link
              to="/policies"
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                location.pathname === '/policies'
                  ? 'bg-white text-primary shadow-depth-2 border border-primary/20'
                  : 'text-surface-600 hover:text-surface-800 hover:bg-white/70 hover:shadow-depth-1'
              }`}
            >
              <span className="flex items-center space-x-2">
                <ApperIcon name="Shield" className="w-4 h-4" />
                <span>Policies</span>
              </span>
            </Link>
          </nav>
          
          <button
            onClick={() => setShowRuleModal(true)}
            className="btn-primary flex items-center space-x-2 shadow-depth-2 hover:shadow-depth-3"
          >
            <ApperIcon name="Plus" className="w-4 h-4" />
            <span className="hidden sm:inline">New Rule</span>
</button>
        </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12"
        >
          <motion.div
            whileHover={{ y: -5 }}
            className="stat-card group"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-surface-600 uppercase tracking-wide">Active Rules</p>
                <p className="text-3xl font-bold text-surface-900 mt-2">
                  {archivalRules.filter(rule => rule.enabled).length}
                </p>
                <p className="text-xs text-surface-500 mt-1">Currently running</p>
              </div>
              <div className="icon-badge icon-badge-primary group-hover:scale-110 transition-transform duration-300">
                <ApperIcon name="Settings" className="w-6 h-6" />
              </div>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="stat-card group"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-surface-600 uppercase tracking-wide">Files Archived</p>
                <p className="text-3xl font-bold text-surface-900 mt-2">
                  {archivalRules.reduce((sum, rule) => sum + rule.filesArchived, 0)}
                </p>
                <p className="text-xs text-surface-500 mt-1">Total processed</p>
              </div>
              <div className="icon-badge icon-badge-secondary group-hover:scale-110 transition-transform duration-300">
                <ApperIcon name="Archive" className="w-6 h-6" />
              </div>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="stat-card group"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-surface-600 uppercase tracking-wide">Space Saved</p>
                <p className="text-3xl font-bold text-surface-900 mt-2">2.4 GB</p>
                <p className="text-xs text-surface-500 mt-1">Storage optimized</p>
              </div>
              <div className="icon-badge icon-badge-accent group-hover:scale-110 transition-transform duration-300">
                <ApperIcon name="HardDrive" className="w-6 h-6" />
              </div>
            </div>
</div>
          </motion.div>
        </motion.div>

        {/* Rules List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-surface-900">Archival Rules</h2>
              <p className="text-surface-600 mt-1">Manage automated file archival policies</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-primary-50 to-primary-100 px-4 py-2 rounded-xl border border-primary-200">
                <span className="text-sm font-semibold text-primary-700">
                  {archivalRules.length} rule{archivalRules.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {archivalRules.map((rule, index) => (
              <motion.div
                key={rule.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-depth-1 hover:shadow-depth-2 transition-all duration-300 border border-surface-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
<div>
<div className="flex items-center space-x-4 mb-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center shadow-depth-1">
                        <ApperIcon name="Archive" className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="font-bold text-surface-900 text-lg">{rule.name}</h3>
                      <span className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 ${
                        rule.enabled
                          ? 'status-active'
                          : 'status-inactive'
                      }`}>
                        {rule.enabled ? 'Active' : 'Inactive'}
                      </span>
                      <span className="px-3 py-1.5 text-xs font-semibold bg-gradient-to-r from-primary-100 to-primary-200 text-primary-700 rounded-full border border-primary-300 capitalize">
                        {rule.schedule}
                      </span>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-xl border border-blue-200">
                        <div className="flex items-center space-x-2">
                          <ApperIcon name="Filter" className="w-4 h-4 text-blue-600" />
                          <span className="text-xs font-semibold text-blue-700">Criteria</span>
                        </div>
                        <p className="text-sm font-medium text-blue-800 mt-1">{formatCriteria(rule.criteria)}</p>
                      </div>
                      
                      <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 rounded-xl border border-green-200">
                        <div className="flex items-center space-x-2">
                          <ApperIcon name="FileType" className="w-4 h-4 text-green-600" />
                          <span className="text-xs font-semibold text-green-700">File Types</span>
                        </div>
                        <p className="text-sm font-medium text-green-800 mt-1">
                          {rule.fileTypes.includes('all') 
                            ? 'All file types' 
                            : `${rule.fileTypes.length} type(s)`}
                        </p>
                      </div>
                      
                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-3 rounded-xl border border-purple-200">
                        <div className="flex items-center space-x-2">
                          <ApperIcon name="Archive" className="w-4 h-4 text-purple-600" />
                          <span className="text-xs font-semibold text-purple-700">Archived</span>
                        </div>
                        <p className="text-sm font-medium text-purple-800 mt-1">{rule.filesArchived} files</p>
                      </div>
                      
                      <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-3 rounded-xl border border-orange-200">
                        <div className="flex items-center space-x-2">
                          <ApperIcon name="Clock" className="w-4 h-4 text-orange-600" />
                          <span className="text-xs font-semibold text-orange-700">Last Run</span>
                        </div>
                        <p className="text-sm font-medium text-orange-800 mt-1">
                          {rule.lastRun ? format(rule.lastRun, 'MMM dd, yyyy') : 'Never'}
                        </p>
                      </div>
                    </div>
                  </div>
                  
<div className="flex items-center space-x-4">
                    <div className="flex flex-col space-y-2">
                      <button
                        onClick={() => handleToggleRule(rule.id)}
                        className={`p-3 rounded-xl transition-all duration-200 ${
                          rule.enabled
                            ? 'bg-gradient-to-r from-success-500 to-success-600 text-white shadow-depth-2 hover:shadow-depth-3'
                            : 'bg-gradient-to-r from-surface-200 to-surface-300 text-surface-600 hover:from-surface-300 hover:to-surface-400'
                        }`}
                        title={rule.enabled ? 'Disable rule' : 'Enable rule'}
                      >
                        <ApperIcon name={rule.enabled ? "Pause" : "Play"} className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleRunRule(rule.id)}
                        className="p-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-depth-2 hover:shadow-depth-3 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                        title="Run now"
                        disabled={!rule.enabled}
                      >
                        <ApperIcon name="PlayCircle" className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <button
                        onClick={() => handleEditRule(rule)}
                        className="p-3 rounded-xl bg-gradient-to-r from-secondary-500 to-secondary-600 text-white shadow-depth-2 hover:shadow-depth-3 transition-all duration-200"
                        title="Edit rule"
                      >
                        <ApperIcon name="Edit" className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteRule(rule.id)}
                        className="p-3 rounded-xl bg-gradient-to-r from-error-500 to-error-600 text-white shadow-depth-2 hover:shadow-depth-3 transition-all duration-200"
                        title="Delete rule"
                      >
                        <ApperIcon name="Trash2" className="w-4 h-4" />
                      </button>
                    </div>
</div>
</div>
                </div>
              </motion.div>
            ))}
          </div>

          {archivalRules.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-6 bg-surface-100 rounded-2xl flex items-center justify-center">
                <ApperIcon name="Archive" className="w-12 h-12 text-surface-400" />
              </div>
              <h3 className="text-lg font-semibold text-surface-800 mb-2">No archival rules yet</h3>
              <p className="text-surface-600 max-w-md mx-auto mb-6">
                Create your first archival rule to automatically manage your files based on age, size, or access patterns.
              </p>
              <button
                onClick={() => setShowRuleModal(true)}
                className="btn-primary"
              >
                Create First Rule
              </button>
            </div>
          )}
        </motion.div>
      </main>

      {/* Create/Edit Rule Modal */}
      <AnimatePresence>
        {showRuleModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => {
              setShowRuleModal(false)
              setEditingRule(null)
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-surface-200">
                <h2 className="text-xl font-semibold text-surface-900">
                  {editingRule ? 'Edit Archival Rule' : 'Create New Archival Rule'}
                </h2>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Rule Templates */}
                {!editingRule && (
                  <div>
                    <h3 className="text-sm font-medium text-surface-900 mb-3">Quick Templates</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {ruleTemplates.map((template, index) => (
                        <button
                          key={index}
                          onClick={() => handleApplyTemplate(template)}
                          className="p-3 text-left border border-surface-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
                        >
                          <h4 className="font-medium text-surface-900 text-sm">{template.name}</h4>
                          <p className="text-xs text-surface-600 mt-1">{template.description}</p>
                        </button>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-surface-200">
                      <h3 className="text-sm font-medium text-surface-900 mb-3">Custom Rule</h3>
                    </div>
                  </div>
                )}

                {/* Basic Information */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-surface-900 mb-2">
                      Rule Name *
                    </label>
                    <input
                      type="text"
                      value={ruleForm.name}
                      onChange={(e) => setRuleForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                      placeholder="Enter rule name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-900 mb-2">
                      Description
                    </label>
                    <textarea
                      value={ruleForm.description}
                      onChange={(e) => setRuleForm(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                      rows="2"
                      placeholder="Describe what this rule does"
                    />
                  </div>
                </div>

                {/* Criteria */}
                <div>
                  <label className="block text-sm font-medium text-surface-900 mb-3">
                    Archival Criteria
                  </label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <select
                        value={ruleForm.criteria.type}
                        onChange={(e) => setRuleForm(prev => ({
                          ...prev,
                          criteria: { ...prev.criteria, type: e.target.value }
                        }))}
                        className="px-3 py-2 border border-surface-300 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                      >
                        <option value="age">File Age</option>
                        <option value="size">File Size</option>
                        <option value="access">Last Access</option>
                      </select>
                      
                      <input
                        type="number"
                        value={ruleForm.criteria.value}
                        onChange={(e) => setRuleForm(prev => ({
                          ...prev,
                          criteria: { ...prev.criteria, value: parseInt(e.target.value) || 0 }
                        }))}
                        className="w-24 px-3 py-2 border border-surface-300 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                        min="1"
                      />
                      
                      <select
                        value={ruleForm.criteria.unit}
                        onChange={(e) => setRuleForm(prev => ({
                          ...prev,
                          criteria: { ...prev.criteria, unit: e.target.value }
                        }))}
                        className="px-3 py-2 border border-surface-300 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                      >
                        {ruleForm.criteria.type === 'size' ? (
                          <>
                            <option value="MB">MB</option>
                            <option value="GB">GB</option>
                          </>
                        ) : (
                          <>
                            <option value="days">Days</option>
                            <option value="weeks">Weeks</option>
                            <option value="months">Months</option>
                            <option value="years">Years</option>
                          </>
                        )}
                      </select>
                    </div>
                    
                    <p className="text-sm text-surface-600">
                      Archive files {formatCriteria(ruleForm.criteria).toLowerCase()}
                    </p>
                  </div>
                </div>

                {/* File Types */}
                <div>
                  <label className="block text-sm font-medium text-surface-900 mb-3">
                    File Types
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['all', 'pdf', 'doc', 'docx', 'jpg', 'png', 'mp4', 'zip', 'tmp'].map((type) => (
                      <button
                        key={type}
                        onClick={() => {
                          if (type === 'all') {
                            setRuleForm(prev => ({ ...prev, fileTypes: ['all'] }))
                          } else {
                            setRuleForm(prev => {
                              const types = prev.fileTypes.includes('all') 
                                ? [type]
                                : prev.fileTypes.includes(type)
                                  ? prev.fileTypes.filter(t => t !== type)
                                  : [...prev.fileTypes, type]
                              return { ...prev, fileTypes: types.length === 0 ? ['all'] : types }
                            })
                          }
                        }}
                        className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                          ruleForm.fileTypes.includes(type)
                            ? 'bg-primary text-white border-primary'
                            : 'bg-surface-50 text-surface-600 border-surface-300 hover:border-primary'
                        }`}
                      >
                        {type === 'all' ? 'All Types' : type.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Schedule */}
                <div>
                  <label className="block text-sm font-medium text-surface-900 mb-2">
                    Schedule
                  </label>
                  <select
                    value={ruleForm.schedule}
                    onChange={(e) => setRuleForm(prev => ({ ...prev, schedule: e.target.value }))}
                    className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  >
                    <option value="manual">Manual only</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>

                {/* Enable/Disable */}
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="enabled"
                    checked={ruleForm.enabled}
                    onChange={(e) => setRuleForm(prev => ({ ...prev, enabled: e.target.checked }))}
                    className="w-4 h-4 text-primary focus:ring-primary border-surface-300 rounded"
                  />
                  <label htmlFor="enabled" className="text-sm font-medium text-surface-900">
                    Enable this rule immediately
                  </label>
                </div>
              </div>

              <div className="p-6 border-t border-surface-200 flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowRuleModal(false)
                    setEditingRule(null)
                  }}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateRule}
                  className="btn-primary"
                >
                  {editingRule ? 'Update Rule' : 'Create Rule'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ArchiveManagement