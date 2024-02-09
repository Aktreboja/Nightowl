import { Artist } from "@spotify/web-api-ts-sdk";
import Image from "next/image";
import { useState, useRef, MouseEventHandler } from "react";

// Track component for rendering Spotify Tracks
export default function ArtistArt({artist} : {artist: Artist}) {
    const [preview, setPreview] = useState(false)

    const {name, images} = artist

    // UseRef is used here to bypass typescript checking / explicitly referencing the km
    const audioRef = useRef<HTMLAudioElement>(null);

    // Extracting Values from Track 
    // const { name, preview_url, artists, album } = trac
    // const trackArt = album.images[0] 

    const handleMouseEnter = () => {
        setPreview(true);
        if(audioRef.current) {
            audioRef.current.volume = 0.1; // Adjust volume to 20%
            audioRef.current.currentTime = 0;
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
        <div className="relative w-32 h-32 m-0 hover:shadow-lg duration-100 cursor-pointer hover:bg-primary" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
            {/* <audio ref = {audioRef} autoPlay = {preview} loop = {preview}>
                <source src = {`${preview_url}`} type="audio/mpeg"/>
            </audio> */}
            <div className={`relative top-0 left-0 w-32 h-32 bg-white bg-opacity-25 z-10 opacity-0 transition-opacity duration-75 ${preview ? 'opacity-100' : ''}`}></div> 
            <Image 
                src={images[images.length - 1].url} 
                alt = {`${name} Track Art`} 
                layout="fill"
                objectFit="cover"
                loading="lazy"
                aria-label={`${name}`} 
                title = {`${name}`}
                />
        </div>
    )
}