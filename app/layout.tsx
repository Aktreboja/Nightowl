'use client';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { SpotifyProvider } from './_utils/Spotify/SpotifyContext';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SpotifyProvider
          clientId={process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID as string}
          clientSecret={process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET as string}
          redirectUri={process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI as string}
        >
          {children}
        </SpotifyProvider>
      </body>
    </html>
  );
}
