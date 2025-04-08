// This file is used to ensure all API routes are included in the static export
// by explicitly generating them during the build process

import { apiManifest } from './api-manifest';

// Export a config object that tells Next.js to generate these routes at build time
export const generateStaticParams = async () => {
  // This function is called during build time
  // It doesn't need to return anything, but its existence ensures
  // that Next.js will process the imports and generate the API routes
  console.log('Generating static API routes:', Object.values(apiManifest));
  return [];
};

// Default export is required for Next.js to process this file
export default function ApiStaticGenerator() {
  // This component is never rendered, it just exists to ensure
  // the API routes are generated during build time
  return null;
} 