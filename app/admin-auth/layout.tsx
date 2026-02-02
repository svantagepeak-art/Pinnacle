import React from "react"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PINNACLE VAULT TRUST ADMIN LOGIN',
  description: 'Admin authentication for the Pinnacle Vault Trust system',
}

export default function AdminAuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
