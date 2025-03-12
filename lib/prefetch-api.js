// This file is used to ensure all API routes are included in the static export
// by referencing them during the build process

export const apiEndpoints = [
  '/api/v1/auth/token',
  '/api/v1/auth/userinfo',
  '/api/v1/silicon/demand',
  '/api/v1/silicon/utilization',
  '/api/v1/pools',
  '/api/v1/workflows'
];

export async function prefetchApiEndpoints() {
  return Promise.all(
    apiEndpoints.map(endpoint => 
      fetch(endpoint).then(res => res.json()).catch(err => console.error(`Error prefetching ${endpoint}:`, err))
    )
  );
}
