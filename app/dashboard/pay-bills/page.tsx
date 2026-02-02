export const dynamic = 'force-dynamic'

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { usePageTitle } from '@/lib/title-context'
import { ArrowLeft, Plus, Clock, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface Biller {
  id: string
  name: string
  accountNumber: string
  dueDate: string
  amountDue: number
  status: 'pending' | 'paid'
  logo: string
}

const SAMPLE_BILLERS: Biller[] = [
  {
    id: 'bill-1',
    name: 'Electric Company',
    accountNumber: 'ACC-00123',
    dueDate: '2024-02-15',
    amountDue: 145.50,
    status: 'pending',
    logo: '⚡',
  },
  {
    id: 'bill-2',
    name: 'Internet Provider',
    accountNumber: 'ACC-00456',
    dueDate: '2024-02-20',
    amountDue: 89.99,
    status: 'pending',
    logo: '📡',
  },
  {
    id: 'bill-3',
    name: 'Water Utility',
    accountNumber: 'ACC-00789',
    dueDate: '2024-02-25',
    amountDue: 52.30,
    status: 'pending',
    logo: '💧',
  },
]

export default function PayBillsPage() {
  usePageTitle('PAY BILLS')
  const router = useRouter()
  const [selectedBiller, setSelectedBiller] = useState<Biller | null>(null)
  const [customAmount, setCustomAmount] = useState('')

  const handleSelectBiller = (biller: Biller) => {
    setSelectedBiller(biller)
    setCustomAmount('')
  }

  const handleProceed = () => {
    if (selectedBiller) {
      const amount = customAmount || selectedBiller.amountDue.toString()
      sessionStorage.setItem(
        'billPaymentData',
        JSON.stringify({
          billerId: selectedBiller.id,
          billerName: selectedBiller.name,
          billerAccount: selectedBiller.accountNumber,
          amount: parseFloat(amount),
          dueDate: selectedBiller.dueDate,
        })
      )
      router.push('/dashboard/pay-bills/details')
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 mb-4">
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Pay Bills</h1>
            <p className="text-slate-400">Select a biller and pay your bills securely</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-400">Total Due</p>
            <p className="text-3xl font-bold text-amber-400">
              ${SAMPLE_BILLERS.reduce((sum, b) => sum + b.amountDue, 0).toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Billers List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold mb-4">Your Saved Billers</h2>

          {SAMPLE_BILLERS.map((biller) => (
            <div
              key={biller.id}
              onClick={() => handleSelectBiller(biller)}
              className={`p-6 rounded-lg border-2 cursor-pointer transition ${
                selectedBiller?.id === biller.id
                  ? 'bg-slate-700 border-amber-400'
                  : 'bg-slate-800 border-slate-700 hover:border-slate-600'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{biller.logo}</div>
                  <div>
                    <h3 className="font-semibold text-lg">{biller.name}</h3>
                    <p className="text-sm text-slate-400">Account: {biller.accountNumber}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-amber-400">${biller.amountDue.toFixed(2)}</p>
                  <p className="text-xs text-slate-400">Amount Due</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-slate-400">
                  <Clock className="w-4 h-4" />
                  Due: {new Date(biller.dueDate).toLocaleDateString()}
                </div>
                {selectedBiller?.id === biller.id && (
                  <span className="bg-amber-500 text-slate-900 px-3 py-1 rounded-full text-xs font-semibold">
                    Selected
                  </span>
                )}
              </div>
            </div>
          ))}

          {/* Add New Biller */}
          <button className="w-full p-6 rounded-lg border-2 border-dashed border-slate-600 hover:border-slate-500 transition text-slate-400 hover:text-slate-300 flex items-center justify-center gap-2">
            <Plus className="w-5 h-5" />
            Add New Biller
          </button>
        </div>

        {/* Payment Details Sidebar */}
        <div className="space-y-6">
          {selectedBiller ? (
            <>
              {/* Selected Biller Summary */}
              <div className="bg-gradient-to-br from-amber-600 to-amber-700 rounded-lg p-6 text-white">
                <p className="text-sm text-amber-100 mb-2">Selected Biller</p>
                <h3 className="text-2xl font-bold mb-4">{selectedBiller.name}</h3>

                <div className="space-y-3 text-sm bg-white/10 rounded-lg p-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-amber-100">Account:</span>
                    <span className="font-mono">{selectedBiller.accountNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-amber-100">Due Date:</span>
                    <span>{new Date(selectedBiller.dueDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <p className="text-xs text-amber-100 mb-3">Amount Due</p>
                <p className="text-3xl font-bold mb-6">${selectedBiller.amountDue.toFixed(2)}</p>

                {/* Custom Amount */}
                <div className="mb-6">
                  <label className="text-sm text-amber-100 block mb-2">Pay Different Amount (Optional)</label>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    placeholder={selectedBiller.amountDue.toString()}
                    className="w-full bg-white/20 border border-white/30 rounded px-3 py-2 text-white placeholder:text-amber-100/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                </div>

                <Button
                  onClick={handleProceed}
                  className="w-full bg-white text-amber-600 hover:bg-amber-50 font-bold py-3"
                >
                  Proceed to Payment
                </Button>
              </div>

              {/* Info Box */}
              <div className="bg-blue-950/30 border border-blue-900 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-blue-300 mb-1">Secure Payment</p>
                    <p className="text-xs text-blue-200">Your payment will go through multiple verification stages to ensure security.</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-slate-800 rounded-lg p-8 border border-slate-700 text-center">
              <AlertCircle className="w-12 h-12 text-slate-500 mx-auto mb-4 opacity-50" />
              <p className="text-slate-400">Select a biller to proceed</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
