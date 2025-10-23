import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface LeadData {
  name: string
  email: string
  phone: string
  address?: string
  risk_level?: string
}

async function sendAdminNotification(lead: any) {
  const resendApiKey = Deno.env.get('RESEND_API_KEY')

  if (!resendApiKey) {
    throw new Error('Missing RESEND_API_KEY environment variable')
  }

  const adminLoginUrl = 'https://terrastab.fr/admin'

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
          padding: 30px 20px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
          font-weight: 600;
        }
        .content {
          padding: 30px;
        }
        .alert-box {
          background-color: #dcfce7;
          border-left: 4px solid #22c55e;
          padding: 15px 20px;
          margin: 20px 0;
          border-radius: 4px;
        }
        .alert-box p {
          margin: 0;
          color: #166534;
          font-size: 14px;
          font-weight: 600;
        }
        .lead-details {
          background: linear-gradient(to bottom, #f8fafc 0%, #ffffff 100%);
          padding: 20px;
          border-radius: 8px;
          margin: 20px 0;
          border: 2px solid #e5e7eb;
        }
        .detail-row {
          padding: 10px 0;
          border-bottom: 1px solid #f3f4f6;
          font-size: 14px;
        }
        .detail-row:last-child {
          border-bottom: none;
        }
        .detail-label {
          color: #6b7280;
          font-weight: 600;
          display: block;
          margin-bottom: 4px;
        }
        .detail-value {
          color: #1f2937;
        }
        .risk-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
        }
        .risk-faible { background-color: #dcfce7; color: #166534; }
        .risk-moyen { background-color: #fef3c7; color: #92400e; }
        .risk-fort { background-color: #fee2e2; color: #991b1b; }
        .cta-button {
          display: inline-block;
          background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
          color: #ffffff !important;
          padding: 12px 30px;
          text-decoration: none;
          border-radius: 8px;
          margin-top: 20px;
          font-weight: 600;
          font-size: 14px;
          text-align: center;
        }
        .footer {
          background-color: #f9fafb;
          text-align: center;
          padding: 20px;
          color: #6b7280;
          font-size: 12px;
          border-top: 1px solid #e5e7eb;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎯 Nouveau Lead TerraStab</h1>
        </div>

        <div class="content">
          <div class="alert-box">
            <p>✅ Un nouveau prospect vient de s'inscrire</p>
          </div>

          <div class="lead-details">
            <div class="detail-row">
              <span class="detail-label">👤 Nom</span>
              <span class="detail-value">${lead.name}</span>
            </div>

            <div class="detail-row">
              <span class="detail-label">📧 Email</span>
              <span class="detail-value"><a href="mailto:${lead.email}">${lead.email}</a></span>
            </div>

            <div class="detail-row">
              <span class="detail-label">📱 Téléphone</span>
              <span class="detail-value"><a href="tel:${lead.phone}">${lead.phone}</a></span>
            </div>

            ${lead.address ? `
            <div class="detail-row">
              <span class="detail-label">📍 Adresse</span>
              <span class="detail-value">${lead.address}</span>
            </div>
            ` : ''}

            ${lead.risk_level ? `
            <div class="detail-row">
              <span class="detail-label">⚠️ Niveau de risque</span>
              <span class="detail-value">
                <span class="risk-badge risk-${lead.risk_level.toLowerCase()}">${lead.risk_level}</span>
              </span>
            </div>
            ` : ''}

            <div class="detail-row">
              <span class="detail-label">🕒 Date d'inscription</span>
              <span class="detail-value">${new Date(lead.created_at).toLocaleString('fr-FR')}</span>
            </div>

            <div class="detail-row">
              <span class="detail-label">🔑 ID Lead</span>
              <span class="detail-value">${lead.id}</span>
            </div>
          </div>

          <div style="text-align: center; margin-top: 30px;">
            <a href="${adminLoginUrl}" class="cta-button">Accéder à l'admin →</a>
          </div>
        </div>

        <div class="footer">
          <p>Cette notification a été générée automatiquement par TerraStab.</p>
          <p>© 2025 TerraStab. Tous droits réservés.</p>
        </div>
      </div>
    </body>
    </html>
  `

  const resendResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'TerraStab Notifications <noreply@terrastab.fr>',
      to: ['contact@terrastab.fr'],
      subject: `🎯 Nouveau lead: ${lead.name}`,
      html: emailHtml,
    }),
  })

  const resendData = await resendResponse.json()

  if (!resendResponse.ok) {
    console.error('Resend API error:', resendData)
    throw new Error(`Erreur lors de l'envoi de l'email admin: ${resendData.message || 'Unknown error'}`)
  }

  return resendData
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Create Supabase client with service role key for INSERT permission
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Parse request body
    const { name, email, phone, address, risk_level }: LeadData = await req.json()

    // Validate required fields
    if (!name || !email || !phone) {
      return new Response(
        JSON.stringify({ error: 'Nom, email et téléphone sont requis' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Insert lead into database
    const { data, error } = await supabase
      .from('leads')
      .insert({
        name,
        email,
        phone,
        address: address || null,
        risk_level: risk_level || null
      })
      .select()
      .single()

    if (error) {
      console.error('Error inserting lead:', error)
      return new Response(
        JSON.stringify({ error: 'Erreur lors de l\'enregistrement du lead' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Envoyer un email de notification à l'admin
    try {
      await sendAdminNotification(data)
    } catch (emailError) {
      // Ne pas bloquer la création du lead si l'email échoue
      console.error('Error sending admin notification email:', emailError)
    }

    return new Response(
      JSON.stringify({ success: true, lead: data }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Error processing request:', error)
    return new Response(
      JSON.stringify({ error: 'Erreur serveur interne' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
