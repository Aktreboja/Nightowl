import { Artist, Track } from '@spotify/web-api-ts-sdk';
import Image from 'next/image';
import { useState } from 'react';

export default function PreviewContainer({ item }: { item: Track | Artist }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  // If it is a track
  if ('preview_url' in item) {
    const { name, album, artists } = item;
    const { images } = album;

    return (
      <div className="w-1/3 max-w-lg py-12 max-md:hidden md:fixed md:top-1/2 md:transform md:-translate-y-1/2 md:right-0 ">
        <div className="flex flex-col justify-center items-center">
          <div className="p-3 relative max-lg:w-44 max-lg:h-44 w-56 h-56">
            <Image
              src={images[0].url}
              alt={`${name} Album art`}
              fill={true}
              onLoadingComplete={() => setImageLoaded(true)}
            />
          </div>

          {imageLoaded && (
            <div className="p-3 text-center text-white">
              <strong className="font-bold lg:text-lg">{name}</strong>
              <p className="font-semibold">
                {artists && artists.length > 0
                  ? artists.map((artist) => artist.name).join(', ')
                  : 'No Artists Available'}
              </p>
              <p className="w-4/5 mx-auto">
                <span className="font-semibold ">
                  From the {album.album_type.toLowerCase()}:
                </span>{' '}
                {album.name}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  } else {
    const { name, images } = item;
    return (
      <div className="w-1/3 max-w-lg py-12 hidden md:block ">
        <div className="flex flex-col justify-center items-center">
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
        </div>
      </div>
    );
  }
}
