import React from "react"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PINNACLE VAULT TRUST ADMIN DASHBOARD',
  description: 'Secure admin portal for system management',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
