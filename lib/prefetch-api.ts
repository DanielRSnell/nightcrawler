import apiManifest from '@/app/api-manifest';

// This function is used to prefetch API data during static site generation
export async function prefetchApiData() {
  const apiEndpoints = Object.values(apiManifest).flatMap(endpoint => {
    if (typeof endpoint === 'string') {
      return endpoint;
    }
    return Object.values(endpoint);
  });

  console.log('Prefetching API data for endpoints:', apiEndpoints);
  
  // In a real implementation, you would fetch data from your actual API
  // and store it for static generation
  
  // For our mock implementation, we don't need to do anything here
  // as our API routes are already set to return static mock data
  
  return {
    success: true,
    endpoints: apiEndpoints,
  };
}

// Helper function to get the full URL for an API endpoint
export function getApiUrl(endpoint: string): string {
  // For static export, we're using relative URLs
  return endpoint;
} 