'use client'

import React, { createContext, useContext, useState } from 'react'

export interface TransferData {
  transferType: 'own' | 'same-bank' | 'other-bank' | 'international' | null
  beneficiaryType: 'saved' | 'new' | null
  selectedBeneficiary: {
    id?: string
    accountNumber: string
    bankName: string
    accountName: string
  } | null
  amount: number | null
  narration: string
  fees: number
  pin: string
  tokenCode: string
  otp: string
  biometricVerified: boolean
  status: 'pending' | 'token-verification' | 'otp-verification' | 'biometric-verification' | 'fraud-review' | 'approved' | 'rejected' | 'under-review'
  transactionReference: string
  fraudAnalysis: {
    isUnusualAmount: boolean
    isNewBeneficiary: boolean
    isDifferentLocation: boolean
    multipleTransfersToday: boolean
    isBlacklisted: boolean
    riskScore: number
  }
}

interface TransferContextType {
  transferData: TransferData
  updateTransfer: (data: Partial<TransferData>) => void
  resetTransfer: () => void
  addSavedBeneficiary: (beneficiary: any) => void
  savedBeneficiaries: any[]
}

const TransferContext = createContext<TransferContextType | undefined>(undefined)

const initialTransferData: TransferData = {
  transferType: null,
  beneficiaryType: null,
  selectedBeneficiary: null,
  amount: null,
  narration: '',
  fees: 0,
  pin: '',
  tokenCode: '',
  otp: '',
  biometricVerified: false,
  status: 'pending',
  transactionReference: '',
  fraudAnalysis: {
    isUnusualAmount: false,
    isNewBeneficiary: false,
    isDifferentLocation: false,
    multipleTransfersToday: false,
    isBlacklisted: false,
    riskScore: 0,
  },
}

export function TransferProvider({ children }: { children: React.ReactNode }) {
  const [transferData, setTransferData] = useState<TransferData>(initialTransferData)
  const [savedBeneficiaries, setSavedBeneficiaries] = useState([
    {
      id: '1',
      accountNumber: '1234567890',
      bankName: 'Pinnacle Bank',
      accountName: 'Jane Smith',
    },
    {
      id: '2',
      accountNumber: '9876543210',
      bankName: 'Trust Finance',
      accountName: 'John Brown',
    },
  ])

  const updateTransfer = (data: Partial<TransferData>) => {
    setTransferData(prev => ({ ...prev, ...data }))
  }

  const resetTransfer = () => {
    setTransferData(initialTransferData)
  }

  const addSavedBeneficiary = (beneficiary: any) => {
    setSavedBeneficiaries(prev => [...prev, { ...beneficiary, id: Date.now().toString() }])
  }

  return (
    <TransferContext.Provider value={{ transferData, updateTransfer, resetTransfer, addSavedBeneficiary, savedBeneficiaries }}>
      {children}
    </TransferContext.Provider>
  )
}

export function useTransfer() {
  const context = useContext(TransferContext)
  if (!context) {
    throw new Error('useTransfer must be used within TransferProvider')
  }
  return context
}
