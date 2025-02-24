import { Track, Artist } from '@spotify/web-api-ts-sdk';
import { Artists } from '@spotify/web-api-ts-sdk';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { SpotifyClient } from '@/app/_utils/Spotify/SpotifyClient';
import { CloseButton } from '@chakra-ui/react';
import { Tooltip } from '../ui/tooltip';
interface ItemModalProps {
  item: Track | Artist;
  modalCloseHandler: (item: Track | Artist | null) => void;
}

const ItemModal = ({ item, modalCloseHandler }: ItemModalProps) => {
  const spotifyClient = SpotifyClient.getInstance();
  const isTrack = 'artists' in item;
  const [artists, setArtists] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
    const fetchArtists = async () => {
      const idParams = (item as Track).artists
        .map((artist) => artist.id)
        .join(',');
      const artists = await spotifyClient.get<Artists>(
        `/artists?ids=${idParams}`,
        accessToken as string,
        refreshToken as string
      );
      if (artists) {
        setArtists(artists.artists || []);
      }
      setIsLoading(false);
    };
    if (isTrack) {
      fetchArtists();
    }
  }, []);

  if (isLoading) {
    return null;
  }
  if (isTrack) {
    return (
      <div className="w-full h-full flex justify-center items-center bg-black/50 absolute top-0 left-0">
        <div className="w-1/2 h-fit bg-white rounded-lg px-8 py-10 relative flex flex-col gap-4">
          <CloseButton
            className="absolute top-0 right-0"
            onClick={() => modalCloseHandler(null)}
          />
          <div className="flex gap-4 items-center ">
            <div className="w-20 h-20 relative">
              <Image
                src={item.album.images[0].url}
                alt={item.name}
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <h1 className="text-2xl font-bold">{item.name}</h1>
          </div>
          <div className="flex flex-col gap-4 ">
            <h1 className="text-2xl font-bold">Artists</h1>
            <div className="flex flex-wrap gap-2">
              {artists.length > 0 &&
                artists.map((artist) => (
                  <Tooltip key={artist.id} content={artist.name}>
                    <div className="w-16 h-16 relative">
                      <Image
                        src={artist.images[0].url}
                        alt={artist.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full"
                      />
                    </div>
                  </Tooltip>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ItemModal;
