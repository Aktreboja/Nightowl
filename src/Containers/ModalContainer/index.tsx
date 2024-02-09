import { useState, useEffect } from "react";
import TrackModal from "@/components/Modal/TrackModal";
import { getAccessToken } from "@/utils/Spotify/Spotify";
import { GetSeveralArtists } from "@/utils/Spotify/Artists";
import { Track, Artist } from "@spotify/web-api-ts-sdk"
import { ModalContainerProps, ModalProps } from "../../../component_types";
import { GetRecommendations } from "@/utils/Spotify/Recommendations";

export default function ModalContainer({selectedEntry, modalCloseHandler} : ModalContainerProps) {
    const [selected, setSelected] = useState<Track | Artist>(selectedEntry);

    // todo: Adjust this type for different types of modals.
    const [modalData, setModalData] = useState<ModalProps>();

    useEffect(() => {
        const loadModalData = async () => {
            console.log("Selected: ", selected)
            // If the selected item is a Spotify Track
            if ('preview_url' in selected) {
                const track = selected as Track;
                const {artists, album, name} = track;
                const { images } = album

                // This variable can also be used for seedArtists
                let queryString = ""

                for (const artist of artists) {
                    queryString += artist.id + ',';
                    
                }
                queryString = queryString.slice(0,-1);
                const access_token = getAccessToken();
                if (access_token) {
                    // Get the artists associated with the track
                    const artistsResponse = await GetSeveralArtists(access_token, queryString);

                    // // Get seed artists and seed Tracks for recommended tracks.
                    // const recommendationsResponse = await GetRecommendations(access_token, `seed_tracks=${track.id}` )
                   
                    const data : ModalProps = {
                        track: track,
                        closeHandler: modalCloseHandler,
                        preview_url: track.preview_url as string,
                        recommendations: [], 
                        artists: artistsResponse.artists,
                        image: album.images[1].url
                    }
                    setModalData(data);
                }
            }

        }

        loadModalData();
    }, [selected, modalCloseHandler])

    return (
        <div className="fixed w-full h-screen inset-0 z-50 overflow-auto  bg-primary bg-opacity-5 flex justify-center items-center">
            {
                ('preview_url' in selected) && modalData ? (
                    <TrackModal modalData={modalData}/>
                ) : null
            }
        </div>
    )
}