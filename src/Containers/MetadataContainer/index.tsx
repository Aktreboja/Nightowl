import { useState, useEffect } from "react";
import { DashboardContext } from "@/Context/DashboardProvider/DashboardContext";
import { useContext } from "react";
import Image from "next/image";

import TrackModal from "@/components/Modal/TrackModal";
import { getAccessToken } from "@/utils/Spotify/Spotify";
import { GetSeveralArtists } from "@/utils/Spotify/Artists";
import { Track, Artist } from "@spotify/web-api-ts-sdk"
import { ModalContainerProps, ModalProps } from "../../../component_types";
import { GetRecommendations } from "@/utils/Spotify/Recommendations";

export default function MetadataContainer() {

    const {selected} = useContext(DashboardContext)


    useEffect(() => {
         
    })

    // Conditional for Track
    if (selected && 'preview_url' in selected) {
        const {name, artists, album} = selected
        const {images} = album

        return (
            <section className=" bg-white rounded-md px-3 py-2 ">
                <div className="flex">
                    <div className="relative w-28 h-28">
                        <Image src = {images[0].url} layout="fill" objectFit="cover" alt = {`${name} cover `}/>
                    </div>

                    <div className="px-2">
                        <h1 className="w-full font-bold">{name}</h1>
                        <p>{artists.map((artist) => {return (artist.name + ", ") })}</p>
                        <button className="border-black border px-3 py-0.5 mt-2">Add</button>
                    </div>
                </div>

                

            </section>
        )
    }
    else return (<div><h1>Not a track</h1></div>)


}