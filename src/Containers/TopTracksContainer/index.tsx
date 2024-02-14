import { useContext, useEffect, useState } from "react"
import TrackArt from "@/components/TrackArt"
import { getTopSongs } from "@/utils/Spotify/Tracks"
import { getAccessToken } from "@/utils/Spotify/Spotify"
import { Track } from "@spotify/web-api-ts-sdk"
import { DashboardContext } from "@/Context/DashboardProvider/DashboardContext"


export const TopTracksContainer = () => {

    const {topTracks, setTopTracks, loading, setLoading} = useContext(DashboardContext)
    const [timeRange, setTimeRange] = useState('medium_term')

    useEffect(() => {
        // Utility function to load top Tracks
        const loadTopTracks = async (time_range: string) => {
            setLoading(true)
            const access_token = await getAccessToken()
            if (access_token) {
                const response = await getTopSongs(access_token, time_range);
                if ('items' in response) {
                    setTopTracks(response.items as Track[])
                } else {
                    // Access token is available but 401 is called because 
                    const { message, status } = response.error
                    if (status === 401) {
                        // todo Add refresh functionality here
                    }
                }
            }
            setLoading(false)
        }
        loadTopTracks(timeRange);

    }, [timeRange, setLoading, setTopTracks])

    // Loading State for track and Artist container section
    const LoadingState = () => {
        const placeholders = Array.from({length: 50},(_,index) => { return <div className={`relative w-24 h-24  ${index % 2 === 0 ? 'bg-secondary' : 'bg-primary'}`} key = {index}></div> })
        return placeholders
    }

    return (
        <div className="bg-white w-fit rounded md">
            <div>
                <p className="text-3xl m-3 font-bold text-black text-center xl:text-left">Your Top Tracks</p>
                <div className="flex justify-center xl:justify-start">
                    <p onClick = {() => setTimeRange('short_term')} className={`${timeRange == 'short_term' ? 'underline' : ''} mx-3 my-2 cursor-pointer hover:underline font-semibold text-black`}>Last Month</p>
                    <p onClick = {() => setTimeRange('medium_term')} className={`${timeRange == 'medium_term' ? 'underline' : ''} mx-3 my-2 cursor-pointer hover:underline font-semibold text-black`}>Last 6 Months</p>
                    <p onClick = {() => setTimeRange('long_term')} className={`${timeRange == 'long_term'  ? 'underline' : ''} mx-3 my-2 cursor-pointer hover:underline font-semibold text-black`}>All Time</p>
                </div>
            </div>
            <div className="flex">
                <div className="grid px-3 py-4 grid-cols-4 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 w-fit  shadow-lg overflow-y-auto max-h-[600px]">

                    {loading && <LoadingState /> } 
                    
                    {/* todo: Might switch back to previous implementation, felt faster. Optimize images for next here as well */}
                    {!loading && topTracks.map((track, key) => (
                        <TrackArt key={key} track={track} />
                    ))}

                </div>    
            </div>
        </div>
    )
}

export default TopTracksContainer