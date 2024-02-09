import { getAccessToken } from "@/utils/Spotify/Spotify"
import { useEffect, useState } from "react"
import { Artist, Track } from "@spotify/web-api-ts-sdk";
import TrackArt from "@/components/TrackArt";
import { getTopSongs } from "@/utils/Spotify/Tracks";

import ModalContainer from "@/Containers/ModalContainer";
export default function Dashboard() {
    
    const [currentTab, setCurrentTab] = useState('Top Songs');
    const [topTracks, setTopTracks] = useState<Track[]>([])
    // const [selectedTrack, setSelectedTrack] = useState<Track>()
    const [ selected, setSelected ] = useState<Track | Artist>();
    const [modal, setModal] = useState(false);

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


    const handleCloseModal = () => {
        setSelected(undefined);
        setModal(false)
    }
 

    return (
        <section className="w-full min-h-screen bg-primary">
          
            {
                selected ? <ModalContainer selectedEntry={selected} modalCloseHandler={handleCloseModal}/>: null
            }

            {/* Container that would hold the cover arts for songs / artists */}
            <div className="min-h-screen  relative z-60">
                <div className="w-3/4  min-h-screen flex justify-center">

                    {/* Wrapper container for all left sided components */}
                    <div className="w-fit  flex flex-col justify-center items-center ">
                        
                        {/* Naviation bar */}
                        <div className="w-full  bg-primary flex">
                            <div className = "w-fit my-2 mx-1 px-3 py-2 font-semibold cursor-pointer rounded-md bg-button-primary text-white hover:bg-button-secondary hover:text-black  duration-100">Top Tracks</div>
                            <div className = "w-fit my-2 mx-1 px-3 py-2 font-semibold cursor-pointer rounded-md bg-button-primary text-white hover:bg-button-secondary hover:text-black  duration-100">Top Artists</div>
                        </div>

                        {/* first big box (top tracks / artists + modifiers) */}
                        <div className="bg-white w-full rounded-md">
                            <div>
                                <p className="text-3xl m-3 font-bold">Your Top Tracks</p>
                                <div className="flex ">
                                    <p className="mx-3 my-2 cursor-pointer hover:underline font-semibold">Last Month</p>
                                    <p className="mx-3 my-2 cursor-pointer hover:underline font-semibold">Last 6 Months</p>
                                    <p className="mx-3 my-2 cursor-pointer hover:underline font-semibold">All Time</p>
                                </div>
                            </div>

                                {/* 
                                    Showcased items, this will vary based on 
                                */}
                            <div className="grid grid-cols-3 p-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-10 w-fit  shadow-lg">
                                {
                                    topTracks.map((track, index) => {
                                        return <TrackArt key = {index} track = {track} trackHandler = {() => setSelected(track) }/>
                                    })
                                }
                            </div>

                        </div>


                        <div className=" w-full">

                        </div>


                    </div>


                </div>

            </div>
        </section>
    )
}