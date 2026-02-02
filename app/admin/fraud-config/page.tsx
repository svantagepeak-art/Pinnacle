export const dynamic = 'force-dynamic'

'use client'

import { ArrowLeft, AlertTriangle, Globe, TrendingUp, Smartphone, Users } from 'lucide-react'
import Link from 'next/link'
import { usePageTitle } from '@/lib/title-context'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function FraudConfigPage() {
  usePageTitle('FRAUD CONFIGURATION')
  const [config, setConfig] = useState({
    amountThreshold: 10000,
    dailyLimit: 50000,
    highRiskCountries: ['NK', 'IR', 'SY'],
    newBeneficiaryRule: 'require_verification',
    suspiciousBehavior: 'flag_for_review',
  })

  const [unsavedChanges, setUnsavedChanges] = useState(false)

  const handleUpdate = (field: string, value: any) => {
    setConfig({ ...config, [field]: value })
    setUnsavedChanges(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-slate-800 border-b border-red-900/50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/admin/dashboard" className="text-red-400 hover:text-red-300">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">Fraud Rule Configuration</h1>
            <p className="text-slate-400 text-sm">Define risk thresholds and fraud detection rules</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Config */}
          <div className="lg:col-span-2 space-y-6">
            {/* Amount Thresholds */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  Amount Thresholds
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm text-slate-300 mb-2">
                    Amount Trigger For Review: ${config.amountThreshold}
                  </label>
                  <Input
                    type="number"
                    value={config.amountThreshold}
                    onChange={(e) => handleUpdate('amountThreshold', Number(e.target.value))}
                    className="bg-slate-700 border-slate-600 mb-4"
                  />
                  <p className="text-xs text-slate-400">Transactions exceeding this amount will go for fraud review</p>
                </div>

                <div>
                  <label className="block text-sm text-slate-300 mb-2">
                    Daily Transaction Limit: ${config.dailyLimit}
                  </label>
                  <Input
                    type="number"
                    value={config.dailyLimit}
                    onChange={(e) => handleUpdate('dailyLimit', Number(e.target.value))}
                    className="bg-slate-700 border-slate-600 mb-4"
                  />
                  <p className="text-xs text-slate-400">Users cannot exceed this total per day</p>
                </div>
              </CardContent>
            </Card>

            {/* Geographic Rules */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-blue-400" />
                  Geographic Risk Rules
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-300 mb-2">High-Risk Countries (ISO Codes)</label>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {config.highRiskCountries.map((country) => (
                      <div key={country} className="bg-red-600/20 border border-red-600 text-red-300 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                        {country}
                        <button
                          onClick={() => handleUpdate('highRiskCountries', config.highRiskCountries.filter(c => c !== country))}
                          className="text-red-400 hover:text-red-300"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                  <Input placeholder="Add country code (e.g., CN, RU)" className="bg-slate-700 border-slate-600" />
                </div>
              </CardContent>
            </Card>

            {/* Behavioral Rules */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-400" />
                  Behavioral Detection Rules
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-slate-700 rounded-lg">
                  <p className="font-semibold mb-2">New Beneficiary Rule</p>
                  <select
                    value={config.newBeneficiaryRule}
                    onChange={(e) => handleUpdate('newBeneficiaryRule', e.target.value)}
                    className="w-full bg-slate-600 border border-slate-500 text-white rounded px-3 py-2"
                  >
                    <option value="allow">Allow immediately</option>
                    <option value="require_verification">Require verification</option>
                    <option value="manual_review">Manual review only</option>
                  </select>
                  <p className="text-xs text-slate-400 mt-2">Action when user adds new beneficiary</p>
                </div>

                <div className="p-4 bg-slate-700 rounded-lg">
                  <p className="font-semibold mb-2">Suspicious Behavior Detection</p>
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded accent-red-500" />
                      <span className="text-sm">Multiple transfers in 1 hour (5+) → Flag</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded accent-red-500" />
                      <span className="text-sm">New device login → Extra verification</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded accent-red-500" />
                      <span className="text-sm">Location change &gt;500km → Alert</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded accent-red-500" />
                      <span className="text-sm">Unusual time pattern → Monitor</span>
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Device Rules */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-orange-400" />
                  Device & Access Rules
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded accent-orange-500" />
                    <span className="text-sm">Block known VPN networks</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded accent-orange-500" />
                    <span className="text-sm">Require biometric for new devices</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded accent-orange-500" />
                    <span className="text-sm">Monitor impossible travel</span>
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Risk Score Thresholds */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-400" />
                  Risk Score Thresholds
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-3 bg-green-950/40 border border-green-900 rounded">
                    <p className="text-xs text-green-300 font-semibold">Low Risk</p>
                    <p className="text-lg font-bold text-green-400">0-30</p>
                  </div>
                  <div className="p-3 bg-yellow-950/40 border border-yellow-900 rounded">
                    <p className="text-xs text-yellow-300 font-semibold">Medium Risk</p>
                    <p className="text-lg font-bold text-yellow-400">30-70</p>
                  </div>
                  <div className="p-3 bg-red-950/40 border border-red-900 rounded">
                    <p className="text-xs text-red-300 font-semibold">High Risk</p>
                    <p className="text-lg font-bold text-red-400">70-100</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Save Configuration */}
            {unsavedChanges && (
              <div className="flex gap-3">
                <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white" onClick={() => setUnsavedChanges(false)}>
                  Save Configuration
                </Button>
                <Button variant="outline" className="flex-1 border-slate-600 hover:bg-slate-700 bg-transparent" onClick={() => setUnsavedChanges(false)}>
                  Cancel
                </Button>
              </div>
            )}
          </div>

          {/* Info Sidebar */}
          <div className="space-y-6">
            <Card className="bg-blue-950/30 border border-blue-900">
              <CardHeader>
                <CardTitle className="text-blue-300 text-sm">Configuration Tips</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-blue-200 space-y-3">
                <p>Set thresholds based on your risk tolerance and transaction patterns.</p>
                <p>More rules = more false positives but higher security.</p>
                <p>Monitor fraud trends and adjust rules regularly.</p>
                <p>Use geographic rules for compliance requirements.</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-sm">Current Rules Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div>
                  <p className="text-slate-400">Amount Threshold</p>
                  <p className="font-bold text-amber-400">${config.amountThreshold.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-slate-400">Daily Limit</p>
                  <p className="font-bold text-amber-400">${config.dailyLimit.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-slate-400">High-Risk Countries</p>
                  <p className="font-bold text-red-400">{config.highRiskCountries.length} countries</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-sm">Documentation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <button className="w-full text-left text-blue-400 hover:text-blue-300 text-sm">View Fraud Detection Guide</button>
                <button className="w-full text-left text-blue-400 hover:text-blue-300 text-sm">Best Practices</button>
                <button className="w-full text-left text-blue-400 hover:text-blue-300 text-sm">Report Templates</button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
