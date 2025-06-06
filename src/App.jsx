import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home'
import StorageDashboard from './pages/StorageDashboard'
import TermsOfService from './pages/TermsOfService'
import PrivacyPolicy from './pages/PrivacyPolicy'
import NotFound from './pages/NotFound'
import ArchiveManagement from './pages/ArchiveManagement'
import AccessPolicies from './pages/AccessPolicies'
import OriginPolicies from './pages/OriginPolicies'
import DataProcessing from './pages/DataProcessing'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 via-white to-surface-100 dark:from-surface-900 dark:via-surface-800 dark:to-surface-900">
      <Routes>
<Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<StorageDashboard />} />
        <Route path="/archive" element={<ArchiveManagement />} />
        <Route path="/policies" element={<AccessPolicies />} />
<Route path="/data-processing" element={<DataProcessing />} />
        <Route path="/origin-policies" element={<OriginPolicies />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      <Footer />
      
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="!top-4 !right-4"
        toastClassName="!bg-white !shadow-soft !border !border-surface-200 !rounded-xl"
        bodyClassName="!text-surface-800 !font-medium"
        progressClassName="!bg-primary"
      />
    </div>
  )
}

export default App