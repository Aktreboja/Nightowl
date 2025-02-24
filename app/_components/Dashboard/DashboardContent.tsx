'use client';
import { SpotifyClient } from '@/app/_utils/Spotify/SpotifyClient';
import { User } from '@spotify/web-api-ts-sdk';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { logoutClick } from '@/app/_utils/Spotify';
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

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col gap-4">
        {user?.images[0]?.url && (
          <Image
            src={user.images[0].url}
            alt="Profile Picture"
            width={100}
            height={100}
          />
        )}
        <h1>Welcome, {user?.display_name}</h1>
        <button onClick={() => logoutClick()}>Logout</button>
      </div>
    </div>
  );
};

export default DashboardContent;
