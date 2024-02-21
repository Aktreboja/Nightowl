
import { Artist } from "@spotify/web-api-ts-sdk";
import Image from "next/image";
import { useState, useRef, useContext } from "react";
import { DashboardContext } from "@/Context/DashboardProvider/DashboardContext";


// Track component for rendering Spotify Tracks
export default  function ArtistArt({artist} : {artist: Artist}) {
    const {preview, setPreview} = useContext(DashboardContext)
    
    const [hover, setHover] = useState(false);
    
    const {name, images} = artist


    // UseRef is used here to bypass typescript checking / explicitly referencing the km
    const audioRef = useRef<HTMLAudioElement>(null);

    // Extracting Values from Track 
    // const { name, preview_url, artists, album } = trac
    // const trackArt = album.images[0] 

    const handleMouseEnter = () => {
        setHover(true)
        setPreview(artist);
        if(audioRef.current) {
            audioRef.current.volume = 0.1; // Adjust volume to 20%
            audioRef.current.currentTime = 0;
            audioRef.current.play();
        }
    
    }

    const handleMouseLeave = () => {
        setHover(false);
        setPreview(undefined)
        if(audioRef.current) {
            audioRef.current.pause();
        }
    }

    return (
        <div className="relative  rounded-full w-24 h-24 m-0 hover:shadow-lg duration-100 cursor-pointer  " onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
            {/* <audio ref = {audioRef} autoPlay = {preview} loop = {preview}>
                <source src = {`${preview_url}`} type="audio/mpeg"/>
            </audio> */}
            <div className={`absolute top-0 left-0 w-24 h-24 bg-white bg-opacity-25 z-10 opacity-0 transition-opacity duration-75  ${ hover ? 'opacity-100' : ''}`}></div> 
            <Image 
                src={images[images.length - 1].url} 
                alt = {`${name} Track Art`} 
                className="object-cover"
                fill = {true}
                loading="lazy"
                aria-label={`${name}`} 
                title = {`${name}`}
                />
        </div>
    )
}