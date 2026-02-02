'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface UserProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  dob: string
  gender: string
  accountNumber: string
  accountType: string
}

interface SettingsContextType {
  theme: 'dark' | 'light'
  toggleTheme: () => void
  userProfile: UserProfile | null
  updateUserProfile: (profile: Partial<UserProfile>) => void
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [mounted, setMounted] = useState(false)

  // Initialize profile on client side
  useEffect(() => {
    // Generate unique account number
    const generateAccountNumber = () => {
      return 'ACC' + Math.random().toString(36).substring(2, 15).toUpperCase()
    }

    const profile: UserProfile = {
      id: 'user-001',
      firstName: 'Mark',
      lastName: 'David',
      email: 'markdavid1969@gmail.com',
      phoneNumber: '+1 (628) 400-3594',
      dob: '20/10/1969',
      gender: 'Male',
      accountNumber: generateAccountNumber(),
      accountType: 'Savings & Checking',
    }

    setUserProfile(profile)
    setMounted(true)

    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null
    if (savedTheme) {
      setTheme(savedTheme)
      // Apply theme to HTML element
      const htmlElement = document.documentElement
      if (savedTheme === 'light') {
        htmlElement.classList.remove('dark')
      } else {
        htmlElement.classList.add('dark')
      }
    } else {
      // Default to dark theme
      document.documentElement.classList.add('dark')
    }
  }, [])

  // Update theme and save to localStorage
  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'dark' ? 'light' : 'dark'
      localStorage.setItem('theme', newTheme)
      // Apply theme to HTML element
      const htmlElement = document.documentElement
      if (newTheme === 'light') {
        htmlElement.classList.remove('dark')
      } else {
        htmlElement.classList.add('dark')
      }
      return newTheme
    })
  }

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    if (userProfile) {
      setUserProfile({ ...userProfile, ...updates })
    }
  }

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <SettingsContext.Provider value={{ theme, toggleTheme, userProfile, updateUserProfile }}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
}
