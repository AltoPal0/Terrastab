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

    console.log('Google Geocoding full response:', JSON.stringify(geocodingData, null, 2))

    if (geocodingData.status !== 'OK' || !geocodingData.results?.[0]) {
      console.error('Geocoding failed:', geocodingData.status, geocodingData.error_message)

      // Provide specific error messages based on Google's status codes
      let userError = "Adresse non trouvée"
      switch (geocodingData.status) {
        case 'ZERO_RESULTS':
          userError = "Adresse introuvable. Vérifiez l'orthographe et assurez-vous que l'adresse est en France."
          break
        case 'OVER_QUERY_LIMIT':
          userError = "Service temporairement surchargé. Veuillez réessayer dans quelques minutes."
          break
        case 'REQUEST_DENIED':
          userError = "Erreur de configuration du service de géolocalisation."
          break
        case 'INVALID_REQUEST':
          userError = "Format d'adresse invalide. Veuillez saisir une adresse complète (numéro, rue, ville)."
          break
        default:
          userError = `Impossible de localiser l'adresse (${geocodingData.status}). Veuillez vérifier votre saisie.`
      }

      // Save failed geocoding attempt to database
      try {
        const supabaseUrl = Deno.env.get('SUPABASE_URL')
        const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

        if (supabaseUrl && supabaseServiceKey) {
          const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2')
          const supabase = createClient(supabaseUrl, supabaseServiceKey)

          const clientIP = req.headers.get('cf-connecting-ip') ||
                          req.headers.get('x-forwarded-for') ||
                          req.headers.get('x-real-ip') ||
                          'unknown'
          const userAgent = req.headers.get('user-agent') || 'unknown'

          await supabase
            .from('risk_assessments')
            .insert({
              input_address: address,
              formatted_address: null,
              latitude: null,
              longitude: null,
              risk_level: null,
              risk_color: null,
              risk_width: null,
              risk_description: null,
              commune: null,
              original_exposition: null,
              geocoding_success: false,
              georisques_success: false,
              error_message: `Geocoding failed: ${geocodingData.status} - ${geocodingData.error_message || 'Address not found'}`,
              ip_address: clientIP,
              user_agent: userAgent
            })

          console.log('Failed geocoding attempt saved to database')
        }
      } catch (dbError) {
        console.error('Database operation error for geocoding failure:', dbError)
      }

      return new Response(
        JSON.stringify({ success: false, error: userError }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    const { lat, lng } = geocodingData.results[0].geometry.location
    const formattedAddress = geocodingData.results[0].formatted_address

    // Check address matching confidence
    const inputAddressLower = address.toLowerCase().trim()
    const formattedAddressLower = formattedAddress.toLowerCase()

    // Extract postal codes for comparison
    const inputPostalCode = inputAddressLower.match(/\b75\d{3}\b/)?.[0]
    const formattedPostalCode = formattedAddressLower.match(/\b75\d{3}\b/)?.[0]

    console.log('Address comparison:', {
      input: address,
      formatted: formattedAddress,
      inputPostalCode,
      formattedPostalCode,
      postalCodeMatch: inputPostalCode === formattedPostalCode
    })

    // Warn if postal codes don't match (significant address change)
    let addressWarning = null
    if (inputPostalCode && formattedPostalCode && inputPostalCode !== formattedPostalCode) {
      addressWarning = `Adresse corrigée: ${formattedAddress} (vous aviez saisi: ${address})`
    }

    console.log('Geocoding successful:', { lat, lng, formattedAddress, addressWarning })

    // Step 3: Risk assessment with Georisques API
    // Note: Georisques API expects longitude,latitude (lng,lat) with URL encoding
    const georisquesUrl = `https://georisques.gouv.fr/api/v1/rga?latlon=${encodeURIComponent(`${lng},${lat}`)}`

    console.log('Fetching risk data from Georisques:', georisquesUrl)

    let georisquesData: unknown = null
    try {
      const georisquesResponse = await fetch(georisquesUrl, {
        headers: {
          'Accept': 'application/json'
        }
      })

      if (!georisquesResponse.ok) {
        console.error(`Georisques API HTTP error: ${georisquesResponse.status}`)
        throw new Error(`HTTP ${georisquesResponse.status}`)
      }

      const responseText = await georisquesResponse.text()
      console.log('Georisques raw response:', responseText)

      if (!responseText || responseText.trim() === '') {
        console.warn('Georisques API returned empty response for coordinates:', { lng, lat })
        const errorDetail = `Empty response from Georisques API for coordinates: ${lng},${lat}. URL: ${georisquesUrl}`
        throw new Error(`Empty response|${errorDetail}`)
      }

      georisquesData = JSON.parse(responseText)
      console.log('Georisques parsed response:', georisquesData)

    } catch (georisquesError) {
      console.error('Georisques API error:', georisquesError)

      // Provide specific error messages based on the type of error
      let userError = "Service d'évaluation des risques temporairement indisponible"

      if (georisquesError.message?.includes('HTTP 404')) {
        userError = "Aucune donnée de risque disponible pour cette localisation. La zone pourrait être en dehors du territoire métropolitain français."
      } else if (georisquesError.message?.includes('HTTP 403')) {
        userError = "Accès refusé au service de données de risque. Veuillez réessayer plus tard."
      } else if (georisquesError.message?.includes('HTTP 429')) {
        userError = "Trop de demandes. Veuillez attendre quelques instants avant de réessayer."
      } else if (georisquesError.message?.includes('HTTP 500') || georisquesError.message?.includes('HTTP 502') || georisquesError.message?.includes('HTTP 503')) {
        userError = "Service Georisques temporairement en maintenance. Réessayez dans quelques minutes."
      } else if (georisquesError.message?.includes('timeout') || georisquesError.message?.includes('TIMEOUT')) {
        userError = "Le service de données de risque met trop de temps à répondre. Veuillez réessayer."
      } else if (georisquesError.message?.includes('network') || georisquesError.message?.includes('fetch')) {
        userError = "Problème de connexion avec le service de données de risque. Vérifiez votre connexion internet."
      } else if (georisquesError.message?.includes('Empty response')) {
        userError = "Le service de données de risque a retourné une réponse vide. La zone n'est peut-être pas couverte."
      }

      // Include debug details if available
      let debugInfo = null
      if (georisquesError.message?.includes('|')) {
        const [errorType, details] = georisquesError.message.split('|', 2)
        debugInfo = details
      }

      // Save failed georisques attempt to database
      try {
        const supabaseUrl = Deno.env.get('SUPABASE_URL')
        const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

        if (supabaseUrl && supabaseServiceKey) {
          const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2')
          const supabase = createClient(supabaseUrl, supabaseServiceKey)

          const clientIP = req.headers.get('cf-connecting-ip') ||
                          req.headers.get('x-forwarded-for') ||
                          req.headers.get('x-real-ip') ||
                          'unknown'
          const userAgent = req.headers.get('user-agent') || 'unknown'

          await supabase
            .from('risk_assessments')
            .insert({
              input_address: address,
              formatted_address: formattedAddress,
              latitude: lat,
              longitude: lng,
              risk_level: null,
              risk_color: null,
              risk_width: null,
              risk_description: null,
              commune: null,
              original_exposition: null,
              geocoding_success: true,
              georisques_success: false,
              error_message: `Georisques API error: ${georisquesError.message || 'Unknown error'}`,
              ip_address: clientIP,
              user_agent: userAgent
            })

          console.log('Failed georisques attempt saved to database')
        }
      } catch (dbError) {
        console.error('Database operation error for georisques failure:', dbError)
      }

      return new Response(
        JSON.stringify({
          success: false,
          error: userError,
          ...(debugInfo && { debug: debugInfo })
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // Step 4: Risk level mapping
    let riskLevel = 'Moyen' // Default fallback
    let riskColor = 'orange'
    let riskWidth = '60%'
    let riskDescription = 'Votre sol réagit davantage aux changements d\'humidité, notamment en période de sécheresse ou en présence d\'arbres proches. Cela peut provoquer des fissures visibles sur les murs, des portes qui coincent ou des sols légèrement déformés. Le bâtiment reste sûr, mais il est important d\'agir avant que la situation ne s\'aggrave : amélioration du drainage, régulation de la végétation, ou mise en place de capteurs et d\'un suivi régulier peuvent stabiliser durablement la maison.'
    let commune = ''
    let originalExposition = 'Données non disponibles'

    if (georisquesData && typeof georisquesData === 'object' && georisquesData !== null) {
      const data = georisquesData as { exposition?: string; codeExposition?: string; libelle_commune?: string }

      originalExposition = data.exposition || 'Non spécifié'
      commune = data.libelle_commune || ''

      // Map the exposition values to our risk levels
      switch (data.exposition) {
        case 'Exposition nulle':
        case 'Exposition faible':
          riskLevel = 'Faible'
          riskColor = 'green'
          riskWidth = '30%'
          riskDescription = 'Le sol de votre terrain présente peu d\'argile ou une argile stable. Les variations d\'humidité n\'ont qu\'un effet limité : il peut apparaître de petites fissures superficielles sur les enduits ou les joints, sans conséquence structurelle. Dans ce cas, il n\'est pas nécessaire d\'entreprendre de travaux, une surveillance légère suffira.'
          break

        case 'Exposition moyenne':
          riskLevel = 'Moyen'
          riskColor = 'orange'
          riskWidth = '60%'
          riskDescription = 'Votre sol réagit davantage aux changements d\'humidité, notamment en période de sécheresse ou en présence d\'arbres proches. Cela peut provoquer des fissures visibles sur les murs, des portes qui coincent ou des sols légèrement déformés. Le bâtiment reste sûr, mais il est important d\'agir avant que la situation ne s\'aggrave : amélioration du drainage, régulation de la végétation, ou mise en place de capteurs et d\'un suivi régulier peuvent stabiliser durablement la maison.'
          break

        case 'Exposition forte':
          riskLevel = 'Élevé'
          riskColor = 'red'
          riskWidth = '85%'
          riskDescription = 'Attention votre sol contient beaucoup d\'argile sensible aux variations d\'eau. Lors des épisodes de sécheresse ou de forte pluie, il peut se contracter ou se dilater de manière importante, provoquant des fissures profondes, des affaissements ou des soulèvements du bâtiment. Des travaux de stabilisation deviennent souvent indispensables. L\'intervention rapide d\'un expert TerraStab permet de limiter les dégâts, d\'assurer la sécurité de l\'habitation et de préserver la valeur du bien.'
          break

        default:
          console.warn('Unknown risk level from Georisques:', data.exposition)
          break
      }
    }

    const response: RiskCheckResponse = {
      success: true,
      ...(addressWarning && { warning: addressWarning }),
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

    // Save assessment to database for statistics
    try {
      // Initialize Supabase client with service role for database operations
      const supabaseUrl = Deno.env.get('SUPABASE_URL')
      const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

      if (supabaseUrl && supabaseServiceKey) {
        const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2')
        const supabase = createClient(supabaseUrl, supabaseServiceKey)

        // Get client IP and user agent
        const clientIP = req.headers.get('cf-connecting-ip') ||
                        req.headers.get('x-forwarded-for') ||
                        req.headers.get('x-real-ip') ||
                        'unknown'
        const userAgent = req.headers.get('user-agent') || 'unknown'

        // Insert assessment record
        const { error: insertError } = await supabase
          .from('risk_assessments')
          .insert({
            input_address: address,
            formatted_address: formattedAddress,
            latitude: lat,
            longitude: lng,
            risk_level: riskLevel,
            risk_color: riskColor,
            risk_width: riskWidth,
            risk_description: riskDescription,
            commune: commune || null,
            original_exposition: originalExposition,
            geocoding_success: true,
            georisques_success: georisquesData !== null,
            error_message: null,
            ip_address: clientIP,
            user_agent: userAgent
          })

        if (insertError) {
          console.error('Failed to save assessment to database:', insertError)
        } else {
          console.log('Assessment saved to database successfully', {
            address: address,
            riskLevel: riskLevel,
            geocodingSuccess: true,
            georisquesSuccess: georisquesData !== null
          })
        }
      } else {
        console.error('Missing Supabase configuration for database insert')
      }
    } catch (dbError) {
      console.error('Database operation error:', dbError)
      // Don't fail the request if database save fails
    }

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