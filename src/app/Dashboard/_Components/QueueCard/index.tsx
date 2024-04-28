import { Track } from '@spotify/web-api-ts-sdk';
import Image from 'next/image';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { removeTrackFromQueue } from '@/features/reducers/PlaylistReducer';
import { useAppDispatch } from '@/features/hooks';

export default function QueueCard({ track }: { track: Track }) {
  const { name, artists, album } = track;
  const { images } = album;
  const dispatch = useAppDispatch();

  return (
    <div className="bg-white border border-[rgb(200,200,200)] h-fit flex items-center shadow-md rounded-md relative">
      <div className="absolute text-2xl  right-3 top-1/2 transform -translate-y-1/2 cursor-pointer">
        <IoMdCloseCircleOutline
          onClick={() => dispatch(removeTrackFromQueue(track))}
        />
      </div>
      <div className="w-16 h-16 bg-secondary relative m-3">
        <Image src={images[0].url} fill={true} alt={`${name} Album art`} />
      </div>
      <div className="px-3 pb-1 mt-4">
        <h3 className="font-bold md:text-lg">{name}</h3>
        <p className="text-sm md:text-md">
          {artists && artists.map((artist) => artist.name).join(', ')}
        </p>
      </div>
    </div>
  );
}
