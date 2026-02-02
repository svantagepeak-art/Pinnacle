export const dynamic = 'force-dynamic'

'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { usePageTitle } from '@/lib/title-context'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LogOut, Send, CreditCard, Eye, EyeOff, History, FileText, Smartphone, Users, Lock, Key, Phone, HelpCircle, MessageSquare, AlertCircle, Clock, CheckCircle, XCircle, TrendingUp, TrendingDown, PlusCircle, Bell, Calendar, Candy as Card2, User, BarChart3, Settings } from 'lucide-react'

const mockTransactions = [
  { id: 1, date: '2025-02-01', description: 'Amazon Purchase', amount: 125.50, type: 'debit', status: 'completed' },
  { id: 2, date: '2025-01-31', description: 'Salary Deposit', amount: 5500.00, type: 'credit', status: 'completed' },
  { id: 3, date: '2025-01-30', description: 'Electricity Bill', amount: 189.99, type: 'debit', status: 'completed' },
  { id: 4, date: '2025-01-29', description: 'Restaurant', amount: 65.40, type: 'debit', status: 'completed' },
  { id: 5, date: '2025-01-28', description: 'Transfer to Savings', amount: 1000.00, type: 'debit', status: 'completed' },
  { id: 6, date: '2025-01-27', description: 'Freelance Income', amount: 800.00, type: 'credit', status: 'completed' },
  { id: 7, date: '2025-01-26', description: 'Grocery Store', amount: 156.75, type: 'debit', status: 'completed' },
  { id: 8, date: '2025-01-25', description: 'Gas Station', amount: 55.00, type: 'debit', status: 'completed' },
  { id: 9, date: '2025-01-24', description: 'Netflix Subscription', amount: 15.99, type: 'debit', status: 'completed' },
  { id: 10, date: '2025-01-23', description: 'ATM Withdrawal', amount: 200.00, type: 'debit', status: 'completed' },
]

const upcomingBills = [
  { id: 1, name: 'Electricity Bill', amount: 189.99, dueDate: '2025-02-15', status: 'pending' },
  { id: 2, name: 'Internet Bill', amount: 79.99, dueDate: '2025-02-10', status: 'pending' },
  { id: 3, name: 'Water Bill', amount: 65.00, dueDate: '2025-02-20', status: 'pending' },
]

const savedBillers = [
  { id: 1, name: 'Electric Company', category: 'Utilities' },
  { id: 2, name: 'Internet Provider', category: 'Utilities' },
  { id: 3, name: 'Phone Company', category: 'Mobile' },
]

const linkedCards = [
  { id: 1, type: 'Debit', last4: '4242', status: 'active', isFrozen: false },
  { id: 2, type: 'Credit', last4: '5555', status: 'active', isFrozen: false },
]

const beneficiaries = [
  { id: 1, name: 'John Smith', accountNumber: '****3456', bank: 'Local Bank' },
  { id: 2, name: 'Sarah Johnson', accountNumber: '****7890', bank: 'National Bank' },
]

const alerts = [
  { id: 1, type: 'security', title: 'New Login', message: 'Login from Chrome on Windows 10', time: '2 hours ago' },
  { id: 2, type: 'failed', title: 'Failed Transaction', message: 'Payment to Amazon failed. Retry?', time: '4 hours ago' },
  { id: 3, type: 'pending', title: 'Pending Approval', message: 'Large transfer waiting approval', time: '1 day ago' },
]

export default function UserDashboard() {
  usePageTitle('User Dashboard')
  const router = useRouter()
  const { user, logout } = useAuth()
  const [showBalance, setShowBalance] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [ledgerBalance, setLedgerBalance] = useState(7650000) // Slightly higher than available

  useEffect(() => {
    if (!user || user.role !== 'user') {
      router.push('/')
    }
  }, [user, router])

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  if (!user) return null

  const totalIncome = 6300
  const totalExpenses = 808.63
  const monthlySpending = [
    { category: 'Groceries', amount: 450, percentage: 22 },
    { category: 'Utilities', amount: 255, percentage: 12 },
    { category: 'Entertainment', amount: 180, percentage: 9 },
    { category: 'Transportation', amount: 320, percentage: 15 },
    { category: 'Dining', amount: 603.63, percentage: 29 },
    { category: 'Shopping', amount: 192, percentage: 13 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Welcome, {user.name}</h1>
            <p className="text-slate-400 text-sm">Dashboard</p>
          </div>
          <div className="flex gap-2">
            <Link href="/dashboard/settings" className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition">
              <Settings className="w-4 h-4" />
              <span className="text-sm">Settings</span>
            </Link>
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
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Notification Center - Alerts */}
        <Card className="bg-slate-800 border-slate-700 mb-8">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Center
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex items-start gap-3 p-3 bg-slate-700/50 rounded-lg">
                  <div>
                    {alert.type === 'security' && <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5" />}
                    {alert.type === 'failed' && <XCircle className="w-5 h-5 text-red-400 mt-0.5" />}
                    {alert.type === 'pending' && <Clock className="w-5 h-5 text-yellow-400 mt-0.5" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium text-sm">{alert.title}</p>
                    <p className="text-slate-400 text-xs">{alert.message}</p>
                    <p className="text-slate-500 text-xs mt-1">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* At a Glance Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-amber-500 to-amber-600 border-0">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-amber-100 text-sm mb-1">Available Balance</p>
                  <div className="flex items-center gap-3">
                    <h2 className="text-3xl font-bold text-white">
                      ${showBalance ? (user.balance / 1000000).toFixed(1) + 'M' : '••••'}
                    </h2>
                    <button
                      onClick={() => setShowBalance(!showBalance)}
                      className="text-amber-100 hover:text-white"
                    >
                      {showBalance ? (
                        <Eye className="w-5 h-5" />
                      ) : (
                        <EyeOff className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
                <TrendingUp className="w-12 h-12 text-amber-100 opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-slate-700 to-slate-600 border-0">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-slate-300 text-sm mb-1">Ledger Balance</p>
                  <h2 className="text-3xl font-bold text-white">
                    ${(ledgerBalance / 1000000).toFixed(2)}M
                  </h2>
                </div>
                <TrendingDown className="w-12 h-12 text-slate-400 opacity-50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Account At a Glance */}
        <Card className="bg-slate-800 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <User className="w-5 h-5" />
              At A Glance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-700 rounded-lg p-4">
                <p className="text-slate-400 text-sm mb-2">Account Name</p>
                <p className="text-white font-semibold">{user.name}</p>
              </div>
              <div className="bg-slate-700 rounded-lg p-4">
                <p className="text-slate-400 text-sm mb-2">Checking Account</p>
                <p className="text-white font-mono text-sm">{user.accountNumber}</p>
              </div>
              <div className="bg-slate-700 rounded-lg p-4">
                <p className="text-slate-400 text-sm mb-2">Account Type</p>
                <p className="text-white font-semibold">Savings & Checking</p>
              </div>
              <div className="bg-slate-700 rounded-lg p-4">
                <p className="text-slate-400 text-sm mb-2">Status</p>
                <p className="text-green-400 font-semibold">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Action Panel */}
        <Card className="bg-slate-800 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              <Link href="/dashboard/transfer" className="bg-slate-700 hover:bg-slate-600 text-white p-4 rounded-lg flex flex-col items-center gap-2 transition">
                <Send className="w-6 h-6 text-amber-400" />
                <span className="text-xs text-center">Transfer Money</span>
              </Link>
              <Link href="/dashboard/pay-bills" className="bg-slate-700 hover:bg-slate-600 text-white p-4 rounded-lg flex flex-col items-center gap-2 transition">
                <CreditCard className="w-6 h-6 text-amber-400" />
                <span className="text-xs text-center">Pay Bills</span>
              </Link>
              <button className="bg-slate-700 hover:bg-slate-600 text-white p-4 rounded-lg flex flex-col items-center gap-2 transition">
                <History className="w-6 h-6 text-amber-400" />
                <span className="text-xs text-center">Transactions</span>
              </button>
              <button className="bg-slate-700 hover:bg-slate-600 text-white p-4 rounded-lg flex flex-col items-center gap-2 transition">
                <FileText className="w-6 h-6 text-amber-400" />
                <span className="text-xs text-center">Statements</span>
              </button>
              <button className="bg-slate-700 hover:bg-slate-600 text-white p-4 rounded-lg flex flex-col items-center gap-2 transition">
                <Card2 className="w-6 h-6 text-amber-400" />
                <span className="text-xs text-center">Cards</span>
              </button>
              <button className="bg-slate-700 hover:bg-slate-600 text-white p-4 rounded-lg flex flex-col items-center gap-2 transition">
                <Users className="w-6 h-6 text-amber-400" />
                <span className="text-xs text-center">Beneficiaries</span>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-slate-800 border border-slate-700 mb-8">
            <TabsTrigger value="overview" className="text-slate-400 data-[state=active]:text-white data-[state=active]:bg-slate-700">
              Overview
            </TabsTrigger>
            <TabsTrigger value="transactions" className="text-slate-400 data-[state=active]:text-white data-[state=active]:bg-slate-700">
              Transactions
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-slate-400 data-[state=active]:text-white data-[state=active]:bg-slate-700">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="bills" className="text-slate-400 data-[state=active]:text-white data-[state=active]:bg-slate-700">
              Bills & Payments
            </TabsTrigger>
            <TabsTrigger value="cards" className="text-slate-400 data-[state=active]:text-white data-[state=active]:bg-slate-700">
              Cards
            </TabsTrigger>
            <TabsTrigger value="security" className="text-slate-400 data-[state=active]:text-white data-[state=active]:bg-slate-700">
              Security
            </TabsTrigger>
            <TabsTrigger value="support" className="text-slate-400 data-[state=active]:text-white data-[state=active]:bg-slate-700">
              Support
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Recent Transactions */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <History className="w-5 h-5" />
                  Recent Transactions
                </CardTitle>
                <CardDescription>Your last 5-10 transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {mockTransactions.map((txn) => (
                    <div key={txn.id} className="flex items-center justify-between p-4 bg-slate-700 rounded-lg hover:bg-slate-600 transition">
                      <div className="flex-1">
                        <p className="text-white font-medium">{txn.description}</p>
                        <p className="text-slate-400 text-sm">{txn.date}</p>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${txn.type === 'debit' ? 'text-red-400' : 'text-green-400'}`}>
                          {txn.type === 'debit' ? '-' : '+'}${txn.amount.toFixed(2)}
                        </p>
                        <span className="text-xs px-2 py-1 rounded bg-green-500/20 text-green-400">
                          {txn.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4 bg-slate-700 hover:bg-slate-600 text-white">
                  View All Transactions
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Transactions Tab */}
          <TabsContent value="transactions" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Transaction History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {mockTransactions.map((txn) => (
                    <div key={txn.id} className="flex items-center justify-between p-4 bg-slate-700 rounded-lg hover:bg-slate-600 transition">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${txn.type === 'debit' ? 'bg-red-500/20' : 'bg-green-500/20'}`}>
                          {txn.type === 'debit' ? (
                            <TrendingDown className="w-5 h-5 text-red-400" />
                          ) : (
                            <TrendingUp className="w-5 h-5 text-green-400" />
                          )}
                        </div>
                        <div>
                          <p className="text-white font-medium">{txn.description}</p>
                          <p className="text-slate-400 text-sm">{txn.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${txn.type === 'debit' ? 'text-red-400' : 'text-green-400'}`}>
                          {txn.type === 'debit' ? '-' : '+'}${txn.amount.toFixed(2)}
                        </p>
                        <CheckCircle className="w-4 h-4 text-green-400 mt-1 ml-auto" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Income vs Expenses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-slate-400">This Month Income</span>
                        <span className="text-green-400 font-semibold">${totalIncome}</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-slate-400">This Month Expenses</span>
                        <span className="text-red-400 font-semibold">${totalExpenses}</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full" style={{ width: '12%' }}></div>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-slate-700">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Net Income</span>
                        <span className="text-amber-400 font-semibold">${(totalIncome - totalExpenses).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Top Spending Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {monthlySpending.map((item, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between mb-1">
                          <span className="text-slate-300 text-sm">{item.category}</span>
                          <span className="text-amber-400 font-semibold text-sm">${item.amount}</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Cash Flow Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-700 rounded-lg p-6 text-center">
                    <p className="text-slate-400 text-sm mb-2">Monthly Income</p>
                    <p className="text-2xl font-bold text-green-400">${totalIncome}</p>
                  </div>
                  <div className="bg-slate-700 rounded-lg p-6 text-center">
                    <p className="text-slate-400 text-sm mb-2">Monthly Expenses</p>
                    <p className="text-2xl font-bold text-red-400">${totalExpenses.toFixed(2)}</p>
                  </div>
                  <div className="bg-slate-700 rounded-lg p-6 text-center">
                    <p className="text-slate-400 text-sm mb-2">Net Savings</p>
                    <p className="text-2xl font-bold text-amber-400">${(totalIncome - totalExpenses).toFixed(2)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bills & Payments Tab */}
          <TabsContent value="bills" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Upcoming Bills
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {upcomingBills.map((bill) => (
                      <div key={bill.id} className="bg-slate-700 rounded-lg p-4">
                        <div className="flex justify-between mb-2">
                          <p className="text-white font-medium">{bill.name}</p>
                          <p className="text-red-400 font-semibold">${bill.amount}</p>
                        </div>
                        <p className="text-slate-400 text-sm">Due: {bill.dueDate}</p>
                        <Button className="w-full mt-3 bg-amber-500 hover:bg-amber-600 text-white text-sm">
                          Pay Now
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Saved Billers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {savedBillers.map((biller) => (
                      <div key={biller.id} className="bg-slate-700 rounded-lg p-4 flex justify-between items-center">
                        <div>
                          <p className="text-white font-medium">{biller.name}</p>
                          <p className="text-slate-400 text-sm">{biller.category}</p>
                        </div>
                        <Button size="sm" className="bg-amber-500 hover:bg-amber-600">
                          <PlusCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Recent Bill Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    { name: 'Electricity Bill', amount: 189.99, date: '2025-01-20', status: 'completed' },
                    { name: 'Internet Bill', amount: 79.99, date: '2025-01-15', status: 'completed' },
                    { name: 'Water Bill', amount: 65.00, date: '2025-01-10', status: 'completed' },
                  ].map((payment, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                      <div>
                        <p className="text-white font-medium">{payment.name}</p>
                        <p className="text-slate-400 text-sm">{payment.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-red-400 font-semibold">${payment.amount}</p>
                        <CheckCircle className="w-4 h-4 text-green-400 mt-1 ml-auto" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Cards Tab */}
          <TabsContent value="cards" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Card2 className="w-5 h-5" />
                  Linked Cards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {linkedCards.map((card) => (
                    <div key={card.id} className="bg-gradient-to-r from-slate-700 to-slate-600 rounded-lg p-6 border border-slate-500">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <p className="text-slate-300 text-sm">{card.type} Card</p>
                          <p className="text-white font-mono text-lg mt-1">**** **** **** {card.last4}</p>
                        </div>
                        <span className={`px-3 py-1 rounded text-xs font-semibold ${card.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                          {card.status === 'active' ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <div className="flex gap-3">
                        <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-white">
                          {card.isFrozen ? 'Unfreeze' : 'Freeze'} Card
                        </Button>
                        <Button size="sm" variant="outline" className="border-slate-500 text-slate-300 hover:bg-slate-600 bg-transparent">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Lock className="w-5 h-5" />
                    Change Password
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white">
                    Update Password
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Key className="w-5 h-5" />
                    Change PIN
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white">
                    Update PIN
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    Enable 2FA
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white">
                    Setup Two-Factor Authentication
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Smartphone className="w-5 h-5" />
                    Token Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white">
                    Manage Security Tokens
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700 md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <History className="w-5 h-5" />
                    Login Activities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { device: 'Chrome on Windows 10', time: '2 hours ago', location: 'New York, USA' },
                      { device: 'Safari on iPhone', time: '1 day ago', location: 'New York, USA' },
                      { device: 'Chrome on Windows 10', time: '2 days ago', location: 'New York, USA' },
                    ].map((activity, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                        <div>
                          <p className="text-white font-medium text-sm">{activity.device}</p>
                          <p className="text-slate-400 text-xs">{activity.location}</p>
                        </div>
                        <p className="text-slate-400 text-xs">{activity.time}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Support Tab */}
          <TabsContent value="support" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Chat Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400 text-sm mb-4">Contact our support team via live chat</p>
                  <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white">
                    Start Chat
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <HelpCircle className="w-5 h-5" />
                    FAQs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400 text-sm mb-4">Find answers to common questions</p>
                  <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white">
                    View FAQs
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Dispute Transaction
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400 text-sm mb-4">Report a disputed transaction</p>
                  <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white">
                    File Dispute
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Statements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400 text-sm mb-4">Generate and download statements</p>
                  <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white">
                    Generate Statement
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Beneficiaries Section */}
        <Card className="bg-slate-800 border-slate-700 mt-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="w-5 h-5" />
              Beneficiaries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {beneficiaries.map((beneficiary) => (
                <div key={beneficiary.id} className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                  <div>
                    <p className="text-white font-medium">{beneficiary.name}</p>
                    <p className="text-slate-400 text-sm">{beneficiary.accountNumber} • {beneficiary.bank}</p>
                  </div>
                  <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-white">
                    Send Money
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
