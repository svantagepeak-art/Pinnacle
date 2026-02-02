import React from 'react'
import { CheckCircle, AlertCircle, Clock } from 'lucide-react'

interface TransactionStatusProps {
  status: 'success' | 'pending' | 'failed'
  title: string
  message: string
  reference?: string
}

export function TransactionStatus({
  status,
  title,
  message,
  reference,
}: TransactionStatusProps) {
  const statusConfig = {
    success: {
      icon: CheckCircle,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30',
    },
    pending: {
      icon: Clock,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/30',
    },
    failed: {
      icon: AlertCircle,
      color: 'text-red-400',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/30',
    },
  }

  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <div className={`rounded-lg border p-6 text-center ${config.bgColor} ${config.borderColor}`}>
      <Icon className={`w-16 h-16 mx-auto mb-4 ${config.color}`} />
      <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
      <p className="text-slate-300 mb-4">{message}</p>
      {reference && (
        <div className="bg-slate-800 rounded p-3 mt-4">
          <p className="text-sm text-slate-400">Transaction Reference</p>
          <p className="text-lg font-mono text-amber-400">{reference}</p>
        </div>
      )}
    </div>
  )
}
