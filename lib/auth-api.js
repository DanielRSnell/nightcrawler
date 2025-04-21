/**
 * Authentication API module for Keycloak integration
 * Handles token acquisition and management
 */

const KEYCLOAK_TOKEN_URL = 'https://keycloak.dev-ai4jobs.com/auth/realms/ssbx-tf/protocol/openid-connect/token';
const DEFAULT_CREDENTIALS = {
  username: 'daniel.snell@thiswayglobal.com',
  password: 'Shared71188!',
  scope: 'email profile phone'
};

/**
 * Fetches an authentication token from Keycloak
 * @param {Object} credentials - Optional credentials override
 * @param {string} credentials.username - User email
 * @param {string} credentials.password - User password
 * @param {string} credentials.scope - Requested scopes
 * @returns {Promise<Object>} Token response object
 */
export async function getAuthToken(credentials = DEFAULT_CREDENTIALS) {
  const { username, password, scope } = credentials;
  
  const formData = new URLSearchParams();
  formData.append('grant_type', 'password');
  formData.append('username', username);
  formData.append('password', password);
  formData.append('scope', scope);
  
  try {
    const response = await fetch(KEYCLOAK_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic c3NieC13ZWI6'
      },
      body: formData
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(`Authentication failed: ${response.status} ${response.statusText}${errorData ? ` - ${JSON.stringify(errorData)}` : ''}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Authentication error:', error);
    throw error;
  }
}

/**
 * Refreshes an existing token
 * @param {string} refreshToken - The refresh token to use
 * @returns {Promise<Object>} New token response object
 */
export async function refreshAuthToken(refreshToken) {
  const formData = new URLSearchParams();
  formData.append('grant_type', 'refresh_token');
  formData.append('refresh_token', refreshToken);
  
  try {
    const response = await fetch(KEYCLOAK_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic c3NieC13ZWI6'
      },
      body: formData
    });
    
    if (!response.ok) {
      throw new Error(`Token refresh failed: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Token refresh error:', error);
    throw error;
  }
}

/**
 * Creates an authenticated fetch function that includes the bearer token
 * @param {string} accessToken - The access token to use for authentication
 * @returns {Function} Fetch function with authentication headers included
 */
export function createAuthenticatedFetch(accessToken) {
  return async (url, options = {}) => {
    const authOptions = {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${accessToken}`
      }
    };
    
    return fetch(url, authOptions);
  };
}

/**
 * Get all known PIDs sorted by age
 * @param {string} accessToken - The access token to use for authentication
 * @returns {Promise<Array>} List of PIDs
 */
export async function getPids(accessToken) {
  try {
    const authenticatedFetch = createAuthenticatedFetch(accessToken);
    const response = await authenticatedFetch('/api/v1/usage/pids', {
      method: 'GET'
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch PIDs: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching PIDs:', error);
    throw error;
  }
}

/**
 * Get usage history for a specific PID, sorted by timestamp (descending)
 * @param {string} accessToken - The access token to use for authentication
 * @param {string} pid - The PID to get history for
 * @returns {Promise<Array>} PID history data
 */
export async function getPidHistory(accessToken, pid) {
  try {
    const authenticatedFetch = createAuthenticatedFetch(accessToken);
    const response = await authenticatedFetch(`/api/v1/usage/pids/${pid}/history`, {
      method: 'GET'
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch PID history: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching history for PID ${pid}:`, error);
    throw error;
  }
}
