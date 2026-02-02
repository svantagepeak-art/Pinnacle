export const dynamic = 'force-dynamic'

'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface BillPaymentData {
  billerId: string
  billerName: string
  billerAccount: string
  amount: number
  dueDate: string
}

const calculateFee = (amount: number) => {
  return amount * 0.015 // 1.5% fee
}

export default function BillPaymentDetailsPage() {
  const router = useRouter()
  const [paymentData, setPaymentData] = useState<BillPaymentData | null>(null)

  useEffect(() => {
    const data = sessionStorage.getItem('billPaymentData')
    if (data) {
      setPaymentData(JSON.parse(data))
    }
  }, [])

  if (!paymentData) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <p className="text-xl">No payment data found. Please start again.</p>
          <Link href="/dashboard/pay-bills" className="text-amber-400 hover:text-amber-300 mt-4 inline-block">
            Back to Pay Bills
          </Link>
        </div>
      </div>
    )
  }

  const fee = calculateFee(paymentData.amount)
  const totalDebit = paymentData.amount + fee

  const handleConfirm = () => {
    sessionStorage.setItem('billPaymentData', JSON.stringify(paymentData))
    router.push('/dashboard/pay-bills/pin')
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <Link href="/dashboard/pay-bills" className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 mb-4">
          <ArrowLeft className="w-5 h-5" />
          Back to Billers
        </Link>
        <h1 className="text-4xl font-bold mb-2">Payment Confirmation</h1>
        <p className="text-slate-400">Review and confirm your bill payment details</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payment Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Sender Information */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              Payment From
            </h2>
            <div className="space-y-2">
              <p className="text-slate-400 text-sm">Account Holder</p>
              <p className="text-xl font-semibold">Mark David</p>
              <p className="text-slate-500 text-sm">CHK-9876543210</p>
            </div>
          </div>

          {/* Recipient Information */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              Payment To
            </h2>
            <div className="space-y-2">
              <p className="text-slate-400 text-sm">Biller Name</p>
              <p className="text-xl font-semibold">{paymentData.billerName}</p>
              <p className="text-slate-500 text-sm">Account: {paymentData.billerAccount}</p>
              <p className="text-slate-500 text-sm">Due Date: {new Date(paymentData.dueDate).toLocaleDateString()}</p>
            </div>
          </div>

          {/* Transaction Summary */}
          <div className="bg-amber-950/30 border border-amber-900 rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Transaction Summary</h2>
            <div className="space-y-3 mb-4 pb-4 border-b border-slate-700">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Amount</span>
                <span className="font-semibold">${paymentData.amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Payment Fee (1.5%)</span>
                <span className="font-semibold text-amber-400">${fee.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Total Debit</span>
              <span className="text-2xl font-bold text-amber-400">${totalDebit.toFixed(2)}</span>
            </div>
          </div>

          {/* Additional Details */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h2 className="text-lg font-semibold mb-4">Additional Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-slate-400 text-sm mb-1">Transaction Date</p>
                <p className="font-semibold">{new Date().toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm mb-1">Transaction Reference</p>
                <p className="font-mono text-sm">PVT{Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Summary Card */}
          <div className="bg-gradient-to-br from-amber-600 to-amber-700 rounded-lg p-6 text-white">
            <p className="text-sm text-amber-100 mb-2">Payment Summary</p>
            <h3 className="text-2xl font-bold mb-4">{paymentData.billerName}</h3>

            <div className="space-y-3 text-sm mb-6">
              <div className="bg-white/10 rounded p-3">
                <p className="text-amber-100 mb-1">Amount</p>
                <p className="text-2xl font-bold">${paymentData.amount.toFixed(2)}</p>
              </div>
              <div className="bg-white/10 rounded p-3">
                <p className="text-amber-100 mb-1">Total with Fee</p>
                <p className="text-2xl font-bold">${totalDebit.toFixed(2)}</p>
              </div>
            </div>

            <Button onClick={handleConfirm} className="w-full bg-white text-amber-600 hover:bg-amber-50 font-bold py-3">
              Confirm & Continue
            </Button>
          </div>

          {/* Security Info */}
          <div className="bg-blue-950/30 border border-blue-900 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-blue-300 mb-1">Secure Payment</p>
                <p className="text-xs text-blue-200">Next, you'll verify this payment with your PIN and security stages.</p>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
            <p className="text-xs text-slate-400 leading-relaxed">
              By confirming this payment, you authorize Pinnacle Vault Trust to debit your account for the amount shown above. This transaction is subject to our verification procedures.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
