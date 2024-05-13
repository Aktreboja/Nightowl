'use client';
import { Inter } from 'next/font/google';
import './globals.css';
import StoreProvider from './StoreProvider';
// import { PersistGate } from 'redux-persist/integration/react';
// import { persistor } from '@/features/store';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Persisted storage
  // let persistor = persistStore(store)

  return (
    <StoreProvider>
      <html lang="en">
        <body className={`${inter.className} `}>{children}</body>
      </html>
    </StoreProvider>
  );
}
