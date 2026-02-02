export const dynamic = 'force-dynamic'

'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, CheckCircle, Lock, Smartphone, Fingerprint, Eye } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function BillBiometricVerificationPage() {
  const router = useRouter()
  const [bioMethod, setBioMethod] = useState<'fingerprint' | 'face' | 'device' | null>(null)
  const [scanning, setScanning] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleStartScan = async () => {
    setScanning(true)
    // Simulate biometric scan
    await new Promise(resolve => setTimeout(resolve, 2000))
    setSuccess(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    router.push('/dashboard/pay-bills/verification/fraud-review')
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
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
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-600 text-white font-bold">3</div>
            <div className="text-sm">
              <p className="font-semibold">Biometric Verification</p>
              <p className="text-slate-400 text-xs">Current Stage (75%)</p>
            </div>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div className="bg-amber-500 h-2 rounded-full w-3/4"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-600/20 border border-amber-600/40 rounded-full mb-4">
                <Fingerprint className="w-8 h-8 text-amber-400" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Biometric Verification</h1>
              <p className="text-slate-400">Verify with your biometric authentication</p>
            </div>

            {!bioMethod ? (
              <div className="bg-slate-800 rounded-lg p-8 border border-slate-700">
                <p className="text-slate-300 font-semibold mb-6">Choose your verification method:</p>
                <div className="space-y-3">
                  <button
                    onClick={() => setBioMethod('fingerprint')}
                    className="w-full bg-slate-700 hover:bg-slate-600 p-4 rounded-lg text-left transition flex items-center gap-3"
                  >
                    <Fingerprint className="w-6 h-6 text-blue-400" />
                    <div>
                      <p className="font-semibold">Fingerprint</p>
                      <p className="text-sm text-slate-400">Touch your registered fingerprint</p>
                    </div>
                  </button>
                  <button
                    onClick={() => setBioMethod('face')}
                    className="w-full bg-slate-700 hover:bg-slate-600 p-4 rounded-lg text-left transition flex items-center gap-3"
                  >
                    <Eye className="w-6 h-6 text-green-400" />
                    <div>
                      <p className="font-semibold">Face ID</p>
                      <p className="text-sm text-slate-400">Look at your device camera</p>
                    </div>
                  </button>
                  <button
                    onClick={() => setBioMethod('device')}
                    className="w-full bg-slate-700 hover:bg-slate-600 p-4 rounded-lg text-left transition flex items-center gap-3"
                  >
                    <Smartphone className="w-6 h-6 text-purple-400" />
                    <div>
                      <p className="font-semibold">Device Biometric</p>
                      <p className="text-sm text-slate-400">Use device default authentication</p>
                    </div>
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-slate-800 rounded-lg p-8 border border-slate-700">
                {!success ? (
                  <>
                    <div className="text-center mb-8">
                      <h2 className="text-xl font-semibold mb-4">
                        {bioMethod === 'fingerprint' && 'Scanning Fingerprint'}
                        {bioMethod === 'face' && 'Scanning Face'}
                        {bioMethod === 'device' && 'Initializing Biometric'}
                      </h2>
                      <div className="relative w-32 h-32 mx-auto mb-6">
                        <div className="absolute inset-0 border-4 border-amber-400 rounded-full animate-pulse"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          {bioMethod === 'fingerprint' && <Fingerprint className="w-16 h-16 text-amber-400" />}
                          {bioMethod === 'face' && <Eye className="w-16 h-16 text-amber-400" />}
                          {bioMethod === 'device' && <Smartphone className="w-16 h-16 text-amber-400" />}
                        </div>
                      </div>
                    </div>

                    {!scanning && (
                      <Button onClick={handleStartScan} className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3">
                        Start Scan
                      </Button>
                    )}

                    {scanning && (
                      <div className="text-center">
                        <p className="text-slate-400 mb-4">Scanning... Please wait</p>
                        <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500 animate-pulse" style={{ animation: 'pulse 2s infinite' }}></div>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center">
                    <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Biometric Verified</h2>
                    <p className="text-slate-400 mb-6">Moving to fraud analysis...</p>
                  </div>
                )}

                {!scanning && !success && (
                  <button
                    onClick={() => setBioMethod(null)}
                    className="w-full text-amber-400 hover:text-amber-300 text-sm font-medium mt-4"
                  >
                    Change method
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="font-semibold mb-4">Verification Pipeline</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-400" />
                  <span>PIN Verified</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-400" />
                  <span>Token Code</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-400" />
                  <span>OTP</span>
                </div>
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-slate-500" />
                  <span className="text-slate-400">Biometrics</span>
                </div>
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-slate-500" />
                  <span className="text-slate-400">Fraud Review</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
