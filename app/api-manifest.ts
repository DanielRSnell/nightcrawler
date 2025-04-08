// This file is used to ensure all API routes are included in the static export
// It's imported in the app/layout.tsx file to make sure Next.js processes all API routes

export const apiManifest = {
  auth: {
    token: '/api/v1/auth/token',
    userinfo: '/api/v1/auth/userinfo',
  },
  silicon: {
    demand: '/api/v1/silicon/demand',
    utilization: '/api/v1/silicon/utilization',
  },
  pools: '/api/v1/pools',
  workflows: '/api/v1/workflows',
};

// Export the manifest for use in the application
export default apiManifest; 