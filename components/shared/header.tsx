import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface HeaderProps {
  title: string
  showLogo?: boolean
  userRole?: 'user' | 'admin'
}

export function Header({ title, showLogo = true, userRole = 'user' }: HeaderProps) {
  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40">
      <div className="max-w-full px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showLogo && (
            <Link href={userRole === 'admin' ? '/admin/dashboard' : '/dashboard'} className="flex items-center gap-2">
              <Image
                src="/pinnacle-logo.png"
                alt="Pinnacle Vault Trust"
                width={32}
                height={32}
                className="object-contain"
              />
              <span className="text-lg font-bold text-white hidden sm:inline">PINNACLE VAULT</span>
            </Link>
          )}
        </div>
        <h1 className="text-xl font-bold text-white text-balance">{title}</h1>
        <div className="w-32"></div>
      </div>
    </header>
  )
}
