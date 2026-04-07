# Titan Banking UI/UX - Service Management Console

A modern, responsive web interface for managing all 20 Titan Banking microservices with real-time monitoring and interactive controls.

## 🚀 Features

### Service Management
- **20 Service Integration**: Connect to all Titan Banking services
- **Real-time Status**: Live health monitoring with visual indicators
- **Interactive Panels**: Execute service actions with one click
- **Category Organization**: Services grouped by function (Core, AI, Crypto, etc.)

### Modern UI/UX
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Glass Morphism**: Modern frosted glass design elements
- **Smooth Animations**: Framer Motion powered transitions
- **Dark/Light Themes**: Adaptive color schemes
- **Toast Notifications**: Real-time feedback for all actions

### Dashboard Analytics
- **Real-time Metrics**: Transaction volume, active users, system load
- **Interactive Charts**: 24-hour trend visualization
- **Service Health Grid**: Visual status of all services
- **Quick Actions**: One-click common operations

### Service Categories

#### 🏦 Core Banking (3 services)
- Core Banking API (8080) - Transaction processing
- Notifications Service (8084) - SMS/Email delivery  
- Promotions Service (8083) - Cashback & loyalty

#### 🤖 AI/ML Services (4 services)
- AI Service (50051) - Fraud detection & risk analysis
- Edge AI (8001) - Real-time recommendations
- Federated Learning (8098) - Distributed ML training

#### 🔐 Cryptography (3 services)
- Multi-Party Compute (8099) - Secure computation
- Homomorphic Encryption (8095) - Compute on encrypted data
- Quantum Key Distribution (8100) - Quantum-safe crypto

#### 🌐 Gateways (2 services)
- Spring Gateway (8000) - API gateway & routing
- Rust Gateway (8088) - High-performance gateway

#### 📊 Monitoring (3 services)
- Grafana (3000) - Monitoring dashboards
- Prometheus (9090) - Metrics collection
- Zipkin (9411) - Distributed tracing

#### 🗄️ Data Services (5 services)
- PostgreSQL (5432) - Primary database
- Redis (6379) - Caching & sessions
- Kafka (9092) - Event streaming
- Neo4j (7474) - Graph database
- Loki (3100) - Log aggregation

## 🛠 Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Charts**: Recharts for data visualization
- **HTTP Client**: Axios with service proxying
- **Notifications**: React Hot Toast
- **Icons**: Heroicons

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
npm start
```

## 🌐 Access URLs

- **UI Console**: http://localhost:3000
- **All Services**: Accessible through the UI with proxy routing

## 📱 Mobile Responsive

The interface adapts to all screen sizes:
- **Desktop**: Full sidebar with grid layout
- **Tablet**: Collapsible sidebar with responsive grid
- **Mobile**: Slide-out navigation with stacked cards

## 🎨 Design Features

### Glass Morphism
- Frosted glass cards with backdrop blur
- Subtle transparency effects
- Modern depth and layering

### Animations
- Smooth page transitions
- Hover effects on interactive elements
- Loading states with spinners
- Pulse animations for status indicators

### Color Scheme
- **Primary**: Titan blue gradient
- **Secondary**: Purple for AI/ML services
- **Success**: Green for healthy services
- **Warning**: Orange for monitoring
- **Error**: Red for down services

## 🔧 Service Integration

Each service panel provides:
- **Health Checks**: Real-time status monitoring
- **Action Buttons**: Execute common operations
- **Response Display**: View API responses
- **Direct Links**: Open service URLs in browser
- **Log Access**: View recent service logs

## 📊 Dashboard Metrics

Real-time tracking of:
- **Transaction Volume**: 24-hour trend charts
- **Active Users**: Current user sessions
- **System Load**: Resource utilization
- **Service Uptime**: Availability percentages

## 🔄 Auto-Refresh

- Service status updates every 30 seconds
- Metrics refresh every 5 seconds
- Charts update with live data
- Toast notifications for status changes

## 🎯 Quick Actions

One-click operations:
- Process transactions
- Send notifications
- Run AI analysis
- Generate reports
- View service logs
- Open monitoring dashboards

---

**🎉 Complete Titan Banking ecosystem management in one beautiful interface!**
