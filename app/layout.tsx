'use client';

import { Inter } from "next/font/google";
import "@/styles/main.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthWrapper } from "@/components/auth/auth-wrapper";
import { useAuthStore } from "@/lib/store/auth";
import apiManifest from "./api-manifest";
import { Sidebar } from '@/components/sidebar';

const inter = Inter({ subsets: ["latin"] });

// Metadata is now handled by Next.js through a separate metadata object
// in a different file or through generateMetadata

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { checkAuth } = useAuthStore();
  const isAuthenticated = checkAuth();

  // This ensures the API manifest is processed during build
  // eslint-disable-next-line no-unused-vars
  const _apiPaths = apiManifest;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="icon"
          href="/favicon.ico"
          sizes="any"
        />
      </head>
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        <ThemeProvider defaultTheme="dark">
          {isAuthenticated && <div className="flex h-screen">
            <Sidebar />
{children}          
</div>}
          {!isAuthenticated && <div className="flex h-screen justify-center items-center">
            <AuthWrapper>{children}</AuthWrapper>
          </div>}
        </ThemeProvider>
      </body>
    </html>
  );
}
