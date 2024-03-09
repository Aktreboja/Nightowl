import { Track } from "@spotify/web-api-ts-sdk";
import Image from "next/image";
import { useContext, useState, useRef } from "react";
import { DashboardContext } from "@/Context/DashboardProvider/DashboardContext"

// Track component for rendering Spotify Tracks
const TrackArt = ({track, dimension} : {track: Track, dimension: number}) =>  {
    const {autoplay, preview, setPreview, setSelected, previewUrl, setPreviewUrl} = useContext(DashboardContext)

    const [hover, setHover] = useState(false);

    // UseRef is used here to bypass typescript checking / explicitly referencing the km
    const audioRef = useRef<HTMLAudioElement>(null);

    // Extracting Values from Track 
    const { name, preview_url, artists, album } = track
    const trackArt = album.images[1] 

    const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
        setHover(true)
        setPreview(track);
        setPreviewUrl(track.preview_url)
        if(audioRef.current) {
            audioRef.current.volume = 0.1; // Adjust volume to 20%
            audioRef.current.currentTime = 0;
            audioRef.current.play();
        }
    }

    const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
        setHover(false)
        setPreview(undefined);
        setPreviewUrl(null)
        if(audioRef.current) {
            audioRef.current.pause();
        }
    }

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setSelected(track)
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