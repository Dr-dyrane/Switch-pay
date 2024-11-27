import axios from 'axios'

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://switch-isw-transfer-service.sayswitchgroup.com',
})

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})

export const generateToken = async (username: string, password: string) => {
  const response = await apiClient.get('/isw-transfer-service/generate/token', {
    auth: {
      username,
      password,
    },
  })
  return response.data
}

export const listFinancialInstitutions = async () => {
  const response = await apiClient.get('/isw-transfer-service/list/financial/institutions')
  return response.data
}

export const accountEnquiry = async (enquiryData: {
  destinationAccountNumber: string
  sourceAccountNumber: string
  sourceAccountName: string
  destinationInstitutionCode: string
  transactionAmount: number
  currencyCode: number
  clientRef: string
  mobileNumber: string
  emailAddress: string
  channelCode: number
}) => {
  const response = await apiClient.post('/isw-transfer-service/account/enquiry', enquiryData)
  return response.data
}

export const creditTransfer = async (transferData: {
  transactionAmount: number
  clientRef: string
  transactionReference: string
  narration: string
}) => {
  const response = await apiClient.post('/isw-transfer-service/credit/transfer', transferData)
  return response.data
}

export const requeryTransaction = async (clientRef: string) => {
  const response = await apiClient.post('/isw-transfer-service/requery/transaction', { clientRef })
  return response.data
}

export default apiClient

