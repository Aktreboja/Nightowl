import { useAppDispatch } from "@/features/hooks";
import { setPreview, setPreviewUrl } from "@/features/reducers/MusicReducer";
import { Track } from "@spotify/web-api-ts-sdk";
import Image from "next/image";
import { useState } from "react";
import { setSelected } from "@/features/reducers/MusicReducer";

// Track component for rendering Spotify Tracks
const TrackArt = ({track, dimension} : {track: Track, dimension: number}) =>  {
    const dispatch = useAppDispatch()
    const [hover, setHover] = useState(false);

    // Extracting Values from Track 
    const { name, preview_url, artists, album } = track
    const trackArt = album.images[1] 

    // Mouse handlers to trigger the preview url of a track
    const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
        setHover(true)
        dispatch(setPreview(track));
        dispatch(setPreviewUrl(preview_url as string));
    }

    const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
        setHover(false)
        dispatch(setPreview(null));
        dispatch(setPreviewUrl(''))
    }

    // onClick handler to showcase selected track / artist.
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        dispatch(setSelected(track))
    }

    return (
        <div className={`relative w-${dimension} h-${dimension} m-0 hover:shadow-lg duration-100 cursor-pointer hover:bg-primary`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick = {handleClick}>
            <div className={`absolute top-0 left-0 w-${dimension} h-${dimension} bg-white bg-opacity-25 z-20 opacity-0 transition-opacity duration-75 ${ hover ? 'opacity-100' : ''}`}></div> 
            <Image 
                src={trackArt.url} 
                alt = {`${name} Track Art`} 
                fill = {true}
                className="object-cover"
                aria-label={`${name}`} 
                loading="eager"
                sizes="(min-width: 1000px) 24w"
                title = {`${name}`}
                />
        </div>
    )
}

export default TrackArt