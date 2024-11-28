import { Inter } from 'next/font/google';
import '@/globals.css';
import StoreProvider from '@/containers/StoreProvider';
import { UserProvider } from '@auth0/nextjs-auth0/client';
const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <html lang="en">
        <UserProvider>
          <body className={`${inter.className}`}>{children}</body>
        </UserProvider>
      </html>
    </StoreProvider>
  );
}
