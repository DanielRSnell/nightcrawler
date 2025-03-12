import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

// Mock Keycloak userinfo endpoint
export async function GET() {
  // In a real implementation, you would validate the token here
  // For mock purposes, we'll just return user info
  
  const mockUserInfo = {
    sub: '1234567890',
    email_verified: true,
    name: 'Test User',
    preferred_username: 'testuser',
    given_name: 'Test',
    family_name: 'User',
    email: 'test@example.com',
    realm_access: {
      roles: ['offline_access', 'uma_authorization', 'default-roles-nightcrawler']
    },
    resource_access: {
      'nightcrawler-api': {
        roles: ['user']
      },
      account: {
        roles: ['manage-account', 'manage-account-links', 'view-profile']
      }
    }
  };
  
  return NextResponse.json(mockUserInfo);
}

export async function POST() {
  return NextResponse.json(
    { error: 'method_not_allowed', error_description: 'HTTP method not allowed' },
    { status: 405 }
  );
}
