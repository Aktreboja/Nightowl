import { Artist, Track } from "@spotify/web-api-ts-sdk"
import Image from "next/image"

export default function PreviewContainer({item}: {item: Track }) {



        const {name, album, artists} = item;
        const {images} = album;


        return <div className="bg-white w-full rounded-md">
        <div className="flex ">
            <div className="p-3">
                <Image src={images[0].url} alt={`${name} Album art`} width={150} height={150} />
            </div>
            
            <div className="p-3">
                <strong className="font-bold">{name}</strong>
                <p className="font-semibold">{artists && artists.length > 0 ? artists.map(artist => artist.name).join(', ') : 'No Artists Available'}</p>
                <p><span className="font-semibold">From the {album.album_type.toLowerCase()}:</span> {album.name}</p>
            </div>
        </div>
    </div>
    

}