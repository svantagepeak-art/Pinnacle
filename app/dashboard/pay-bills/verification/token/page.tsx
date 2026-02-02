export const dynamic = 'force-dynamic'

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, AlertCircle, CheckCircle, Lock, Phone } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function BillTokenVerificationPage() {
  const router = useRouter()
  const [tokenCode, setTokenCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [attempts, setAttempts] = useState(0)

  const CORRECT_TOKEN = '123456'
  const MAX_ATTEMPTS = 3

  const handleVerifyToken = async () => {
    setLoading(true)
    setError('')

    if (!tokenCode.trim()) {
      setError('Please enter a token code')
      setLoading(false)
      return
    }

    if (tokenCode === CORRECT_TOKEN) {
      await new Promise(resolve => setTimeout(resolve, 500))
      router.push('/dashboard/pay-bills/verification/otp')
    } else {
      const newAttempts = attempts + 1
      setAttempts(newAttempts)

      if (newAttempts >= MAX_ATTEMPTS) {
        setError('Maximum attempts exceeded. Transaction cancelled.')
        setTimeout(() => {
          router.push('/dashboard')
        }, 3000)
      } else {
        setError(`Invalid token code. ${MAX_ATTEMPTS - newAttempts} attempt(s) remaining.`)
        setTokenCode('')
      }
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <Link href="/dashboard/pay-bills" className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 mb-4">
          <ArrowLeft className="w-5 h-5" />
          Back
        </Link>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-600 text-white font-bold">
              1
            </div>
            <div className="text-sm">
              <p className="font-semibold">Token Verification</p>
              <p className="text-slate-400 text-xs">Current Stage (25%)</p>
            </div>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div className="bg-amber-500 h-2 rounded-full w-1/4"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Content */}
          <div className="lg:col-span-2">
            {/* Icon */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-600/20 border border-amber-600/40 rounded-full mb-4">
                <Lock className="w-8 h-8 text-amber-400" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Security Token Verification</h1>
              <p className="text-slate-400">Enter your security token code to verify this transaction</p>
            </div>

            {/* Token Input */}
            <div className="bg-slate-800 rounded-lg p-8 border border-slate-700">
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-300 mb-4">
                  Enter Security Token Code
                </label>
                <input
                  type="text"
                  value={tokenCode}
                  onChange={(e) => {
                    setTokenCode(e.target.value.toUpperCase())
                    setError('')
                  }}
                  placeholder="Enter 6-8 digit token code"
                  className="w-full text-lg font-mono bg-slate-700 border-2 border-slate-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
                />
              </div>

              {error && (
                <div className="bg-red-950/50 border border-red-900 rounded-lg p-4 mb-6 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              )}

              <Button
                onClick={handleVerifyToken}
                disabled={!tokenCode.trim() || loading || attempts >= MAX_ATTEMPTS}
                className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-bold py-3"
              >
                {loading ? 'Verifying...' : 'Verify Token'}
              </Button>

              {attempts < MAX_ATTEMPTS && (
                <p className="text-sm text-slate-400 text-center mt-4">
                  Attempt: <span className="font-semibold text-amber-400">{attempts + 1}/{MAX_ATTEMPTS}</span>
                </p>
              )}
            </div>

            {/* Info Box */}
            <div className="mt-6 bg-blue-950/30 border border-blue-900 rounded-lg p-4">
              <p className="text-blue-300 text-sm font-semibold mb-2">How to get your token code:</p>
              <ul className="text-blue-200 text-xs space-y-2">
                <li className="flex items-start gap-2">
                  <span className="font-bold mt-0.5">1.</span>
                  <span>Use your hardware eToken device</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold mt-0.5">2.</span>
                  <span>Or contact admin for a temporary token code</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold mt-0.5">3.</span>
                  <span>Enter the code above</span>
                </li>
              </ul>
            </div>

            {/* Demo Info */}
            <div className="mt-6 bg-amber-950/30 border border-amber-900 rounded-lg p-4">
              <p className="text-amber-300 text-xs font-semibold">Demo Token Code: 123456</p>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Verification Steps */}
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="font-semibold mb-4">Verification Pipeline</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  <span className="text-sm">PIN Verified</span>
                </div>
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-slate-500 flex-shrink-0" />
                  <span className="text-sm text-slate-400">Token Code</span>
                </div>
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-slate-500 flex-shrink-0" />
                  <span className="text-sm text-slate-400">OTP</span>
                </div>
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-slate-500 flex-shrink-0" />
                  <span className="text-sm text-slate-400">Biometrics</span>
                </div>
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-slate-500 flex-shrink-0" />
                  <span className="text-sm text-slate-400">Fraud Review</span>
                </div>
              </div>
            </div>

            {/* Support Contact */}
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Phone className="w-5 h-5 text-amber-400" />
                Need Help?
              </h3>
              <p className="text-sm text-slate-400 mb-4">Contact admin support for token code</p>
              <p className="text-xs text-slate-500">Support Email: admin@pinnaclevault.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
