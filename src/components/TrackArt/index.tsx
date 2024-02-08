import { Track } from "@spotify/web-api-ts-sdk";
import Image from "next/image";
import { useState, useRef, MouseEventHandler } from "react";

// Track component for rendering Spotify Tracks
export default function TrackArt({track, trackHandler} : {track: Track, trackHandler: MouseEventHandler<HTMLDivElement>}) {
    const [preview, setPreview] = useState(false)
    
    // UseRef is used here to bypass typescript checking / explicitly referencing the km
    const audioRef = useRef<HTMLAudioElement>(null);

    // Extracting Values from Track 
    const { name, preview_url, artists, album } = track
    const trackArt = album.images[0] 

    const handleMouseEnter = () => {
        console.log("Entered")
        setPreview(true);
        if(audioRef.current) {
            console.log('here')
            audioRef.current.volume = 0.1; // Adjust volume to 20%
            audioRef.current.play();
        }
    
    }

    const handleMouseLeave = () => {
        setPreview(false);
        if(audioRef.current) {
            // audioRef.current.volume = 1; 
            audioRef.current.pause();
        }
        
    }

    return (
        <div className="w-28 flex-shrink-0 m-0 p-1 hover:shadow-lg duration-100 cursor-pointer hover:bg-primary" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick = {trackHandler}>
            <audio ref = {audioRef} autoPlay = {preview} loop = {preview}>
                <source src = {`${preview_url}`} type="audio/mpeg"/>
            </audio>
            <Image 
                src={trackArt.url} 
                alt = {`${name} Track Art`} 
                width={120} 
                height={120} 
                aria-label={`${name}`} 
                title = {`${name}`}
                />
        </div>
    )
}