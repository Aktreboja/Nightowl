import { getAccessToken } from "@/utils/Spotify/Spotify"
import { useEffect, useState } from "react"
import { Artist, Track } from "@spotify/web-api-ts-sdk";
import TrackArt from "@/components/TrackArt";
import { getTopSongs } from "@/utils/Spotify/Tracks";

import TrackModal from "@/components/Modal/TrackModal";

export default function Dashboard() {
    
    const [currentTab, setCurrentTab] = useState('Top Songs');
    const [topTracks, setTopTracks] = useState<Track[]>([])
    const [selectedTrack, setSelectedTrack] = useState<Track>()

    // Convert this into an object
    const navbarTitles = ['Top Songs', 'Top Artists', 'Playlists'];

    useEffect(() => {
        // todo : Add a switch variable
        // Asynchronous function to be able to load 
        const loadData = async () => {

            // Get the access token and call the necessary functions
            const access_token = getAccessToken()
            if (access_token) {
                // Get the user Data
                // const response = await getUserData(access_token)
               
                const response = await getTopSongs(access_token, "tracks");
                console.log(response)
                if ('items' in response) setTopTracks(response.items as Track[]);
            }
        } 
        loadData();
    },[])

 

    return (
        <section className="w-full min-h-screen">
            {/* <div className="min-h-screen border w-1/5 flex justify-center items-center">
                <div className="border w-full h-fit ">
                    {navbarTitles.map((title, index) => {
                    let navbarItemStyle = `${currentTab == title ? 'font-bold' : ''}`

                    return  <p key={index} className={`${navbarItemStyle} text-center cursor-pointer py-3` } onClick = {() => setCurrentTab(title)}>{title}</p>
                    })}
                </div>

            </div> */}

            {/* Container that would hold the cover arts for songs / artists */}
            <section className="min-h-screen border ">
                {
                    selectedTrack && (<TrackModal track = {selectedTrack} closeHandler = {() => setSelectedTrack(undefined)}/>)
                }
                <div className="w-full border min-h-screen min flex justify-center items-center">
                    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-10 w-fit">
                        {
                            topTracks.map((track, index) => {
                                return <TrackArt key = {index} track = {track} trackHandler = {() => setSelectedTrack(track) }/>
                            })
                        }
                    </div>

                </div>

            </section>
        </section>
    )
}