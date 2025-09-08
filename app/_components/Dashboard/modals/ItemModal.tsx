import { Track, Artist } from '@spotify/web-api-ts-sdk';
import { useEffect, useState } from 'react';
import { spotifyService } from '@/app/_utils/Spotify';
import { ArtistModal, TrackModal } from '.';

interface ItemModalProps {
  item: Track | Artist;
  modalCloseHandler: (item: Track | Artist | null) => void;
}

const ItemModal = ({ item, modalCloseHandler }: ItemModalProps) => {
  const isTrack = 'artists' in item;
  const [artists, setArtists] = useState<Artist[]>([]);
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingTracks, setIsLoadingTracks] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');

    const fetchData = async () => {
      if (!accessToken || !refreshToken) return;

      setIsLoading(true);
      try {
        if (isTrack) {
          // For tracks, fetch artists
          const artistIds = (item as Track).artists.map((artist) => artist.id);
          const artistsData = await spotifyService.getArtists(
            artistIds,
            accessToken,
            refreshToken
          );
          if (artistsData) {
            setArtists(artistsData.artists || []);
          }
        } else {
          // For artists, fetch top tracks
          setIsLoadingTracks(true);
          const topTracksData = await spotifyService.getArtistTopTracks(
            item.id,
            accessToken,
            refreshToken
          );
          if (topTracksData?.tracks) {
            setTopTracks(topTracksData.tracks);
          }
          setIsLoadingTracks(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [item, isTrack]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        modalCloseHandler(null);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [modalCloseHandler]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-gray-800 rounded-lg p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      </div>
    );
  }

  if (isTrack) {
    return (
      <TrackModal
        item={item}
        artists={artists}
        modalCloseHandler={modalCloseHandler}
      />
    );
  }

  // Artist modal
  return (
    <ArtistModal
      item={item}
      modalCloseHandler={modalCloseHandler}
      isLoadingTracks={isLoadingTracks}
      topTracks={topTracks}
    />
  );
};

export default ItemModal;
