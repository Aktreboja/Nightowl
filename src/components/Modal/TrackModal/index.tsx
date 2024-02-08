import { useState, useEffect } from "react"
import { Track, Artist } from "@spotify/web-api-ts-sdk"
import Image from "next/image";
import { getAccessToken } from "@/utils/Spotify/Spotify";
import { GetSeveralArtists } from "@/utils/Spotify/Artists";

// todo: Convert this code into a container object.
export default function TrackModal({track, closeHandler}: {track: Track, closeHandler: any}) {
    const [selectedTrack, setSelectedTrack] = useState<Track>(track);
    const [trackArtists, setTrackArtists] = useState<Artist[]>([]);
    const [modalOpen, setModalOpen] = useState(true);



    const handleCloseModal = () => {
        closeHandler();
        setModalOpen(false);
    }

    const {artists, album, name } = selectedTrack;
    const { images } = album 


    useEffect(() => {
        const loadModalData = async () => {
            let queryString = ''
            for (const artist of artists) {
                queryString += artist.id + ','
            }
            queryString = queryString.slice(0,-1);
            const access_token = getAccessToken();
            if (access_token) {
                const artistsResponse = await GetSeveralArtists(access_token, queryString);
                setTrackArtists(artistsResponse.artists)
                console.log(artistsResponse)
            }
            
        }

        loadModalData();
    }, [artists])


    return (
        <>
            {modalOpen && (
                <div className="fixed inset-0 z-50 overflow-auto bg-black bg-primary bg-opacity-75 flex justify-center items-center">
                    <div className="w-1/2 min-h-1/2 border bg-white p-2 rounded-md py-4 relative">
                        {/* Close button */}
                        <button className="absolute top-0 right-0 m-2" onClick={handleCloseModal}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500 hover:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        {/* Song data */}
                        <div className="flex ">
                            <Image src = {images[0].url} alt = {`${name} Album art`} width = {150} height = {150}/>
                            <div className="px-2">
                                <strong>{name}</strong>
                                <p>Artist 1, Artist 2</p>
                                {/* Commented out for a later phase */}
                                {/* <button className="border px-3 py-1 rounded-lg hover:bg-primary">Add</button> */}
                            </div>
                        </div>
                        
                        <hr className="mt-3 pb-3 "/>

                        {/* Artist info */}
                        <div>
                            <strong>Artists</strong>
                            <div className="flex w-fit py-4">

                                {
                                    trackArtists.length > 0 ? (
                                        trackArtists.map((artist, key) => {
                                            return <div key = {key} className="rounded-full overflow-hidden relative w-24 h-24 mx-1 cursor-pointer shadow-md hover:shadow-xl duration-75" >
                                                <Image src = {artist.images[0].url} alt = {artist.name} title = {artist.name} layout = "fill" objectFit="cover" className="rounded-full" />
                                            </div>
                                        })
                                    ) : <p>No Artists Available</p>
                                }

                            </div>
                        </div>
                        
                        <hr className="mt-3 pb-3"/>

                        {/* Similar Music */}
                        <div>
                            <strong>Similar Songs</strong>
                            <div className="flex">
                                <div className="w-12 h-12 border rounded-full mx-1 cursor-pointer"></div>
                                <div className="w-12 h-12 border rounded-full mx-1 cursor-pointer"></div>
                                <div className="w-12 h-12 border rounded-full mx-1 cursor-pointer"></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
