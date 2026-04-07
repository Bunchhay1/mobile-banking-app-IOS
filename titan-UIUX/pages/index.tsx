import { useState } from 'react'
import Head from 'next/head'
import { motion } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import { 
  HomeIcon, 
  ServerIcon, 
  ChartBarIcon, 
  CogIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline'

import ServiceGrid from '../components/ServiceGrid'
import ServicePanel from '../components/ServicePanel'
import Dashboard from '../components/Dashboard'

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [selectedService, setSelectedService] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: HomeIcon },
    { id: 'services', name: 'Services', icon: ServerIcon },
    { id: 'monitoring', name: 'Monitoring', icon: ChartBarIcon },
    { id: 'settings', name: 'Settings', icon: CogIcon },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />
      case 'services':
        return <ServiceGrid onServiceSelect={setSelectedService} />
      case 'monitoring':
        return (
          <div className="text-center py-20">
            <ChartBarIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900">Monitoring Dashboard</h2>
            <p className="text-gray-600 mt-2">Advanced monitoring features coming soon</p>
          </div>
        )
      case 'settings':
        return (
          <div className="text-center py-20">
            <CogIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900">System Settings</h2>
            <p className="text-gray-600 mt-2">Configuration options coming soon</p>
          </div>
        )
      default:
        return <Dashboard />
    }
  }

  return (
    <>
      <Head>
        <title>Titan Banking - Service Management Console</title>
        <meta name="description" content="Titan Banking microservices management interface" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-titan-50 via-white to-purple-50">
        <Toaster position="top-right" />
        
        {/* Mobile sidebar backdrop */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <motion.div
          initial={false}
          animate={{ x: sidebarOpen ? 0 : -320 }}
          className="fixed inset-y-0 left-0 w-80 bg-white shadow-xl z-50 lg:translate-x-0 lg:static lg:inset-0"
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="bg-gradient-to-r from-titan-600 to-titan-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-white">Titan Banking</h1>
                  <p className="text-titan-100 text-sm mt-1">Service Management Console</p>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="lg:hidden p-2 text-white hover:bg-white/20 rounded-lg"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-6">
              <div className="space-y-2">
                {navigation.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id)
                      setSidebarOpen(false)
                    }}
                    className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-all duration-200 ${
                      activeTab === item.id
                        ? 'bg-titan-100 text-titan-700 border-l-4 border-titan-600'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.name}
                  </button>
                ))}
              </div>
            </nav>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200">
              <div className="text-sm text-gray-500">
                <div className="flex items-center justify-between mb-2">
                  <span>System Status</span>
                  <span className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse-slow"></div>
                    Online
                  </span>
                </div>
                <div className="text-xs">
                  20 services running • Version 1.0.0
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main content */}
        <div className="lg:ml-80">
          {/* Top bar */}
          <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg mr-4"
                >
                  <Bars3Icon className="h-6 w-6" />
                </button>
                <h2 className="text-xl font-semibold text-gray-900 capitalize">
                  {activeTab}
                </h2>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-500">
                  Last updated: {new Date().toLocaleTimeString()}
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse-slow"></div>
                  <span className="text-sm font-medium text-green-600">All Systems Operational</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <main className="p-6">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </main>
        </div>

        {/* Service Panel Modal */}
        {selectedService && (
          <ServicePanel
            service={selectedService}
            onClose={() => setSelectedService(null)}
          />
        )}
      </div>
    </>
  )
}
