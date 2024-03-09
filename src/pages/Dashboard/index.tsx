'use client'
import { useRef, useEffect } from "react"
import TopStatsContainer from "@/Containers/TopStatsContainer";
import { SpotifyResponseError } from "../../../spotify_api";

// Context components
import { DashboardContext } from "@/Context/DashboardProvider/DashboardContext";
import { useContext } from "react";
import Navbar from "@/components/Navbar";
import { getUserData } from "@/utils/Spotify/Users";
import currentToken from "@/utils/TokenService";

const Dashboard : React.FC = () =>  {    
    const useDashboard = useContext(DashboardContext);
    const { previewUrl, setCurrentUser, currentView } = useDashboard

    // UseRef is used here to bypass typescript checking / explicitly referencing the km
    const audioRef = useRef<HTMLAudioElement>(null);

    // useEffect to change between audio files.
    useEffect(() => {
        if (previewUrl && audioRef.current ) {
            audioRef.current.src = previewUrl;
            audioRef.current.volume = 0.1
            audioRef.current.play();
        } else if (!previewUrl && audioRef.current) audioRef.current.pause();
    }, [previewUrl])

    
    useEffect(() => {
        const retrieveUserData = async () => {
            try {
                const access_token = currentToken.access_token as string;
                const userResponse = await getUserData(access_token);
                if ('error' in userResponse) {
                    const spotifyError: SpotifyResponseError = userResponse;
                    console.error("Spotify API Error: ", spotifyError.error.message);
                } else {
                    setCurrentUser(userResponse)
                }
            } catch (error) {
                console.error("Error fetching user Data: ", (error as Error).message)
            }
        }   
        retrieveUserData();
    }, [setCurrentUser])

    return (
        <section className="w-full min-h-screen bg-primary relative">
            <Navbar />
            {/* Container that would hold the cover arts for songs / artists */}
            {   currentView === 'Top Stats' &&  <TopStatsContainer />   }

            {/* Single audio player */}
            <audio ref = {audioRef}/>
        </section>
    )
}

export default Dashboard