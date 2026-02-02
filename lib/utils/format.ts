// Currency formatting
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

// Date formatting
export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d)
}

// Transaction reference generation
export const generateTransactionReference = (): string => {
  const timestamp = Date.now().toString().slice(-6)
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `PVT${random}${timestamp}`
}

// Account number masking
export const maskAccountNumber = (accountNumber: string): string => {
  if (accountNumber.length <= 4) return accountNumber
  return `****${accountNumber.slice(-4)}`
}

// Validate email
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validate phone number
export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s\-()]{10,}$/
  return phoneRegex.test(phone)
}

// Calculate fees
export const calculateFees = (amount: number, transactionType: string): number => {
  const feePercentages: Record<string, number> = {
    'own-account': 0,
    'same-bank': 0.5,
    'other-banks': 0.5,
    'international': 1.5,
    'bill-payment': 1.5,
  }

  const feePercent = feePercentages[transactionType] || 0.5
  return Math.round((amount * feePercent) / 100 * 100) / 100
}
