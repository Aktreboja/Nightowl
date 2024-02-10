import { Track } from "@spotify/web-api-ts-sdk";
import Image from "next/image";
import { useState, useRef, MouseEventHandler } from "react";

// Track component for rendering Spotify Tracks
export default function TrackArt({track, previewHandler, selectedHandler} : {track: Track, previewHandler: any, selectedHandler: any}) {
    const [preview, setPreview] = useState(false)


    // UseRef is used here to bypass typescript checking / explicitly referencing the km
    const audioRef = useRef<HTMLAudioElement>(null);

    // Extracting Values from Track 
    const { name, preview_url, artists, album } = track
    const trackArt = album.images[0] 

    const handleMouseEnter = () => {
        previewHandler(track);
        setPreview(true);
        if(audioRef.current) {
            audioRef.current.volume = 0.1; // Adjust volume to 20%
            audioRef.current.currentTime = 0;
            audioRef.current.play();
        }
    
    }

    const handleMouseLeave = () => {
        
        setPreview(false);
        previewHandler(undefined);
        if(audioRef.current) {
            // audioRef.current.volume = 1; 
            audioRef.current.pause();
        }
        
    }

    return (
        <div className="relative w-28 h-28  m-0 hover:shadow-lg duration-100 cursor-pointer hover:bg-primary" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick = {selectedHandler}>
            <audio ref = {audioRef} autoPlay = {preview} loop = {preview}>
                <source src = {`${preview_url}`} type="audio/mpeg"/>
            </audio>
            <div className={`absolute top-0 left-0 w-full h-full bg-white bg-opacity-25 z-10 opacity-0 transition-opacity duration-75 ${preview ? 'opacity-100' : ''}`}></div> 
            <Image 
                src={trackArt.url} 
                alt = {`${name} Track Art`} 
                layout = "fill"
                objectFit="cover"
                aria-label={`${name}`} 
                loading="lazy"
                title = {`${name}`}
                />
        </div>
    )
}