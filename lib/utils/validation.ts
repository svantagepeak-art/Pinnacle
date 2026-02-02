// Transaction validation
export interface ValidationResult {
  valid: boolean
  errors: string[]
}

export const validateTransfer = (data: {
  transferType: string
  recipientName: string
  recipientAccountNumber: string
  amount: number
  narration: string
}): ValidationResult => {
  const errors: string[] = []

  if (!data.transferType) errors.push('Transfer type is required')
  if (!data.recipientName || data.recipientName.trim().length < 2) {
    errors.push('Recipient name must be at least 2 characters')
  }
  if (!data.recipientAccountNumber || data.recipientAccountNumber.trim().length < 5) {
    errors.push('Invalid account number')
  }
  if (data.amount <= 0) errors.push('Amount must be greater than 0')
  if (data.amount > 50000000) errors.push('Amount exceeds maximum limit of $50M')
  if (!data.narration || data.narration.trim().length === 0) {
    errors.push('Description is required')
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

// PIN validation
export const validatePIN = (pin: string): ValidationResult => {
  const errors: string[] = []

  if (!pin || pin.length !== 4) {
    errors.push('PIN must be 4 digits')
  }
  if (!/^\d{4}$/.test(pin)) {
    errors.push('PIN must contain only numbers')
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

// Token validation
export const validateToken = (token: string): ValidationResult => {
  const errors: string[] = []

  if (!token || token.length < 6) {
    errors.push('Token code must be at least 6 characters')
  }
  if (!/^[a-zA-Z0-9]{6,}$/.test(token)) {
    errors.push('Invalid token format')
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

// OTP validation
export const validateOTP = (otp: string): ValidationResult => {
  const errors: string[] = []

  if (!otp || otp.length !== 6) {
    errors.push('OTP must be 6 digits')
  }
  if (!/^\d{6}$/.test(otp)) {
    errors.push('OTP must contain only numbers')
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

// Risk score thresholds
export const getRiskLevel = (score: number): {
  level: 'low' | 'medium' | 'high'
  action: 'approve' | 'review' | 'reject'
} => {
  if (score < 30) return { level: 'low', action: 'approve' }
  if (score < 70) return { level: 'medium', action: 'review' }
  return { level: 'high', action: 'reject' }
}
