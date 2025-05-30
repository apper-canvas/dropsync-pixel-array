import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import Header from '../components/Header'
import ApperIcon from '../components/ApperIcon'
import { format } from 'date-fns'

function AccessPolicies() {
  const [showPolicyModal, setShowPolicyModal] = useState(false)
  const [editingPolicy, setEditingPolicy] = useState(null)
  const [policies, setPolicies] = useState([
    {
      id: 1,
      name: 'Admin Full Access',
      description: 'Full access to all files and folders',
      type: 'role',
      permissions: ['read', 'write', 'delete', 'share', 'manage'],
      targets: ['admin', 'super-admin'],
      paths: ['/'],
      enabled: true,
      priority: 1,
      createdDate: new Date('2024-01-01'),
      appliedTo: 3
    },
    {
      id: 2,
      name: 'Department Read-Only',
      description: 'Read-only access to department documents',
      type: 'group',
      permissions: ['read'],
      targets: ['marketing', 'sales', 'hr'],
      paths: ['/documents/department', '/shared/public'],
      enabled: true,
      priority: 2,
      createdDate: new Date('2024-01-10'),
      appliedTo: 45
    },
    {
      id: 3,
      name: 'Guest Limited Access',
      description: 'Limited access to public files only',
      type: 'user',
      permissions: ['read'],
      targets: ['guest', 'visitor'],
      paths: ['/public'],
      enabled: true,
      priority: 3,
      createdDate: new Date('2024-01-15'),
      appliedTo: 12
    },
    {
      id: 4,
      name: 'Restricted Financial Data',
      description: 'Restrict access to financial documents',
      type: 'path',
      permissions: [],
      targets: ['all'],
      paths: ['/finance', '/accounting'],
      enabled: true,
      priority: 0,
      createdDate: new Date('2024-01-20'),
      appliedTo: 156
    }
  ])

  const [policyForm, setPolicyForm] = useState({
    name: '',
    description: '',
    type: 'role',
    permissions: [],
    targets: [],
    paths: ['/'],
    enabled: true,
    priority: 1,
    inheritParent: true,
    expiry: null
  })

  const [newTarget, setNewTarget] = useState('')
  const [newPath, setNewPath] = useState('')

  const policyTemplates = [
    {
      name: 'Full Admin Access',
      description: 'Complete access to all files and functions',
      type: 'role',
      permissions: ['read', 'write', 'delete', 'share', 'manage'],
      targets: ['admin'],
      paths: ['/'],
      priority: 1
    },
    {
      name: 'Editor Access',
      description: 'Read and write access to content files',
      type: 'role',
      permissions: ['read', 'write', 'share'],
      targets: ['editor'],
      paths: ['/content', '/media'],
      priority: 2
    },
    {
      name: 'Viewer Only',
      description: 'Read-only access to public files',
      type: 'group',
      permissions: ['read'],
      targets: ['viewers'],
      paths: ['/public'],
      priority: 3
    },
    {
      name: 'Department Restricted',
      description: 'Block access to sensitive department files',
      type: 'path',
      permissions: [],
      targets: ['all'],
      paths: ['/confidential'],
      priority: 0
    }
  ]

  const availablePermissions = [
    { id: 'read', label: 'Read', icon: 'Eye', description: 'View files and folders' },
    { id: 'write', label: 'Write', icon: 'Edit', description: 'Create and modify files' },
    { id: 'delete', label: 'Delete', icon: 'Trash2', description: 'Remove files and folders' },
    { id: 'share', label: 'Share', icon: 'Share2', description: 'Share files with others' },
    { id: 'manage', label: 'Manage', icon: 'Settings', description: 'Manage permissions and policies' }
  ]

  const handleCreatePolicy = () => {
    if (!policyForm.name.trim()) {
      toast.error('Policy name is required')
      return
    }

    if (policyForm.targets.length === 0 && policyForm.type !== 'path') {
      toast.error('At least one target is required')
      return
    }

    const newPolicy = {
      id: Date.now(),
      ...policyForm,
      createdDate: new Date(),
      appliedTo: 0
    }

    if (editingPolicy) {
      setPolicies(prev => prev.map(policy => 
        policy.id === editingPolicy.id ? { ...newPolicy, id: editingPolicy.id } : policy
      ))
      toast.success('Access policy updated successfully!')
    } else {
      setPolicies(prev => [...prev, newPolicy])
      toast.success('Access policy created successfully!')
    }

    setShowPolicyModal(false)
    setEditingPolicy(null)
    resetForm()
  }

  const resetForm = () => {
    setPolicyForm({
      name: '',
      description: '',
      type: 'role',
      permissions: [],
      targets: [],
      paths: ['/'],
      enabled: true,
      priority: 1,
      inheritParent: true,
      expiry: null
    })
    setNewTarget('')
    setNewPath('')
  }

  const handleEditPolicy = (policy) => {
    setEditingPolicy(policy)
    setPolicyForm(policy)
    setShowPolicyModal(true)
  }

  const handleDeletePolicy = (policyId) => {
    if (window.confirm('Are you sure you want to delete this access policy?')) {
      setPolicies(prev => prev.filter(policy => policy.id !== policyId))
      toast.success('Access policy deleted successfully!')
    }
  }

  const handleTogglePolicy = (policyId) => {
    setPolicies(prev => prev.map(policy => 
      policy.id === policyId ? { ...policy, enabled: !policy.enabled } : policy
    ))
    toast.success('Policy status updated!')
  }

  const handleApplyTemplate = (template) => {
    setPolicyForm({
      ...template,
      enabled: true,
      inheritParent: true,
      expiry: null
    })
  }

  const addTarget = () => {
    if (newTarget.trim() && !policyForm.targets.includes(newTarget.trim())) {
      setPolicyForm(prev => ({
        ...prev,
        targets: [...prev.targets, newTarget.trim()]
      }))
      setNewTarget('')
    }
  }

  const removeTarget = (target) => {
    setPolicyForm(prev => ({
      ...prev,
      targets: prev.targets.filter(t => t !== target)
    }))
  }

  const addPath = () => {
    if (newPath.trim() && !policyForm.paths.includes(newPath.trim())) {
      setPolicyForm(prev => ({
        ...prev,
        paths: [...prev.paths, newPath.trim()]
      }))
      setNewPath('')
    }
  }

  const removePath = (path) => {
    setPolicyForm(prev => ({
      ...prev,
      paths: prev.paths.filter(p => p !== path)
    }))
  }

  const togglePermission = (permission) => {
    setPolicyForm(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }))
  }

  const getPolicyTypeIcon = (type) => {
    switch (type) {
      case 'role': return 'UserCheck'
      case 'group': return 'Users'
      case 'user': return 'User'
      case 'path': return 'FolderLock'
      default: return 'Shield'
    }
  }

  const getPolicyTypeColor = (type) => {
    switch (type) {
      case 'role': return 'bg-blue-100 text-blue-800'
      case 'group': return 'bg-green-100 text-green-800'
      case 'user': return 'bg-purple-100 text-purple-800'
      case 'path': return 'bg-red-100 text-red-800'
      default: return 'bg-surface-100 text-surface-800'
    }
  }

return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 to-surface-100">
      <Header 
        title="Access Policies"
        subtitle="File Access Control & Permissions"
        icon="Shield"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-end">
        <button
          onClick={() => setShowPolicyModal(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <ApperIcon name="Plus" className="w-4 h-4" />
          <span className="hidden sm:inline">New Policy</span>
        </button>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
>
<motion.div
            whileHover={{ y: -5 }}
            className="stat-card group"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-surface-600 uppercase tracking-wide">Active Policies</p>
                <p className="text-3xl font-bold text-surface-900 mt-2">
                  {policies.filter(policy => policy.enabled).length}
                </p>
                <p className="text-xs text-surface-500 mt-1">Currently enforced</p>
              </div>
              <div className="icon-badge icon-badge-primary group-hover:scale-110 transition-transform duration-300">
                <ApperIcon name="Shield" className="w-6 h-6" />
              </div>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="stat-card group"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-surface-600 uppercase tracking-wide">Users Covered</p>
                <p className="text-3xl font-bold text-surface-900 mt-2">
                  {policies.reduce((sum, policy) => sum + policy.appliedTo, 0)}
                </p>
                <p className="text-xs text-surface-500 mt-1">Total coverage</p>
              </div>
              <div className="icon-badge icon-badge-secondary group-hover:scale-110 transition-transform duration-300">
                <ApperIcon name="Users" className="w-6 h-6" />
              </div>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="stat-card group"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-surface-600 uppercase tracking-wide">Role Policies</p>
                <p className="text-3xl font-bold text-surface-900 mt-2">
                  {policies.filter(policy => policy.type === 'role').length}
                </p>
                <p className="text-xs text-surface-500 mt-1">Role-based rules</p>
              </div>
              <div className="icon-badge icon-badge-accent group-hover:scale-110 transition-transform duration-300">
                <ApperIcon name="UserCheck" className="w-6 h-6" />
              </div>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="stat-card group"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-surface-600 uppercase tracking-wide">Path Restrictions</p>
                <p className="text-3xl font-bold text-surface-900 mt-2">
                  {policies.filter(policy => policy.type === 'path').length}
                </p>
                <p className="text-xs text-surface-500 mt-1">Protected paths</p>
              </div>
              <div className="bg-gradient-to-br from-error-500 to-error-600 w-12 h-12 rounded-xl flex items-center justify-center shadow-depth-1 text-white group-hover:scale-110 transition-transform duration-300">
                <ApperIcon name="FolderLock" className="w-6 h-6" />
              </div>
            </div>
</motion.div>
        </motion.div>
        {/* Policies List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="neu-card p-6"
>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-surface-900">Access Policies</h2>
              <p className="text-surface-600 mt-1">Configure file access permissions and restrictions</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-secondary-50 to-secondary-100 px-4 py-2 rounded-xl border border-secondary-200">
                <span className="text-sm font-semibold text-secondary-700">
                  {policies.length} policy{policies.length !== 1 ? 'ies' : 'y'}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {policies.map((policy, index) => (
              <motion.div
                key={policy.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
className="professional-card p-6 group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
<div className="w-10 h-10 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-xl flex items-center justify-center shadow-depth-1">
                        <ApperIcon name={getPolicyTypeIcon(policy.type)} className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-bold text-surface-900 text-lg">{policy.name}</h3>
                      <span className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 ${
                        policy.enabled
                          ? 'status-active'
                          : 'status-inactive'
                      }`}>
                        {policy.enabled ? 'Active' : 'Inactive'}
                      </span>
                      <span className={`px-3 py-1.5 text-xs font-semibold rounded-full border ${
                        policy.type === 'role' ? 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 border-blue-300' :
                        policy.type === 'group' ? 'bg-gradient-to-r from-green-100 to-green-200 text-green-700 border-green-300' :
                        policy.type === 'user' ? 'bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 border-purple-300' :
                        'bg-gradient-to-r from-red-100 to-red-200 text-red-700 border-red-300'
                      }`}>
                        {policy.type.toUpperCase()}
                      </span>
                      <span className={`px-3 py-1.5 text-xs font-semibold rounded-full ${
                        policy.priority === 0 ? 'status-priority-high' :
                        policy.priority <= 2 ? 'status-priority-medium' : 'status-priority-low'
                      }`}>
                        Priority {policy.priority}
                      </span>
                    
                    <p className="text-surface-600 text-sm mb-3">{policy.description}</p>
                    
</div>
<div className="space-y-4">
                      {/* Permissions */}
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                        <div className="flex items-center space-x-2 mb-2">
                          <ApperIcon name="Key" className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-semibold text-blue-700">Permissions</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {policy.permissions.length > 0 ? (
                            policy.permissions.map((permission) => (
                              <span
                                key={permission}
                                className="px-3 py-1.5 text-xs font-semibold bg-gradient-to-r from-blue-200 to-blue-300 text-blue-800 rounded-full border border-blue-400"
                              >
                                {permission.toUpperCase()}
                              </span>
                            ))
                          ) : (
                            <span className="px-3 py-1.5 text-xs font-semibold bg-gradient-to-r from-red-200 to-red-300 text-red-800 rounded-full border border-red-400">
                              NO ACCESS
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Targets */}
                      {policy.targets.length > 0 && (
                        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                          <div className="flex items-center space-x-2 mb-2">
                            <ApperIcon name="Target" className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-semibold text-green-700">Targets</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {policy.targets.slice(0, 3).map((target) => (
                              <span
                                key={target}
                                className="px-3 py-1.5 text-xs font-semibold bg-gradient-to-r from-green-200 to-green-300 text-green-800 rounded-full border border-green-400"
                              >
                                {target}
                              </span>
                            ))}
                            {policy.targets.length > 3 && (
                              <span className="px-3 py-1.5 text-xs font-semibold bg-gradient-to-r from-surface-200 to-surface-300 text-surface-700 rounded-full border border-surface-400">
                                +{policy.targets.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                      
                      {/* Paths and Meta Info */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-xl border border-yellow-200">
                          <div className="flex items-center space-x-2 mb-2">
                            <ApperIcon name="FolderOpen" className="w-4 h-4 text-yellow-600" />
                            <span className="text-sm font-semibold text-yellow-700">Paths</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {policy.paths.slice(0, 2).map((path) => (
                              <span
                                key={path}
                                className="px-3 py-1.5 text-xs font-mono font-semibold bg-gradient-to-r from-yellow-200 to-yellow-300 text-yellow-800 rounded-full border border-yellow-400"
                              >
                                {path}
                              </span>
                            ))}
                            {policy.paths.length > 2 && (
                              <span className="px-3 py-1.5 text-xs font-semibold bg-gradient-to-r from-surface-200 to-surface-300 text-surface-700 rounded-full border border-surface-400">
                                +{policy.paths.length - 2} more
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
                          <div className="flex items-center space-x-2 mb-2">
                            <ApperIcon name="Info" className="w-4 h-4 text-purple-600" />
                            <span className="text-sm font-semibold text-purple-700">Details</span>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2 text-xs text-purple-800">
                              <ApperIcon name="Calendar" className="w-3 h-3" />
                              <span>Created {format(policy.createdDate, 'MMM dd, yyyy')}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-xs text-purple-800">
                              <ApperIcon name="Users" className="w-3 h-3" />
                              <span>Applied to {policy.appliedTo} users</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
<div className="flex flex-col space-y-2">
                      <button
                        onClick={() => handleTogglePolicy(policy.id)}
                        className={`p-3 rounded-xl transition-all duration-200 ${
                          policy.enabled
                            ? 'bg-gradient-to-r from-success-500 to-success-600 text-white shadow-depth-2 hover:shadow-depth-3'
                            : 'bg-gradient-to-r from-surface-300 to-surface-400 text-surface-600 hover:from-surface-400 hover:to-surface-500'
                        }`}
                        title={policy.enabled ? 'Disable policy' : 'Enable policy'}
                      >
                        <ApperIcon name={policy.enabled ? "ToggleRight" : "ToggleLeft"} className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEditPolicy(policy)}
                        className="p-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-depth-2 hover:shadow-depth-3 transition-all duration-200"
                        title="Edit policy"
                      >
                        <ApperIcon name="Edit" className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeletePolicy(policy.id)}
                        className="p-3 rounded-xl bg-gradient-to-r from-error-500 to-error-600 text-white shadow-depth-2 hover:shadow-depth-3 transition-all duration-200"
                        title="Delete policy"
                      >
                        <ApperIcon name="Trash2" className="w-4 h-4" />
                      </button>
                    </div>
</div>
                </div>
              </motion.div>
            ))}
          </div>

          {policies.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-6 bg-surface-100 rounded-2xl flex items-center justify-center">
                <ApperIcon name="Shield" className="w-12 h-12 text-surface-400" />
              </div>
              <h3 className="text-lg font-semibold text-surface-800 mb-2">No access policies yet</h3>
              <p className="text-surface-600 max-w-md mx-auto mb-6">
                Create your first access policy to control who can access your files and what they can do with them.
              </p>
              <button
                onClick={() => setShowPolicyModal(true)}
                className="btn-primary"
              >
                Create First Policy
              </button>
            </div>
          )}
        </motion.div>
      </main>

      {/* Create/Edit Policy Modal */}
      <AnimatePresence>
        {showPolicyModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => {
              setShowPolicyModal(false)
              setEditingPolicy(null)
              resetForm()
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-surface-200">
                <h2 className="text-xl font-semibold text-surface-900">
                  {editingPolicy ? 'Edit Access Policy' : 'Create New Access Policy'}
                </h2>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Policy Templates */}
                {!editingPolicy && (
                  <div>
                    <h3 className="text-sm font-medium text-surface-900 mb-3">Quick Templates</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {policyTemplates.map((template, index) => (
                        <button
                          key={index}
                          onClick={() => handleApplyTemplate(template)}
                          className="p-3 text-left border border-surface-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
                        >
                          <div className="flex items-center space-x-2 mb-1">
                            <ApperIcon name={getPolicyTypeIcon(template.type)} className="w-4 h-4" />
                            <h4 className="font-medium text-surface-900 text-sm">{template.name}</h4>
                          </div>
                          <p className="text-xs text-surface-600">{template.description}</p>
                        </button>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-surface-200">
                      <h3 className="text-sm font-medium text-surface-900 mb-3">Custom Policy</h3>
                    </div>
                  </div>
                )}

                {/* Basic Information */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-surface-900 mb-2">
                      Policy Name *
                    </label>
                    <input
                      type="text"
                      value={policyForm.name}
                      onChange={(e) => setPolicyForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                      placeholder="Enter policy name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-900 mb-2">
                      Policy Type
                    </label>
                    <select
                      value={policyForm.type}
                      onChange={(e) => setPolicyForm(prev => ({ ...prev, type: e.target.value }))}
                      className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    >
                      <option value="role">Role-based</option>
                      <option value="group">Group-based</option>
                      <option value="user">User-specific</option>
                      <option value="path">Path restriction</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-surface-900 mb-2">
                    Description
                  </label>
                  <textarea
                    value={policyForm.description}
                    onChange={(e) => setPolicyForm(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    rows="2"
                    placeholder="Describe what this policy does"
                  />
                </div>

                {/* Permissions */}
                <div>
                  <label className="block text-sm font-medium text-surface-900 mb-3">
                    Permissions
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {availablePermissions.map((permission) => (
                      <div
                        key={permission.id}
                        className={`p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                          policyForm.permissions.includes(permission.id)
                            ? 'border-primary bg-primary/5'
                            : 'border-surface-200 hover:border-surface-300'
                        }`}
                        onClick={() => togglePermission(permission.id)}
                      >
                        <div className="flex items-center space-x-2 mb-1">
                          <ApperIcon name={permission.icon} className="w-4 h-4" />
                          <span className="font-medium text-surface-900">{permission.label}</span>
                          {policyForm.permissions.includes(permission.id) && (
                            <ApperIcon name="Check" className="w-4 h-4 text-primary ml-auto" />
                          )}
                        </div>
                        <p className="text-xs text-surface-600">{permission.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Targets */}
                {policyForm.type !== 'path' && (
                  <div>
                    <label className="block text-sm font-medium text-surface-900 mb-2">
                      {policyForm.type === 'role' ? 'Roles' : 
                       policyForm.type === 'group' ? 'Groups' : 'Users'}
                    </label>
                    <div className="space-y-3">
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={newTarget}
                          onChange={(e) => setNewTarget(e.target.value)}
                          className="flex-1 px-3 py-2 border border-surface-300 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                          placeholder={`Enter ${policyForm.type} name`}
                          onKeyPress={(e) => e.key === 'Enter' && addTarget()}
                        />
                        <button
                          type="button"
                          onClick={addTarget}
                          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                        >
                          <ApperIcon name="Plus" className="w-4 h-4" />
                        </button>
                      </div>
                      
                      {policyForm.targets.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {policyForm.targets.map((target, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center space-x-1 px-3 py-1 bg-surface-100 text-surface-800 rounded-full text-sm"
                            >
                              <span>{target}</span>
                              <button
                                type="button"
                                onClick={() => removeTarget(target)}
                                className="text-surface-500 hover:text-red-500"
                              >
                                <ApperIcon name="X" className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Paths */}
                <div>
                  <label className="block text-sm font-medium text-surface-900 mb-2">
                    File Paths
                  </label>
                  <div className="space-y-3">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newPath}
                        onChange={(e) => setNewPath(e.target.value)}
                        className="flex-1 px-3 py-2 border border-surface-300 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none font-mono text-sm"
                        placeholder="/path/to/folder"
                        onKeyPress={(e) => e.key === 'Enter' && addPath()}
                      />
                      <button
                        type="button"
                        onClick={addPath}
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                      >
                        <ApperIcon name="Plus" className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {policyForm.paths.map((path, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center space-x-1 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-mono"
                        >
                          <span>{path}</span>
                          <button
                            type="button"
                            onClick={() => removePath(path)}
                            className="text-yellow-600 hover:text-red-500"
                          >
                            <ApperIcon name="X" className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Advanced Options */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-surface-900 mb-2">
                      Priority (0 = highest)
                    </label>
                    <input
                      type="number"
                      value={policyForm.priority}
                      onChange={(e) => setPolicyForm(prev => ({ ...prev, priority: parseInt(e.target.value) || 1 }))}
                      className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                      min="0"
                      max="10"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-900 mb-2">
                      Expiry Date (optional)
                    </label>
                    <input
                      type="date"
                      value={policyForm.expiry || ''}
                      onChange={(e) => setPolicyForm(prev => ({ ...prev, expiry: e.target.value || null }))}
                      className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    />
                  </div>
                </div>

                {/* Checkboxes */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="enabled"
                      checked={policyForm.enabled}
                      onChange={(e) => setPolicyForm(prev => ({ ...prev, enabled: e.target.checked }))}
                      className="w-4 h-4 text-primary focus:ring-primary border-surface-300 rounded"
                    />
                    <label htmlFor="enabled" className="text-sm font-medium text-surface-900">
                      Enable this policy immediately
                    </label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="inheritParent"
                      checked={policyForm.inheritParent}
                      onChange={(e) => setPolicyForm(prev => ({ ...prev, inheritParent: e.target.checked }))}
                      className="w-4 h-4 text-primary focus:ring-primary border-surface-300 rounded"
                    />
                    <label htmlFor="inheritParent" className="text-sm font-medium text-surface-900">
                      Inherit permissions from parent folders
                    </label>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-surface-200 flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowPolicyModal(false)
                    setEditingPolicy(null)
                    resetForm()
                  }}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreatePolicy}
                  className="btn-primary"
                >
                  {editingPolicy ? 'Update Policy' : 'Create Policy'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AccessPolicies