'use client'

import React, { createContext, useContext, useEffect } from 'react'

interface TitleContextType {
  setPageTitle: (title: string) => void
}

const TitleContext = createContext<TitleContextType | undefined>(undefined)

export function TitleProvider({ children }: { children: React.ReactNode }) {
  const setPageTitle = (title: string) => {
    if (typeof window !== 'undefined') {
      document.title = `PINNACLE VAULT - ${title}`
    }
  }

  return (
    <TitleContext.Provider value={{ setPageTitle }}>
      {children}
    </TitleContext.Provider>
  )
}

export function useTitle() {
  const context = useContext(TitleContext)
  if (!context) {
    throw new Error('useTitle must be used within TitleProvider')
  }
  return context
}

export function usePageTitle(title: string) {
  const { setPageTitle } = useTitle()

  useEffect(() => {
    setPageTitle(title)
  }, [title, setPageTitle])
}
