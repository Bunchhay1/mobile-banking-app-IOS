import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  BanknotesIcon, 
  BellIcon, 
  GiftIcon, 
  CpuChipIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  ChartBarIcon,
  EyeIcon,
  ServerIcon
} from '@heroicons/react/24/outline'

const ServiceCard = ({ service, icon: Icon, status, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.05, y: -5 }}
    whileTap={{ scale: 0.95 }}
    className={`service-card ${status === 'UP' ? 'border-green-400' : 'border-red-400'} border-2`}
    onClick={onClick}
  >
    <div className="flex items-center justify-between mb-4">
      <Icon className="h-8 w-8 text-titan-500" />
      <div className={`w-3 h-3 rounded-full ${status === 'UP' ? 'bg-green-400 animate-pulse-slow' : 'bg-red-400'}`} />
    </div>
    <h3 className="text-lg font-semibold text-white mb-2">{service.name}</h3>
    <p className="text-sm text-gray-300 mb-3">{service.description}</p>
    <div className="text-xs text-gray-400">
      Port: {service.port} | Status: {status}
    </div>
  </motion.div>
)

export default function ServiceGrid({ onServiceSelect }) {
  const [serviceStatuses, setServiceStatuses] = useState({})

  const services = [
    {
      id: 'core-banking',
      name: 'Core Banking',
      description: 'Transaction processing & account management',
      port: '8080',
      icon: BanknotesIcon,
      category: 'core'
    },
    {
      id: 'notifications',
      name: 'Notifications',
      description: 'SMS & Email delivery with templates',
      port: '8084',
      icon: BellIcon,
      category: 'core'
    },
    {
      id: 'promotions',
      name: 'Promotions',
      description: 'Cashback & loyalty programs',
      port: '8083',
      icon: GiftIcon,
      category: 'core'
    },
    {
      id: 'ai-service',
      name: 'AI Service',
      description: 'Fraud detection & risk analysis',
      port: '50051',
      icon: CpuChipIcon,
      category: 'ai'
    },
    {
      id: 'edge-ai',
      name: 'Edge AI',
      description: 'Real-time recommendations',
      port: '8001',
      icon: CpuChipIcon,
      category: 'ai'
    },
    {
      id: 'federated-learning',
      name: 'Federated Learning',
      description: 'Distributed ML training',
      port: '8098',
      icon: CpuChipIcon,
      category: 'ai'
    },
    {
      id: 'mpc-service',
      name: 'Multi-Party Compute',
      description: 'Secure computation protocols',
      port: '8099',
      icon: ShieldCheckIcon,
      category: 'crypto'
    },
    {
      id: 'fhe-service',
      name: 'Homomorphic Encryption',
      description: 'Compute on encrypted data',
      port: '8095',
      icon: ShieldCheckIcon,
      category: 'crypto'
    },
    {
      id: 'qkd-service',
      name: 'Quantum Key Distribution',
      description: 'Quantum-safe cryptography',
      port: '8100',
      icon: ShieldCheckIcon,
      category: 'crypto'
    },
    {
      id: 'spring-gateway',
      name: 'Spring Gateway',
      description: 'API gateway & routing',
      port: '8000',
      icon: GlobeAltIcon,
      category: 'gateway'
    },
    {
      id: 'rust-gateway',
      name: 'Rust Gateway',
      description: 'High-performance gateway',
      port: '8088',
      icon: GlobeAltIcon,
      category: 'gateway'
    },
    {
      id: 'grafana',
      name: 'Grafana',
      description: 'Monitoring dashboards',
      port: '3000',
      icon: ChartBarIcon,
      category: 'monitoring'
    },
    {
      id: 'prometheus',
      name: 'Prometheus',
      description: 'Metrics collection',
      port: '9090',
      icon: ChartBarIcon,
      category: 'monitoring'
    },
    {
      id: 'zipkin',
      name: 'Zipkin',
      description: 'Distributed tracing',
      port: '9411',
      icon: EyeIcon,
      category: 'monitoring'
    },
    {
      id: 'neo4j',
      name: 'Neo4j',
      description: 'Graph database',
      port: '7474',
      icon: ServerIcon,
      category: 'data'
    }
  ]

  useEffect(() => {
    // Simulate service health checks
    const checkHealth = () => {
      const statuses = {}
      services.forEach(service => {
        statuses[service.id] = Math.random() > 0.1 ? 'UP' : 'DOWN'
      })
      setServiceStatuses(statuses)
    }
    
    checkHealth()
    const interval = setInterval(checkHealth, 30000)
    return () => clearInterval(interval)
  }, [])

  const categories = {
    core: { name: 'Core Banking', color: 'from-titan-600 to-titan-800' },
    ai: { name: 'AI/ML Services', color: 'from-purple-600 to-purple-800' },
    crypto: { name: 'Cryptography', color: 'from-crypto-500 to-crypto-700' },
    gateway: { name: 'Gateways', color: 'from-green-600 to-green-800' },
    monitoring: { name: 'Monitoring', color: 'from-orange-600 to-orange-800' },
    data: { name: 'Data Services', color: 'from-blue-600 to-blue-800' }
  }

  return (
    <div className="space-y-8">
      {Object.entries(categories).map(([categoryId, category]) => (
        <div key={categoryId}>
          <div className={`bg-gradient-to-r ${category.color} rounded-lg p-4 mb-4`}>
            <h2 className="text-xl font-bold text-white">{category.name}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services
              .filter(service => service.category === categoryId)
              .map(service => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  icon={service.icon}
                  status={serviceStatuses[service.id] || 'CHECKING'}
                  onClick={() => onServiceSelect(service)}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}
