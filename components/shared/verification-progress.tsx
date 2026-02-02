import React from 'react'

interface VerificationProgressProps {
  stage: 'pin' | 'token' | 'otp' | 'biometric' | 'fraud-review'
}

const stages = [
  { key: 'pin', label: 'PIN', percent: 0 },
  { key: 'token', label: 'Token', percent: 25 },
  { key: 'otp', label: 'OTP', percent: 50 },
  { key: 'biometric', label: 'Biometric', percent: 75 },
  { key: 'fraud-review', label: 'Review', percent: 100 },
]

export function VerificationProgress({ stage }: VerificationProgressProps) {
  const currentIndex = stages.findIndex(s => s.key === stage)
  const progress = currentIndex >= 0 ? stages[currentIndex].percent : 0

  return (
    <div className="w-full">
      <div className="mb-4 flex justify-between text-sm">
        {stages.map((s, idx) => (
          <div
            key={s.key}
            className={`text-xs font-semibold ${
              idx <= currentIndex ? 'text-amber-400' : 'text-slate-500'
            }`}
          >
            {s.label}
          </div>
        ))}
      </div>
      <div className="w-full bg-slate-700 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-amber-400 to-amber-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
