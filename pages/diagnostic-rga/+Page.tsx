import React from 'react'
import DiagnosticRga from '../../src/components/seo/DiagnosticRga'

import { Helmet } from "@dr.pogodin/react-helmet";

export const prerender = true;

export function Page() {
  return (
    <>
      <Helmet>
        <title>Diagnostic RGA : détecter les risques liés aux sols argileux – TerraStab</title>
        <meta
          name="description"
          content="Faites évaluer votre maison par nos experts RGA. Diagnostic complet du sol et des fondations pour prévenir les fissures dues au retrait-gonflement des argiles."
        />
        <link rel="canonical" href="https://terrastab.fr/diagnostic-rga" />
      </Helmet>

      {/* ton composant de contenu */}
      <DiagnosticRga />
    </>
  );
}


