import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

// Mock Keycloak token response
export async function POST(request) {
  // Parse form data from request
  const formData = await request.formData();
  const grantType = formData.get('grant_type');
  const username = formData.get('username');
  const password = formData.get('password');
  const clientId = formData.get('client_id');
  
  // Simple validation
  if (!grantType || !clientId) {
    return NextResponse.json(
      { error: 'invalid_request', error_description: 'Missing required parameters' },
      { status: 400 }
    );
  }
  
  // For password grant type
  if (grantType === 'password' && (!username || !password)) {
    return NextResponse.json(
      { error: 'invalid_grant', error_description: 'Invalid credentials' },
      { status: 400 }
    );
  }
  
  // Mock successful response
  const mockToken = {
    access_token: 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJfT3B2Ym1RQTZGWl9NX2tzLWxpQlE4WFM0UkRFY0xfZHFMSGJlNkxJUjlNIn0.eyJleHAiOjE3MDk2ODY5NjAsImlhdCI6MTcwOTY4NjY2MCwianRpIjoiNDU2YzY4ZGItZWJkZC00OWNlLTkwMzQtNmQ5NjhmZDY0NTI4IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9uaWdodGNyYXdsZXIiLCJhdWQiOlsibmlnaHRjcmF3bGVyLWFwaSIsImFjY291bnQiXSwic3ViIjoiMTIzNDU2Nzg5MCIsInR5cCI6IkJlYXJlciIsImF6cCI6Im5pZ2h0Y3Jhd2xlci1hcHAiLCJzZXNzaW9uX3N0YXRlIjoiYTJlZjJkMzQtM2UyNC00MTIwLTk4ZDAtYzJiNmYzYzVhMzYxIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwOi8vbG9jYWxob3N0OjMwMDAiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJkZWZhdWx0LXJvbGVzLW5pZ2h0Y3Jhd2xlciJdfSwicmVzb3VyY2VfYWNjZXNzIjp7Im5pZ2h0Y3Jhd2xlci1hcGkiOnsicm9sZXMiOlsidXNlciJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwic2lkIjoiYTJlZjJkMzQtM2UyNC00MTIwLTk4ZDAtYzJiNmYzYzVhMzYxIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiJUZXN0IFVzZXIiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJ0ZXN0dXNlciIsImdpdmVuX25hbWUiOiJUZXN0IiwiZmFtaWx5X25hbWUiOiJVc2VyIiwiZW1haWwiOiJ0ZXN0QGV4YW1wbGUuY29tIn0.XYZ',
    expires_in: 300,
    refresh_expires_in: 1800,
    refresh_token: 'eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIyMzYyYWM3Yy1hZDVkLTQ4ZWUtODEzOC1iNDJmZmJkNzZhZjEifQ.eyJleHAiOjE3MDk2ODg0NjAsImlhdCI6MTcwOTY4NjY2MCwianRpIjoiOWJjY2E3YTMtMGY1Ni00YjkzLWJmZjgtOGQxYzRkNzM5ZGU2IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9uaWdodGNyYXdsZXIiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvcmVhbG1zL25pZ2h0Y3Jhd2xlciIsInN1YiI6IjEyMzQ1Njc4OTAiLCJ0eXAiOiJSZWZyZXNoIiwiYXpwIjoibmlnaHRjcmF3bGVyLWFwcCIsInNlc3Npb25fc3RhdGUiOiJhMmVmMmQzNC0zZTI0LTQxMjAtOThkMC1jMmI2ZjNjNWEzNjEiLCJzY29wZSI6InByb2ZpbGUgZW1haWwiLCJzaWQiOiJhMmVmMmQzNC0zZTI0LTQxMjAtOThkMC1jMmI2ZjNjNWEzNjEifQ.ABC',
    token_type: 'Bearer',
    'not-before-policy': 0,
    session_state: 'a2ef2d34-3e24-4120-98d0-c2b6f3c5a361',
    scope: 'profile email'
  };
  
  return NextResponse.json(mockToken);
}

// Handle refresh token
export async function GET() {
  return NextResponse.json(
    { error: 'method_not_allowed', error_description: 'HTTP method not allowed' },
    { status: 405 }
  );
}
