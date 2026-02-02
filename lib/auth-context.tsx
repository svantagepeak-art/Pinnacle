'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface User {
  id: string
  name: string
  email: string
  balance: number
  accountNumber: string
  role: 'user' | 'admin'
  checkingBalance?: number
  savingsBalance?: number
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, role: 'user' | 'admin') => void
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = (email: string, password: string, role: 'user' | 'admin') => {
    // Authenticate with specific credentials
    let isValid = false
    let mockUser: User | null = null

    if (role === 'user') {
      // User login credentials
      if (email === 'pbrad8843@gmail.com' && password === 'Skyboy2019') {
        isValid = true
        // Generate unique account number
        const generateAccountNumber = () => {
          return 'ACC' + Math.random().toString(36).substring(2, 15).toUpperCase()
        }
        mockUser = {
          id: 'user-001',
          name: 'Mark David',
          email: email,
          balance: 7500000, // $7.5M total
          accountNumber: generateAccountNumber(),
          role: 'user',
          checkingBalance: 3750000, // $3.75M
          savingsBalance: 3750000, // $3.75M
        }
      }
    } else if (role === 'admin') {
      // Admin login credentials
      if (email === 'pinnaclevault@outlook.com' && password === 'Skyboy2019') {
        isValid = true
        mockUser = {
          id: 'admin-001',
          name: 'Admin Support',
          email: email,
          balance: 0,
          accountNumber: 'N/A',
          role: 'admin',
        }
      }
    }

    if (isValid && mockUser) {
      setUser(mockUser)
    }
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
