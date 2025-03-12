import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/main.css";
import AuthWrapper from "@/components/auth/auth-wrapper";
import { ThemeProvider } from "@/components/theme-provider";

// We don't need to import the API manifest here since it's used directly in the auth store

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nightcrawler | Silicon Monitoring Dashboard",
  description: "A comprehensive dashboard for monitoring silicon allocation and computing cluster workflows",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider defaultTheme="dark">
          <AuthWrapper>{children}</AuthWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
