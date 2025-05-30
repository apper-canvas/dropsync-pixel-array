import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, Shield, Eye, Lock, Users, Database, Settings, Mail } from 'lucide-react'

function PrivacyPolicy() {
  const sections = [
    {
      id: 'information-collection',
      title: 'Information We Collect',
      icon: Database,
      content: [
        'Account Information: When you create an account, we collect your name, email address, and contact details.',
        'File Data: We store the files you upload and their associated metadata including file names, sizes, and upload timestamps.',
        'Usage Analytics: We collect information about how you use our platform, including access patterns and feature usage.',
        'Technical Information: We automatically collect IP addresses, browser types, device information, and system performance data.'
      ]
    },
    {
      id: 'information-use',
      title: 'How We Use Your Information',
      icon: Settings,
      content: [
        'Service Provision: To provide, maintain, and improve our file management services.',
        'Security: To protect your account and detect fraudulent or unauthorized activities.',
        'Communication: To send important service updates, security alerts, and customer support responses.',
        'Analytics: To analyze usage patterns and improve our platform\'s performance and user experience.'
      ]
    },
    {
      id: 'information-sharing',
      title: 'Information Sharing',
      icon: Users,
      content: [
        'We do not sell, trade, or rent your personal information to third parties.',
        'Service Providers: We may share data with trusted third-party services that help us operate our platform.',
        'Legal Requirements: We may disclose information when required by law or to protect our rights and safety.',
        'Business Transfers: In the event of a merger or acquisition, your information may be transferred to the new entity.'
      ]
    },
    {
      id: 'data-security',
      title: 'Data Security',
      icon: Lock,
      content: [
        'Encryption: All data is encrypted in transit using TLS and at rest using AES-256 encryption.',
        'Access Controls: We implement strict access controls and multi-factor authentication for our systems.',
        'Regular Audits: Our security practices are regularly reviewed and updated to meet industry standards.',
        'Incident Response: We have procedures in place to quickly respond to and mitigate security incidents.'
      ]
    },
    {
      id: 'data-retention',
      title: 'Data Retention',
      icon: Database,
      content: [
        'Active Accounts: We retain your data while your account is active and as needed to provide services.',
        'Account Deletion: When you delete your account, we remove your personal data within 30 days.',
        'Legal Requirements: Some data may be retained longer if required by law or for legitimate business purposes.',
        'Backup Systems: Data in backup systems is purged according to our data retention schedule.'
      ]
    },
    {
      id: 'user-rights',
      title: 'Your Rights',
      icon: Eye,
      content: [
        'Access: You can request a copy of the personal information we hold about you.',
        'Correction: You can update or correct your personal information at any time.',
        'Deletion: You can request deletion of your account and associated data.',
        'Portability: You can export your data in standard formats before account deletion.'
      ]
    },
    {
      id: 'cookies',
      title: 'Cookies and Tracking',
      icon: Settings,
      content: [
        'Essential Cookies: We use necessary cookies for authentication and basic platform functionality.',
        'Analytics Cookies: We use analytics tools to understand how users interact with our platform.',
        'Preferences: You can control cookie settings through your browser preferences.',
        'Third-party Services: Some features may use third-party services with their own privacy policies.'
      ]
    },
    {
      id: 'international-transfers',
      title: 'International Data Transfers',
      icon: Shield,
      content: [
        'Our services may involve transferring data across international borders.',
        'We ensure appropriate safeguards are in place when transferring data internationally.',
        'Data transfers comply with applicable privacy laws and regulations.',
        'We maintain data processing agreements with all international service providers.'
      ]
    },
    {
      id: 'children-privacy',
      title: 'Children\'s Privacy',
      icon: Users,
      content: [
        'Our service is not intended for children under 13 years of age.',
        'We do not knowingly collect personal information from children under 13.',
        'If we become aware of such collection, we will delete the information immediately.',
        'Parents who believe their child has provided information should contact us immediately.'
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
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-surface-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-surface-600 max-w-2xl mx-auto leading-relaxed">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information when you use DropSync.
          </p>
        </motion.div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="professional-card p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-surface-900 mb-4">Our Commitment to Privacy</h2>
          <p className="text-surface-700 leading-relaxed mb-4">
            At DropSync, we understand that privacy is fundamental to trust. This Privacy Policy describes how we collect, 
            use, and safeguard your information when you use our file management platform.
          </p>
          <p className="text-surface-700 leading-relaxed">
            We are committed to being transparent about our data practices and giving you control over your personal information. 
            By using our service, you agree to the collection and use of information in accordance with this policy.
          </p>
        </motion.div>

        {/* Quick Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="professional-card p-6 mb-8"
        >
          <h2 className="text-lg font-semibold text-surface-900 mb-4">Quick Navigation</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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

        {/* Privacy Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => {
            const IconComponent = section.icon
            return (
              <motion.section
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
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
                  {section.content.map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-base">{item}</p>
                    </div>
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
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-12 professional-card p-8"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-surface-900 mb-4">
              Questions About Your Privacy?
            </h2>
            <p className="text-surface-600 max-w-2xl mx-auto">
              If you have any questions about this Privacy Policy or how we handle your data, 
              please don't hesitate to contact our privacy team.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="text-center p-6 bg-surface-50 rounded-xl">
              <Mail className="w-8 h-8 text-primary-600 mx-auto mb-3" />
              <h3 className="font-semibold text-surface-900 mb-2">Email Us</h3>
              <p className="text-surface-600 text-sm mb-3">For privacy-related questions</p>
              <a
                href="mailto:privacy@dropsync.com"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                privacy@dropsync.com
              </a>
            </div>
            <div className="text-center p-6 bg-surface-50 rounded-xl">
              <Shield className="w-8 h-8 text-primary-600 mx-auto mb-3" />
              <h3 className="font-semibold text-surface-900 mb-2">Data Protection Officer</h3>
              <p className="text-surface-600 text-sm mb-3">For GDPR and compliance matters</p>
              <a
                href="mailto:dpo@dropsync.com"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                dpo@dropsync.com
              </a>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/terms-of-service"
              className="btn-secondary inline-flex items-center space-x-2"
            >
              <span>View Terms of Service</span>
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </div>
        </motion.div>

        {/* Back to Top */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
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

export default PrivacyPolicy