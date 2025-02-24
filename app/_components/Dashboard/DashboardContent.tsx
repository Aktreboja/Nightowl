'use client';
import { SpotifyClient } from '@/app/_utils/Spotify/SpotifyClient';
import { User } from '@spotify/web-api-ts-sdk';
import { useEffect, useState } from 'react';
import UserTopStatsContent from '@/app/_components/Dashboard/UserTopStatsContent';
import { Track, Artist } from '@spotify/web-api-ts-sdk';
import ItemPreview from '@/app/_components/Dashboard/ItemPreview';
import ItemModal from '@/app/_components/Dashboard/ItemModal';
const DashboardContent = () => {
  const [user, setUser] = useState<User | null>(null);
  const [hoveredTrack, setHoveredTrack] = useState<Track | null>(null);
  const [hoveredArtist, setHoveredArtist] = useState<Artist | null>(null);

  const [selectedItem, setSelectedItem] = useState<Track | Artist | null>(null);

  const spotifyClient = SpotifyClient.getInstance();

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
    <div className="w-full min-h-screen flex p-4">
      <div className="flex w-2/3 justify-center flex-col gap-4 min-h-full ">
        <UserTopStatsContent
          setHoveredTrack={setHoveredTrack}
          setHoveredArtist={setHoveredArtist}
          setSelectedItem={setSelectedItem}
        />
      </div>
      <div className="w-1/3 min-h-full flex justify-center items-center">
        {hoveredTrack && <ItemPreview item={hoveredTrack} />}
        {hoveredArtist && <ItemPreview item={hoveredArtist} />}
      </div>
      {selectedItem && (
        <ItemModal item={selectedItem} modalCloseHandler={setSelectedItem} />
      )}
    </div>
  );
};

export default DashboardContent;
