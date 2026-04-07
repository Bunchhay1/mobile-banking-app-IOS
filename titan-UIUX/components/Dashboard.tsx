import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

const Dashboard = () => {
  const [metrics, setMetrics] = useState({
    transactions: 0,
    activeUsers: 0,
    systemLoad: 0,
    uptime: '99.9%'
  })

  const [chartData, setChartData] = useState([])

  useEffect(() => {
    // Simulate real-time metrics
    const updateMetrics = () => {
      setMetrics({
        transactions: Math.floor(Math.random() * 10000) + 50000,
        activeUsers: Math.floor(Math.random() * 1000) + 5000,
        systemLoad: Math.floor(Math.random() * 30) + 40,
        uptime: '99.9%'
      })

      // Generate chart data
      const data = Array.from({ length: 24 }, (_, i) => ({
        hour: `${i}:00`,
        transactions: Math.floor(Math.random() * 1000) + 500,
        users: Math.floor(Math.random() * 200) + 100,
        load: Math.floor(Math.random() * 50) + 25
      }))
      setChartData(data)
    }

    updateMetrics()
    const interval = setInterval(updateMetrics, 5000)
    return () => clearInterval(interval)
  }, [])

  const MetricCard = ({ title, value, change, color }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="card"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`text-sm font-medium ${color}`}>
          {change}
        </div>
      </div>
    </motion.div>
  )

  return (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Transactions"
          value={metrics.transactions.toLocaleString()}
          change="+12.5%"
          color="text-green-600"
        />
        <MetricCard
          title="Active Users"
          value={metrics.activeUsers.toLocaleString()}
          change="+8.2%"
          color="text-green-600"
        />
        <MetricCard
          title="System Load"
          value={`${metrics.systemLoad}%`}
          change="-2.1%"
          color="text-red-600"
        />
        <MetricCard
          title="Uptime"
          value={metrics.uptime}
          change="Stable"
          color="text-green-600"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Transaction Volume */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Transaction Volume (24h)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="transactions" 
                stroke="#0ea5e9" 
                strokeWidth={2}
                dot={{ fill: '#0ea5e9' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* System Load */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Load (24h)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="load" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Service Status */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Health Status</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            'Core Banking', 'Notifications', 'Promotions', 'AI Service',
            'Edge AI', 'MPC Service', 'FHE Service', 'QKD Service',
            'Spring Gateway', 'Rust Gateway', 'Grafana', 'Prometheus'
          ].map((service) => (
            <div key={service} className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse-slow"></div>
              <span className="text-sm text-gray-700">{service}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="btn-primary text-sm">
            Process Transaction
          </button>
          <button className="btn-secondary text-sm">
            Send Notification
          </button>
          <button className="btn-secondary text-sm">
            Run AI Analysis
          </button>
          <button className="btn-secondary text-sm">
            Generate Report
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
