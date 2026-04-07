import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { XMarkIcon, PlayIcon, StopIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

const ServicePanel = ({ service, onClose }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState(null)

  const executeAction = async (action) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setResponse({ action, timestamp: new Date().toISOString(), status: 'success' })
      toast.success(`${action} executed successfully`)
    } catch (error) {
      toast.error(`Failed to execute ${action}`)
    } finally {
      setIsLoading(false)
    }
  }

  const getServiceActions = (serviceId) => {
    const actions = {
      'core-banking': [
        { name: 'Parse Transaction', action: 'parse', description: 'Parse ANTLR transaction' },
        { name: 'Check Balance', action: 'balance', description: 'Get account balance' },
        { name: 'Transfer Funds', action: 'transfer', description: 'Execute transfer' },
        { name: 'Health Check', action: 'health', description: 'Service health status' }
      ],
      'notifications': [
        { name: 'Send SMS', action: 'sms', description: 'Send SMS notification' },
        { name: 'Send Email', action: 'email', description: 'Send email notification' },
        { name: 'Get Templates', action: 'templates', description: 'List templates' },
        { name: 'User Preferences', action: 'preferences', description: 'Get user settings' }
      ],
      'promotions': [
        { name: 'Get Offers', action: 'offers', description: 'Available promotions' },
        { name: 'Apply Cashback', action: 'cashback', description: 'Process cashback' },
        { name: 'Loyalty Points', action: 'loyalty', description: 'Check points balance' },
        { name: 'Campaign Stats', action: 'stats', description: 'Campaign analytics' }
      ],
      'ai-service': [
        { name: 'Fraud Detection', action: 'fraud', description: 'Analyze transaction risk' },
        { name: 'Risk Score', action: 'risk', description: 'Calculate risk score' },
        { name: 'Model Status', action: 'model', description: 'AI model information' },
        { name: 'Predictions', action: 'predict', description: 'Get predictions' }
      ],
      'mpc-service': [
        { name: 'Secure Compute', action: 'compute', description: 'Multi-party computation' },
        { name: 'Key Exchange', action: 'exchange', description: 'Cryptographic key exchange' },
        { name: 'Protocol Status', action: 'protocol', description: 'MPC protocol status' },
        { name: 'Verify Proof', action: 'verify', description: 'Verify zero-knowledge proof' }
      ],
      'fhe-service': [
        { name: 'Encrypt Data', action: 'encrypt', description: 'Homomorphic encryption' },
        { name: 'Compute Encrypted', action: 'compute', description: 'Compute on encrypted data' },
        { name: 'Decrypt Result', action: 'decrypt', description: 'Decrypt computation result' },
        { name: 'Key Management', action: 'keys', description: 'Manage encryption keys' }
      ]
    }
    
    return actions[serviceId] || [
      { name: 'Health Check', action: 'health', description: 'Check service status' },
      { name: 'Metrics', action: 'metrics', description: 'Get service metrics' },
      { name: 'Logs', action: 'logs', description: 'View recent logs' }
    ]
  }

  const actions = getServiceActions(service.id)

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-titan-600 to-titan-800 p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">{service.name}</h2>
                <p className="text-titan-100 mt-1">{service.description}</p>
                <div className="flex items-center mt-2 space-x-4">
                  <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                    Port: {service.port}
                  </span>
                  <span className="text-sm bg-green-500/20 px-3 py-1 rounded-full">
                    Status: UP
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {actions.map((actionItem, index) => (
                <motion.button
                  key={actionItem.action}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => executeAction(actionItem.name)}
                  disabled={isLoading}
                  className="p-4 border border-gray-200 rounded-lg hover:border-titan-500 hover:bg-titan-50 transition-all duration-200 text-left group disabled:opacity-50"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-titan-700">
                        {actionItem.name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {actionItem.description}
                      </p>
                    </div>
                    <PlayIcon className="h-5 w-5 text-gray-400 group-hover:text-titan-500" />
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Response Display */}
            {response && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-50 rounded-lg p-4"
              >
                <h3 className="font-semibold text-gray-900 mb-2">Last Response</h3>
                <div className="bg-white rounded border p-3 font-mono text-sm">
                  <div className="text-green-600 mb-2">✓ {response.action} - {response.status}</div>
                  <div className="text-gray-500">Timestamp: {response.timestamp}</div>
                </div>
              </motion.div>
            )}

            {/* Loading State */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center py-8"
              >
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-titan-600"></div>
                <span className="ml-3 text-gray-600">Executing action...</span>
              </motion.div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Service URL: http://localhost:{service.port}
              </div>
              <div className="flex space-x-3">
                <button className="btn-secondary text-sm">
                  View Logs
                </button>
                <button className="btn-primary text-sm">
                  Open in Browser
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default ServicePanel
