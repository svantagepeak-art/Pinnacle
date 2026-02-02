export const dynamic = 'force-dynamic'

'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useTransfer } from '@/lib/transfer-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, MessageSquare, Clock, CheckCircle, AlertCircle } from 'lucide-react'

export default function OtpVerificationPage() {
  const router = useRouter()
  const { transferData, updateTransfer } = useTransfer()
  const [otpMethod, setOtpMethod] = useState<'sms' | 'email' | null>(null)
  const [otp, setOtp] = useState('')
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [resendCountdown, setResendCountdown] = useState(0)

  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendCountdown])

  const handleSendOtp = (method: 'sms' | 'email') => {
    setOtpMethod(method)
    setResendCountdown(30)
    setError('')
  }

  const handleVerifyOtp = async () => {
    setError('')
    setLoading(true)

    if (!otp.trim()) {
      setError('Please enter OTP')
      setLoading(false)
      return
    }

    await new Promise(resolve => setTimeout(resolve, 1000))

    if (otp === '123456') {
      setVerified(true)
      updateTransfer({ otp: otp, status: 'biometric-verification' })
      setTimeout(() => {
        router.push('/dashboard/transfer/verification/biometric')
      }, 1500)
    } else {
      setAttempts(attempts + 1)
      if (attempts >= 2) {
        setError('Maximum attempts exceeded. Transaction cancelled.')
        setTimeout(() => {
          router.push('/dashboard')
        }, 2000)
      } else {
        setError(`Invalid OTP. ${3 - attempts - 1} attempts remaining.`)
        setOtp('')
      }
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-slate-900 p-6 flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-semibold text-slate-400">Verification Stage 2/4</h2>
            <span className="text-xs bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full">
              OTP Code
            </span>
          </div>
          <div className="w-full bg-slate-700 h-1 rounded-full">
            <div className="bg-amber-500 h-1 rounded-full" style={{ width: '50%' }}></div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-amber-500/20 rounded-full mb-4">
            <MessageSquare className="w-8 h-8 text-amber-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Enter OTP Code</h1>
          <p className="text-slate-400">A one-time password has been sent to you</p>
        </div>

        {/* Card */}
        <div className="bg-slate-800 rounded-lg p-8 mb-6 space-y-4">
          {!otpMethod ? (
            <>
              <p className="text-slate-300 text-center mb-4">Choose how you want to receive your OTP:</p>
              <div className="space-y-3">
                <Button
                  onClick={() => handleSendOtp('sms')}
                  className="w-full flex items-center justify-center gap-3 bg-slate-700 hover:bg-slate-600 h-12"
                >
                  <MessageSquare className="w-5 h-5" />
                  Send OTP via SMS
                </Button>
                <Button
                  onClick={() => handleSendOtp('email')}
                  className="w-full flex items-center justify-center gap-3 bg-slate-700 hover:bg-slate-600 h-12"
                >
                  <Mail className="w-5 h-5" />
                  Send OTP via Email
                </Button>
              </div>
            </>
          ) : !verified ? (
            <>
              {/* OTP Display Info */}
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mb-4">
                <p className="text-amber-300 text-sm">
                  OTP sent to your {otpMethod === 'sms' ? 'phone' : 'email'}. Check and enter below.
                </p>
              </div>

              {/* OTP Input */}
              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-3">
                  Enter 6-Digit OTP
                </label>
                <Input
                  type="text"
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 6)
                    setOtp(value)
                    setError('')
                  }}
                  maxLength={6}
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500 font-mono text-center tracking-widest text-2xl"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-950/50 border border-red-900 rounded-lg p-3 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              )}

              {/* Demo Info */}
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                <p className="text-blue-300 text-xs text-center">Demo OTP: 123456</p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <Button
                  onClick={handleVerifyOtp}
                  disabled={otp.length !== 6 || loading}
                  className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-50"
                >
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </Button>

                <Button
                  onClick={() => handleSendOtp(otpMethod)}
                  disabled={resendCountdown > 0}
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                >
                  {resendCountdown > 0 ? (
                    <>
                      <Clock className="w-4 h-4" />
                      Resend in {resendCountdown}s
                    </>
                  ) : (
                    'Resend OTP'
                  )}
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
              <h2 className="text-2xl font-bold text-white mb-2">OTP Verified</h2>
              <p className="text-slate-400 mb-4">Proceeding to biometric verification...</p>
              <div className="animate-spin inline-block">
                <div className="h-4 w-4 border-2 border-amber-400 border-t-transparent rounded-full"></div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        {!verified && otpMethod && (
          <Button
            onClick={() => {
              setOtpMethod(null)
              setOtp('')
            }}
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
