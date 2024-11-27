import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-primary">Welcome to SwitchPay</h1>
      <Link href="/transfer">
        <Button className="bg-primary hover:bg-primary-dark text-white text-lg py-3 px-6">
          New Transfer
        </Button>
      </Link>
    </div>
  )
}

