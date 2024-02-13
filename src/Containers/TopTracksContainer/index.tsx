import { useEffect, useState } from "react"
import TrackArt from "@/components/TrackArt"
import { getTopSongs } from "@/utils/Spotify/Tracks"
import { getAccessToken } from "@/utils/Spotify/Spotify"
import { Track } from "@spotify/web-api-ts-sdk"

interface TopTracksProps {
    short_term: Track[] | null;
    medium_term: Track[] | null;
    long_term: Track[] | null;
}

export default function TopTracksContainer({previewHandler, itemHandler} : any) {

    const [tracksData, setTracksData] = useState<TopTracksProps>({
        short_term: null,
        medium_term: null,
        long_term: null
    })

    const [timeRange, setTimeRange] = useState('medium_term')

    useEffect(() => {
        // Utility function to load top Tracks
        const loadTopTracks = async (time_range: string) => {
            const access_token = getAccessToken()
            if (access_token) {
                const response = await getTopSongs(access_token, time_range);
                if ('items' in response) {
                    setTracksData(prevState => ({
                        ...prevState,
                        [timeRange]: response.items as Track[]
                    }))
                }

            }
        }

        if (!tracksData[timeRange as keyof TopTracksProps]) {
            loadTopTracks(timeRange);
        }
    }, [timeRange, tracksData])

    return (

        <div className="bg-white w-full rounded md">
            <div>
                <p className="text-3xl m-3 font-bold text-black">Your Top Tracks</p>
                <div className="flex ">
                    <p onClick = {() => setTimeRange('short_term')} className={`${timeRange == 'short_term' ? 'underline' : ''} mx-3 my-2 cursor-pointer hover:underline font-semibold text-black`}>Last Month</p>
                    <p onClick = {() => setTimeRange('medium_term')} className={`${timeRange == 'medium_term' ? 'underline' : ''} mx-3 my-2 cursor-pointer hover:underline font-semibold text-black`}>Last 6 Months</p>
                    <p onClick = {() => setTimeRange('long_term')} className={`${timeRange == 'long_term'  ? 'underline' : ''} mx-3 my-2 cursor-pointer hover:underline font-semibold text-black`}>All Time</p>
                </div>
            </div>

            <div className="grid px-3 py-4 grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 w-fit shadow-lg overflow-y-auto max-h-[600px]">
         
            {
                (timeRange === 'short_term' && tracksData.short_term) &&
                tracksData.short_term.map((track, key) => (
                    <TrackArt key={key} track={track} previewHandler={() => previewHandler(track)} selectedHandler={() => itemHandler(track)}/>
                ))
            }
            {
                (timeRange === 'medium_term' && tracksData.medium_term) &&
                tracksData.medium_term.map((track, key) => (
                    <TrackArt key={key} track={track} previewHandler={() => previewHandler(track)} selectedHandler={() => itemHandler(track)}/>
                ))
            }
            {
                (timeRange === 'long_term' && tracksData.long_term) &&
                tracksData.long_term.map((track, key) => (
                    <TrackArt key={key} track={track} previewHandler={() => previewHandler(track)} selectedHandler={() => itemHandler(track)}/>
                ))
            }
            </div>      
        </div>

    )
}