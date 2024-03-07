'use client'
import { useState, useRef, useEffect } from "react"

import PreviewContainer from "@/Containers/PreviewContainer";
import MetadataContainer from "@/Containers/MetadataContainer";
import TopTracksContainer from "@/Containers/TopTracksContainer";
import TopArtistsContainer from "@/Containers/TopArtistsContainer";
import WelcomeModal from "@/components/Modal/WelcomeModal";

// Context components
import { DashboardContext } from "@/Context/DashboardProvider/DashboardContext";
import { useContext } from "react";
import Navbar from "@/components/Navbar";

const Dashboard : React.FC = () =>  {    
    const useDashboard = useContext(DashboardContext);
    const { clickedWelcome, preview, selected, autoplay,  previewUrl } = useDashboard

    // View related state
    const [currentTab, setCurrentTab] = useState('Tracks');
    const changeView = (view: string) => setCurrentTab(view);

    // // UseRef is used here to bypass typescript checking / explicitly referencing the km
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (previewUrl && audioRef.current ) {
            audioRef.current.src = previewUrl;
            audioRef.current.volume = 0.1
            audioRef.current.play();
        } else if (!previewUrl && audioRef.current) audioRef.current.pause();
    }, [previewUrl])

    return (
        <section className="w-full min-h-screen bg-primary relative">
            <Navbar />


            {/* Container that would hold the cover arts for songs / artists */}
            <div className="min-h-screen relative flex items-center ">
                <div className="w-full md:w-3/5 min-h-screen flex justify-center lg:justify-end items-center ">
                    {/* Wrapper container for all left sided components */}
                    <div className=" flex flex-col justify-center items-end h-fit w-fit ">
                        {/* Naviation bar */}
                        <div className="w-full bg-primary flex ">
                            <div onClick = {() => changeView('Tracks')} className = {`w-fit my-2 mx-1 px-3 py-2 text-black font-semibold cursor-pointer rounded-md ${currentTab == 'Tracks' ? 'bg-button-secondary text-black' : 'bg-button-primary text-white'}  hover:bg-button-secondary hover:text-black  duration-100`}>Top Tracks</div>
                            <div onClick = {() => changeView('Artists')} className = {`w-fit my-2 mx-1 px-3 py-2 font-semibold cursor-pointer rounded-md ${currentTab == 'Artists' ? 'bg-button-secondary text-black' : 'bg-button-primary text-white'}   hover:bg-button-secondary hover:text-black  duration-100`}>Top Artists</div>
                        </div>


                        {/* first big box (top tracks / artists + modifiers). Switch Statement here*/}
                        {   currentTab === 'Tracks' ? <TopTracksContainer /> : currentTab === 'Artists' ? <TopArtistsContainer />: null }
                        {/* Selected Item Overview */}
                        {   selected && <div className="my-6 w-full"><MetadataContainer /></div> }
                    </div>
                </div>
                
                {/* Preview component that functions on hover of track / Artist elements */}
                {   preview && (<PreviewContainer item={preview} />)    }
            </div>
            {/* Single audio player */}
            <audio ref = {audioRef}/>



        </section>
    )
}

export default Dashboard