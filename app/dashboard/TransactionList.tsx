import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

async function getTransactions() {
  // This is where you'd fetch the transactions from your API
  // For now, we'll use mock data
  await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API delay
  return [
    { id: 1, date: '2023-05-01', amount: 1000, recipient: 'John Doe', status: 'Completed' },
    { id: 2, date: '2023-05-02', amount: 500, recipient: 'Jane Smith', status: 'Pending' },
    { id: 3, date: '2023-05-03', amount: 750, recipient: 'Bob Johnson', status: 'Completed' },
  ]
}

export default async function TransactionList() {
  const transactions = await getTransactions()

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Recipient</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell>{transaction.date}</TableCell>
            <TableCell>{transaction.amount}</TableCell>
            <TableCell>{transaction.recipient}</TableCell>
            <TableCell>{transaction.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

