# Admin Module - TerraStab

## Overview

The admin module provides a secure, password-protected portal for viewing analytics and statistics related to risk assessments performed on the TerraStab platform.

## Access

- **URL**: `/admin` (e.g., `https://your-domain.com/admin`)
- **Authentication**: Password protection using Supabase secret `ADMIN_PORTAL_PWD`

## Features

### Authentication
- Secure password verification against Supabase secret
- Session management with JWT-like tokens
- 24-hour token expiration
- Logout functionality

### Statistics Dashboard
- **Total Assessments**: Complete count of risk evaluations
- **Success Rates**: Geocoding, API, and overall success percentages
- **Risk Distribution**: Breakdown by risk levels (Faible, Moyen, Élevé)
- **Daily Trends**: Last 7 days of assessment activity with success rates
- **Top Communes**: Most frequently assessed locations
- **Error Analysis**: Common error types and frequencies
- **Real-time Data**: Refresh button for latest statistics

## Setup Requirements

### 1. Supabase Configuration

Set the admin password in your Supabase project secrets:

1. Go to Supabase Dashboard → Project Settings → Edge Functions
2. Add environment variable:
   - **Name**: `ADMIN_PORTAL_PWD`
   - **Value**: Your desired admin password

### 2. Deployed Edge Functions

The following Edge Functions have been deployed:
- `admin-auth`: Handles password verification
- `admin-stats`: Provides statistics API
- `risk-assessment`: Updated for better error handling

### 3. Database Schema

The admin module uses the existing `risk_assessments` table with these key fields:
- User input and geocoding results
- Risk assessment data
- Success/failure tracking
- Error messages and metadata

## Security Features

- Password stored as Supabase secret (not in code)
- Token-based session management
- Authorization required for all admin APIs
- No persistent login data on client
- Rate limiting considerations

## Technical Implementation

### Frontend Components
- `AdminApp`: Main router for authentication flow
- `AdminAuth`: Password entry form
- `AdminLayout`: Header and navigation
- `AdminDashboard`: Main statistics view
- `StatisticsCards`: Overview metrics
- `ChartsSection`: Detailed trends and analysis

### Backend APIs
- `admin-auth`: POST endpoint for password verification
- `admin-stats`: GET endpoint for statistics (requires auth token)

### Data Flow
1. User navigates to `/admin`
2. Password verification via `admin-auth` Edge Function
3. Token stored in localStorage on success
4. Statistics loaded via `admin-stats` Edge Function
5. Real-time dashboard with refresh capability

## Usage

1. **Access Admin Portal**:
   ```
   https://your-domain.com/admin
   ```

2. **Enter Admin Password**:
   - Use the password configured in `ADMIN_PORTAL_PWD`
   - Password is verified against Supabase secrets

3. **View Dashboard**:
   - Overview cards show key metrics
   - Daily trends show assessment volume and success rates
   - Top communes show geographical distribution
   - Error analysis helps identify issues

4. **Refresh Data**:
   - Click "Actualiser" button for latest statistics
   - Data covers last 30 days by default

## Mobile Responsive

The admin interface is fully responsive and works on:
- Desktop browsers
- Tablets
- Mobile devices

## Security Notes

- Admin password should be strong and unique
- Consider IP allowlisting for production environments
- Session tokens expire after 24 hours
- No user data is exposed in admin interface
- Statistics are aggregated and anonymized

## Development

To modify or extend the admin module:

1. **Frontend**: Edit components in `src/components/admin/`
2. **Backend**: Edit Edge Functions in `supabase/functions/`
3. **Types**: Update interfaces in `src/types/risk-assessment.ts`
4. **Deploy**: Use `supabase functions deploy <function-name>`

## Support

For issues or questions about the admin module, check:
- Supabase function logs in the dashboard
- Browser console for frontend errors
- Network tab for API call failures