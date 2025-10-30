import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { escapeInject, dangerouslySkipEscape } from 'vike/server'
import type { PageContextServer } from 'vike/types'
import { PageShell } from './PageShell'

export { onRenderHtml }

function onRenderHtml(pageContext: PageContextServer) {
  const { Page, pageProps, documentProps } = pageContext
  const title = (documentProps && documentProps.title) || 'Terrastab'
  const desc = (documentProps && documentProps.description) || 'Terrastab'

  const view = (
    <PageShell pageContext={pageContext}>
      {Page ? <Page {...pageProps} /> : null}
    </PageShell>
  )

  const pageHtml = ReactDOMServer.renderToString(view)

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="fr">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg+xml" href="/logo_terrastab.svg" />
        <title>${title}</title>
        <meta name="description" content="${desc}" />
      </head>
      <body>
        <div id="root">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`

  return {
    documentHtml
  }
}


