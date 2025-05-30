import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import Header from '../components/Header'
import { 
  Shield, 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  Globe,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Settings,
  Eye,
  Filter
} from 'lucide-react'

function OriginPolicies() {
  const [darkMode, setDarkMode] = useState(false)
const [policies, setPolicies] = useState([
    {
      id: 1,
      origin: 'https://example.com',
      patternType: 'url',
      type: 'allow',
      description: 'Production website access',
      enabled: true,
      createdAt: new Date('2024-01-15'),
      lastUsed: new Date('2024-01-20')
    },
    {
      id: 2,
      origin: 'https://test.malicious-site.com',
      patternType: 'url',
      type: 'deny',
      description: 'Blocked malicious domain',
      enabled: true,
      createdAt: new Date('2024-01-10'),
      lastUsed: new Date('2024-01-18')
    },
    {
      id: 3,
      origin: '.*\\.staging\\.example\\.com$',
      patternType: 'regex',
      type: 'allow',
      description: 'All staging subdomains',
      enabled: false,
      createdAt: new Date('2024-01-12'),
      lastUsed: new Date('2024-01-19')
    },
    {
      id: 4,
      origin: 'https://(dev|test)\\..*',
      patternType: 'regex',
      type: 'allow',
      description: 'Development and test environments',
      enabled: true,
      createdAt: new Date('2024-01-14'),
      lastUsed: new Date('2024-01-21')
    }
  ])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedPolicy, setSelectedPolicy] = useState(null)
const [formData, setFormData] = useState({
    origin: '',
    patternType: 'url',
    type: 'allow',
    description: '',
    enabled: true
  })
  const [errors, setErrors] = useState({})

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

const validateForm = () => {
    const newErrors = {}
    
    if (!formData.origin.trim()) {
      newErrors.origin = formData.patternType === 'url' ? 'Origin URL is required' : 'Origin pattern is required'
    } else if (formData.patternType === 'url' && !isValidURL(formData.origin)) {
      newErrors.origin = 'Please enter a valid URL'
    } else if (formData.patternType === 'regex' && !isValidRegex(formData.origin)) {
      newErrors.origin = 'Please enter a valid regular expression pattern'
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const isValidURL = (string) => {
    try {
      new URL(string)
      return true
    } catch (_) {
      return false
    }
  }

  const isValidRegex = (pattern) => {
    try {
      new RegExp(pattern)
      return true
    } catch (_) {
      return false
    }
  }

const resetForm = () => {
    setFormData({
      origin: '',
      patternType: 'url',
      type: 'allow',
      description: '',
      enabled: true
    })
    setErrors({})
  }

  const handleAdd = () => {
    setShowAddModal(true)
    resetForm()
  }

const handleEdit = (policy) => {
    setSelectedPolicy(policy)
    setFormData({
      origin: policy.origin,
      patternType: policy.patternType || 'url',
      type: policy.type,
      description: policy.description,
      enabled: policy.enabled
    })
    setShowEditModal(true)
  }

  const handleDelete = (policy) => {
    setSelectedPolicy(policy)
    setShowDeleteModal(true)
  }

  const handleToggleStatus = (id) => {
    setPolicies(policies.map(policy => 
      policy.id === id ? { ...policy, enabled: !policy.enabled } : policy
    ))
    const policy = policies.find(p => p.id === id)
    toast.success(`Policy ${policy.enabled ? 'disabled' : 'enabled'} successfully`)
  }

  const handleSubmitAdd = (e) => {
    e.preventDefault()
    if (!validateForm()) return

    const newPolicy = {
      id: Date.now(),
      ...formData,
      createdAt: new Date(),
      lastUsed: new Date()
    }

    setPolicies([...policies, newPolicy])
    setShowAddModal(false)
    resetForm()
    toast.success('Origin policy added successfully')
  }

  const handleSubmitEdit = (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setPolicies(policies.map(policy =>
      policy.id === selectedPolicy.id ? { ...policy, ...formData } : policy
    ))
    setShowEditModal(false)
    resetForm()
    setSelectedPolicy(null)
    toast.success('Origin policy updated successfully')
  }

  const handleConfirmDelete = () => {
    setPolicies(policies.filter(policy => policy.id !== selectedPolicy.id))
    setShowDeleteModal(false)
    setSelectedPolicy(null)
    toast.success('Origin policy deleted successfully')
  }

  const filteredPolicies = policies.filter(policy => {
    const matchesSearch = policy.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         policy.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === 'all' || policy.type === filterType
    return matchesSearch && matchesFilter
  })

  const stats = {
    total: policies.length,
    allow: policies.filter(p => p.type === 'allow').length,
    deny: policies.filter(p => p.type === 'deny').length,
    active: policies.filter(p => p.enabled).length
  }

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 via-white to-surface-100">
      <Header 
        title="Origin Policies"
        subtitle="Access Control Management"
        icon="Shield"
        showDarkMode={true}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
        showStats={true}
        stats={{
          policies: `${stats.active} Active Policies`,
          protection: `${stats.deny} Blocked Origins`
        }}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Stats Cards */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-surface-600">Total Policies</p>
                <p className="text-2xl font-bold text-surface-900">{stats.total}</p>
              </div>
              <div className="icon-badge icon-badge-primary">
                <Shield className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-surface-600">Allow Rules</p>
                <p className="text-2xl font-bold text-success-600">{stats.allow}</p>
              </div>
              <div className="icon-badge bg-gradient-to-br from-success-500 to-success-600 text-white">
                <CheckCircle className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-surface-600">Deny Rules</p>
                <p className="text-2xl font-bold text-error-600">{stats.deny}</p>
              </div>
              <div className="icon-badge bg-gradient-to-br from-error-500 to-error-600 text-white">
                <XCircle className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-surface-600">Active</p>
                <p className="text-2xl font-bold text-primary-600">{stats.active}</p>
              </div>
              <div className="icon-badge bg-gradient-to-br from-accent-500 to-accent-600 text-white">
                <Settings className="w-6 h-6" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="professional-card p-6 mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-surface-400" />
                <input
                  type="text"
                  placeholder="Search policies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent w-full sm:w-64"
                />
              </div>
              
              <div className="relative">
                <Filter className="absolute left-3 top-3 h-4 w-4 text-surface-400" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="pl-10 pr-8 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
                >
                  <option value="all">All Types</option>
                  <option value="allow">Allow Only</option>
                  <option value="deny">Deny Only</option>
                </select>
              </div>
            </div>
            
            <button
              onClick={handleAdd}
              className="btn-primary flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Policy
            </button>
          </div>
        </motion.div>

        {/* Policies List */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="professional-card overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-surface-200 bg-surface-50">
            <h3 className="text-lg font-semibold text-surface-900">Origin Policies</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-surface-50">
                <tr>
<th className="px-6 py-3 text-left text-xs font-medium text-surface-500 uppercase tracking-wider">Origin / Pattern</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-surface-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-surface-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-surface-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-surface-500 uppercase tracking-wider">Last Used</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-surface-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-surface-200">
                {filteredPolicies.map((policy) => (
                  <tr key={policy.id} className="hover:bg-surface-50 transition-colors">
<td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Globe className="w-4 h-4 text-surface-400 mr-2" />
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-surface-900">{policy.origin}</span>
                          <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium mt-1 ${
                            (policy.patternType || 'url') === 'regex' 
                              ? 'bg-purple-100 text-purple-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {(policy.patternType || 'url') === 'regex' ? 'Regex Pattern' : 'Exact URL'}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        policy.type === 'allow' 
                          ? 'bg-success-100 text-success-800' 
                          : 'bg-error-100 text-error-800'
                      }`}>
                        {policy.type === 'allow' ? (
                          <CheckCircle className="w-3 h-3 mr-1" />
                        ) : (
                          <XCircle className="w-3 h-3 mr-1" />
                        )}
                        {policy.type.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={policy.enabled}
                          onChange={() => handleToggleStatus(policy.id)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-surface-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-surface-600">{policy.description}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-500">
                      {formatDate(policy.lastUsed)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(policy)}
                          className="text-primary-600 hover:text-primary-900 transition-colors p-1"
                          title="Edit Policy"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(policy)}
                          className="text-error-600 hover:text-error-900 transition-colors p-1"
                          title="Delete Policy"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredPolicies.length === 0 && (
              <div className="text-center py-12">
                <AlertTriangle className="w-12 h-12 text-surface-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-surface-900 mb-2">No policies found</h3>
                <p className="text-surface-600">
                  {searchTerm || filterType !== 'all' 
                    ? 'Try adjusting your search or filter criteria.' 
                    : 'Get started by adding your first origin policy.'}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </main>

      {/* Add Policy Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-surface-500 bg-opacity-75 transition-opacity" onClick={() => setShowAddModal(false)}></div>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSubmitAdd}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 sm:mx-0 sm:h-10 sm:w-10">
                      <Plus className="h-6 w-6 text-primary-600" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left flex-1">
                      <h3 className="text-lg leading-6 font-medium text-surface-900 mb-4">
                        Add Origin Policy
                      </h3>
                      
<div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-surface-700 mb-1">
                            Pattern Type
                          </label>
                          <select
                            value={formData.patternType}
                            onChange={(e) => setFormData({...formData, patternType: e.target.value})}
                            className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          >
                            <option value="url">Exact URL</option>
                            <option value="regex">Regular Expression</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-surface-700 mb-1">
                            {formData.patternType === 'url' ? 'Origin URL' : 'Origin Pattern'}
                          </label>
                          <input
                            type={formData.patternType === 'url' ? 'url' : 'text'}
                            value={formData.origin}
                            onChange={(e) => setFormData({...formData, origin: e.target.value})}
                            placeholder={formData.patternType === 'url' 
                              ? 'https://example.com' 
                              : '.*\\.example\\.com$ or https://(staging|dev)\\..*'
                            }
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                              errors.origin ? 'border-error-300' : 'border-surface-300'
                            }`}
                          />
                          {formData.patternType === 'regex' && (
                            <p className="text-xs text-surface-500 mt-1">
                              Use regex patterns like: <code className="bg-surface-100 px-1 rounded">.*\.example\.com$</code> for subdomains
                            </p>
                          )}
                          {errors.origin && <p className="text-error-600 text-sm mt-1">{errors.origin}</p>}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-surface-700 mb-1">
                            Policy Type
                          </label>
                          <select
                            value={formData.type}
                            onChange={(e) => setFormData({...formData, type: e.target.value})}
                            className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          >
                            <option value="allow">Allow</option>
                            <option value="deny">Deny</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-surface-700 mb-1">
                            Description
                          </label>
                          <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                            placeholder="Brief description of this policy..."
                            rows="3"
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                              errors.description ? 'border-error-300' : 'border-surface-300'
                            }`}
                          />
                          {errors.description && <p className="text-error-600 text-sm mt-1">{errors.description}</p>}
                        </div>
                        
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="enabled"
                            checked={formData.enabled}
                            onChange={(e) => setFormData({...formData, enabled: e.target.checked})}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-surface-300 rounded"
                          />
                          <label htmlFor="enabled" className="ml-2 block text-sm text-surface-900">
                            Enable this policy immediately
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-surface-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Add Policy
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-surface-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-surface-700 hover:bg-surface-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Policy Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-surface-500 bg-opacity-75 transition-opacity" onClick={() => setShowEditModal(false)}></div>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSubmitEdit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 sm:mx-0 sm:h-10 sm:w-10">
                      <Edit className="h-6 w-6 text-primary-600" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left flex-1">
                      <h3 className="text-lg leading-6 font-medium text-surface-900 mb-4">
                        Edit Origin Policy
                      </h3>
                      
<div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-surface-700 mb-1">
                            Pattern Type
                          </label>
                          <select
                            value={formData.patternType}
                            onChange={(e) => setFormData({...formData, patternType: e.target.value})}
                            className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          >
                            <option value="url">Exact URL</option>
                            <option value="regex">Regular Expression</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-surface-700 mb-1">
                            {formData.patternType === 'url' ? 'Origin URL' : 'Origin Pattern'}
                          </label>
                          <input
                            type={formData.patternType === 'url' ? 'url' : 'text'}
                            value={formData.origin}
                            onChange={(e) => setFormData({...formData, origin: e.target.value})}
                            placeholder={formData.patternType === 'url' 
                              ? 'https://example.com' 
                              : '.*\\.example\\.com$ or https://(staging|dev)\\..*'
                            }
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                              errors.origin ? 'border-error-300' : 'border-surface-300'
                            }`}
                          />
                          {formData.patternType === 'regex' && (
                            <p className="text-xs text-surface-500 mt-1">
                              Use regex patterns like: <code className="bg-surface-100 px-1 rounded">.*\.example\.com$</code> for subdomains
                            </p>
                          )}
                          {errors.origin && <p className="text-error-600 text-sm mt-1">{errors.origin}</p>}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-surface-700 mb-1">
                            Policy Type
                          </label>
                          <select
                            value={formData.type}
                            onChange={(e) => setFormData({...formData, type: e.target.value})}
                            className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          >
                            <option value="allow">Allow</option>
                            <option value="deny">Deny</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-surface-700 mb-1">
                            Description
                          </label>
                          <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                            placeholder="Brief description of this policy..."
                            rows="3"
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                              errors.description ? 'border-error-300' : 'border-surface-300'
                            }`}
                          />
                          {errors.description && <p className="text-error-600 text-sm mt-1">{errors.description}</p>}
                        </div>
                        
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="editEnabled"
                            checked={formData.enabled}
                            onChange={(e) => setFormData({...formData, enabled: e.target.checked})}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-surface-300 rounded"
                          />
                          <label htmlFor="editEnabled" className="ml-2 block text-sm text-surface-900">
                            Enable this policy
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-surface-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Update Policy
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-surface-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-surface-700 hover:bg-surface-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedPolicy && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-surface-500 bg-opacity-75 transition-opacity" onClick={() => setShowDeleteModal(false)}></div>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-error-100 sm:mx-0 sm:h-10 sm:w-10">
                    <Trash2 className="h-6 w-6 text-error-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-surface-900">
                      Delete Origin Policy
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-surface-500">
                        Are you sure you want to delete the policy for <strong>{selectedPolicy.origin}</strong>? 
                        This action cannot be undone and will immediately affect access control.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-surface-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleConfirmDelete}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-error-600 text-base font-medium text-white hover:bg-error-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-error-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Delete Policy
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-surface-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-surface-700 hover:bg-surface-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default OriginPolicies