import { getAccessToken } from "@/utils/Spotify/Spotify"
import { useEffect, useState } from "react"
import { Artist, Track } from "@spotify/web-api-ts-sdk";
import TrackArt from "@/components/TrackArt";
import { getTopSongs } from "@/utils/Spotify/Tracks";

export default function Dashboard() {
    
    const [currentTab, setCurrentTab] = useState('Top Songs');
    const [topTracks, setTopTracks] = useState<Track[]>([])
    const [topArtists, setTopArtists] = useState<Artist[]>([]);
    const [user, setUser] = useState();
    const [selectedTrack, setSelectedTrack] = useState<Track>()
    const [playlistQuery, setPlaylistQuery] = useState();

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
               
                const response = await getTopSongs(access_token, "tracks")
                // console.log(response)
                if ('items' in response) setTopTracks(response.items as Track[]);
            }
        } 
        // loadData();
    })

    return (
        <section className="w-full min-h-screen bg-primary flex">
            <div className="min-h-screen border w-1/5 flex justify-center items-center">
                <div className="border w-full h-fit ">
                    {navbarTitles.map((title, index) => {
                    let navbarItemStyle = `${currentTab == title ? 'font-bold' : ''}`

                    return  <p key={index} className={`${navbarItemStyle} text-center cursor-pointer py-3` } onClick = {() => setCurrentTab(title)}>{title}</p>
                    })}
                </div>

            </div>

            {/* Container that would hold the cover arts for songs / artists */}
            <section className="min-h-screen border w-4/5">
                <div className="w-full border min-h-screen min flex justify-center items-center">
                    <div className="flex flex-wrap  border w-3/5">
                        {
                            topTracks.map((track, index) => {
                                return <TrackArt key = {index} track = {track} />
                            })
                        }
                    </div>

                </div>

            </section>
        </section>
    )
}