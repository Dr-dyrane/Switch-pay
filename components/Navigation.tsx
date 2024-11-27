'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

export default function Navigation() {
  const { isAuthenticated, logout } = useAuth()
  const pathname = usePathname()

  if (!isAuthenticated) return null

  return (
    <nav className="bg-primary text-white p-4">
      <ul className="flex space-x-4">
        <li>
          <Link href="/dashboard" className={pathname === '/dashboard' ? 'font-bold' : ''}>
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/transfer" className={pathname === '/transfer' ? 'font-bold' : ''}>
            New Transfer
          </Link>
        </li>
        <li>
          <Link href="/transaction-status" className={pathname === '/transaction-status' ? 'font-bold' : ''}>
            Transaction Status
          </Link>
        </li>
        <li>
          <button onClick={logout} className="text-red-200 hover:text-red-100">Logout</button>
        </li>
      </ul>
    </nav>
  )
}

