import React from 'react'
import { Helmet } from '@dr.pogodin/react-helmet'
import { CustomerJourneyProvider } from '../../src/contexts/CustomerJourneyContext'
import HomePageContent from '../../src/components/HomePageContent'

export default function Page() {
  return (
    <>
      <Helmet>
        <title>TerraStab – Solutions connectées contre le retrait-gonflement des argiles</title>
        <meta
          name="description"
          content="Protégez votre maison des fissures liées aux sols argileux. TerraStab propose des solutions connectées de surveillance et stabilisation pour prévenir les dégâts du RGA."
        />
        <link rel="canonical" href="https://terrastab.fr/" />
      </Helmet>
      <CustomerJourneyProvider>
        <HomePageContent />
      </CustomerJourneyProvider>
    </>
  )
}


