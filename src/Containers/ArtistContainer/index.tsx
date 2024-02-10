import TrackArt from "@/components/TrackArt"
import { GetArtist, GetArtistsTopTracks } from "@/utils/Spotify/Artists"
import { getAccessToken } from "@/utils/Spotify/Spotify"
import { Artist, SimplifiedArtist, Track } from "@spotify/web-api-ts-sdk"
import Image from "next/image"
import { useEffect, useState } from "react"


export default function ArtistContainer({artist}: {artist: SimplifiedArtist}) {
    const {id} = artist

    const [selectedArtist, setSelectedArtist] = useState<Artist>();
    const [artistTopTracks, setArtistTopTracks] = useState<Track[]>();

    // useEffect to load artist information
    useEffect(() => {
        const loadArtistData = async () => {
            const access_token = getAccessToken()
            if (access_token) {
                const response = await GetArtist(access_token, id);
                setSelectedArtist(response)
            }
            
        }

        loadArtistData()
    }, [id])

    // useEffect to get the artists top tracks
    useEffect(() => {
        const loadArtistTopTracks = async () => {
            const access_token = getAccessToken()
            if (access_token) {
                const response = await GetArtistsTopTracks(access_token, id)
                setArtistTopTracks(response.tracks)
                
            }
        }
        loadArtistTopTracks();
    }, [id])

    // todo: Potentially convert this into individual file
    const ArtistMetadata = () => {
        if (selectedArtist ) {
            const { images, genres } = selectedArtist
            return (
            <div className="flex">
                <div className="p-3">
                    <Image src={images[0].url} alt={`${name} snapshot`} width={120} height={120} /> 
                </div>
                <div className="p-3">
                    <strong className="font-bold">{name}</strong>
                    <p>{genres[0]}</p>
                </div>
                
            </div>
            )
        }
    }

    const ArtistTopTracks = ({tracks}: {tracks: Track[]}) => {
        console.log('ARTIST TOP TRACKS: ', tracks)
        const topTracks = tracks.map((track, key) => {
            return <TrackArt track={track} key={key} previewHandler="" selectedHandler=""/>
        })

        return (<div className="border">
            {topTracks}
        </div>)
    }
    
    // Call an component to retrieve the artist information
    const {name} = artist
    return <div className="bg-white w-full rounded-md">
        {/* Artist Metadata */}
        <ArtistMetadata />
        <hr className="my-3"/>
        <strong></strong>
        {artistTopTracks && artistTopTracks.length > 0  ?<ArtistTopTracks tracks = {artistTopTracks}/> : <div>cdcdaslkn</div>}
    </div>
}