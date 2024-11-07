import { Artist, Track } from '@spotify/web-api-ts-sdk';
import Image from 'next/image';
import { useState, useEffect } from 'react';

import {
  setPreview,
  setPreviewUrl,
  setSelected,
} from '@/features/reducers/MusicReducer';
import { useAppDispatch } from '@/features/hooks';
import useSpotifyArtists from '@/utils/Spotify/hooks/useSpotifyArtists';

// Track component for rendering Spotify Tracks
export default function ArtistArt({
  artist,
  dimension,
  rounded,
}: {
  artist: Artist;
  dimension?: number;
  rounded?: boolean;
}) {
  const artistsApi = useSpotifyArtists();

  const [hover, setHover] = useState(false);
  const [topTrack, setTopTrack] = useState<Track | null>(null);
  const { name, images, id } = artist;
  const dispatch = useAppDispatch();

  const handleMouseEnter = () => {
    setHover(true);
    dispatch(setPreview(artist));
    if (topTrack) {
      dispatch(setPreviewUrl(topTrack.preview_url as string));
    }
  };

  const handleMouseLeave = () => {
    setHover(false);
    dispatch(setPreview(null));
    dispatch(setPreviewUrl(''));
  };

  // Resets the topTrack prop whenever a new artist is hovered using the same artistArt
  useEffect(() => {
    setTopTrack(null);
  }, [artist]);

  // useEffect to grab the artists top track and set preview url to it
  useEffect(() => {
    const fetchArtistsTopTrack = async () => {
      const artistsTracks = await artistsApi.fetchArtistsTopTracks(id);
      setTopTrack(artistsTracks[0]);
      dispatch(setPreviewUrl(artistsTracks[0].preview_url as string));
    };

    if (hover && !topTrack) {
      fetchArtistsTopTrack();
    }
  }, [topTrack, hover, artistsApi, dispatch, id]);

  const dimensions = dimension ? `w-${dimension} h-${dimension}` : 'w-24 h-24';

  return (
    <div
      className={`relative max-sm:w-20 max-sm:h-20 ${dimensions} m-0 hover:shadow-lg duration-100 cursor-pointer ${rounded ? 'rounded-full' : null}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => dispatch(setSelected(artist))}
    >
      <div
        className={`absolute top-0 left-0 max-sm:w-20 max-sm:h-20 ${dimensions} bg-white bg-opacity-25 z-10 opacity-0 transition-opacity duration-75  ${hover ? 'opacity-100' : ''} ${rounded ? 'rounded-full' : null}`}
      ></div>
      <Image
        src={images[images.length - 1].url}
        alt={`${name} Track Art`}
        className={`object-cover ${rounded ? 'rounded-full' : null}`}
        fill={true}
        loading="lazy"
        aria-label={`${name}`}
        title={`${name}`}
      />
    </div>
  );
}
