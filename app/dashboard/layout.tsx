'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/auth';
import { Sidebar } from '@/components/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, checkAuth } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const isUserAuthenticated = checkAuth();
    
    if (!isUserAuthenticated) {
      router.push('/login');
    }
  }, [checkAuth, router]);

  // Use the result of checkAuth directly to determine rendering
  // This ensures we're using the most up-to-date auth state including localStorage
  if (!checkAuth()) {
    return null; // Don't render anything while checking authentication
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="h-full">
          {children}
        </div>
      </main>
    </div>
  );
}
