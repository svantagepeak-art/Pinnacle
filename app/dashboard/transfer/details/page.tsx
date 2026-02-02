export const dynamic = 'force-dynamic'

'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTransfer } from '@/lib/transfer-context'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Check, AlertCircle } from 'lucide-react'

export default function TransferDetailsPage() {
  const router = useRouter()
  const { transferData, updateTransfer } = useTransfer()
  const { user } = useAuth()
  const [amount, setAmount] = useState('')
  const [narration, setNarration] = useState('')
  const [showConfirmation, setShowConfirmation] = useState(false)

  const calculateFees = (amt: number) => {
    if (transferData.transferType === 'international') return amt * 0.015
    if (transferData.transferType === 'other-bank') return amt * 0.005
    return 0
  }

  const amt = parseFloat(amount) || 0
  const fees = calculateFees(amt)
  const totalDebit = amt + fees

  const transactionRef = `PVT${Date.now().toString().slice(-8)}`

  const handleConfirm = () => {
    if (amount && narration) {
      updateTransfer({
        amount: amt,
        narration: narration,
        fees: fees,
        transactionReference: transactionRef,
      })
      setShowConfirmation(true)
    }
  }

  const handleProceedToPin = () => {
    router.push('/dashboard/transfer/pin')
  }

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-amber-400 hover:text-amber-300 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-white mb-2">Transfer Details</h1>
          <p className="text-slate-400">Review and confirm your transfer</p>
        </div>

        {!showConfirmation ? (
          <>
            {/* Form */}
            <div className="bg-slate-800 rounded-lg p-6 mb-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-2">
                  Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-white font-semibold">$</span>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="pl-8 bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-2">
                  Narration / Description
                </label>
                <textarea
                  placeholder="Payment for..."
                  rows={3}
                  value={narration}
                  onChange={(e) => setNarration(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder:text-slate-500 focus:border-amber-400 focus:ring-amber-400/20"
                />
              </div>
            </div>

            <Button
              onClick={handleConfirm}
              disabled={!amount || !narration}
              className="w-full bg-amber-500 hover:bg-amber-600"
            >
              Review Transfer
            </Button>
          </>
        ) : (
          <>
            {/* Confirmation Summary */}
            <div className="bg-slate-800 rounded-lg p-6 space-y-4 mb-6">
              <div className="border-b border-slate-700 pb-4">
                <h3 className="text-xs text-slate-400 uppercase tracking-wider mb-3">From</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-semibold">{user?.name}</p>
                    <p className="text-sm text-slate-400">{user?.accountNumber}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-400">Account Balance</p>
                    <p className="text-lg font-bold text-amber-400">${user?.balance?.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="border-b border-slate-700 pb-4">
                <h3 className="text-xs text-slate-400 uppercase tracking-wider mb-3">To</h3>
                <div>
                  <p className="text-white font-semibold">{transferData.selectedBeneficiary?.accountName}</p>
                  <p className="text-sm text-slate-400">{transferData.selectedBeneficiary?.bankName}</p>
                  <p className="text-xs text-slate-500 font-mono">{transferData.selectedBeneficiary?.accountNumber}</p>
                </div>
              </div>

              <div className="border-b border-slate-700 pb-4">
                <h3 className="text-xs text-slate-400 uppercase tracking-wider mb-3">Transfer Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Amount</span>
                    <span className="text-white font-semibold">${amt.toFixed(2)}</span>
                  </div>
                  {fees > 0 && (
                    <div className="flex justify-between">
                      <span className="text-slate-300">Fees</span>
                      <span className="text-white font-semibold">${fees.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between bg-amber-500/10 p-2 rounded">
                    <span className="text-amber-300 font-semibold">Total Debit</span>
                    <span className="text-amber-300 font-bold">${totalDebit.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Date</span>
                  <span className="text-white">{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Reference</span>
                  <span className="text-white font-mono">{transactionRef}</span>
                </div>
              </div>
            </div>

            {/* Confirmation Notice */}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mb-6 flex gap-3">
              <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-amber-300 text-sm">
                Please review the details carefully. After confirming, you'll need to enter your PIN and verify with your security token.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                onClick={() => setShowConfirmation(false)}
                variant="outline"
                className="flex-1"
              >
                Edit Details
              </Button>
              <Button
                onClick={handleProceedToPin}
                className="flex-1 bg-amber-500 hover:bg-amber-600 flex items-center justify-center gap-2"
              >
                <Check className="w-5 h-5" />
                Confirm & Continue
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
