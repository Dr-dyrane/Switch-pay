'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { requeryTransaction } from '@/lib/api-client'

const statusSchema = z.object({
  clientRef: z.string().min(1, 'Client reference is required'),
})

type StatusFormData = z.infer<typeof statusSchema>

export default function TransactionStatusPage() {
  const [status, setStatus] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StatusFormData>({
    resolver: zodResolver(statusSchema),
  })

  const onSubmit = async (data: StatusFormData) => {
    setIsLoading(true)
    setError('')
    setStatus(null)

    try {
      const result = await requeryTransaction(data.clientRef)
      setStatus(result)
    } catch (err) {
      setError('Failed to fetch transaction status')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader className="bg-primary text-white">
          <CardTitle>Transaction Status</CardTitle>
        </CardHeader>
        <CardContent className="mt-4">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input
                {...register('clientRef')}
                placeholder="Client Reference"
              />
              {errors.clientRef && <p className="text-red-500 text-sm mt-1">{errors.clientRef.message}</p>}
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary-dark" disabled={isLoading}>
              {isLoading ? 'Fetching...' : 'Check Status'}
            </Button>
          </form>
          {status && (
            <div className="mt-4 p-4 bg-gray-100 rounded-md">
              <h3 className="font-bold mb-2 text-primary">Transaction Status:</h3>
              <p><span className="font-semibold">Status:</span> {status.status}</p>
              <p><span className="font-semibold">Response Code:</span> {status.responseCode}</p>
              <p><span className="font-semibold">Response Message:</span> {status.responseMessage}</p>
              <p><span className="font-semibold">Transaction Reference:</span> {status.transactionReference}</p>
              <p><span className="font-semibold">Settlement Status:</span> {status.settlementStatus}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

