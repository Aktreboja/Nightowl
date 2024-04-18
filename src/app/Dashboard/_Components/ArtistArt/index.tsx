import { Artist } from '@spotify/web-api-ts-sdk';
import Image from 'next/image';
import { useState } from 'react';

import { setPreview, setSelected } from '@/features/reducers/MusicReducer';
import { useAppDispatch } from '@/features/hooks';

// Track component for rendering Spotify Tracks
export default function ArtistArt({ artist }: { artist: Artist }) {
  const [hover, setHover] = useState(false);
  const { name, images } = artist;
  const dispatch = useAppDispatch();

  const handleMouseEnter = () => {
    setHover(true);
    dispatch(setPreview(artist));
  };

  const handleMouseLeave = () => {
    setHover(false);
    dispatch(setPreview(null));
  };

  return (
    <div
      className="relative  rounded-full w-24 h-24 m-0 hover:shadow-lg duration-100 cursor-pointer  "
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => dispatch(setSelected(artist))}
    >
      <div
        className={`absolute top-0 left-0 w-24 h-24 bg-white bg-opacity-25 z-10 opacity-0 transition-opacity duration-75  ${hover ? 'opacity-100' : ''}`}
      ></div>
      <Image
        src={images[images.length - 1].url}
        alt={`${name} Track Art`}
        className="object-cover"
        fill={true}
        loading="lazy"
        aria-label={`${name}`}
        title={`${name}`}
      />
    </div>
  );
}
