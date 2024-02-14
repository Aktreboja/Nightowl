import { Track } from "@spotify/web-api-ts-sdk";
import Image from "next/image";
import { useContext, useState, useRef } from "react";
import { DashboardContext } from "@/Context/DashboardProvider/DashboardContext"

// Track component for rendering Spotify Tracks
const TrackArt = ({track} : {track: Track}) =>  {
    const {autoplay, preview, setPreview, setSelected} = useContext(DashboardContext)

    const [hover, setHover] = useState(false);

    // UseRef is used here to bypass typescript checking / explicitly referencing the km
    const audioRef = useRef<HTMLAudioElement>(null);

    // Extracting Values from Track 
    const { name, preview_url, artists, album } = track
    const trackArt = album.images[0] 

    const handleMouseEnter = () => {
        setHover(true)
        setPreview(track);
        if(audioRef.current) {
            audioRef.current.volume = 0.1; // Adjust volume to 20%
            audioRef.current.currentTime = 0;
            audioRef.current.play();
        }
    
    }

    const handleMouseLeave = () => {
        setHover(false)
        setPreview(undefined);
        if(audioRef.current) {
            audioRef.current.pause();
        }
    }

    const handleClick = () => {
        setSelected(track)
    }

    return (
        <div className="relative w-fit h-fit m-0 hover:shadow-lg duration-100 cursor-pointer hover:bg-primary" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick = {handleClick}>
            <audio ref = {audioRef} autoPlay = {autoplay} loop = {autoplay}>
                <source src = {`${preview_url}`} type="audio/mpeg"/>
            </audio>
            <div className={`absolute top-0 left-0 w-24 h-24 bg-white bg-opacity-25 z-20 opacity-0 transition-opacity duration-75 ${ hover ? 'opacity-100' : ''}`}></div> 
            <Image 
                src={trackArt.url} 
                alt = {`${name} Track Art`} 
                width = {96}
                height = {96}
                aria-label={`${name}`} 
                loading="lazy"
                title = {`${name}`}
                />
        </div>
    )
}

export default TrackArt