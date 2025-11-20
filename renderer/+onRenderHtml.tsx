import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { escapeInject, dangerouslySkipEscape } from 'vike/server'
import type { PageContextServer } from 'vike/types'
import { PageShell } from './PageShell'
import type { HelmetDataContext } from '@dr.pogodin/react-helmet'

export { onRenderHtml }

function onRenderHtml(pageContext: PageContextServer) {
  const { Page, pageProps, documentProps } = pageContext
  const title = (documentProps && documentProps.title) || 'Terrastab'
  const desc = (documentProps && documentProps.description) || 'Terrastab'

  const helmetContext: HelmetDataContext = {}

  const view = (
    <PageShell pageContext={pageContext} helmetContext={helmetContext}>
      {Page ? <Page {...pageProps} /> : null}
    </PageShell>
  )

  const pageHtml = ReactDOMServer.renderToString(view)

  const helmetTitle = helmetContext.helmet?.title?.toString()
  const helmetMeta = helmetContext.helmet?.meta?.toString()
  const helmetLink = helmetContext.helmet?.link?.toString()

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="fr">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg+xml" href="/logo_terrastab.svg" />

        <!-- Preload LCP image for faster rendering -->
        <link
          rel="preload"
          as="image"
          href="/images/articles/crack-angle-cactus-1200x600.jpg"
          fetchpriority="high"
        />

        ${dangerouslySkipEscape(helmetTitle || `<title>${title}</title>`)}
        ${dangerouslySkipEscape(helmetMeta || `<meta name="description" content="${desc}" />`)}
        ${dangerouslySkipEscape(helmetLink || '')}
      </head>
      <body>
        <div id="root">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`

  return {
    documentHtml
  }
}


