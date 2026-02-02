export const dynamic = 'force-dynamic'

'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTransfer } from '@/lib/transfer-context'
import { usePageTitle } from '@/lib/title-context'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Wallet, Users, Globe, Building2 } from 'lucide-react'

export default function TransferMoneyPage() {
  usePageTitle('TRANSFER MONEY')
  const router = useRouter()
  const { transferData, updateTransfer } = useTransfer()
  const [selectedType, setSelectedType] = useState<'own' | 'same-bank' | 'other-bank' | 'international' | null>(null)

  const transferTypes = [
    {
      id: 'own',
      title: 'To Own Account',
      description: 'Transfer between your checking and savings accounts',
      icon: Wallet,
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 'same-bank',
      title: 'To Another User In Same Bank',
      description: 'Send money to other Pinnacle Vault Trust users',
      icon: Users,
      color: 'from-green-500 to-green-600',
    },
    {
      id: 'other-bank',
      title: 'To Other Banks',
      description: 'Transfer to other local bank accounts',
      icon: Building2,
      color: 'from-orange-500 to-orange-600',
    },
    {
      id: 'international',
      title: 'International Transfer',
      description: 'Send money internationally',
      icon: Globe,
      color: 'from-purple-500 to-purple-600',
    },
  ]

  const handleContinue = () => {
    if (selectedType) {
      updateTransfer({ transferType: selectedType as any })
      router.push('/dashboard/transfer/beneficiary')
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-amber-400 hover:text-amber-300 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <h1 className="text-4xl font-bold text-white mb-2">Transfer Money</h1>
          <p className="text-slate-400">Select the type of transfer you want to make</p>
        </div>

        {/* Transfer Type Selection */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {transferTypes.map((type) => {
            const Icon = type.icon
            return (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id as any)}
                className={`p-6 rounded-xl border-2 transition-all ${
                  selectedType === type.id
                    ? 'border-amber-400 bg-slate-800'
                    : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                }`}
              >
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${type.color} mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white text-left mb-2">{type.title}</h3>
                <p className="text-slate-400 text-sm text-left">{type.description}</p>
              </button>
            )
          })}
        </div>

        {/* Info Box */}
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mb-6">
          <p className="text-amber-300 text-sm">
            Transfers typically complete within 24 hours. International transfers may take 2-3 business days.
          </p>
        </div>

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
            disabled={!selectedType}
            className="flex-1 bg-amber-500 hover:bg-amber-600 flex items-center justify-center gap-2"
          >
            Continue
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
