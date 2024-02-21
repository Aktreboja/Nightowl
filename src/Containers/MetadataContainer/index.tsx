
'use client'
import { useState, useEffect } from "react";
import { DashboardContext } from "@/Context/DashboardProvider/DashboardContext";
import { useContext } from "react";
import Image from "next/image";

import { getAccessToken } from "@/utils/Spotify/Spotify";
import { GetSeveralArtists } from "@/utils/Spotify/Artists";
import { Track, Artist } from "@spotify/web-api-ts-sdk"
import { RecommendationQuery } from "../../../spotify_api";
import { GetRecommendations } from "@/utils/Spotify/Recommendations";
import TrackArt from "@/components/TrackArt";
import { checkSavedTracks } from "@/utils/Spotify/Tracks";


export default function MetadataContainer() {
    const { selected, setSelected } = useContext(DashboardContext)
    const [songArtists, setSongArtists] = useState<Artist[]>([])
    const [recommendedTracks, setRecommendedTracks] = useState<Track[]>([])
    const [loading, setLoading] = useState(true);
    const [likedTrack, setLikedTrack] = useState(false)

    // UseEffect for loading artists
    useEffect(() => {
        setLoading(true)
        const loadSongArtists = async (ids: string[]) => {
            const accessToken = await getAccessToken()
            if (accessToken && selected) {
                // Get the artist information for the track
                const artistsResponse = await GetSeveralArtists(accessToken, ids)
                setSongArtists(artistsResponse)

                

                // Get the similar tracks from this track.
                const recommendationQuery: RecommendationQuery = {
                    seedTracks: new Array(selected.id),
                    seedArtists: ids
                }


                // Check to see if all of the tracks have been liked
                const likedResponse = await checkSavedTracks(accessToken, [selected.id])
                setLikedTrack(likedResponse)

                const recResponse = await GetRecommendations(accessToken, recommendationQuery)
                setRecommendedTracks(recResponse.tracks)
                setLoading(false)


            }
        }   

        // First check what the selected item is
        if (selected && 'preview_url' in selected) {
            const { artists } = selected as Track
            const artistIds : string[] = []
            for (let i = 0; i < artists.length; i++) {
                artistIds.push(artists[i].id)
            }
            
            loadSongArtists(artistIds)
        }

    }, [selected, setLoading])

    // Getting Recommended songs
    // useEffect(() => {
    //     if (selected) {
    //         const recommendationQuery: RecommendationQuery = {
    //             seedTracks: Array.from(selected.id),
    //             seedArtists: Array.from(selecte)
    //         }
    //     }
    // }, [selected])


    // Conditional for Track
    if (selected && 'preview_url' in selected) {
        const {name, artists, album} = selected as Track
        const {images} = album

        // Remove the last comma from the string
        const artistsString = artists.map((artist) => artist.name).join(", ");
        return (
            <section className=" bg-white rounded-md  py-7 w-full relative">
                <span className="absolute right-3 top-2 cursor-pointer" onClick = {() => setSelected(undefined)}>X</span>
                <div className="flex xl:w-[90%] xl:mx-auto">
                    <div className="relative w-28 h-28 ml-3">
                        <Image src = {images[0].url} layout="fill" objectFit="cover" alt = {`${name} cover `}/>
                    </div>

                    <div className="px-6 mt-0.5">
                        <h1 className="w-full font-bold">{name}</h1>
                        <p>{artistsString}</p>
                        <button className="border-black border rounded-sm px-3 py-0.5 mt-2">{likedTrack ? "Saved": "Add"}</button>
                    </div>
                </div>
                <hr className="my-4 text-primary w-4/5 mx-auto"/>

                {/* Artists */}
                <div className="px-3 xl:w-[90%] xl:mx-auto">
                    <h1 className="font-semibold ml-1">Artists</h1>
                    <div className="flex">
                        {/* Artist Images */}
                        <div className="w-full flex">
                            {
                                  songArtists.length > 0 ? songArtists.map((artist, key) => {
                                
                                    return (<div key={key} className="relative w-20 h-20 rounded-full mx-1 cursor-pointer">
                                    <Image 
                                        src={artist.images[0].url}
                                        fill = {true}
                                        alt="artist"
                                        objectFit="cover"
                                        className="w-full h-full object-cover rounded-full"/>
                                </div>)}) : null
                            }
                        </div>
                    </div>
                </div>
                {/* Similar Music */}
                <hr className="my-4 text-primary  mx-auto w-4/5" />
                <div className="flex flex-col px-3 items-center">
                    <h1 className="font-semibold w-full lg:w-[90%] ">Similar Tracks</h1>

                    {/* Tracks container */}
                    <div className="grid px-1 py-4 grid-cols-5  md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-8 2xl:grid-cols-10 w-fit sound overflow-y-auto max-h-[600px]">
                        {
                            recommendedTracks.length > 0 && recommendedTracks.map((track, key) => <TrackArt key={key} track = {track} dimension={20}/>)
                        }
                        {/* {
                            recommendedTracks.length > 0 && recommendedTracks.map((track, key) => <div key = {key} className="relative w-20 h-20 cursor-pointer">
                                <Image 
                                    src = {track.album.images[0].url} 
                                    alt = "ye"
                                    fill = {true}
                                    objectFit="cover"
                                    />
                            </div>)
                        } */}
                    </div>
                </div>
            </section>
        )
    }
    else {
        const {name, images} = selected as Artist

            return (<section className=" bg-white rounded-md px-3 py-2 ">
            <div className="flex">
                <div className="relative w-28 h-28">
                    <Image src = {images[0].url} layout="fill" objectFit="cover" alt = {`${name} cover `}/>
                </div>

                <div className="px-2 mt-0.5">
                    <h1 className="w-full font-bold">{name}</h1>
                    <button className="border-black border rounded-sm px-3 py-0.5 mt-2">Add</button>
                </div>
            </div>
            <hr className="my-4"/>

            {/* Artists */}
            <div>
                <h1 className="font-semibold">Artists</h1>
                <div className="flex">
                    {/* Artist Images */}
                    <div>
                        {
                            !loading && songArtists.length > 0 && songArtists.map((artist, key) => {return <div key={key}>{artist.name}</div> })
                        }
                    </div>
                </div>
            </div>

            

        </section>)
    }

}