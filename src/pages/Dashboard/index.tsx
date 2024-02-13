'use client'

import { useState, useEffect } from "react"
import { Artist, Track } from "@spotify/web-api-ts-sdk";
import PreviewContainer from "@/Containers/PreviewContainer";

import TopTracksContainer from "@/Containers/TopTracksContainer";
import TopArtistsContainer from "@/Containers/TopArtistsContainer";
import WelcomeModal from "@/components/Modal/WelcomeModal";

export default function Dashboard({authenticated}: {authenticated: boolean}) {
    
    // View related state
    const [currentTab, setCurrentTab] = useState('Tracks');

    const [ preview, setPreview ] = useState<Track | null >();
    const [ selected, setSelected ] = useState<Track | Artist>();

    const changeView = (view: string) => setCurrentTab(view);

    useEffect(() => {
        console.log("SELECTED: ", selected)

    }, [selected])

    return (
        <section className="w-full min-h-screen bg-primary">

            {!authenticated ? <WelcomeModal />: null}


            {/* Container that would hold the cover arts for songs / artists */}
            <div className="min-h-screen  relative ">
                <div className="w-full border min-h-screen flex justify-center items-center">
                    {/* Wrapper container for all left sided components */}
                    <div className="w-fit flex flex-col justify-center  h-fit ">
                        {/* Naviation bar */}
                        <div className="w-full bg-primary flex">
                            <div onClick = {() => changeView('Tracks')} className = {`w-fit my-2 mx-1 px-3 py-2 text-black font-semibold cursor-pointer rounded-md ${currentTab == 'Tracks' ? 'bg-button-secondary text-black' : 'bg-button-primary text-white'}  hover:bg-button-secondary hover:text-black  duration-100`}>Top Tracks</div>
                            <div onClick = {() => changeView('Artists')} className = {`w-fit my-2 mx-1 px-3 py-2 font-semibold cursor-pointer rounded-md ${currentTab == 'Artists' ? 'bg-button-secondary text-black' : 'bg-button-primary'}  text-white hover:bg-button-secondary hover:text-black  duration-100`}>Top Artists</div>
                        </div>

                        {/* first big box (top tracks / artists + modifiers). Switch Statement here*/}
                        {
                            currentTab === 'Tracks' ? <TopTracksContainer previewHandler = {setPreview} itemHandler = {setSelected}/> : currentTab === 'Artists' ? <TopArtistsContainer />: null
                        }

                        {/* Preview section */}
                        {
                            preview ? <div className="my-6"><PreviewContainer item = {preview} /></div> : null
                        }



                   
                    </div>
                </div>
            </div>
        </section>
    )
}