# Clay Soil Risk Assessment API Integration

This document provides complete technical specifications for implementing the clay soil risk assessment feature used in TerraStab's web application. This system evaluates retrait-gonflement des argiles (clay soil shrink-swell) risk for French properties.

## Overview

The risk assessment system follows a two-step process:
1. **Address Geocoding**: Convert user address to GPS coordinates using Google Geocoding API
2. **Risk Assessment**: Query French Georisques API with coordinates to get clay soil risk level

## API Endpoints Required

### 1. Google Geocoding API

**Base URL**: `https://maps.googleapis.com/maps/api/geocode/json`

**Purpose**: Convert address string to latitude/longitude coordinates

**Authentication**: Requires Google Cloud API key

**Request Format**:
```
GET https://maps.googleapis.com/maps/api/geocode/json?address={ADDRESS}&key={API_KEY}
```

**Parameters**:
- `address`: URL-encoded address string
- `key`: Google Geocoding API key

**Example Request**:
```
https://maps.googleapis.com/maps/api/geocode/json?address=123%20Rue%20de%20la%20Paix%2C%20Paris&key=YOUR_API_KEY
```

**Response Structure**:
```json
{
  "results": [
    {
      "formatted_address": "123 Rue de la Paix, 75001 Paris, France",
      "geometry": {
        "location": {
          "lat": 48.8698679,
          "lng": 2.3311176
        }
      }
    }
  ],
  "status": "OK"
}
```

**Error Handling**:
- `status !== "OK"`: Address not found or API error
- Empty `results` array: No matching address found

### 2. French Georisques API

**Base URL**: `https://georisques.gouv.fr/api/v1/rga`

**Purpose**: Get clay soil retrait-gonflement risk level for specific coordinates

**Authentication**: No API key required (public French government API)

**Request Format**:
```
GET https://georisques.gouv.fr/api/v1/rga?latlon={LONGITUDE},{LATITUDE}
```

**Parameters**:
- `latlon`: Comma-separated longitude,latitude (note: longitude first!)

**Example Request**:
```
https://georisques.gouv.fr/api/v1/rga?latlon=2.3311176,48.8698679
```

**Response Structure**:
```json
{
  "data": [
    {
      "exposition": "Moyen",
      "code_commune": "75001",
      "libelle_commune": "Paris 1er Arrondissement"
    }
  ]
}
```

**Possible Risk Levels** (`exposition` field):
- `"Nul"` - No risk
- `"Faible"` - Low risk
- `"Moyen"` - Medium risk
- `"Fort"` - High risk
- `"Élevé"` - Elevated risk

## Implementation Algorithm

### Step 1: Address Validation
```javascript
// Input validation
if (!address || typeof address !== 'string' || address.trim().length === 0) {
  throw new Error("Invalid address");
}
```

### Step 2: Geocoding
```javascript
const geocodingApiKey = process.env.GOOGLE_GEOCODING_API_KEY;
const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${geocodingApiKey}`;

const geocodingResponse = await fetch(geocodingUrl);
const geocodingData = await geocodingResponse.json();

if (geocodingData.status !== 'OK' || !geocodingData.results?.[0]) {
  throw new Error("Address not found");
}

const { lat, lng } = geocodingData.results[0].geometry.location;
const formattedAddress = geocodingData.results[0].formatted_address;
```

### Step 3: Risk Assessment
```javascript
// Note: Georisques API expects longitude,latitude (lng,lat)
const georisquesUrl = `https://georisques.gouv.fr/api/v1/rga?latlon=${lng},${lat}`;

const georisquesResponse = await fetch(georisquesUrl);

if (!georisquesResponse.ok) {
  throw new Error(`Georisques API error: ${georisquesResponse.status}`);
}

const georisquesData = await georisquesResponse.json();
```

### Step 4: Risk Level Mapping
```javascript
let riskLevel = 'Moyen'; // Default fallback
let riskColor = 'orange';
let riskWidth = '60%';
let riskDescription = 'Votre zone présente un risque moyen de retrait-gonflement des argiles. Une protection préventive est recommandée.';

if (georisquesData && georisquesData.data && georisquesData.data.length > 0) {
  const riskData = georisquesData.data[0];

  switch (riskData.exposition) {
    case 'Faible':
    case 'Nul':
      riskLevel = 'Faible';
      riskColor = 'green';
      riskWidth = '30%';
      riskDescription = 'Votre zone présente un risque faible de retrait-gonflement des argiles. Une surveillance est recommandée.';
      break;

    case 'Moyen':
      riskLevel = 'Moyen';
      riskColor = 'orange';
      riskWidth = '60%';
      riskDescription = 'Votre zone présente un risque moyen de retrait-gonflement des argiles. Une protection préventive est recommandée.';
      break;

    case 'Fort':
    case 'Élevé':
      riskLevel = 'Élevé';
      riskColor = 'red';
      riskWidth = '85%';
      riskDescription = 'Votre zone présente un risque élevé de retrait-gonflement des argiles. Une protection est fortement recommandée.';
      break;
  }
}
```

## Complete Implementation Example

### Backend Route (Node.js/Express)
```javascript
app.post("/api/risk-check", async (req, res) => {
  try {
    const { address } = req.body;

    // Step 1: Validation
    if (!address || typeof address !== 'string' || address.trim().length === 0) {
      return res.status(400).json({ error: "Adresse invalide" });
    }

    // Step 2: Geocoding
    const geocodingApiKey = process.env.GOOGLE_GEOCODING_API_KEY;
    if (!geocodingApiKey) {
      return res.status(500).json({ error: "Configuration manquante pour la géolocalisation" });
    }

    const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${geocodingApiKey}`;
    const geocodingResponse = await fetch(geocodingUrl);
    const geocodingData = await geocodingResponse.json();

    if (geocodingData.status !== 'OK' || !geocodingData.results?.[0]) {
      return res.status(400).json({ error: "Adresse non trouvée" });
    }

    const { lat, lng } = geocodingData.results[0].geometry.location;
    const formattedAddress = geocodingData.results[0].formatted_address;

    // Step 3: Risk assessment
    const georisquesUrl = `https://georisques.gouv.fr/api/v1/rga?latlon=${lng},${lat}`;
    const georisquesResponse = await fetch(georisquesUrl);

    if (!georisquesResponse.ok) {
      console.error(`Georisques API error: ${georisquesResponse.status} ${georisquesResponse.statusText}`);
      return res.status(500).json({ error: "Erreur lors de la consultation des données Georisques" });
    }

    const georisquesData = await georisquesResponse.json();

    // Step 4: Risk mapping (see algorithm above)
    // ... risk level mapping code ...

    // Response
    res.json({
      success: true,
      address: formattedAddress,
      coordinates: { lat, lng },
      riskData: {
        level: riskLevel,
        color: riskColor,
        width: riskWidth,
        description: riskDescription
      }
    });

  } catch (error) {
    console.error('Risk check error:', error);
    res.status(500).json({ error: "Erreur lors de la vérification du risque" });
  }
});
```

### Frontend Interface (React/TypeScript)
```typescript
interface RiskCheckResponse {
  success: boolean;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  riskData: {
    level: string;
    color: string;
    width: string;
    description: string;
  };
}

const checkRisk = async (address: string): Promise<RiskCheckResponse> => {
  const response = await fetch("/api/risk-check", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ address }),
  });

  if (!response.ok) {
    throw new Error("Risk check failed");
  }

  return response.json();
};
```

## Environment Variables Required

```bash
# Google Geocoding API key (required)
GOOGLE_GEOCODING_API_KEY=your_google_api_key_here
```

## Error Handling Strategy

1. **Invalid Address**: Return 400 with French error message
2. **Geocoding Failure**: Return 400 "Adresse non trouvée"
3. **Missing API Key**: Return 500 "Configuration manquante"
4. **Georisques API Failure**: Return 500 with fallback to default "Moyen" risk level
5. **JSON Parsing Error**: Gracefully fallback to default risk assessment

## Rate Limits & Considerations

- **Google Geocoding API**: Subject to Google Cloud quotas and billing
- **Georisques API**: French government API, typically reliable but no SLA guarantees
- **Caching**: Consider caching results by address to reduce API calls
- **Fallback**: Always provide default "Moyen" risk level if APIs fail

## API Documentation Links

- **Google Geocoding API**: https://developers.google.com/maps/documentation/geocoding/overview
- **Georisques API**: https://georisques.gouv.fr/articles/lapi-georisques
- **Georisques RGA Endpoint**: https://georisques.gouv.fr/articles/lapi-georisques-documentation-technique-et-exemples#rga

This implementation provides reliable clay soil risk assessment for French addresses while gracefully handling API failures and providing meaningful user feedback in French.