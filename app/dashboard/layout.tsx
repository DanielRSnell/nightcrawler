'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/auth';
import { Sidebar } from '@/components/sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
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

      <main className="flex-1 overflow-auto">
        <div className="h-full">
          {children}
        </div>
      </main>
    
  );
}
