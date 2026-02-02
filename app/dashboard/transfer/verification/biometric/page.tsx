export const dynamic = 'force-dynamic'

'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useTransfer } from '@/lib/transfer-context'
import { Button } from '@/components/ui/button'
import { Fingerprint, Scan, CheckCircle, AlertCircle } from 'lucide-react'

export default function BiometricVerificationPage() {
  const router = useRouter()
  const { transferData, updateTransfer } = useTransfer()
  const [biometricType, setBiometricType] = useState<'fingerprint' | 'face' | 'device' | null>(null)
  const [scanning, setScanning] = useState(false)
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState('')

  const biometricOptions = [
    {
      id: 'fingerprint',
      title: 'Fingerprint',
      description: 'Use your fingerprint to verify',
      icon: Fingerprint,
    },
    {
      id: 'face',
      title: 'Face ID',
      description: 'Use facial recognition',
      icon: Scan,
    },
    {
      id: 'device',
      title: 'Device Biometric',
      description: 'Use your device\'s biometric sensor',
      icon: Fingerprint,
    },
  ]

  const handleInitiateBiometric = async (type: 'fingerprint' | 'face' | 'device') => {
    setBiometricType(type)
    setScanning(true)
    setError('')

    // Simulate biometric scanning
    await new Promise(resolve => setTimeout(resolve, 2000))

    setVerified(true)
    updateTransfer({ biometricVerified: true, status: 'fraud-review' })

    setTimeout(() => {
      router.push('/dashboard/transfer/verification/fraud-review')
    }, 1500)
  }

  const handleRetry = () => {
    setScanning(false)
    setBiometricType(null)
    setError('')
  }

  return (
    <div className="min-h-screen bg-slate-900 p-6 flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-semibold text-slate-400">Verification Stage 3/4</h2>
            <span className="text-xs bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full">
              Biometric
            </span>
          </div>
          <div className="w-full bg-slate-700 h-1 rounded-full">
            <div className="bg-amber-500 h-1 rounded-full" style={{ width: '75%' }}></div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-amber-500/20 rounded-full mb-4">
            <Fingerprint className="w-8 h-8 text-amber-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Biometric Verification</h1>
          <p className="text-slate-400">Complete the final security verification step</p>
        </div>

        {/* Card */}
        <div className="bg-slate-800 rounded-lg p-8 mb-6">
          {!biometricType ? (
            <div className="space-y-3">
              <p className="text-slate-300 text-center mb-4">Choose a biometric method:</p>
              {biometricOptions.map((option) => {
                const Icon = option.icon
                return (
                  <Button
                    key={option.id}
                    onClick={() => handleInitiateBiometric(option.id as any)}
                    className="w-full flex items-center justify-between gap-3 bg-slate-700 hover:bg-slate-600 h-16"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-6 h-6" />
                      <div className="text-left">
                        <div className="font-semibold text-white">{option.title}</div>
                        <div className="text-xs text-slate-300">{option.description}</div>
                      </div>
                    </div>
                  </Button>
                )
              })}
            </div>
          ) : !verified ? (
            <div className="space-y-6 text-center">
              {scanning ? (
                <>
                  {/* Scanning Animation */}
                  <div className="flex justify-center">
                    <div className="relative w-32 h-32">
                      <div className="absolute inset-0 bg-amber-500/20 rounded-full animate-pulse"></div>
                      <div className="absolute inset-4 bg-amber-500/40 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Scan className="w-12 h-12 text-amber-400 animate-spin" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-white mb-2">Scanning...</h2>
                    <p className="text-slate-400 text-sm">Position your {biometricType} and hold still</p>
                  </div>

                  {error && (
                    <div className="bg-red-950/50 border border-red-900 rounded-lg p-3 flex gap-3">
                      <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                      <p className="text-red-300 text-sm">{error}</p>
                    </div>
                  )}
                </>
              ) : null}
            </div>
          ) : (
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="inline-flex p-4 bg-green-500/20 rounded-full">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Biometric Verified</h2>
              <p className="text-slate-400 mb-4">Proceeding to fraud analysis...</p>
              <div className="animate-spin inline-block">
                <div className="h-4 w-4 border-2 border-amber-400 border-t-transparent rounded-full"></div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        {biometricType && !verified && !scanning && (
          <Button
            onClick={handleRetry}
            variant="outline"
            className="w-full bg-transparent"
          >
            Change Method
          </Button>
        )}
      </div>
    </div>
  )
}
