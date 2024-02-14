import { useEffect, useState } from "react"
import ArtistArt from "@/components/ArtistArt"
import { GetTopArtists } from "@/utils/Spotify/Artists"
import { getAccessToken } from "@/utils/Spotify/Spotify"
import { Artist } from "@spotify/web-api-ts-sdk"


interface TopTracksProps {
    short_term: Artist[] | null;
    medium_term: Artist[] | null;
    long_term: Artist[] | null;
}

const TopArtistsContainer = () => {

    const [artistsData, setArtistsData] = useState<TopTracksProps>({
        short_term: null,
        medium_term: null,
        long_term: null
    })

    const [timeRange, setTimeRange] = useState('medium_term')
    const [loading, setLoading] = useState(false)



    useEffect(() => {
        // Utility function to load top Tracks
        const loadTopArtists = async (time_range: string) => {
            setLoading(true);
            const access_token = await getAccessToken()
            if (access_token) {
                const response = await GetTopArtists(access_token, time_range);
                if ('items' in response) {
                    console.log("Artists: ", response.items)
                    setArtistsData(prevState => ({
                        ...prevState,
                        [timeRange]: response.items as Artist[]
                    }))
                }

            }
            setLoading(false)
        }

        if (!artistsData[timeRange as keyof TopTracksProps]) {
            loadTopArtists(timeRange);
        }
    }, [timeRange, artistsData])


    const LoadingState = () => {
        const placeholders = Array.from({length: 50},(_,index) => { return <div className={`relative w-24 h-24  ${index % 2 === 0 ? 'bg-secondary' : 'bg-primary'}`} key = {index}></div> })
        return placeholders
    }

    return (

        <div className="bg-white w-full rounded md shadow-2xl">
            <div>
                <p className="text-3xl m-3 font-bold">Your Top Artists</p>
                <div className="flex ">
                    <p onClick = {() => setTimeRange('short_term')} className={`${timeRange == 'short_term' ? 'underline' : ''} mx-3 my-2 cursor-pointer hover:underline font-semibold`}>Last Month</p>
                    <p onClick = {() => setTimeRange('medium_term')} className={`${timeRange == 'medium_term' ? 'underline' : ''} mx-3 my-2 cursor-pointer hover:underline font-semibold`}>Last 6 Months</p>
                    <p onClick = {() => setTimeRange('long_term')} className={`${timeRange == 'long_term'  ? 'underline' : ''} mx-3 my-2 cursor-pointer hover:underline font-semibold`}>All Time</p>
                </div>
            </div>

            <div className="grid px-3 py-4 grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 w-fit shadow-lg overflow-y-auto max-h-[600px]">

            {loading && <LoadingState /> } 

            {
                (timeRange === 'medium_term' && artistsData.medium_term) &&
                artistsData.medium_term.map((Artist, key) => (
                    <ArtistArt key={key} artist={Artist}  />
                ))
            }
            {
                (timeRange === 'short_term' && artistsData.short_term) &&
                artistsData.short_term.map((Artist, key) => (
                    <ArtistArt key={key} artist={Artist}  />
                ))
            }
            {
                (timeRange === 'long_term' && artistsData.long_term) &&
                artistsData.long_term.map((Artist, key) => (
                    <ArtistArt key={key} artist={Artist} />
                ))
            }
            </div>      
        </div>

    )
}
export default TopArtistsContainer