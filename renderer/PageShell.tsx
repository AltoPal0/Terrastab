import React, { createContext, useContext } from 'react'
import { HelmetProvider, type HelmetDataContext } from '@dr.pogodin/react-helmet'
import type { PageContext } from 'vike/types'
import '../src/index.css'

export { PageShell, usePageContext }

const PageContextCtx = createContext<PageContext | null>(null)

function PageShell({ children, pageContext, helmetContext }: { children: React.ReactNode; pageContext: PageContext; helmetContext?: HelmetDataContext }) {
  return <HelmetProvider context={helmetContext}><PageContextCtx.Provider value={pageContext}>{children}</PageContextCtx.Provider></HelmetProvider>
}

function usePageContext() {
  const ctx = useContext(PageContextCtx)
  if (!ctx) throw new Error('usePageContext must be used within PageShell')
  return ctx
}


