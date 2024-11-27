import { generateToken, listFinancialInstitutions, accountEnquiry, creditTransfer, requeryTransaction } from '@/lib/api-client'

// Mock axios
jest.mock('axios', () => ({
  create: jest.fn(() => ({
    interceptors: {
      request: { use: jest.fn() },
    },
    get: jest.fn(),
    post: jest.fn(),
  })),
}))

describe('API Client', () => {
  it('generates token', async () => {
    const mockResponse = { data: { access_token: 'test_token' } }
    const axios = require('axios')
    axios.create().get.mockResolvedValue(mockResponse)

    const result = await generateToken('username', 'password')
    expect(result).toEqual(mockResponse.data)
  })

  it('lists financial institutions', async () => {
    const mockResponse = { data: { institutions: [] } }
    const axios = require('axios')
    axios.create().get.mockResolvedValue(mockResponse)

    const result = await listFinancialInstitutions()
    expect(result).toEqual(mockResponse.data)
  })

  // Add more tests for accountEnquiry, creditTransfer, and requeryTransaction
})

