export const dynamic = 'force-dynamic'

'use client'

import { ArrowLeft, Search, Fence as Freeze, RotateCcw, DollarSign, Lock } from 'lucide-react'
import Link from 'next/link'
import { useState, Suspense } from 'react'
import { usePageTitle } from '@/lib/title-context'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface User {
  id: string
  name: string
  email: string
  accountNumber: string
  balance: number
  status: 'active' | 'frozen'
}

const SAMPLE_USERS: User[] = [
  { id: 'u-1', name: 'Mark David', email: 'markdavid1969@gmail.com', accountNumber: 'ACC-001', balance: 7500000, status: 'active' },
  { id: 'u-2', name: 'John Doe', email: 'john@example.com', accountNumber: 'ACC-002', balance: 45000, status: 'active' },
  { id: 'u-3', name: 'Jane Smith', email: 'jane@example.com', accountNumber: 'ACC-003', balance: 28000, status: 'frozen' },
  { id: 'u-4', name: 'Bob Johnson', email: 'bob@example.com', accountNumber: 'ACC-004', balance: 12000, status: 'active' },
]

export default function UserControlPage() {
  usePageTitle('ADMIN SETTINGS')
  const [users, setUsers] = useState<User[]>(SAMPLE_USERS)
  const [search, setSearch] = useState('')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [actionType, setActionType] = useState<string | null>(null)

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.accountNumber.includes(search)
  )

  const handleFreezeAccount = (userId: string) => {
    setUsers(users.map(u => u.id === userId ? { ...u, status: 'frozen' } : u))
    setSelectedUser(null)
    setActionType(null)
  }

  const handleUnfreezeAccount = (userId: string) => {
    setUsers(users.map(u => u.id === userId ? { ...u, status: 'active' } : u))
    setSelectedUser(null)
    setActionType(null)
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
            <h1 className="text-2xl font-bold text-white">User Account Control</h1>
            <p className="text-slate-400 text-sm">Manage user accounts and take actions</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Users List */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle>Search & Select User</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                  <Input
                    placeholder="Search by name, email, or account number..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10 bg-slate-700 border-slate-600"
                  />
                </div>

                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {filteredUsers.map((user) => (
                    <div
                      key={user.id}
                      onClick={() => setSelectedUser(user)}
                      className={`p-4 rounded-lg cursor-pointer transition ${
                        selectedUser?.id === user.id
                          ? 'bg-red-600/20 border border-red-600'
                          : 'bg-slate-700 border border-slate-600 hover:border-slate-500'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-white">{user.name}</p>
                          <p className="text-xs text-slate-400">{user.email}</p>
                          <p className="text-xs text-slate-500">Account: {user.accountNumber}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-amber-400">${user.balance.toLocaleString()}</p>
                          <span className={`text-xs px-2 py-1 rounded ${
                            user.status === 'active'
                              ? 'bg-green-500/20 text-green-300'
                              : 'bg-red-500/20 text-red-300'
                          }`}>
                            {user.status === 'active' ? 'Active' : 'Frozen'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Actions Panel */}
          <div className="space-y-6">
            {selectedUser ? (
              <>
                <Card className="bg-gradient-to-br from-red-600 to-red-700 border-red-600">
                  <CardHeader>
                    <CardTitle className="text-white">Selected User</CardTitle>
                  </CardHeader>
                  <CardContent className="text-white space-y-3">
                    <div>
                      <p className="text-xs text-red-100 mb-1">Name</p>
                      <p className="font-bold text-lg">{selectedUser.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-red-100 mb-1">Account Number</p>
                      <p className="font-mono text-sm">{selectedUser.accountNumber}</p>
                    </div>
                    <div>
                      <p className="text-xs text-red-100 mb-1">Current Balance</p>
                      <p className="text-2xl font-bold">${selectedUser.balance.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-red-100 mb-1">Status</p>
                      <p className={`font-semibold ${selectedUser.status === 'active' ? 'text-green-300' : 'text-orange-300'}`}>
                        {selectedUser.status === 'active' ? 'Active' : 'Frozen'}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <Card className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle>Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {selectedUser.status === 'active' ? (
                      <button
                        onClick={() => { setActionType('freeze'); handleFreezeAccount(selectedUser.id); }}
                        className="w-full bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition"
                      >
                        <Freeze className="w-4 h-4" />
                        Freeze Account
                      </button>
                    ) : (
                      <button
                        onClick={() => { setActionType('unfreeze'); handleUnfreezeAccount(selectedUser.id); }}
                        className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition"
                      >
                        <RotateCcw className="w-4 h-4" />
                        Unfreeze Account
                      </button>
                    )}
                    <button
                      onClick={() => setActionType('adjust-balance')}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition"
                    >
                      <DollarSign className="w-4 h-4" />
                      Adjust Balance
                    </button>
                    <button
                      onClick={() => setActionType('reset-pin')}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition"
                    >
                      <Lock className="w-4 h-4" />
                      Reset PIN
                    </button>
                  </CardContent>
                </Card>

                {/* Balance Adjustment Form */}
                {actionType === 'adjust-balance' && (
                  <Card className="bg-slate-800 border-slate-700 border-2 border-blue-600">
                    <CardHeader>
                      <CardTitle className="text-blue-400">Balance Adjustment</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="block text-sm text-slate-300 mb-2">Amount</label>
                        <Input type="number" placeholder="Enter amount" className="bg-slate-700 border-slate-600" />
                      </div>
                      <div>
                        <label className="block text-sm text-slate-300 mb-2">Action</label>
                        <select className="w-full bg-slate-700 border border-slate-600 text-white rounded px-3 py-2">
                          <option>Credit</option>
                          <option>Debit</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-slate-300 mb-2">Reason</label>
                        <Input placeholder="Administrative reason" className="bg-slate-700 border-slate-600" />
                      </div>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Confirm Adjustment</Button>
                      <button onClick={() => setActionType(null)} className="w-full text-slate-400 hover:text-slate-300 text-sm">Cancel</button>
                    </CardContent>
                  </Card>
                )}

                {/* PIN Reset Form */}
                {actionType === 'reset-pin' && (
                  <Card className="bg-slate-800 border-slate-700 border-2 border-purple-600">
                    <CardHeader>
                      <CardTitle className="text-purple-400">Reset PIN</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-purple-950/50 border border-purple-900 rounded p-3">
                        <p className="text-sm text-purple-200">
                          New PIN will be sent to user's email and SMS
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm text-slate-300 mb-2">Admin Password</label>
                        <Input type="password" placeholder="Confirm your admin password" className="bg-slate-700 border-slate-600" />
                      </div>
                      <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Confirm PIN Reset</Button>
                      <button onClick={() => setActionType(null)} className="w-full text-slate-400 hover:text-slate-300 text-sm">Cancel</button>
                    </CardContent>
                  </Card>
                )}
              </>
            ) : (
              <Card className="bg-slate-800 border-slate-700 border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Search className="w-12 h-12 text-slate-600 mb-4 opacity-50" />
                  <p className="text-slate-400 text-center">Select a user to view details and take actions</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
