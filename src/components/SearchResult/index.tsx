import { Track } from '@spotify/web-api-ts-sdk';
import Image from 'next/image';
import { useAppDispatch } from '@/features/hooks';

export default function SearchResult({ track }: { track: Track }) {
  const { name, artists, album } = track;
  const { images } = album;

  return (
    <div className="bg-white border border-[rgb(200,200,200)] hover:bg-button-primary hover:text-white duration-100 flex items-center shadow-md rounded-md relative">
      <div className="w-20 h-20  md:w-24 md:h-24 bg-secondary relative m-3">
        <Image src={images[0].url} fill={true} alt={`${name} Album art`} />
      </div>
      <div className="px-3 pb-1 mt-4">
        <h3 className="font-bold text-lg md:text-xl">{name}</h3>
        <p className="text-sm md:text-lg">
          {artists && artists.map((artist) => artist.name).join(', ')}
        </p>
      </div>
    </div>
  );
}
