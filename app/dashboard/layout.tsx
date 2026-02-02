import React from "react"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PINNACLE VAULT TRUST USER DASHBOARD',
  description: 'Secure user dashboard for managing accounts',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
