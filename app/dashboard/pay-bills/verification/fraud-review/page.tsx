export const dynamic = 'force-dynamic'

'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Lock, CheckCircle, AlertTriangle, Clock } from 'lucide-react'
import Link from 'next/link'

export default function BillFraudReviewPage() {
  const router = useRouter()
  const [status, setStatus] = useState<'analyzing' | 'approved' | 'rejected' | 'under_review'>('analyzing')
  const [riskScore, setRiskScore] = useState(0)

  useEffect(() => {
    // Simulate fraud analysis
    const timer = setTimeout(() => {
      const score = Math.floor(Math.random() * 100)
      setRiskScore(score)

      if (score < 30) {
        setStatus('approved')
        setTimeout(() => {
          router.push('/dashboard/pay-bills/result')
        }, 3000)
      } else if (score > 70) {
        setStatus('rejected')
      } else {
        setStatus('under_review')
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

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
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-600 text-white font-bold">4</div>
            <div className="text-sm">
              <p className="font-semibold">Fraud Analysis</p>
              <p className="text-slate-400 text-xs">Final Stage (100%)</p>
            </div>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div className="bg-amber-500 h-2 rounded-full w-full"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {status === 'analyzing' && (
              <div className="bg-slate-800 rounded-lg p-12 border border-slate-700 text-center">
                <div className="mb-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-600/20 border border-amber-600/40 rounded-full">
                    <div className="animate-spin">
                      <Lock className="w-10 h-10 text-amber-400" />
                    </div>
                  </div>
                </div>
                <h1 className="text-3xl font-bold mb-2">Analyzing Transaction</h1>
                <p className="text-slate-400 mb-8">Running fraud detection checks...</p>
                <div className="space-y-2">
                  <p className="text-sm text-slate-500">Checking transaction patterns</p>
                  <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 animate-pulse"></div>
                  </div>
                </div>
              </div>
            )}

            {status === 'approved' && (
              <div className="bg-green-950/30 border border-green-900 rounded-lg p-12 text-center">
                <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-4" />
                <h1 className="text-3xl font-bold mb-2 text-green-400">Transaction Approved</h1>
                <p className="text-slate-300 mb-6">Your payment has been authorized and will be processed</p>
                <p className="text-sm text-slate-400">Redirecting to receipt...</p>
              </div>
            )}

            {status === 'rejected' && (
              <div className="bg-red-950/30 border border-red-900 rounded-lg p-12 text-center">
                <AlertTriangle className="w-20 h-20 text-red-400 mx-auto mb-4" />
                <h1 className="text-3xl font-bold mb-2 text-red-400">Transaction Rejected</h1>
                <p className="text-slate-300 mb-6">This transaction has been flagged as high-risk</p>
                <Link href="/dashboard" className="text-amber-400 hover:text-amber-300 font-semibold">
                  Return to Dashboard
                </Link>
              </div>
            )}

            {status === 'under_review' && (
              <div className="bg-blue-950/30 border border-blue-900 rounded-lg p-12 text-center">
                <Clock className="w-20 h-20 text-blue-400 mx-auto mb-4" />
                <h1 className="text-3xl font-bold mb-2 text-blue-400">Under Review</h1>
                <p className="text-slate-300 mb-6">Your transaction requires manual review by admin</p>
                <p className="text-sm text-slate-400 mb-8">You'll be notified within 24 hours</p>
                <Link href="/dashboard" className="text-amber-400 hover:text-amber-300 font-semibold">
                  Return to Dashboard
                </Link>
              </div>
            )}
          </div>

          {riskScore > 0 && (
            <div className="space-y-6">
              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <h3 className="font-semibold mb-4">Risk Analysis</h3>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm text-slate-400">Risk Score</p>
                    <p className="text-2xl font-bold text-amber-400">{riskScore}</p>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${riskScore < 30 ? 'bg-green-500' : riskScore < 70 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${riskScore}%` }}
                    ></div>
                  </div>
                </div>
                <p className="text-xs text-slate-400">
                  {riskScore < 30 ? 'Low Risk - Transaction Safe' : riskScore < 70 ? 'Medium Risk - Manual Review' : 'High Risk - Flagged'}
                </p>
              </div>

              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <h3 className="font-semibold mb-3 text-sm">Checks Performed</h3>
                <ul className="space-y-2 text-xs text-slate-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    Amount threshold check
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    Daily transaction limit
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    Blacklist verification
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    Pattern analysis
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    Device verification
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
