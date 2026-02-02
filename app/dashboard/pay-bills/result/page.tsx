export const dynamic = 'force-dynamic'

'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, Download, Share2, Home } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function BillPaymentResultPage() {
  const [paymentData, setPaymentData] = useState<any>(null)

  useEffect(() => {
    const data = sessionStorage.getItem('billPaymentData')
    if (data) {
      setPaymentData(JSON.parse(data))
    }
  }, [])

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-2xl mx-auto">
        {/* Success Card */}
        <div className="bg-green-950/30 border border-green-900 rounded-lg p-12 text-center mb-8">
          <CheckCircle className="w-24 h-24 text-green-400 mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-2 text-green-400">Payment Successful</h1>
          <p className="text-slate-300 text-lg">Your bill payment has been processed</p>
        </div>

        {paymentData && (
          <>
            {/* Transaction Details */}
            <div className="bg-slate-800 rounded-lg p-8 border border-slate-700 mb-6">
              <h2 className="text-xl font-semibold mb-6">Transaction Details</h2>

              <div className="space-y-4">
                <div className="flex justify-between pb-4 border-b border-slate-700">
                  <p className="text-slate-400">Transaction Reference</p>
                  <p className="font-mono text-amber-400">PVT{Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
                </div>

                <div className="flex justify-between pb-4 border-b border-slate-700">
                  <p className="text-slate-400">Biller</p>
                  <p className="font-semibold">{paymentData.billerName}</p>
                </div>

                <div className="flex justify-between pb-4 border-b border-slate-700">
                  <p className="text-slate-400">Amount Paid</p>
                  <p className="font-semibold text-amber-400">${paymentData.amount.toFixed(2)}</p>
                </div>

                <div className="flex justify-between pb-4 border-b border-slate-700">
                  <p className="text-slate-400">Payment Fee</p>
                  <p className="font-semibold">${(paymentData.amount * 0.015).toFixed(2)}</p>
                </div>

                <div className="flex justify-between text-lg font-bold text-amber-400">
                  <p>Total Debit</p>
                  <p>${(paymentData.amount + paymentData.amount * 0.015).toFixed(2)}</p>
                </div>

                <div className="flex justify-between pt-4 border-t border-slate-700 text-slate-400">
                  <p>Date & Time</p>
                  <p>{new Date().toLocaleString()}</p>
                </div>

                <div className="flex justify-between text-slate-400">
                  <p>Status</p>
                  <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm font-semibold">Completed</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Button className="bg-slate-700 hover:bg-slate-600 flex items-center justify-center gap-2">
                <Download className="w-5 h-5" />
                Download Receipt
              </Button>
              <Button className="bg-slate-700 hover:bg-slate-600 flex items-center justify-center gap-2">
                <Share2 className="w-5 h-5" />
                Share Payment
              </Button>
              <Link href="/dashboard" className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition">
                <Home className="w-5 h-5" />
                Dashboard
              </Link>
            </div>
          </>
        )}

        {/* Next Steps */}
        <div className="bg-blue-950/30 border border-blue-900 rounded-lg p-6">
          <h3 className="font-semibold text-blue-300 mb-3">What's Next?</h3>
          <ul className="space-y-2 text-sm text-blue-200">
            <li className="flex items-start gap-2">
              <span className="font-bold">1.</span>
              <span>Your receipt has been saved and will also be sent to your email</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">2.</span>
              <span>The bill will reflect in your biller's account within 24 hours</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">3.</span>
              <span>You can track this transaction in your statement</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
