'use client'
import { useState } from "react"

import PreviewContainer from "@/Containers/PreviewContainer";
import MetadataContainer from "@/Containers/MetadataContainer";
import TopTracksContainer from "@/Containers/TopTracksContainer";
import TopArtistsContainer from "@/Containers/TopArtistsContainer";
import WelcomeModal from "@/components/Modal/WelcomeModal";

// Context components
import { DashboardContext } from "@/Context/DashboardProvider/DashboardContext";
import { useContext } from "react";

const Dashboard : React.FC = () =>  {    
    const useDashboard = useContext(DashboardContext);
    const {clickedWelcome,preview, selected} = useDashboard

    // View related state
    const [currentTab, setCurrentTab] = useState('Tracks');
    const changeView = (view: string) => setCurrentTab(view);

    return (
        <section className="w-full min-h-screen bg-primary">

            {/* Convert this into an always rendered component. the click will handle the preview url */}
            {!clickedWelcome && <WelcomeModal /> } 

            {/* Container that would hold the cover arts for songs / artists */}
            <div className="min-h-screen relative flex items-center">
                <div className="w-full md:w-3/5 min-h-screen flex justify-center lg:justify-end items-center">
                    {/* Wrapper container for all left sided components */}
                    <div className=" flex flex-col justify-center items-end h-fit ">
                        {/* Naviation bar */}
                        <div className="w-full bg-primary flex ">
                            <div onClick = {() => changeView('Tracks')} className = {`w-fit my-2 mx-1 px-3 py-2 text-black font-semibold cursor-pointer rounded-md ${currentTab == 'Tracks' ? 'bg-button-secondary text-black' : 'bg-button-primary text-white'}  hover:bg-button-secondary hover:text-black  duration-100`}>Top Tracks</div>
                            <div onClick = {() => changeView('Artists')} className = {`w-fit my-2 mx-1 px-3 py-2 font-semibold cursor-pointer rounded-md ${currentTab == 'Artists' ? 'bg-button-secondary text-black' : 'bg-button-primary text-white'}   hover:bg-button-secondary hover:text-black  duration-100`}>Top Artists</div>
                        </div>


                        {/* first big box (top tracks / artists + modifiers). Switch Statement here*/}
                        {   currentTab === 'Tracks' ? <TopTracksContainer /> : currentTab === 'Artists' ? <TopArtistsContainer />: null }
                        {/* Selected Item Overview */}
                        {   selected && <div className="my-6"><MetadataContainer /></div> }
                    </div>
                </div>
                
                {/* Preview component that functions on hover of track / Artist elements */}
                {   preview && (<PreviewContainer item={preview} />)    }
            </div>
            {selected && <MetadataContainer />}
        </section>
    )
}

export default Dashboard