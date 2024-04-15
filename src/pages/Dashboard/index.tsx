'use client'
import { useRef, useEffect } from "react"
import TopStatsContainer from "@/Containers/TopStatsContainer";
// Context components
import Navbar from "@/components/Navbar";
import { getUserData } from "@/utils/Spotify/Users";
import { getPreviewUrl } from "@/features/reducers/MusicReducer";
import { useAppDispatch, useAppSelector } from "@/features/hooks";
import { setUser, getView } from "@/features/reducers/UserReducer";
import { checkToken } from "@/features/reducers/AuthReducer";
import PlaylistContainer from "@/Containers/PlaylistContainer";

const Dashboard : React.FC = () =>  {    
    const dispatch = useAppDispatch()

    // App selectors for preview and User
    const token = useAppSelector(checkToken)
    const previewUrl = useAppSelector(getPreviewUrl)
    const view = useAppSelector(getView)

    // UseRef is used here to bypass typescript checking / explicitly referencing the km
    const audioRef = useRef<HTMLAudioElement>(null);

    // todo: Update Song functionality here
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
            if (token) {
                try {
                    const access_token = token?.access_token;
                    const userResponse = await getUserData(access_token);
                    dispatch(setUser(userResponse))
                } catch (error) {
                    console.error("Error fetching user Data: ", (error as Error).message)
                }
            }
        }   
        retrieveUserData();
    }, [ dispatch, token])

    return (
        <section className="w-full min-h-screen bg-primary relative">
            <Navbar />
            {/* Container that would hold the cover arts for songs / artists */}
            {   view === 'Top Stats' ?
                <div className="ml-0 md:ml-5">
                    <TopStatsContainer />
                </div> : 
                <PlaylistContainer />  
            }
            
            {/* Single audio player */}
            <audio ref = {audioRef}/>
        </section>
    )
}

export default Dashboard