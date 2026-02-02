'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface Transaction {
  id: string
  date: string
  type: 'transfer' | 'bill_payment' | 'deposit' | 'withdrawal'
  amount: number
  recipient?: string
  status: 'completed' | 'pending' | 'failed'
  description: string
}

interface TransactionContextType {
  transactions: Transaction[]
  addTransaction: (transaction: Transaction) => void
  getTransactions: () => Transaction[]
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined)

export function TransactionProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 'TXN001',
      date: new Date(Date.now() - 86400000).toISOString(),
      type: 'transfer',
      amount: 500,
      recipient: 'Jane Smith',
      status: 'completed',
      description: 'Transfer to Jane Smith',
    },
    {
      id: 'TXN002',
      date: new Date(Date.now() - 172800000).toISOString(),
      type: 'bill_payment',
      amount: 150,
      recipient: 'Electricity Provider',
      status: 'completed',
      description: 'Electricity Bill Payment',
    },
  ])

  const addTransaction = (transaction: Transaction) => {
    setTransactions([transaction, ...transactions])
  }

  const getTransactions = () => transactions

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction, getTransactions }}>
      {children}
    </TransactionContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionContext)
  if (context === undefined) {
    throw new Error('useTransactions must be used within a TransactionProvider')
  }
  return context
}
