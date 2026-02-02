export const dynamic = 'force-dynamic'

'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTransfer } from '@/lib/transfer-context'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Lock, AlertCircle, CheckCircle } from 'lucide-react'

export default function PinVerificationPage() {
  const router = useRouter()
  const { transferData, updateTransfer } = useTransfer()
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  const [pinVerified, setPinVerified] = useState(false)
  const [attempts, setAttempts] = useState(0)

  const CORRECT_PIN = '2010'

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4)
    setPin(value)
    setError('')
  }

  const handleVerifyPin = () => {
    if (pin.length !== 4) {
      setError('PIN must be 4 digits')
      return
    }

    if (pin === CORRECT_PIN) {
      setPinVerified(true)
      updateTransfer({ pin: pin })
      setError('')
      setTimeout(() => {
        router.push('/dashboard/transfer/verification/token')
      }, 1500)
    } else {
      setAttempts(attempts + 1)
      if (attempts >= 2) {
        setError('Maximum attempts exceeded. Transaction cancelled.')
        setTimeout(() => {
          router.push('/dashboard')
        }, 2000)
      } else {
        setError(`Incorrect PIN. ${3 - attempts - 1} attempts remaining.`)
        setPin('')
      }
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 p-6 flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-amber-500/20 rounded-full mb-4">
            <Lock className="w-8 h-8 text-amber-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Enter Transaction PIN</h1>
          <p className="text-slate-400">Enter your 4-digit PIN to proceed</p>
        </div>

        {/* Card */}
        <div className="bg-slate-800 rounded-lg p-8 mb-6">
          {!pinVerified ? (
            <>
              {/* PIN Input */}
              <div className="mb-6">
                <div className="flex justify-center gap-2 mb-4">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-14 h-14 rounded-lg border-2 border-slate-700 bg-slate-700 flex items-center justify-center"
                    >
                      <span className="text-2xl font-bold text-amber-400">
                        {pin[i] ? '●' : ''}
                      </span>
                    </div>
                  ))}
                </div>
                <input
                  type="password"
                  value={pin}
                  onChange={handlePinChange}
                  placeholder="Enter PIN"
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white text-center tracking-widest text-2xl focus:border-amber-400 focus:ring-amber-400/20 mb-4"
                  maxLength={4}
                  inputMode="numeric"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-950/50 border border-red-900 rounded-lg p-3 mb-6 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              )}

              {/* Info Box */}
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mb-6">
                <p className="text-amber-300 text-xs text-center">
                  Your PIN is required for security verification.
                </p>
              </div>

              {/* Verify Button */}
              <Button
                onClick={handleVerifyPin}
                disabled={pin.length !== 4}
                className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-50"
              >
                Verify PIN
              </Button>
            </>
          ) : (
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="inline-flex p-4 bg-green-500/20 rounded-full">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">PIN Verified</h2>
              <p className="text-slate-400 mb-4">Proceeding to security verification...</p>
              <div className="animate-spin inline-block">
                <div className="h-4 w-4 border-2 border-amber-400 border-t-transparent rounded-full"></div>
              </div>
            </div>
          )}
        </div>

        {/* Cancel Button */}
        {!pinVerified && (
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="w-full"
          >
            Cancel
          </Button>
        )}
      </div>
    </div>
  )
}
