export const dynamic = 'force-dynamic'

'use client'

import { useState } from 'react'
import { useSettings } from '@/lib/settings-context'
import { usePageTitle } from '@/lib/title-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Copy, Moon, Sun, Mail, Phone, Calendar, User, Lock, Edit2, Check, X } from 'lucide-react'
import Link from 'next/link'

export default function SettingsPage() {
  usePageTitle('SETTINGS')
  const { userProfile, toggleTheme, theme } = useSettings()
  const [editingMode, setEditingMode] = useState(false)
  const [copied, setCopied] = useState(false)
  const [formData, setFormData] = useState(userProfile || {})

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSave = () => {
    setEditingMode(false)
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 mb-4">
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </Link>
        <h1 className="text-4xl font-bold mb-2">Account Settings</h1>
        <p className="text-slate-400">Manage your profile and preferences</p>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Theme Toggle */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-1">Display Theme</h2>
                <p className="text-slate-400 text-sm">Switch between light and dark mode</p>
              </div>
              <button
                onClick={toggleTheme}
                className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-5 h-5" />
                    Light Mode
                  </>
                ) : (
                  <>
                    <Moon className="w-5 h-5" />
                    Dark Mode
                  </>
                )}
              </button>
            </div>
            <div className="mt-4 p-4 bg-slate-700/50 rounded text-sm text-slate-300">
              Current Theme: <span className="font-semibold capitalize">{theme} Mode</span>
            </div>
          </div>

          {/* Profile Information */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Personal Information</h2>
              {!editingMode && (
                <button
                  onClick={() => setEditingMode(true)}
                  className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded flex items-center gap-2 transition text-sm"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
              )}
            </div>

            <div className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">First Name</label>
                  <Input
                    value={formData.firstName || ''}
                    disabled={!editingMode}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="bg-slate-700 border-slate-600 disabled:opacity-75"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Last Name</label>
                  <Input
                    value={formData.lastName || ''}
                    disabled={!editingMode}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="bg-slate-700 border-slate-600 disabled:opacity-75"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Registered Email
                </label>
                <div className="flex gap-2">
                  <Input
                    value={formData.email || ''}
                    disabled
                    className="bg-slate-700 border-slate-600 flex-1"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopy(formData.email || '')}
                    className="border-slate-600 hover:bg-slate-700"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                {copied && <p className="text-xs text-amber-400 mt-1">Copied to clipboard!</p>}
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone Number
                </label>
                <Input
                  value={formData.phoneNumber || ''}
                  disabled={!editingMode}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  className="bg-slate-700 border-slate-600 disabled:opacity-75"
                />
              </div>

              {/* DOB Field */}
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Date of Birth
                </label>
                <Input
                  value={formData.dob || ''}
                  disabled={!editingMode}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  className="bg-slate-700 border-slate-600 disabled:opacity-75"
                />
              </div>

              {/* Gender Field */}
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Gender
                </label>
                <select
                  value={formData.gender || ''}
                  disabled={!editingMode}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full bg-slate-700 border border-slate-600 text-white rounded px-3 py-2 disabled:opacity-75"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              {/* Edit Actions */}
              {editingMode && (
                <div className="flex gap-2 pt-4">
                  <Button
                    onClick={handleSave}
                    className="bg-amber-500 hover:bg-amber-600 flex-1 flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    Save Changes
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setEditingMode(false)}
                    className="flex-1 border-slate-600 hover:bg-slate-700 flex items-center justify-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Security Section */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-amber-400" />
              Security Options
            </h2>
            <div className="space-y-3">
              <button className="w-full bg-slate-700 hover:bg-slate-600 text-white p-3 rounded-lg text-left transition flex items-center justify-between">
                <span>Change Password</span>
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </button>
              <button className="w-full bg-slate-700 hover:bg-slate-600 text-white p-3 rounded-lg text-left transition flex items-center justify-between">
                <span>Change PIN (Current: 2010)</span>
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </button>
              <button className="w-full bg-slate-700 hover:bg-slate-600 text-white p-3 rounded-lg text-left transition flex items-center justify-between">
                <span>Enable Two-Factor Authentication</span>
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar - Account Summary */}
        <div className="space-y-6">
          {/* Account Info Card */}
          <div className="bg-gradient-to-br from-amber-600 to-amber-700 rounded-lg p-6 text-white">
            <p className="text-sm text-amber-100 mb-2">Account Number</p>
            <p className="text-xl font-mono font-bold mb-4">{userProfile.accountNumber}</p>
            <button
              onClick={() => handleCopy(userProfile.accountNumber)}
              className="w-full bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded text-sm transition flex items-center justify-center gap-2"
            >
              <Copy className="w-4 h-4" />
              Copy
            </button>
          </div>

          {/* Account Type */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <p className="text-sm text-slate-400 mb-2">Account Type</p>
            <p className="text-lg font-semibold">{userProfile.accountType}</p>
          </div>

          {/* Full Name */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <p className="text-sm text-slate-400 mb-2">Account Holder</p>
            <p className="text-lg font-semibold">{userProfile.firstName} {userProfile.lastName}</p>
          </div>

          {/* Quick Actions */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h3 className="font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Link href="/dashboard" className="block w-full bg-amber-500 hover:bg-amber-600 text-white text-center px-3 py-2 rounded transition font-medium">
                Go to Dashboard
              </Link>
              <button className="w-full bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded transition">
                Download Statement
              </button>
              <button className="w-full bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded transition">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
