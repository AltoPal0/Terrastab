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
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f4f4f5;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
          }
          .header {
            background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
            color: white;
            padding: 40px 20px;
            text-align: center;
          }
          .logo {
            width: 120px;
            height: auto;
            margin-bottom: 10px;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 600;
          }
          .header p {
            margin: 5px 0 0 0;
            font-size: 16px;
            opacity: 0.9;
          }
          .content {
            padding: 40px 30px;
          }
          .greeting {
            font-size: 18px;
            color: #1e3a8a;
            margin-bottom: 20px;
          }
          .intro-text {
            font-size: 15px;
            color: #4b5563;
            margin-bottom: 30px;
            line-height: 1.8;
          }
          .notice-box {
            background-color: #fef3c7;
            border-left: 4px solid #f59e0b;
            padding: 15px 20px;
            margin: 25px 0;
            border-radius: 4px;
          }
          .notice-box p {
            margin: 0;
            color: #92400e;
            font-size: 14px;
          }
          .quote-details {
            background: linear-gradient(to bottom, #f8fafc 0%, #ffffff 100%);
            padding: 25px;
            border-radius: 12px;
            margin: 25px 0;
            border: 2px solid #e5e7eb;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
          }
          .quote-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 15px;
            border-bottom: 2px solid #e5e7eb;
            margin-bottom: 20px;
          }
          .quote-header h3 {
            margin: 0;
            color: #1e3a8a;
            font-size: 20px;
          }
          .quote-ref {
            background-color: #dbeafe;
            color: #1e3a8a;
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 13px;
            font-weight: 600;
          }
          .detail-row {
            display: flex;
            justify-content: space-between;
            padding: 12px 0;
            border-bottom: 1px solid #f3f4f6;
            font-size: 15px;
          }
          .detail-row:last-child {
            border-bottom: none;
          }
          .detail-label {
            color: #6b7280;
          }
          .detail-value {
            font-weight: 600;
            color: #1f2937;
          }
          .total-section {
            background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
            color: white;
            padding: 20px;
            border-radius: 8px;
            margin-top: 20px;
            text-align: center;
          }
          .total-label {
            font-size: 14px;
            opacity: 0.9;
            margin-bottom: 5px;
          }
          .total-amount {
            font-size: 32px;
            font-weight: bold;
            margin: 0;
          }
          .next-steps {
            background-color: #f0f9ff;
            border-left: 4px solid #3b82f6;
            padding: 20px;
            margin: 25px 0;
            border-radius: 4px;
          }
          .next-steps h4 {
            margin: 0 0 10px 0;
            color: #1e3a8a;
            font-size: 16px;
          }
          .next-steps p {
            margin: 8px 0;
            color: #4b5563;
            font-size: 14px;
          }
          .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
            color: #ffffff !important;
            padding: 14px 35px;
            text-decoration: none;
            border-radius: 8px;
            margin-top: 25px;
            font-weight: 600;
            font-size: 15px;
            box-shadow: 0 4px 6px rgba(30, 58, 138, 0.2);
          }
          .cta-button:hover {
            color: #ffffff !important;
            box-shadow: 0 6px 8px rgba(30, 58, 138, 0.3);
          }
          .footer {
            background-color: #f9fafb;
            text-align: center;
            padding: 30px 20px;
            color: #6b7280;
            font-size: 13px;
            border-top: 1px solid #e5e7eb;
          }
          .footer p {
            margin: 8px 0;
          }
          .footer-link {
            color: #3b82f6;
            text-decoration: none;
          }
          @media only screen and (max-width: 600px) {
            .content { padding: 30px 20px; }
            .header { padding: 30px 20px; }
            .quote-details { padding: 20px; }
            .total-amount { font-size: 28px; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="https://terrastab.fr/logo_main_terrastab.png" alt="TerraStab" class="logo" />
            <h1>TerraStab</h1>
            <p>Protection contre le retrait-gonflement des argiles</p>
          </div>

          <div class="content">
            <div class="greeting">Bonjour ${user_name || 'Cher client'},</div>

            <p class="intro-text">
              Merci d'avoir utilisé notre simulateur TerraStab. Nous avons le plaisir de vous transmettre votre devis personnalisé basé sur les caractéristiques de votre propriété.
            </p>

            <div class="notice-box">
              <p><strong>⚠️ Devis indicatif</strong><br>
              Ce devis est temporaire et sujet à validation. Un expert TerraStab vous contactera pour confirmer les détails et ajuster l'offre selon vos besoins spécifiques.</p>
            </div>

            <div class="quote-details">
              <div class="quote-header">
                <h3>Votre devis</h3>
                <span class="quote-ref">#${quote_id}</span>
              </div>

              <div class="detail-row">
                <span class="detail-label">Capteurs de surveillance</span>
                <span class="detail-value">${quote_data.nombre_sensors} unité${quote_data.nombre_sensors > 1 ? 's' : ''}</span>
              </div>

              <div class="detail-row">
                <span class="detail-label">Contrôleurs intelligents</span>
                <span class="detail-value">${quote_data.nombre_controleurs} unité${quote_data.nombre_controleurs > 1 ? 's' : ''}</span>
              </div>

              ${quote_data.nombre_piquets ? `
              <div class="detail-row">
                <span class="detail-label">Piquets d'irrigation</span>
                <span class="detail-value">${quote_data.nombre_piquets} unité${quote_data.nombre_piquets > 1 ? 's' : ''}</span>
              </div>
              ` : ''}

              <div class="total-section">
                <div class="total-label">Montant indicatif TTC</div>
                <div class="total-amount">${quote_data.montant_total.toFixed(2)} €</div>
              </div>
            </div>

            <div class="next-steps">
              <h4>📋 Prochaines étapes</h4>
              <p>1️⃣ Un expert vous contactera sous 48h pour valider votre devis</p>
              <p>2️⃣ Visite technique gratuite de votre propriété si nécessaire</p>
              <p>3️⃣ Installation par nos techniciens certifiés</p>
              <p>4️⃣ Formation à l'utilisation de votre système TerraStab</p>
            </div>

            <p style="text-align: center; margin-top: 30px;">
              <a href="https://terrastab.fr" class="cta-button">Découvrir TerraStab</a>
            </p>
          </div>

          <div class="footer">
            <p><strong>TerraStab</strong> - Solution connectée de protection contre les mouvements de terrain</p>
            <p>Des questions ? Contactez-nous à <a href="mailto:contact@terrastab.fr" class="footer-link">contact@terrastab.fr</a></p>
            <p style="margin-top: 15px;">© 2025 TerraStab. Tous droits réservés.</p>
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
