import React from 'react'
import App from '../../src/App'
import { usePageContext } from '../../renderer/PageShell'

export default function Page() {
  usePageContext() // ensure context is available; not used directly
  const isServer = typeof window === 'undefined'
  if (isServer) return <div />
  return <App />
}

export {} // no side exports per vike recommendation


