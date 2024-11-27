import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TransactionStatusLoading() {
  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader className="bg-primary text-white">
          <CardTitle>Transaction Status</CardTitle>
        </CardHeader>
        <CardContent className="mt-4 space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <div className="mt-4 p-4 bg-gray-100 rounded-md space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

