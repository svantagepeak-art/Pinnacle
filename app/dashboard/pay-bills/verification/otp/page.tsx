export const dynamic = 'force-dynamic'

'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, AlertCircle, CheckCircle, Mail, Phone, Lock } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function BillOTPVerificationPage() {
  const router = useRouter()
  const [method, setMethod] = useState<'sms' | 'email' | null>(null)
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [countdown, setCountdown] = useState(0)

  const CORRECT_OTP = '123456'
  const MAX_ATTEMPTS = 3

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const handleSendOTP = (selectedMethod: 'sms' | 'email') => {
    setMethod(selectedMethod)
    setCountdown(30)
    setError('')
    setOtp('')
  }

  const handleVerifyOTP = async () => {
    setLoading(true)
    setError('')

    if (!otp.trim()) {
      setError('Please enter the OTP')
      setLoading(false)
      return
    }

    if (otp === CORRECT_OTP) {
      await new Promise(resolve => setTimeout(resolve, 500))
      router.push('/dashboard/pay-bills/verification/biometric')
    } else {
      const newAttempts = attempts + 1
      setAttempts(newAttempts)

      if (newAttempts >= MAX_ATTEMPTS) {
        setError('Maximum attempts exceeded. Transaction cancelled.')
        setTimeout(() => {
          router.push('/dashboard')
        }, 3000)
      } else {
        setError(`Invalid OTP. ${MAX_ATTEMPTS - newAttempts} attempt(s) remaining.`)
        setOtp('')
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
              2
            </div>
            <div className="text-sm">
              <p className="font-semibold">OTP Verification</p>
              <p className="text-slate-400 text-xs">Current Stage (50%)</p>
            </div>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div className="bg-amber-500 h-2 rounded-full w-1/2"></div>
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
              <h1 className="text-3xl font-bold mb-2">OTP Verification</h1>
              <p className="text-slate-400">Verify your transaction with a one-time password</p>
            </div>

            {/* Method Selection */}
            {!method ? (
              <div className="bg-slate-800 rounded-lg p-8 border border-slate-700 mb-6">
                <p className="text-slate-300 font-semibold mb-6">Choose delivery method:</p>
                <div className="space-y-3">
                  <button
                    onClick={() => handleSendOTP('sms')}
                    className="w-full bg-slate-700 hover:bg-slate-600 p-4 rounded-lg text-left transition flex items-center gap-3"
                  >
                    <Phone className="w-6 h-6 text-blue-400 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">SMS</p>
                      <p className="text-sm text-slate-400">Code sent to +1 (628) 400-3594</p>
                    </div>
                  </button>
                  <button
                    onClick={() => handleSendOTP('email')}
                    className="w-full bg-slate-700 hover:bg-slate-600 p-4 rounded-lg text-left transition flex items-center gap-3"
                  >
                    <Mail className="w-6 h-6 text-green-400 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-sm text-slate-400">Code sent to markdavid1969@gmail.com</p>
                    </div>
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* OTP Input */}
                <div className="bg-slate-800 rounded-lg p-8 border border-slate-700 mb-6">
                  <div className="text-center mb-6">
                    <p className="text-sm text-slate-400 mb-1">Code sent via {method.toUpperCase()}</p>
                    <p className="text-lg font-semibold text-amber-400">
                      {method === 'sms' ? '+1 (628) 400-3594' : 'markdavid1969@gmail.com'}
                    </p>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-slate-300 mb-4">
                      Enter 6-Digit OTP
                    </label>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => {
                        setOtp(e.target.value.slice(0, 6))
                        setError('')
                      }}
                      placeholder="000000"
                      maxLength={6}
                      className="w-full text-4xl text-center tracking-widest font-bold bg-slate-700 border-2 border-slate-600 text-white rounded-lg py-6 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
                    />
                    <p className="text-xs text-slate-500 text-center mt-2">{otp.length}/6 digits</p>
                  </div>

                  {error && (
                    <div className="bg-red-950/50 border border-red-900 rounded-lg p-4 mb-6 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <p className="text-red-300 text-sm">{error}</p>
                    </div>
                  )}

                  <Button
                    onClick={handleVerifyOTP}
                    disabled={otp.length !== 6 || loading || attempts >= MAX_ATTEMPTS}
                    className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-bold py-3 mb-4"
                  >
                    {loading ? 'Verifying...' : 'Verify OTP'}
                  </Button>

                  <button
                    onClick={() => {
                      setMethod(null)
                      setOtp('')
                      setAttempts(0)
                      setError('')
                    }}
                    className="w-full text-amber-400 hover:text-amber-300 text-sm font-medium"
                  >
                    Change delivery method
                  </button>

                  {attempts < MAX_ATTEMPTS && (
                    <p className="text-sm text-slate-400 text-center mt-4">
                      Attempt: <span className="font-semibold text-amber-400">{attempts + 1}/{MAX_ATTEMPTS}</span>
                    </p>
                  )}
                </div>

                {/* Resend Info */}
                <div className="bg-blue-950/30 border border-blue-900 rounded-lg p-4 mb-6">
                  <p className="text-blue-300 text-xs font-semibold mb-2">Resend code</p>
                  <p className="text-blue-200 text-xs">
                    {countdown > 0 ? (
                      <>Resend available in <span className="font-bold">{countdown}s</span></>
                    ) : (
                      <button onClick={() => handleSendOTP(method)} className="text-blue-300 hover:text-blue-200 font-bold underline">
                        Click here to resend
                      </button>
                    )}
                  </p>
                </div>

                {/* Demo OTP */}
                <div className="bg-amber-950/30 border border-amber-900 rounded-lg p-4">
                  <p className="text-amber-300 text-xs font-semibold">Demo OTP: 123456</p>
                </div>
              </>
            )}
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
                  <CheckCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  <span className="text-sm">Token Code</span>
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

            {/* Info */}
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="font-semibold mb-2 text-sm">Why OTP?</h3>
              <p className="text-xs text-slate-400">One-Time Passwords ensure only you can authorize this transaction.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
