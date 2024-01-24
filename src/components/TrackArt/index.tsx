import { Track } from "@spotify/web-api-ts-sdk";
import Image from "next/image";

// Track component for rendering Spotify Tracks
export default function TrackArt({track} : {track: Track}) {

    // Extracting Values from Track 
    const { name, preview_url, artists, album } = track

    const trackArt = album.images[0] 

    return (
        <div className="w-28 flex-shrink-0 m-0 p-0">
            <Image src={trackArt.url} alt = {`${name} Track Art`} width={50} height={50} layout="responsive"/>
        </div>
    )
}