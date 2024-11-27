'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { listFinancialInstitutions, accountEnquiry, creditTransfer } from '@/lib/api-client'
import { bankCodes } from '@/lib/bankCodes'

const transferSchema = z.object({
  accountNumber: z.string().length(10, 'Account number must be 10 digits'),
  bankId: z.string().min(1, 'Please select a bank'),
  amount: z.number().min(1, 'Amount must be greater than 0'),
  otp: z.string().length(6, 'OTP must be 6 digits'),
})

type TransferFormData = z.infer<typeof transferSchema>

export default function TransferPage() {
  // const [banks, setBanks] = useState<{ id: string; name: string }[]>([])
  const [accountName, setAccountName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [step, setStep] = useState(1)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<TransferFormData>({
    resolver: zodResolver(transferSchema),
  })

  const accountNumber = watch('accountNumber')
  const selectedBank = watch('bankId')

  // useState(() => {
  //   listFinancialInstitutions().then(data => {
  //     setBanks(data.institutions.map((inst: any) => ({ id: inst.institutionCode, name: inst.institutionName })))
  //   }).catch(() => {
  //     setError('Failed to fetch banks')
  //   })
  // }, [])

  const handleGetAccountName = async () => {
    if (!accountNumber || !selectedBank) return

    setIsLoading(true)
    setError('')

    try {
      const data = await accountEnquiry({
        destinationAccountNumber: accountNumber,
        sourceAccountNumber: '', // Add source account number
        sourceAccountName: '', // Add source account name
        destinationInstitutionCode: selectedBank,
        transactionAmount: 0,
        currencyCode: 566, // NGN
        clientRef: Date.now().toString(),
        mobileNumber: '', // Add mobile number
        emailAddress: '', // Add email address
        channelCode: 1, // Assuming 1 is for web channel
      })
      setAccountName(data.accountName)
      setStep(2)
    } catch (err) {
      setError('Failed to fetch account name')
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmit = async (data: TransferFormData) => {
    setIsLoading(true)
    setError('')

    try {
      await creditTransfer({
        transactionAmount: data.amount,
        clientRef: Date.now().toString(),
        transactionReference: Date.now().toString(),
        narration: `Transfer to ${accountName}`,
      })
      setStep(3)
    } catch (err) {
      setError('Transfer failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader className="bg-primary text-white">
          <CardTitle>New Transfer</CardTitle>
        </CardHeader>
        <CardContent className="mt-4">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {step === 1 && (
              <>
                <Input
                  {...register('accountNumber')}
                  placeholder="Account Number"
                />
                {errors.accountNumber && <p className="text-red-500 text-sm mt-1">{errors.accountNumber.message}</p>}
                <Select onValueChange={(value) => setValue('bankId', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Bank" />
                  </SelectTrigger>
                  <SelectContent>
                    {bankCodes.map((bank) => (
                      // <SelectItem key={bank.id} value={bank.id}>
                      <SelectItem key={bank.code} value={bank.code}>
                        {bank.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.bankId && <p className="text-red-500 text-sm mt-1">{errors.bankId.message}</p>}
                <Button type="button" onClick={handleGetAccountName} className="w-full bg-primary hover:bg-primary-dark" disabled={isLoading}>
                  {isLoading ? 'Fetching...' : 'Get Account Name'}
                </Button>
              </>
            )}
            {step === 2 && (
              <>
                <div className="bg-gray-100 p-4 rounded-md mb-4">
                  <p><strong>Account Name:</strong> {accountName}</p>
                  <p><strong>Account Number:</strong> {accountNumber}</p>
                  <p><strong>Bank:</strong> {banks.find(b => b.id === selectedBank)?.name}</p>
                </div>
                <Input
                  {...register('amount', { valueAsNumber: true })}
                  type="number"
                  placeholder="Amount"
                />
                {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>}
                <Input
                  {...register('otp')}
                  type="text"
                  placeholder="OTP"
                />
                {errors.otp && <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>}
                <Button type="submit" className="w-full bg-primary hover:bg-primary-dark" disabled={isLoading}>
                  {isLoading ? 'Processing...' : 'Submit Transfer'}
                </Button>
              </>
            )}
            {step === 3 && (
              <div className="text-center">
                <h2 className="text-2xl font-bold text-primary mb-4">Transfer Successful!</h2>
                <p>Your transfer has been processed successfully.</p>
                <Button onClick={() => setStep(1)} className="mt-4 bg-primary hover:bg-primary-dark">
                  New Transfer
                </Button>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

