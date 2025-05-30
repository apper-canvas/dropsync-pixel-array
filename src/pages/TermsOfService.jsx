import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, ExternalLink, FileText, Shield, Users, AlertTriangle } from 'lucide-react'

function TermsOfService() {
  const sections = [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      icon: FileText,
      content: [
        'By accessing and using DropSync ("Service"), you accept and agree to be bound by the terms and provision of this agreement.',
        'If you do not agree to abide by the above, please do not use this service.',
        'These Terms of Service govern your use of our file management platform and all related services.'
      ]
    },
    {
      id: 'service-description',
      title: 'Service Description',
      icon: Shield,
      content: [
        'DropSync is a professional file management platform that provides secure file storage, analytics, archival policies, and access control.',
        'We reserve the right to modify, suspend, or discontinue any aspect of the service at any time.',
        'New features and tools may be added to the current service at our discretion.'
      ]
    },
    {
      id: 'user-responsibilities',
      title: 'User Responsibilities',
      icon: Users,
      content: [
        'You are responsible for maintaining the confidentiality of your account credentials.',
        'You agree not to upload content that violates applicable laws or infringes on third-party rights.',
        'You must comply with all applicable local, state, national, and international laws and regulations.',
        'You are solely responsible for the content you upload and store using our service.'
      ]
    },
    {
      id: 'prohibited-use',
      title: 'Prohibited Use',
      icon: AlertTriangle,
      content: [
        'You may not use our service for any illegal or unauthorized purpose.',
        'You may not transmit viruses, malware, or any malicious code through our platform.',
        'You may not attempt to gain unauthorized access to other user accounts or our systems.',
        'Bulk downloading or systematic data extraction is prohibited without explicit permission.'
      ]
    },
    {
      id: 'intellectual-property',
      title: 'Intellectual Property',
      icon: Shield,
      content: [
        'The DropSync platform, including its design, code, and functionality, is owned by us and protected by intellectual property laws.',
        'You retain ownership of content you upload, but grant us necessary licenses to provide the service.',
        'Our trademarks, logos, and service marks may not be used without our written permission.'
      ]
    },
    {
      id: 'limitation-liability',
      title: 'Limitation of Liability',
      icon: AlertTriangle,
      content: [
        'Our service is provided "as is" without any warranties, express or implied.',
        'We shall not be liable for any indirect, incidental, special, consequential, or punitive damages.',
        'Our total liability shall not exceed the amount paid by you for the service in the preceding twelve months.',
        'We recommend maintaining backup copies of important data stored on our platform.'
      ]
    },
    {
      id: 'termination',
      title: 'Termination',
      icon: FileText,
      content: [
        'We may terminate or suspend your account immediately for violations of these terms.',
        'You may terminate your account at any time by contacting our support team.',
        'Upon termination, your right to use the service ceases immediately.',
        'We will provide reasonable notice for scheduled service terminations when possible.'
      ]
    },
    {
      id: 'modifications',
      title: 'Modifications to Terms',
      icon: FileText,
      content: [
        'We reserve the right to modify these terms at any time.',
        'Material changes will be communicated via email or platform notifications.',
        'Continued use of the service after changes constitutes acceptance of the new terms.',
        'We encourage you to review these terms periodically.'
      ]
    }
  ]

  const lastUpdated = 'December 2024'

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-professional">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="flex items-center space-x-2 text-surface-600 hover:text-primary-600 transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Back to Home</span>
              </Link>
            </div>
            <div className="text-sm text-surface-500">
              Last updated: {lastUpdated}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-professional">
              <FileText className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-surface-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-xl text-surface-600 max-w-2xl mx-auto leading-relaxed">
            Please read these terms carefully before using DropSync's file management platform and services.
          </p>
        </motion.div>

        {/* Quick Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="professional-card p-6 mb-8"
        >
          <h2 className="text-lg font-semibold text-surface-900 mb-4">Quick Navigation</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="text-sm text-primary-600 hover:text-primary-700 hover:underline transition-colors duration-200"
              >
                {section.title}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Terms Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => {
            const IconComponent = section.icon
            return (
              <motion.section
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="professional-card p-8"
              >
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-depth-2 flex-shrink-0">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-surface-900 mb-2">
                      {section.title}
                    </h2>
                  </div>
                </div>
                
                <div className="space-y-4 text-surface-700 leading-relaxed">
                  {section.content.map((paragraph, idx) => (
                    <p key={idx} className="text-base">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.section>
            )
          })}
        </div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 professional-card p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-surface-900 mb-4">
            Questions About These Terms?
          </h2>
          <p className="text-surface-600 mb-6 max-w-2xl mx-auto">
            If you have any questions about these Terms of Service, please don't hesitate to contact our legal team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:legal@dropsync.com"
              className="btn-primary inline-flex items-center justify-center space-x-2"
            >
              <span>Contact Legal Team</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <Link
              to="/privacy-policy"
              className="btn-secondary inline-flex items-center justify-center space-x-2"
            >
              <span>View Privacy Policy</span>
              <Shield className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        {/* Back to Top */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-12 text-center"
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-primary-600 hover:text-primary-700 transition-colors duration-200 font-medium"
          >
            ↑ Back to Top
          </button>
        </motion.div>
      </div>
    </div>
  )
}

export default TermsOfService