import { Album, Artist, Track } from '@spotify/web-api-ts-sdk';
import Image from 'next/image';
import { useState } from 'react';

export default function PreviewContainer({
  item,
}: {
  item: Track | Artist | Album;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Conditionally rendered Component for preview (Track, Artist, or Album).
  const SpotifyItem = ({ item }: { item: Track | Artist | Album }) => {
    if ('preview_url' in item) {
      const { name, album, artists } = item;
      const { images } = album;
      return (
        <>
          <div className="p-3 relative max-lg:w-36 max-lg:h-36 w-44 h-44">
            <Image
              src={images[0].url}
              alt={`${name} Album art`}
              fill={true}
              sizes="(max-width: 800px) 100%"
              onLoad={() => setImageLoaded(true)}
            />
          </div>

          {imageLoaded && (
            <div className="p-3 text-center text-white">
              <strong className="font-bold max-lg:text-md">{name}</strong>
              <p className="font-semibold max-lg:text-sm">
                {artists && artists.length > 0
                  ? artists.map((artist) => artist.name).join(', ')
                  : 'No Artists Available'}
              </p>
              <p className="w-4/5 mx-auto max-lg:text-sm">
                <span className="font-semibold ">
                  From the {album.album_type.toLowerCase()}:
                </span>{' '}
                {album.name}
              </p>
            </div>
          )}
        </>
      );
    } else if ('followers' in item) {
      const { name, images } = item;
      return (
        <>
          <div className="p-3 relative">
            <Image
              src={images[0].url}
              alt={`${name} Album art`}
              width={250}
              height={250}
              onLoadingComplete={() => setImageLoaded(true)}
            />
          </div>
          {imageLoaded && (
            <div className="p-3 text-center text-white">
              <strong className="font-bold">{name}</strong>
            </div>
          )}
        </>
      );
    } else {
      const album: Album = item;
      const { images, name } = album;
      return (
        <>
          <div className="p-3 relative">
            <Image
              src={images[0].url}
              alt={`${name} Album art`}
              width={250}
              height={250}
              onLoadingComplete={() => setImageLoaded(true)}
            />
          </div>
          {imageLoaded && (
            <div className="p-3 text-center text-white">
              <strong className="font-bold">{name}</strong>
            </div>
          )}
        </>
      );
    }
  };

  return (
    <div className="w-1/3 max-w-lg py-12 hidden md:block ">
      <div className="flex flex-col justify-center items-center">
        <SpotifyItem item={item} />
      </div>
    </div>
  );
}
