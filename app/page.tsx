'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { usePageTitle } from '@/lib/title-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Lock, Mail, Eye, EyeOff, Shield } from 'lucide-react'
import Image from 'next/image'

export default function UserLoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  usePageTitle('USER LOGIN')
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

      login(email, password, 'user')
      await new Promise(resolve => setTimeout(resolve, 500))
      router.push('/dashboard')
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
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-900/20 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 opacity-50"></div>
      </div>

      {/* Banking fixtures pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 text-6xl">🏦</div>
        <div className="absolute bottom-32 left-12 text-5xl">💳</div>
        <div className="absolute top-1/2 right-1/4 text-4xl">📊</div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Header Section */}
          <div className="text-center mb-12">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 p-0.5 shadow-lg shadow-amber-500/20">
                <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
                  <Image
                    src="/pinnacle-logo.png"
                    alt="Pinnacle Vault Trust"
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
              Pinnacle Vault Trust
            </h1>
            <p className="text-amber-300 font-semibold text-sm mb-4">SECURE DIGITAL BANKING</p>
            <div className="flex items-center justify-center gap-2 text-slate-400 text-xs">
              <Shield className="w-4 h-4 text-green-400" />
              <span>Bank-Level Security | ISO 27001 Certified</span>
            </div>
          </div>

          {/* Login Card */}
          <div className="bg-slate-900/80 backdrop-blur-lg border border-slate-800 rounded-2xl p-8 shadow-2xl">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">User Login</h2>
              <p className="text-slate-400 text-sm">Access your secure banking portal</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 w-5 h-5 text-amber-400" />
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-amber-400 focus:ring-amber-400/20"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 w-5 h-5 text-amber-400" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-amber-400 focus:ring-amber-400/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-slate-400 hover:text-amber-400 transition-colors"
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

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-slate-600 bg-slate-800 cursor-pointer accent-amber-500"
                  />
                  <span className="text-sm text-slate-400">Remember me</span>
                </label>
                <a href="#" className="text-sm text-amber-400 hover:text-amber-300 transition-colors">
                  Forgot Password?
                </a>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold py-2.5 rounded-lg transition-all duration-300 shadow-lg shadow-amber-500/30 disabled:opacity-50"
              >
                {loading ? 'Logging in...' : 'Login to Your Account'}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-slate-900 text-slate-500">New to Pinnacle?</span>
              </div>
            </div>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-slate-400">
              Are you new to Pinnacle Vault Trust?{' '}
              <a href="#" className="text-amber-400 hover:text-amber-300 font-semibold transition-colors">
                Sign Up here
              </a>
            </p>
          </div>

          {/* Security Footer */}
          <div className="mt-8 p-4 bg-slate-900/50 rounded-lg border border-slate-800/50">
            <p className="text-xs text-slate-500 text-center">
              This is a secure login portal. Never share your credentials. Always verify the URL before login.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 mt-8 text-center">
            <div className="text-xs">
              <div className="text-amber-400 font-bold mb-1">🔒</div>
              <p className="text-slate-400">256-Bit SSL</p>
            </div>
            <div className="text-xs">
              <div className="text-amber-400 font-bold mb-1">✓</div>
              <p className="text-slate-400">Verified</p>
            </div>
            <div className="text-xs">
              <div className="text-amber-400 font-bold mb-1">🛡️</div>
              <p className="text-slate-400">Protected</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
