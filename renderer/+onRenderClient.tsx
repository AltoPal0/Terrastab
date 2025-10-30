import React from 'react'
import ReactDOM from 'react-dom/client'
import type { PageContextClient } from 'vike/types'
import { PageShell } from './PageShell'

export { onRenderClient }

async function onRenderClient(pageContext: PageContextClient) {
  const { Page, pageProps } = pageContext
  const container = document.getElementById('root')!

  // Hydrate if SSR HTML exists, otherwise CSR
  const app = (
    <PageShell pageContext={pageContext}>
      <Page {...pageProps} />
    </PageShell>
  )

  if (container.innerHTML) {
    ReactDOM.hydrateRoot(container, app)
  } else {
    ReactDOM.createRoot(container).render(app)
  }
}
