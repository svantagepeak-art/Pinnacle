export const dynamic = 'force-dynamic'

'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useTransfer } from '@/lib/transfer-context'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { CheckCircle, AlertCircle, Clock, Download, Share2, Home } from 'lucide-react'

export default function TransactionResultPage() {
  const router = useRouter()
  const { transferData, resetTransfer } = useTransfer()
  const { user } = useAuth()

  const isApproved = transferData.status === 'approved'
  const isRejected = transferData.status === 'rejected'
  const isUnderReview = transferData.status === 'under-review'

  const handleDownloadReceipt = () => {
    alert('Receipt downloaded!')
  }

  const handleShareTransactionId = () => {
    alert(`Transaction ID: ${transferData.transactionReference}\nCopied to clipboard!`)
  }

  const handleBackToDashboard = () => {
    resetTransfer()
    router.push('/dashboard')
  }

  const totalDebit = (transferData.amount || 0) + (transferData.fees || 0)

  return (
    <div className="min-h-screen bg-slate-900 p-6 flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Result Icon */}
        <div className="text-center mb-8">
          <div className={`inline-flex p-4 rounded-full mb-4 ${
            isApproved ? 'bg-green-500/20' :
            isRejected ? 'bg-red-500/20' :
            'bg-amber-500/20'
          }`}>
            {isApproved ? (
              <CheckCircle className="w-10 h-10 text-green-400" />
            ) : isRejected ? (
              <AlertCircle className="w-10 h-10 text-red-400" />
            ) : (
              <Clock className="w-10 h-10 text-amber-400" />
            )}
          </div>

          <h1 className={`text-3xl font-bold mb-2 ${
            isApproved ? 'text-green-400' :
            isRejected ? 'text-red-400' :
            'text-amber-400'
          }`}>
            {isApproved ? 'Transfer Approved' :
             isRejected ? 'Transfer Rejected' :
             'Transfer Under Review'}
          </h1>

          <p className="text-slate-400">
            {isApproved ? 'Your transfer has been processed successfully' :
             isRejected ? 'Your transfer could not be processed' :
             'Your transfer is being reviewed by our security team'}
          </p>
        </div>

        {/* Transaction Details */}
        <div className="bg-slate-800 rounded-lg p-6 space-y-4 mb-6">
          {/* Amount */}
          <div className="border-b border-slate-700 pb-4">
            <p className="text-slate-400 text-xs uppercase tracking-wider mb-2">Transfer Amount</p>
            <p className="text-3xl font-bold text-white">${transferData.amount?.toLocaleString()}</p>
          </div>

          {/* Transaction Reference */}
          <div className="border-b border-slate-700 pb-4">
            <p className="text-slate-400 text-xs uppercase tracking-wider mb-2">Transaction Reference</p>
            <p className="text-white font-mono text-sm bg-slate-700/50 p-2 rounded">{transferData.transactionReference}</p>
          </div>

          {/* From/To */}
          <div className="space-y-3">
            <div>
              <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">From</p>
              <div className="bg-slate-700/50 p-3 rounded">
                <p className="text-white font-semibold text-sm">{user?.name}</p>
                <p className="text-slate-400 text-xs">{user?.accountNumber}</p>
              </div>
            </div>

            <div>
              <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">To</p>
              <div className="bg-slate-700/50 p-3 rounded">
                <p className="text-white font-semibold text-sm">{transferData.selectedBeneficiary?.accountName}</p>
                <p className="text-slate-400 text-xs">{transferData.selectedBeneficiary?.bankName}</p>
              </div>
            </div>
          </div>

          {/* Fees & Total */}
          {transferData.fees > 0 && (
            <div className="border-t border-slate-700 pt-4">
              <div className="flex justify-between mb-2">
                <span className="text-slate-300">Fees</span>
                <span className="text-white">${transferData.fees?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between bg-amber-500/10 p-2 rounded">
                <span className="text-amber-300 font-semibold">Total Debit</span>
                <span className="text-amber-300 font-bold">${totalDebit.toFixed(2)}</span>
              </div>
            </div>
          )}

          {/* Status Message */}
          {isUnderReview && (
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <p className="text-amber-300 text-sm">
                Your transaction is being reviewed. You'll receive an update within 24 hours.
              </p>
            </div>
          )}

          {isRejected && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <p className="text-red-300 text-sm">
                Contact support for more information about why this transaction was rejected.
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mb-6">
          <div className="flex gap-2">
            <Button
              onClick={handleDownloadReceipt}
              variant="outline"
              className="flex-1 flex items-center justify-center gap-2 bg-transparent"
            >
              <Download className="w-4 h-4" />
              Receipt
            </Button>
            <Button
              onClick={handleShareTransactionId}
              variant="outline"
              className="flex-1 flex items-center justify-center gap-2 bg-transparent"
            >
              <Share2 className="w-4 h-4" />
              Share
            </Button>
          </div>

          <Button
            onClick={handleBackToDashboard}
            className="w-full bg-amber-500 hover:bg-amber-600 flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </div>

        {/* Additional Info */}
        <div className="bg-slate-700/50 rounded-lg p-4 text-center">
          <p className="text-slate-400 text-xs">
            A confirmation email has been sent to your registered email address.
          </p>
        </div>
      </div>
    </div>
  )
}
