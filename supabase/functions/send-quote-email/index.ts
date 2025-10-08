import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface SendQuoteEmailRequest {
  to: string // Email du destinataire
  quote_id: string // ID du devis
  quote_data: {
    montant_total: number
    nombre_sensors: number
    nombre_controleurs: number
    nombre_piquets?: number
    details?: any
  }
  user_name?: string // Nom de l'utilisateur (optionnel)
}

interface SendQuoteEmailResponse {
  success: boolean
  email_id?: string
  message?: string
  error?: string
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const resendApiKey = Deno.env.get('RESEND_API_KEY')

    if (!resendApiKey) {
      throw new Error('Missing RESEND_API_KEY environment variable')
    }

    const { to, quote_id, quote_data, user_name }: SendQuoteEmailRequest = await req.json()

    if (!to || !quote_id || !quote_data) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Paramètres manquants: to, quote_id et quote_data requis'
        } as SendQuoteEmailResponse),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Construire le contenu HTML de l'email
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #1e3a8a; color: white; padding: 20px; text-align: center; }
          .content { background-color: #f9fafb; padding: 30px; border-radius: 8px; margin-top: 20px; }
          .quote-details { background-color: white; padding: 20px; border-radius: 6px; margin: 20px 0; }
          .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
          .total { font-size: 1.5em; font-weight: bold; color: #1e3a8a; margin-top: 20px; }
          .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 0.9em; }
          .cta-button { display: inline-block; background-color: #1e3a8a; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🏠 TerraStab</h1>
            <p>Votre devis personnalisé</p>
          </div>

          <div class="content">
            <h2>Bonjour ${user_name || 'Cher client'},</h2>

            <p>Merci d'avoir utilisé notre simulateur TerraStab. Votre devis a été enregistré avec succès.</p>

            <div class="quote-details">
              <h3>Détails de votre devis</h3>
              <p><strong>Référence:</strong> ${quote_id}</p>

              <div class="detail-row">
                <span>Nombre de capteurs</span>
                <span><strong>${quote_data.nombre_sensors}</strong></span>
              </div>

              <div class="detail-row">
                <span>Nombre de contrôleurs</span>
                <span><strong>${quote_data.nombre_controleurs}</strong></span>
              </div>

              ${quote_data.nombre_piquets ? `
              <div class="detail-row">
                <span>Nombre de piquets d'irrigation</span>
                <span><strong>${quote_data.nombre_piquets}</strong></span>
              </div>
              ` : ''}

              <div class="total">
                Montant total: ${quote_data.montant_total.toFixed(2)} €
              </div>
            </div>

            <p>Notre équipe vous contactera dans les plus brefs délais pour finaliser votre projet.</p>

            <p style="text-align: center;">
              <a href="https://terrastab.fr" class="cta-button">Retour au site</a>
            </p>
          </div>

          <div class="footer">
            <p>© 2025 TerraStab - Protection contre le retrait-gonflement des argiles</p>
            <p>Si vous avez des questions, contactez-nous à contact@terrastab.fr</p>
          </div>
        </div>
      </body>
      </html>
    `

    // Envoyer l'email via Resend
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'TerraStab <noreply@terrastab.fr>',
        to: [to],
        subject: `Votre devis TerraStab - ${quote_id}`,
        html: emailHtml,
      }),
    })

    const resendData = await resendResponse.json()

    if (!resendResponse.ok) {
      console.error('Resend API error:', resendData)
      throw new Error(`Erreur lors de l'envoi de l'email: ${resendData.message || 'Unknown error'}`)
    }

    return new Response(
      JSON.stringify({
        success: true,
        email_id: resendData.id,
        message: 'Email envoyé avec succès'
      } as SendQuoteEmailResponse),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Unexpected error:', error)

    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Erreur interne du serveur'
      } as SendQuoteEmailResponse),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
