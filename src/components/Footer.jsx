import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin,
  ExternalLink,
  Heart
} from 'lucide-react'

function Footer() {
  const currentYear = new Date().getFullYear()

const navigationLinks = [
{ name: 'Home', href: '/' },
    { name: 'Storage Dashboard', href: '/dashboard' },
    { name: 'Archive Management', href: '/archive' },
    { name: 'Access Policies', href: '/policies' },
    { name: 'Origin Policies', href: '/origin-policies' }
  ]

  const resourceLinks = [
    { name: 'Documentation', href: '#', external: true },
    { name: 'API Reference', href: '#', external: true },
    { name: 'Help Center', href: '#', external: true },
    { name: 'Status Page', href: '#', external: true },
    { name: 'Release Notes', href: '#', external: true }
  ]

  const legalLinks = [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Cookie Policy', href: '#' },
    { name: 'Data Processing', href: '#' }
  ]

  const socialLinks = [
    { name: 'GitHub', icon: Github, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' }
  ]

  return (
    <footer className="bg-gradient-to-br from-surface-900 via-surface-800 to-surface-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <Link to="/" className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-depth-2">
                <div className="text-white font-bold text-lg">DS</div>
              </div>
              <span className="text-2xl font-bold text-white">DropSync</span>
            </Link>
            <p className="text-surface-300 mb-6 leading-relaxed">
              Professional file management platform with advanced analytics, 
              secure storage, and intelligent archival policies.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-3 text-surface-300">
                <Mail className="w-4 h-4" />
                <span className="text-sm">support@dropsync.com</span>
              </div>
              <div className="flex items-center space-x-3 text-surface-300">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-surface-300">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">San Francisco, CA</span>
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">Navigation</h3>
            <ul className="space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-surface-300 hover:text-primary-400 transition-colors duration-200 text-sm flex items-center group"
                  >
                    <span>{link.name}</span>
                    <div className="ml-1 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200">
                      →
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-surface-300 hover:text-primary-400 transition-colors duration-200 text-sm flex items-center group"
                    >
                      <span>{link.name}</span>
                      <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-surface-300 hover:text-primary-400 transition-colors duration-200 text-sm flex items-center group"
                    >
                      <span>{link.name}</span>
                      <div className="ml-1 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200">
                        →
                      </div>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal & Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-3 mb-6">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-surface-300 hover:text-primary-400 transition-colors duration-200 text-sm flex items-center group"
                  >
                    <span>{link.name}</span>
                    <div className="ml-1 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200">
                      →
                    </div>
                  </a>
                </li>
              ))}
            </ul>

            <h4 className="text-sm font-semibold text-white mb-3">Follow Us</h4>
            <div className="flex space-x-3">
              {socialLinks.map((social) => {
                const IconComponent = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 bg-surface-700 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-glow-primary group"
                    title={social.name}
                  >
                    <IconComponent className="w-4 h-4 text-surface-300 group-hover:text-white transition-colors duration-200" />
                  </a>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 pt-8 border-t border-surface-700"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-surface-400 text-sm">
              <span>© {currentYear} DropSync. All rights reserved.</span>
              <span className="hidden md:inline">•</span>
              <span className="hidden md:inline flex items-center space-x-1">
                Made with <Heart className="w-3 h-3 text-red-500 mx-1" /> by the DropSync Team
              </span>
            </div>
            
            <div className="flex items-center space-x-6 text-surface-400 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
                <span>All systems operational</span>
              </div>
              <span>Version 2.1.0</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer