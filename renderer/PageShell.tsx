import React, { createContext, useContext } from 'react'
import type { PageContext } from 'vike/types'
import '../src/index.css'

export { PageShell, usePageContext }

const PageContextCtx = createContext<PageContext | null>(null)

function PageShell({ children, pageContext }: { children: React.ReactNode; pageContext: PageContext }) {
  return <PageContextCtx.Provider value={pageContext}>{children}</PageContextCtx.Provider>
}

function usePageContext() {
  const ctx = useContext(PageContextCtx)
  if (!ctx) throw new Error('usePageContext must be used within PageShell')
  return ctx
}


