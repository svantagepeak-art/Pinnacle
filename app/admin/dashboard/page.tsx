export const dynamic = 'force-dynamic'

'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { usePageTitle } from '@/lib/title-context'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LogOut, Users, TrendingUp, Activity, AlertTriangle, Lock, Settings, ClipboardList, BarChart3, Shield, Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function AdminDashboardPage() {
  usePageTitle('Admin Dashboard')
  const router = useRouter()
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('home')

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/admin-auth')
    }
  }, [user, router])

  const handleLogout = () => {
    logout()
    router.push('/admin-auth')
  }

  if (!user || user.role !== 'admin') {
    return null
  }

  // Mock data
  const stats = {
    totalUsers: 245,
    pendingReviews: 12,
    todayTransfers: 89,
    todayBills: 34,
    fraudAlerts: 5,
    frozenAccounts: 3,
  }

  const pendingReviews = [
    {
      id: 'TRX-001',
      user: 'Mark David',
      type: 'Transfer',
      amount: 5000,
      date: '2024-02-01',
      riskReason: 'Unusual amount',
      status: 'under_review',
    },
    {
      id: 'TRX-002',
      user: 'Sarah Johnson',
      type: 'Bill Payment',
      amount: 2500,
      date: '2024-02-01',
      riskReason: 'New beneficiary',
      status: 'under_review',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-slate-800 border-b border-red-900/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Admin Control Center</h1>
            <p className="text-slate-400 text-sm">Welcome, {user.name}</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-red-500 text-red-400 hover:bg-red-500/10 bg-transparent"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Tabs Navigation */}
          <TabsList className="grid grid-cols-4 gap-4 bg-transparent border-b border-slate-700">
            <TabsTrigger value="home" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
              Dashboard Home
            </TabsTrigger>
            <TabsTrigger value="verification" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
              Verification Engine
            </TabsTrigger>
            <TabsTrigger value="reviews" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
              Under Review
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
              User Control
            </TabsTrigger>
          </TabsList>

          {/* HOME TAB */}
          <TabsContent value="home" className="space-y-6">
            {/* Key Metrics Widgets */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Total Users */}
              <Card className="bg-slate-800 border-slate-700 hover:border-slate-600 transition">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-400">Total Users</CardTitle>
                  <Users className="h-5 w-5 text-blue-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">{stats.totalUsers}</div>
                  <p className="text-xs text-slate-400 mt-1">Active accounts</p>
                </CardContent>
              </Card>

              {/* Pending Reviews */}
              <Card className="bg-slate-800 border-slate-700 hover:border-slate-600 transition">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-400">Pending Reviews</CardTitle>
                  <AlertTriangle className="h-5 w-5 text-yellow-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">{stats.pendingReviews}</div>
                  <p className="text-xs text-slate-400 mt-1">Await approval</p>
                </CardContent>
              </Card>

              {/* Today's Transfers */}
              <Card className="bg-slate-800 border-slate-700 hover:border-slate-600 transition">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-400">Today Transfers</CardTitle>
                  <TrendingUp className="h-5 w-5 text-green-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">{stats.todayTransfers}</div>
                  <p className="text-xs text-slate-400 mt-1">Processed</p>
                </CardContent>
              </Card>

              {/* Today's Bills */}
              <Card className="bg-slate-800 border-slate-700 hover:border-slate-600 transition">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-400">Today Bills</CardTitle>
                  <Activity className="h-5 w-5 text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">{stats.todayBills}</div>
                  <p className="text-xs text-slate-400 mt-1">Payments</p>
                </CardContent>
              </Card>

              {/* Fraud Alerts */}
              <Card className="bg-red-950/40 border-red-900 hover:border-red-800 transition">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-red-300">Fraud Alerts</CardTitle>
                  <Shield className="h-5 w-5 text-red-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-400">{stats.fraudAlerts}</div>
                  <p className="text-xs text-red-300 mt-1">Flagged transactions</p>
                </CardContent>
              </Card>

              {/* Frozen Accounts */}
              <Card className="bg-slate-800 border-slate-700 hover:border-slate-600 transition">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-400">Frozen Accounts</CardTitle>
                  <Lock className="h-5 w-5 text-orange-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">{stats.frozenAccounts}</div>
                  <p className="text-xs text-slate-400 mt-1">Suspended</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle>Quick Access</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link href="/admin/dashboard?tab=verification" className="bg-slate-700 hover:bg-slate-600 text-white p-4 rounded-lg text-center transition">
                  <Settings className="w-6 h-6 mx-auto mb-2 text-red-400" />
                  <p className="text-sm">Verification Config</p>
                </Link>
                <Link href="/admin/dashboard?tab=reviews" className="bg-slate-700 hover:bg-slate-600 text-white p-4 rounded-lg text-center transition">
                  <ClipboardList className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
                  <p className="text-sm">Pending Reviews</p>
                </Link>
                <Link href="/admin/dashboard?tab=users" className="bg-slate-700 hover:bg-slate-600 text-white p-4 rounded-lg text-center transition">
                  <Users className="w-6 h-6 mx-auto mb-2 text-blue-400" />
                  <p className="text-sm">User Control</p>
                </Link>
                <Link href="/admin/fraud-config" className="bg-slate-700 hover:bg-slate-600 text-white p-4 rounded-lg text-center transition">
                  <BarChart3 className="w-6 h-6 mx-auto mb-2 text-green-400" />
                  <p className="text-sm">Fraud Rules</p>
                </Link>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between pb-3 border-b border-slate-700 last:border-0">
                      <div>
                        <p className="font-semibold text-white">Transfer Approved - User {i}</p>
                        <p className="text-xs text-slate-400">2 minutes ago</p>
                      </div>
                      <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-xs">Approved</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* VERIFICATION ENGINE TAB */}
          <TabsContent value="verification" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle>Verification Stages Manager</CardTitle>
                <CardDescription>Configure which verification stages are required and their order</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Token Verification */}
                <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                  <div className="flex items-center gap-4">
                    <Shield className="w-6 h-6 text-blue-400" />
                    <div>
                      <p className="font-semibold">Token Code Verification</p>
                      <p className="text-sm text-slate-400">Stage 1 - Hardware token validation</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-600 peer-checked:bg-blue-600 rounded-full peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                  </label>
                </div>

                {/* OTP Verification */}
                <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                  <div className="flex items-center gap-4">
                    <Bell className="w-6 h-6 text-green-400" />
                    <div>
                      <p className="font-semibold">OTP Verification</p>
                      <p className="text-sm text-slate-400">Stage 2 - One-time password</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-600 peer-checked:bg-green-600 rounded-full peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                  </label>
                </div>

                {/* Biometric */}
                <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                  <div className="flex items-center gap-4">
                    <Lock className="w-6 h-6 text-purple-400" />
                    <div>
                      <p className="font-semibold">Biometric Authentication</p>
                      <p className="text-sm text-slate-400">Stage 3 - Fingerprint/Face ID</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-600 peer-checked:bg-purple-600 rounded-full peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                  </label>
                </div>

                {/* Fraud Review */}
                <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                  <div className="flex items-center gap-4">
                    <AlertTriangle className="w-6 h-6 text-red-400" />
                    <div>
                      <p className="font-semibold">Fraud Activity Review</p>
                      <p className="text-sm text-slate-400">Stage 4 - Automated risk analysis</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-600 peer-checked:bg-red-600 rounded-full peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                  </label>
                </div>

                <Button className="w-full bg-red-600 hover:bg-red-700 text-white mt-6">Save Configuration</Button>
              </CardContent>
            </Card>

            {/* Transaction Rules */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle>Transaction Type Rules</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-slate-700 rounded-lg">
                  <p className="font-semibold mb-2">Small Transfer (&lt; $1000)</p>
                  <p className="text-sm text-slate-400">Skip biometrics - only PIN + OTP required</p>
                </div>
                <div className="p-4 bg-slate-700 rounded-lg">
                  <p className="font-semibold mb-2">Large Transfer ($1000 - $10000)</p>
                  <p className="text-sm text-slate-400">All stages required</p>
                </div>
                <div className="p-4 bg-slate-700 rounded-lg">
                  <p className="font-semibold mb-2">International Transfer (&gt; $10000)</p>
                  <p className="text-sm text-slate-400">All stages + manual review required</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* UNDER REVIEW TAB */}
          <TabsContent value="reviews" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle>Transactions Under Review</CardTitle>
                <CardDescription>{stats.pendingReviews} transactions pending approval</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-700">
                        <th className="text-left py-3 px-4 text-slate-400">Transaction ID</th>
                        <th className="text-left py-3 px-4 text-slate-400">User</th>
                        <th className="text-left py-3 px-4 text-slate-400">Type</th>
                        <th className="text-left py-3 px-4 text-slate-400">Amount</th>
                        <th className="text-left py-3 px-4 text-slate-400">Risk Reason</th>
                        <th className="text-left py-3 px-4 text-slate-400">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingReviews.map((trx) => (
                        <tr key={trx.id} className="border-b border-slate-700 hover:bg-slate-700/50">
                          <td className="py-3 px-4 font-mono text-amber-400">{trx.id}</td>
                          <td className="py-3 px-4">{trx.user}</td>
                          <td className="py-3 px-4">{trx.type}</td>
                          <td className="py-3 px-4 text-green-400 font-semibold">${trx.amount.toLocaleString()}</td>
                          <td className="py-3 px-4">{trx.riskReason}</td>
                          <td className="py-3 px-4 flex gap-2">
                            <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs">Approve</button>
                            <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs">Reject</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* USER CONTROL TAB */}
          <TabsContent value="users" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle>User Account Control</CardTitle>
                <CardDescription>Manage user accounts and permissions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-slate-700 rounded-lg">
                  <p className="font-semibold mb-2">Account Actions</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm">Freeze Account</button>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm">Unfreeze Account</button>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded text-sm">Adjust Balance</button>
                    <button className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-2 rounded text-sm">Reset PIN</button>
                  </div>
                </div>
                <Link href="/admin/user-control" className="block w-full bg-red-600 hover:bg-red-700 text-white text-center px-4 py-3 rounded-lg transition font-semibold">
                  Go to User Control Panel
                </Link>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
