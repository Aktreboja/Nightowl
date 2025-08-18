'use client';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { SpotifyProvider } from './_utils/Spotify/SpotifyContext';
import { Provider } from './_components/ui/provider';
import { UserProvider } from '@auth0/nextjs-auth0/client';

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
    <html suppressHydrationWarning lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased light`}
      >
        <Provider>
          <UserProvider>
            <SpotifyProvider>{children}</SpotifyProvider>
          </UserProvider>
        </Provider>
      </body>
    </html>
  );
}
