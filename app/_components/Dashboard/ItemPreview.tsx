import { Track, Artist } from '@spotify/web-api-ts-sdk';
import Image from 'next/image';
interface ItemPreviewProps {
  item: Track | Artist;
}

const ItemPreview = ({ item }: ItemPreviewProps) => {
  if ('images' in item) {
    return (
      <div className="flex flex-col items-center gap-4">
        <Image
          src={item.images[0].url}
          alt={item.name}
          width={250}
          height={250}
        />
        <p className="text-center font-bold w-1/2 text-2xl">{item.name}</p>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center gap-4  w-full">
        <Image
          src={item.album.images[0].url}
          alt={item.name}
          width={250}
          height={250}
        />

        <p className="text-2xl font-bold w-1/2 text-center">{item.name}</p>
      </div>
    );
  }
};

export default ItemPreview;
