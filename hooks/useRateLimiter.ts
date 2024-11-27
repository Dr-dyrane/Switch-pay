import { useState, useEffect } from 'react'

export function useRateLimiter(limit: number, interval: number) {
  const [count, setCount] = useState(0)
  const [isLimited, setIsLimited] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(0)
      setIsLimited(false)
    }, interval)

    return () => clearInterval(timer)
  }, [interval])

  const increment = () => {
    if (count >= limit) {
      setIsLimited(true)
      return false
    }
    setCount(count + 1)
    return true
  }

  return { isLimited, increment }
}

