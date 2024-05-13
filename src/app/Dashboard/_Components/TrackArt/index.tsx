import { useAppDispatch, useAppSelector } from '@/features/hooks';
import { getInteractable } from '@/features/reducers/UIReducer';
import { setPreview, setPreviewUrl } from '@/features/reducers/MusicReducer';
import { Track } from '@spotify/web-api-ts-sdk';
import Image from 'next/image';
import { useState } from 'react';
import { addTrackToQueue } from '@/features/reducers/PlaylistReducer';
import { setSelected } from '@/features/reducers/MusicReducer';

// Track component for rendering Spotify Tracks
const TrackArt = ({ track }: { track: Track }) => {
  const dispatch = useAppDispatch();

  const isInteractable = useAppSelector(getInteractable);

  const [hover, setHover] = useState(false);

  // Extracting Values from Track
  const { name, preview_url, artists, album } = track;
  const trackArt = album.images[1];

  // Mouse handlers to trigger the preview url of a track
  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isInteractable) {
      setHover(true);
      dispatch(setPreviewUrl(preview_url as string));
      dispatch(setPreview(track));
    }
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    setHover(false);
    dispatch(setPreviewUrl(''));
    dispatch(setPreview(null));
  };

  // onClick handler to showcase selected track / artist.
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    dispatch(addTrackToQueue(track));
    dispatch(setSelected(track));
  };

  return (
    <div
      className={`relative w-full m-0 duration-100 cursor-pointer `}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div
        className={`absolute top-0 left-0 w-full h-full  bg-white bg-opacity-40 z-20 opacity-0 transition-opacity duration-75 ${hover ? 'opacity-100' : ''}`}
      ></div>
      <Image
        src={trackArt.url}
        alt={`${name} Track Art`}
        className="max-w-full h-auto"
        aria-label={`${name}`}
        loading="eager"
        sizes="(min-width: 1000px) 24w"
        title={`${name}`}
        width={100}
        height={100}
      />
    </div>
  );
};

export default TrackArt;
