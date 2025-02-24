'use client';
import Landing from '@/app/_components/Landing';
import { SpotifyClient } from '@/app/_utils/Spotify/SpotifyClient';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { User } from '@spotify/web-api-ts-sdk';
import DashboardContent from '@/app/_components/Dashboard/DashboardContent';

const Home = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const spotifyClient = new SpotifyClient(
    process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID as string,
    process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET as string,
    process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URL as string
  );

  const code = searchParams.get('code');

  useEffect(() => {
    const initializeUser = async () => {
      try {
        // Handle initial authentication
        if (code) {
          const codeVerifier = localStorage.getItem('code_verifier');
          if (codeVerifier) {
            await spotifyClient.authenticate(code, codeVerifier);
            setIsAuthenticated(true);
            router.replace('/');
            return;
          }
        }

        // Check existing authentication
        const accessToken = localStorage.getItem('access_token');
        const refreshToken = localStorage.getItem('refresh_token');

        if (accessToken) {
          setIsAuthenticated(true);
          const userData = await spotifyClient.get<User>(
            '/me',
            accessToken,
            refreshToken || undefined
          );
          setUser(userData);
        }
      } catch (error) {
        console.error('Authentication error:', error);
        // Handle error appropriately
      } finally {
        setIsLoading(false);
      }
    };

    initializeUser();
  }, [code, router, spotifyClient]);

  if (isLoading) {
    return <div>Loading...</div>; // Consider adding a proper loading component
  }

  return isAuthenticated && user ? <DashboardContent /> : <Landing />;
};

export default Home;
