'use client';
import Landing from '@/app/_components/Landing';
import { SpotifyClient } from '@/app/_utils/Spotify/SpotifyClient';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { User } from '@spotify/web-api-ts-sdk';
import DashboardContent from '@/app/_components/Dashboard/DashboardContent';
import DashboardLayout from '@/app/_components/Dashboard/DashboardLayout';
import { useSpotify } from '@/app/_utils/Spotify/SpotifyContext';
const Home = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, setUser } = useSpotify();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const spotifyClient = SpotifyClient.getInstance();

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
  }, [code]);

  if (isLoading) {
    return <div>Loading...</div>; // Consider adding a proper loading component
  }

  return isAuthenticated && user ? (
    <DashboardLayout>
      <DashboardContent />
    </DashboardLayout>
  ) : (
    <Landing />
  );
};

export default Home;
