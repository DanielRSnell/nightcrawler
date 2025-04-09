'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to login page when the component mounts
    router.push('/login');
  }, [router]);

  return (
    // Display a minimal loading indicator while redirecting
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="text-center">
        <div className="h-6 w-6 border-t-2 border-primary animate-spin rounded-full mx-auto mb-4"></div>
        <p className="text-sm text-muted-foreground">Redirecting to login...</p>
      </div>
    </div>
  );
} 