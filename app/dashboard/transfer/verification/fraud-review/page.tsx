export const dynamic = 'force-dynamic'

'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useTransfer } from '@/lib/transfer-context'
import { AlertCircle, TrendingUp, Clock } from 'lucide-react'

export default function FraudReviewPage() {
  const router = useRouter()
  const { transferData, updateTransfer } = useTransfer()
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [fraudResult, setFraudResult] = useState<'approved' | 'rejected' | 'under-review'>('approved')
  const [displayedAnalysis, setDisplayedAnalysis] = useState({
    isUnusualAmount: false,
    isNewBeneficiary: false,
    isDifferentLocation: false,
    multipleTransfersToday: false,
    isBlacklisted: false,
    riskScore: 0,
  })

  useEffect(() => {
    // Simulate fraud analysis
    const timeout = setTimeout(() => {
      const analysis = {
        isUnusualAmount: transferData.amount && transferData.amount > 100000,
        isNewBeneficiary: transferData.beneficiaryType === 'new',
        isDifferentLocation: Math.random() > 0.7,
        multipleTransfersToday: Math.random() > 0.8,
        isBlacklisted: false,
        riskScore: 0,
      }

      let score = 0
      if (analysis.isUnusualAmount) score += 25
      if (analysis.isNewBeneficiary) score += 20
      if (analysis.isDifferentLocation) score += 15
      if (analysis.multipleTransfersToday) score += 20

      analysis.riskScore = Math.min(score, 100)

      setDisplayedAnalysis(analysis)

      // Determine result based on risk score
      let result: 'approved' | 'rejected' | 'under-review' = 'approved'
      if (analysis.riskScore > 70) {
        result = 'under-review'
      } else if (analysis.isBlacklisted) {
        result = 'rejected'
      }

      setFraudResult(result)
      setAnalysisComplete(true)

      updateTransfer({
        fraudAnalysis: analysis,
        status: result as any,
      })
    }, 3000)

    return () => clearTimeout(timeout)
  }, [])

  const handleContinue = () => {
    router.push('/dashboard/transfer/result')
  }

  const riskColors = {
    low: 'text-green-400',
    medium: 'text-amber-400',
    high: 'text-red-400',
  }

  const getRiskLevel = (score: number) => {
    if (score < 30) return { level: 'Low', color: 'green' }
    if (score < 70) return { level: 'Medium', color: 'amber' }
    return { level: 'High', color: 'red' }
  }

  const riskLevel = getRiskLevel(displayedAnalysis.riskScore)

  return (
    <div className="min-h-screen bg-slate-900 p-6 flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-semibold text-slate-400">Verification Stage 4/4</h2>
            <span className="text-xs bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full">
              Fraud Review
            </span>
          </div>
          <div className="w-full bg-slate-700 h-1 rounded-full">
            <div className="bg-amber-500 h-1 rounded-full" style={{ width: '100%' }}></div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-amber-500/20 rounded-full mb-4">
            <TrendingUp className="w-8 h-8 text-amber-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Fraud Analysis Review</h1>
          <p className="text-slate-400">Running security checks on your transaction</p>
        </div>

        {/* Card */}
        <div className="bg-slate-800 rounded-lg p-8 mb-6">
          {!analysisComplete ? (
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="inline-block">
                  <div className="h-8 w-8 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
              </div>
              <h2 className="text-lg font-semibold text-white">Analyzing Transaction</h2>
              <p className="text-slate-400 text-sm">Our security system is reviewing your transaction...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Risk Score */}
              <div className="bg-slate-700/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-300 font-semibold">Risk Score</span>
                  <span className={`text-lg font-bold ${riskColors[riskLevel.color as keyof typeof riskColors]}`}>
                    {displayedAnalysis.riskScore}%
                  </span>
                </div>
                <div className="w-full bg-slate-600 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-${riskLevel.color}-500`}
                    style={{ width: `${displayedAnalysis.riskScore}%` }}
                  ></div>
                </div>
                <p className={`text-xs mt-2 ${riskColors[riskLevel.color as keyof typeof riskColors]}`}>
                  {riskLevel.level} Risk
                </p>
              </div>

              {/* Analysis Details */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-white">Analysis Details:</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2">
                    {displayedAnalysis.isUnusualAmount ? (
                      <AlertCircle className="w-4 h-4 text-amber-400" />
                    ) : (
                      <div className="w-4 h-4 bg-green-400 rounded-full"></div>
                    )}
                    <span className="text-slate-300">Unusual amount detected</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {displayedAnalysis.isNewBeneficiary ? (
                      <AlertCircle className="w-4 h-4 text-amber-400" />
                    ) : (
                      <div className="w-4 h-4 bg-green-400 rounded-full"></div>
                    )}
                    <span className="text-slate-300">New beneficiary account</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {displayedAnalysis.isDifferentLocation ? (
                      <AlertCircle className="w-4 h-4 text-amber-400" />
                    ) : (
                      <div className="w-4 h-4 bg-green-400 rounded-full"></div>
                    )}
                    <span className="text-slate-300">Different location detected</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {displayedAnalysis.multipleTransfersToday ? (
                      <AlertCircle className="w-4 h-4 text-amber-400" />
                    ) : (
                      <div className="w-4 h-4 bg-green-400 rounded-full"></div>
                    )}
                    <span className="text-slate-300">Multiple transfers today</span>
                  </div>
                </div>
              </div>

              {/* Result */}
              <div className={`rounded-lg p-4 ${
                fraudResult === 'approved' ? 'bg-green-500/10 border border-green-500/30' :
                fraudResult === 'rejected' ? 'bg-red-500/10 border border-red-500/30' :
                'bg-amber-500/10 border border-amber-500/30'
              }`}>
                <p className={`text-sm font-semibold ${
                  fraudResult === 'approved' ? 'text-green-300' :
                  fraudResult === 'rejected' ? 'text-red-300' :
                  'text-amber-300'
                }`}>
                  {fraudResult === 'approved' ? '✓ Transaction Approved' :
                   fraudResult === 'rejected' ? '✗ Transaction Rejected' :
                   '⏳ Under Review'}
                </p>
              </div>

              {fraudResult === 'under-review' && (
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 flex gap-3">
                  <Clock className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className="text-amber-300 text-xs">
                    Your transaction is under review. You'll be notified within 24 hours.
                  </p>
                </div>
              )}

              {fraudResult === 'rejected' && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-red-300 text-xs">
                    Transaction rejected due to security concerns. Contact support.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {analysisComplete && (
          <button
            onClick={handleContinue}
            className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition-colors"
          >
            View Result
          </button>
        )}
      </div>
    </div>
  )
}
