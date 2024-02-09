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
                setArtistTopTracks(response)
            }
        }
    })

    // todo: Potentially convert this into individual file
    const ArtistMetadata = () => {
        if (selectedArtist ) {
            const { images, genres }= selectedArtist
            return (
            <div className="flex">
                <div className="p-3">
                    <Image src={images[images.length - 2].url} alt={`${name} snapshot`} width={120} height={120} /> 
                </div>
                <div className="p-3">
                    <strong className="font-bold">{name}</strong>
                    <p>{genres}</p>
                </div>
                
            </div>
            )
        }
    }

    // const ArtistTopTracks = () => {
    //     if (artistTopTracks) {
    //         artistTopTracks.map((track, key) => {
    //             return <TrackArt key={key} track={track} previewHandler="" selectedHandler=""/>
    //         })
    //     }
    // }
    
    // Call an component to retrieve the artist information
    const {name} = artist
    return <div className="bg-white w-full rounded-md">
        {/* Artist Metadata */}
        <ArtistMetadata />
        {/* <ArtistTopTracks /> */}
    </div>
}