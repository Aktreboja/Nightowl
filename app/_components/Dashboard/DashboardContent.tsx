'use client';
import { SpotifyClient } from '@/app/_utils/Spotify/SpotifyClient';
import { User } from '@spotify/web-api-ts-sdk';
import { useEffect, useState } from 'react';
const DashboardContent = () => {
  const [user, setUser] = useState<User | null>(null);
  const spotifyClient = new SpotifyClient(
    process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID as string,
    process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET as string,
    process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URL as string
  );

  useEffect(() => {
    const fetchUserData = async () => {
      const accessToken = localStorage.getItem('access_token');
      if (accessToken) {
        const userResponse = await spotifyClient.get('/me', accessToken);
        setUser(userResponse as User);
      }
    };

    fetchUserData();
  }, []);

  return <div>{user?.display_name}</div>;
};

export default DashboardContent;
