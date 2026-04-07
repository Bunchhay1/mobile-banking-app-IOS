import axios from 'axios'

// Service endpoints
export const SERVICES = {
  CORE_BANKING: 'http://localhost:8080',
  NOTIFICATIONS: 'http://localhost:8084', 
  PROMOTIONS: 'http://localhost:8083',
  AI_SERVICE: 'http://localhost:50051',
  EDGE_AI: 'http://localhost:8001',
  FEDERATED_LEARNING: 'http://localhost:8098',
  MPC_SERVICE: 'http://localhost:8099',
  FHE_SERVICE: 'http://localhost:8095',
  QKD_SERVICE: 'http://localhost:8100',
  SPRING_GATEWAY: 'http://localhost:8000',
  RUST_GATEWAY: 'http://localhost:8088',
  GRAFANA: 'http://localhost:3000',
  PROMETHEUS: 'http://localhost:9090',
  ZIPKIN: 'http://localhost:9411',
  NEO4J: 'http://localhost:7474'
}

// API client
const api = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
})

// Banking API
export const bankingAPI = {
  parseTransaction: (transaction: string, idempotencyKey: string) =>
    api.post(`${SERVICES.CORE_BANKING}/api/transactions/parse`, transaction, {
      headers: { 'Idempotency-Key': idempotencyKey, 'Content-Type': 'text/plain' }
    }),
  
  getBalance: (accountId: string) =>
    api.get(`${SERVICES.CORE_BANKING}/api/accounts/${accountId}/balance`),
  
  getTransactions: (accountId: string) =>
    api.get(`${SERVICES.CORE_BANKING}/api/accounts/${accountId}/transactions`),
  
  healthCheck: () =>
    api.get(`${SERVICES.CORE_BANKING}/actuator/health`)
}

// Notifications API
export const notificationsAPI = {
  sendSMS: (phone: string, message: string) =>
    api.post(`${SERVICES.NOTIFICATIONS}/api/notifications/sms`, { phone, message }),
  
  sendEmail: (email: string, subject: string, body: string) =>
    api.post(`${SERVICES.NOTIFICATIONS}/api/notifications/email`, { email, subject, body }),
  
  getPreferences: (userId: string) =>
    api.get(`${SERVICES.NOTIFICATIONS}/api/notifications/preferences/${userId}`)
}

// Promotions API
export const promotionsAPI = {
  getOffers: (userId: string) =>
    api.get(`${SERVICES.PROMOTIONS}/api/promotions/offers/${userId}`),
  
  applyCashback: (transactionId: string) =>
    api.post(`${SERVICES.PROMOTIONS}/api/promotions/cashback/${transactionId}`)
}

// AI Services API
export const aiAPI = {
  detectFraud: (transaction: any) =>
    api.post(`${SERVICES.AI_SERVICE}/fraud/detect`, transaction),
  
  getRecommendations: (userId: string) =>
    api.get(`${SERVICES.EDGE_AI}/recommendations/${userId}`),
  
  trainModel: (data: any) =>
    api.post(`${SERVICES.FEDERATED_LEARNING}/train`, data)
}

// Crypto Services API
export const cryptoAPI = {
  encryptData: (data: any) =>
    api.post(`${SERVICES.FHE_SERVICE}/encrypt`, data),
  
  generateKeys: () =>
    api.post(`${SERVICES.QKD_SERVICE}/keys/generate`),
  
  secureCompute: (computation: any) =>
    api.post(`${SERVICES.MPC_SERVICE}/compute`, computation)
}

// Service health checker
export const checkServiceHealth = async (serviceName: string, url: string) => {
  try {
    const response = await axios.get(`${url}/actuator/health`, { timeout: 5000 })
    return { service: serviceName, status: 'UP', details: response.data }
  } catch (error) {
    return { service: serviceName, status: 'DOWN', error: error.message }
  }
}
