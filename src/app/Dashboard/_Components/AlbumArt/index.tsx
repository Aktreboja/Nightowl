import { useAppDispatch } from '@/features/hooks';
import { setPreview, setPreviewUrl } from '@/features/reducers/MusicReducer';
import { Album } from '@spotify/web-api-ts-sdk';
import Image from 'next/image';
import { useState } from 'react';
import { addTrackToQueue } from '@/features/reducers/PlaylistReducer';
import { setSelected } from '@/features/reducers/MusicReducer';

// Album component for rendering Spotify Tracks
const AlbumArt = ({ album }: { album: Album }) => {
  const dispatch = useAppDispatch();
  const [hover, setHover] = useState(false);

  // Extracting Values from Album
  const { name, images } = album;
  const albumArt = images[1];

  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    setHover(true);
    // dispatch(setPreviewUrl(preview_url as string));
    // dispatch(setPreview(track));
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    setHover(false);
    // dispatch(setPreviewUrl(''));
    // dispatch(setPreview(null));
  };

  // onClick handler to showcase selected track / artist.
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // dispatch(addTrackToQueue(track));
    // dispatch(setSelected(track));
  };

  return (
    <div
      className={`relative w-full m-0 duration-100 cursor-pointer hover:bg-primary`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div
        className={`absolute top-0 left-0 w-full h-full  bg-white bg-opacity-40 z-20 opacity-0 transition-opacity duration-75 ${hover ? 'opacity-100' : ''}`}
      ></div>
      <Image
        src={albumArt.url}
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

export default AlbumArt;
