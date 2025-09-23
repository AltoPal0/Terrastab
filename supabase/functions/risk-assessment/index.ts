import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

interface RiskCheckRequest {
  address: string
}

interface RiskCheckResponse {
  success: boolean
  address?: string
  coordinates?: {
    lat: number
    lng: number
  }
  riskData?: {
    level: string
    color: string
    width: string
    description: string
    commune?: string
    originalExposition?: string
  }
  error?: string
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        {
          status: 405,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    const { address }: RiskCheckRequest = await req.json()

    // Step 1: Validation
    if (!address || typeof address !== 'string' || address.trim().length === 0) {
      return new Response(
        JSON.stringify({ success: false, error: "Adresse invalide" }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // Step 2: Geocoding with Google API
    const geocodingApiKey = Deno.env.get('GOOGLE_GEOCODING_API_KEY')
    if (!geocodingApiKey) {
      console.error('Missing GOOGLE_GEOCODING_API_KEY environment variable')
      return new Response(
        JSON.stringify({ success: false, error: "Configuration manquante pour la géolocalisation" }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${geocodingApiKey}`

    console.log('Fetching geocoding data for address:', address)
    const geocodingResponse = await fetch(geocodingUrl)
    const geocodingData = await geocodingResponse.json()

    if (geocodingData.status !== 'OK' || !geocodingData.results?.[0]) {
      console.error('Geocoding failed:', geocodingData.status, geocodingData.error_message)
      return new Response(
        JSON.stringify({ success: false, error: "Adresse non trouvée" }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    const { lat, lng } = geocodingData.results[0].geometry.location
    const formattedAddress = geocodingData.results[0].formatted_address

    console.log('Geocoding successful:', { lat, lng, formattedAddress })

    // Step 3: Risk assessment with Georisques API
    // Note: Georisques API expects longitude,latitude (lng,lat)
    const georisquesUrl = `https://georisques.gouv.fr/api/v1/rga?latlon=${lng},${lat}`

    console.log('Fetching risk data from Georisques:', georisquesUrl)

    let georisquesData: any = null
    try {
      const georisquesResponse = await fetch(georisquesUrl)

      if (!georisquesResponse.ok) {
        console.error(`Georisques API HTTP error: ${georisquesResponse.status}`)
        throw new Error(`HTTP ${georisquesResponse.status}`)
      }

      const responseText = await georisquesResponse.text()
      console.log('Georisques raw response:', responseText)

      if (!responseText || responseText.trim() === '') {
        console.warn('Georisques API returned empty response')
        throw new Error('Empty response')
      }

      georisquesData = JSON.parse(responseText)
      console.log('Georisques parsed response:', georisquesData)

    } catch (georisquesError) {
      console.error('Georisques API error:', georisquesError)
      // Fallback to default risk level
      return new Response(
        JSON.stringify({
          success: true,
          address: formattedAddress,
          coordinates: { lat, lng },
          riskData: {
            level: 'Moyen',
            color: 'orange',
            width: '60%',
            description: 'Votre zone présente un risque moyen de retrait-gonflement des argiles. Une protection préventive est recommandée.',
            originalExposition: 'Fallback - API Georisques indisponible'
          }
        }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // Step 4: Risk level mapping
    let riskLevel = 'Moyen' // Default fallback
    let riskColor = 'orange'
    let riskWidth = '60%'
    let riskDescription = 'Votre zone présente un risque moyen de retrait-gonflement des argiles. Une protection préventive est recommandée.'
    let commune = ''
    let originalExposition = 'Données non disponibles'

    if (georisquesData && georisquesData.data && georisquesData.data.length > 0) {
      const riskData = georisquesData.data[0]
      originalExposition = riskData.exposition || 'Non spécifié'
      commune = riskData.libelle_commune || ''

      switch (riskData.exposition) {
        case 'Faible':
        case 'Nul':
          riskLevel = 'Faible'
          riskColor = 'green'
          riskWidth = '30%'
          riskDescription = 'Votre zone présente un risque faible de retrait-gonflement des argiles. Une surveillance est recommandée.'
          break

        case 'Moyen':
          riskLevel = 'Moyen'
          riskColor = 'orange'
          riskWidth = '60%'
          riskDescription = 'Votre zone présente un risque moyen de retrait-gonflement des argiles. Une protection préventive est recommandée.'
          break

        case 'Fort':
        case 'Élevé':
          riskLevel = 'Élevé'
          riskColor = 'red'
          riskWidth = '85%'
          riskDescription = 'Votre zone présente un risque élevé de retrait-gonflement des argiles. Une protection est fortement recommandée.'
          break

        default:
          console.warn('Unknown risk level from Georisques:', riskData.exposition)
          break
      }
    }

    const response: RiskCheckResponse = {
      success: true,
      address: formattedAddress,
      coordinates: { lat, lng },
      riskData: {
        level: riskLevel,
        color: riskColor,
        width: riskWidth,
        description: riskDescription,
        commune,
        originalExposition
      }
    }

    console.log('Risk assessment completed successfully:', response)

    return new Response(
      JSON.stringify(response),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )

  } catch (error) {
    console.error('Risk assessment error:', error)
    return new Response(
      JSON.stringify({ success: false, error: "Erreur lors de la vérification du risque" }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})