export const dynamic = 'force-dynamic'

'use client'

import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { usePageTitle } from '@/lib/title-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Lock, Mail, Eye, EyeOff, Shield, AlertTriangle } from 'lucide-react'
import Image from 'next/image'

export default function AdminLoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  usePageTitle('ADMIN LOGIN')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (!email || !password) {
        setError('Please enter both email and password')
        setLoading(false)
        return
      }

      login(email, password, 'admin')
      await new Promise(resolve => setTimeout(resolve, 500))
      router.push('/admin/dashboard')
    } catch (err) {
      setError('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 overflow-hidden">
      {/* Background gradient elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-900/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 opacity-50"></div>
      </div>

      {/* Admin badge */}
      <div className="absolute top-6 right-6 z-20">
        <div className="bg-red-500/20 border border-red-500/50 rounded-lg px-4 py-2 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-400" />
          <span className="text-sm font-semibold text-red-400">ADMIN PANEL</span>
        </div>
      </div>

      {/* Banking fixtures pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 text-6xl">🏦</div>
        <div className="absolute bottom-32 left-12 text-5xl">📋</div>
        <div className="absolute top-1/2 right-1/4 text-4xl">⚙️</div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Header Section */}
          <div className="text-center mb-12">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-red-600 via-red-700 to-red-800 p-0.5 shadow-lg shadow-red-600/20">
                <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
                  <Image
                    src="/pinnacle-logo.png"
                    alt="Pinnacle Vault Trust"
                    width={80}
                    height={80}
                    className="object-contain opacity-90"
                  />
                </div>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
              Pinnacle Vault Trust
            </h1>
            <p className="text-red-400 font-semibold text-sm mb-4">ADMIN CONTROL CENTER</p>
            <div className="flex items-center justify-center gap-2 text-slate-400 text-xs">
              <Shield className="w-4 h-4 text-green-400" />
              <span>Bank-Level Security | ISO 27001 Certified</span>
            </div>
          </div>

          {/* Login Card */}
          <div className="bg-slate-900/80 backdrop-blur-lg border border-red-900/30 rounded-2xl p-8 shadow-2xl">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Admin Login</h2>
              <p className="text-slate-400 text-sm">Authorized administrators only</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-2">
                  Admin Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 w-5 h-5 text-red-400" />
                  <Input
                    type="email"
                    placeholder="admin@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-red-400 focus:ring-red-400/20"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 w-5 h-5 text-red-400" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-red-400 focus:ring-red-400/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-slate-400 hover:text-red-400 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-950/50 border border-red-900 rounded-lg p-3 text-red-300 text-sm">
                  {error}
                </div>
              )}

              {/* Security Checkbox */}
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-slate-600 bg-slate-800 cursor-pointer accent-red-500"
                  />
                  <span className="text-sm text-slate-400">I acknowledge this is a secure admin portal</span>
                </label>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-2.5 rounded-lg transition-all duration-300 shadow-lg shadow-red-600/30 disabled:opacity-50"
              >
                {loading ? 'Logging in...' : 'Login to Admin Panel'}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-slate-900 text-slate-500">Support & Assistance</span>
              </div>
            </div>

            {/* Support Info */}
            <p className="text-center text-sm text-slate-400">
              Authorized administrators only. Contact support for account issues.
            </p>
          </div>

          {/* Security Footer */}
          <div className="mt-8 p-4 bg-red-950/20 rounded-lg border border-red-900/30">
            <p className="text-xs text-red-300 text-center font-semibold">
              ⚠️ This admin panel is protected. All access is logged and monitored.
            </p>
          </div>

          {/* Security Features */}
          <div className="grid grid-cols-3 gap-4 mt-8 text-center">
            <div className="text-xs">
              <div className="text-red-400 font-bold mb-1">🔐</div>
              <p className="text-slate-400">Multi-Factor</p>
            </div>
            <div className="text-xs">
              <div className="text-red-400 font-bold mb-1">📊</div>
              <p className="text-slate-400">Monitored</p>
            </div>
            <div className="text-xs">
              <div className="text-red-400 font-bold mb-1">📝</div>
              <p className="text-slate-400">Audited</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
