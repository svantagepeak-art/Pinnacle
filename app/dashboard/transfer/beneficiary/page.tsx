export const dynamic = 'force-dynamic'

'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTransfer } from '@/lib/transfer-context'
import { usePageTitle } from '@/lib/title-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Plus, User, Building2 } from 'lucide-react'

const BANKS = [
  'Pinnacle Bank',
  'Trust Finance',
  'Global Banking Group',
  'Premier Financial',
  'Secure Trust Bank',
  'Digital Banking Corp',
]

export default function BeneficiarySelectionPage() {
  usePageTitle('TRANSFER MONEY')
  const router = useRouter()
  const { transferData, updateTransfer, savedBeneficiaries } = useTransfer()
  const [beneficiaryType, setBeneficiaryType] = useState<'saved' | 'new'>('saved')
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<string | null>(null)

  // New beneficiary form
  const [newBeneficiary, setNewBeneficiary] = useState({
    accountNumber: '',
    bankName: '',
    accountName: '',
  })

  const handleContinue = () => {
    if (beneficiaryType === 'saved' && selectedBeneficiary) {
      const beneficiary = savedBeneficiaries.find(b => b.id === selectedBeneficiary)
      if (beneficiary) {
        updateTransfer({ selectedBeneficiary: beneficiary, beneficiaryType: 'saved' })
        router.push('/dashboard/transfer/details')
      }
    } else if (beneficiaryType === 'new') {
      if (newBeneficiary.accountNumber && newBeneficiary.bankName && newBeneficiary.accountName) {
        updateTransfer({ selectedBeneficiary: newBeneficiary, beneficiaryType: 'new' })
        router.push('/dashboard/transfer/details')
      }
    }
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
          <h1 className="text-3xl font-bold text-white mb-2">Select Beneficiary</h1>
          <p className="text-slate-400">Choose where you want to send the money</p>
        </div>

        {/* Tab Selection */}
        <div className="flex gap-2 mb-6 bg-slate-800 p-1 rounded-lg">
          <button
            onClick={() => setBeneficiaryType('saved')}
            className={`flex-1 py-2 px-4 rounded-md font-semibold transition-all ${
              beneficiaryType === 'saved'
                ? 'bg-amber-500 text-white'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Saved Beneficiaries
          </button>
          <button
            onClick={() => setBeneficiaryType('new')}
            className={`flex-1 py-2 px-4 rounded-md font-semibold transition-all ${
              beneficiaryType === 'new'
                ? 'bg-amber-500 text-white'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Add New
          </button>
        </div>

        {/* Content */}
        {beneficiaryType === 'saved' ? (
          <div className="space-y-3 mb-8">
            {savedBeneficiaries.length > 0 ? (
              savedBeneficiaries.map(beneficiary => (
                <button
                  key={beneficiary.id}
                  onClick={() => setSelectedBeneficiary(beneficiary.id)}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    selectedBeneficiary === beneficiary.id
                      ? 'border-amber-400 bg-slate-800'
                      : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-amber-500/20 rounded-lg">
                      <User className="w-5 h-5 text-amber-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">{beneficiary.accountName}</h3>
                      <p className="text-sm text-slate-400">{beneficiary.bankName}</p>
                      <p className="text-xs text-slate-500 font-mono">{beneficiary.accountNumber}</p>
                    </div>
                  </div>
                </button>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-slate-400">No saved beneficiaries yet</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4 mb-8">
            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-2">
                Account Number
              </label>
              <Input
                type="text"
                placeholder="Enter account number"
                value={newBeneficiary.accountNumber}
                onChange={(e) => setNewBeneficiary({ ...newBeneficiary, accountNumber: e.target.value })}
                className="bg-slate-800 border-slate-700"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-2">
                Bank Name
              </label>
              <select
                value={newBeneficiary.bankName}
                onChange={(e) => setNewBeneficiary({ ...newBeneficiary, bankName: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-amber-400 focus:ring-amber-400/20"
              >
                <option value="">Select or type a bank</option>
                {BANKS.map(bank => (
                  <option key={bank} value={bank}>{bank}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-2">
                Account Name
              </label>
              <Input
                type="text"
                placeholder="Name of account holder"
                value={newBeneficiary.accountName}
                onChange={(e) => setNewBeneficiary({ ...newBeneficiary, accountName: e.target.value })}
                className="bg-slate-800 border-slate-700"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-2">
                Amount
              </label>
              <Input
                type="number"
                placeholder="0.00"
                className="bg-slate-800 border-slate-700"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-2">
                Narration / Description
              </label>
              <textarea
                placeholder="Payment for..."
                rows={3}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:border-amber-400 focus:ring-amber-400/20"
              />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleContinue}
            disabled={beneficiaryType === 'saved' ? !selectedBeneficiary : !newBeneficiary.accountNumber || !newBeneficiary.bankName || !newBeneficiary.accountName}
            className="flex-1 bg-amber-500 hover:bg-amber-600"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  )
}
