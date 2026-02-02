export const dynamic = 'force-dynamic'

'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTransfer } from '@/lib/transfer-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Key, AlertCircle, CheckCircle } from 'lucide-react'

export default function TokenVerificationPage() {
  const router = useRouter()
  const { transferData, updateTransfer } = useTransfer()
  const [tokenCode, setTokenCode] = useState('')
  const [error, setError] = useState('')
  const [verified, setVerified] = useState(false)
  const [loading, setLoading] = useState(false)
  const [attempts, setAttempts] = useState(0)

  const handleVerify = async () => {
    setError('')
    setLoading(true)

    if (!tokenCode.trim()) {
      setError('Please enter a token code')
      setLoading(false)
      return
    }

    // Simulate token verification - accept any 6-8 digit code
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (tokenCode.length >= 6) {
      setVerified(true)
      updateTransfer({ tokenCode: tokenCode, status: 'otp-verification' })
      setTimeout(() => {
        router.push('/dashboard/transfer/verification/otp')
      }, 1500)
    } else {
      setAttempts(attempts + 1)
      if (attempts >= 2) {
        setError('Maximum attempts exceeded. Please contact support.')
      } else {
        setError(`Invalid token code. ${3 - attempts - 1} attempts remaining.`)
        setTokenCode('')
      }
    }
    setLoading(false)
  }

  const handleContactAdmin = () => {
    setTokenCode('')
    setError('Admin has been notified. You will receive your token code shortly.')
  }

  return (
    <div className="min-h-screen bg-slate-900 p-6 flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-semibold text-slate-400">Verification Stage 1/4</h2>
            <span className="text-xs bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full">
              Security Token
            </span>
          </div>
          <div className="w-full bg-slate-700 h-1 rounded-full">
            <div className="bg-amber-500 h-1 rounded-full" style={{ width: '25%' }}></div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-amber-500/20 rounded-full mb-4">
            <Key className="w-8 h-8 text-amber-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Enter Security Token Code</h1>
          <p className="text-slate-400">Provide your eToken code or request one from your admin</p>
        </div>

        {/* Card */}
        <div className="bg-slate-800 rounded-lg p-8 mb-6 space-y-4">
          {!verified ? (
            <>
              {/* Token Input */}
              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-3">
                  Security Token Code
                </label>
                <Input
                  type="text"
                  placeholder="Enter 6-8 digit code"
                  value={tokenCode}
                  onChange={(e) => {
                    setTokenCode(e.target.value.toUpperCase())
                    setError('')
                  }}
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500 font-mono text-center tracking-widest"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-950/50 border border-red-900 rounded-lg p-3 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              )}

              {/* Info Boxes */}
              <div className="space-y-3">
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                  <p className="text-blue-300 text-sm">
                    <strong>Hardware Token:</strong> Enter the 6-8 digit code displayed on your eToken device.
                  </p>
                </div>
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                  <p className="text-amber-300 text-sm">
                    <strong>No Token?</strong> Contact your admin for a verification code or temporary access.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <Button
                  onClick={handleVerify}
                  disabled={!tokenCode.trim() || loading}
                  className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-50"
                >
                  {loading ? 'Verifying...' : 'Verify Token Code'}
                </Button>
                <Button
                  onClick={handleContactAdmin}
                  variant="outline"
                  className="w-full bg-transparent"
                >
                  Request Token Code from Admin
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="inline-flex p-4 bg-green-500/20 rounded-full">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Token Verified</h2>
              <p className="text-slate-400 mb-4">Proceeding to OTP verification...</p>
              <div className="animate-spin inline-block">
                <div className="h-4 w-4 border-2 border-amber-400 border-t-transparent rounded-full"></div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        {!verified && (
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="w-full"
          >
            Back
          </Button>
        )}
      </div>
    </div>
  )
}
