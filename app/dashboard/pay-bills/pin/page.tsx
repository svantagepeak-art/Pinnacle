export const dynamic = 'force-dynamic'

'use client'

import React from "react"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Lock, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function BillPaymentPINPage() {
  const router = useRouter()
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [loading, setLoading] = useState(false)

  const CORRECT_PIN = '2010'
  const MAX_ATTEMPTS = 3

  const handlePINInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (/^\d*$/.test(value) && value.length <= 4) {
      setPin(value)
      setError('')
    }
  }

  const handleVerifyPIN = async () => {
    setLoading(true)

    if (pin === CORRECT_PIN) {
      // PIN is correct, proceed to token verification
      await new Promise(resolve => setTimeout(resolve, 500))
      router.push('/dashboard/pay-bills/verification/token')
    } else {
      // PIN is incorrect
      const newAttempts = attempts + 1
      setAttempts(newAttempts)

      if (newAttempts >= MAX_ATTEMPTS) {
        setError('Maximum attempts exceeded. Transaction cancelled.')
        setTimeout(() => {
          router.push('/dashboard')
        }, 3000)
      } else {
        setError(`Incorrect PIN. ${MAX_ATTEMPTS - newAttempts} attempt(s) remaining.`)
        setPin('')
      }
    }

    setLoading(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && pin.length === 4) {
      handleVerifyPIN()
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 flex flex-col">
      {/* Header */}
      <div className="mb-8">
        <Link href="/dashboard/pay-bills" className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 mb-4">
          <ArrowLeft className="w-5 h-5" />
          Back
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md">
          {/* Icon */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-600/20 border border-amber-600/40 rounded-full mb-4">
              <Lock className="w-8 h-8 text-amber-400" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Enter Your PIN</h1>
            <p className="text-slate-400">Verify your transaction with your 4-digit PIN</p>
          </div>

          {/* PIN Input */}
          <div className="bg-slate-800 rounded-lg p-8 border border-slate-700 mb-6">
            <label className="block text-sm font-medium text-slate-300 mb-4">Transaction PIN</label>

            <div className="mb-6">
              <input
                type="password"
                value={pin}
                onChange={handlePINInput}
                onKeyPress={handleKeyPress}
                placeholder="••••"
                maxLength={4}
                className="w-full text-4xl text-center tracking-widest font-bold bg-slate-700 border-2 border-slate-600 text-white rounded-lg py-6 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 placeholder:text-slate-500"
                disabled={attempts >= MAX_ATTEMPTS}
              />
              <p className="text-xs text-slate-500 text-center mt-2">
                {pin.length}/4 digits entered
              </p>
            </div>

            {/* PIN Pad */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button
                  key={num}
                  onClick={() => handlePINInput({ target: { value: pin + num } } as any)}
                  disabled={pin.length >= 4 || attempts >= MAX_ATTEMPTS}
                  className="bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition text-lg"
                >
                  {num}
                </button>
              ))}
              <button
                onClick={() => handlePINInput({ target: { value: pin + '0' } } as any)}
                disabled={pin.length >= 4 || attempts >= MAX_ATTEMPTS}
                className="col-span-3 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition text-lg"
              >
                0
              </button>
            </div>

            {/* Backspace Button */}
            <button
              onClick={() => setPin(pin.slice(0, -1))}
              disabled={pin.length === 0 || attempts >= MAX_ATTEMPTS}
              className="w-full bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm transition mb-6"
            >
              ← Backspace
            </button>

            {/* Verify Button */}
            <Button
              onClick={handleVerifyPIN}
              disabled={pin.length !== 4 || loading || attempts >= MAX_ATTEMPTS}
              className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3"
            >
              {loading ? 'Verifying...' : 'Verify PIN'}
            </Button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-950/50 border border-red-900 rounded-lg p-4 mb-6 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          {/* Info Box */}
          <div className="bg-blue-950/30 border border-blue-900 rounded-lg p-4">
            <p className="text-blue-300 text-xs font-semibold mb-1">Demo PIN: 2010</p>
            <p className="text-blue-200 text-xs">For security purposes, never share your PIN with anyone.</p>
          </div>

          {/* Progress */}
          {attempts < MAX_ATTEMPTS && (
            <div className="mt-6 text-center">
              <p className="text-sm text-slate-400">
                Attempt: <span className="font-semibold text-amber-400">{attempts + 1}/{MAX_ATTEMPTS}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
