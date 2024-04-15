import { useState } from "react"
import TopArtistsContainer from "../TopArtistsContainer";
import TopTracksContainer from "../TopTracksContainer";
import MetadataContainer from "../MetadataContainer";
import PreviewContainer from "../PreviewContainer";
import { getPreview, getSelected } from "@/features/reducers/MusicReducer";

import { useAppSelector } from "@/features/hooks";
const TopStatsContainer = () => {
    const preview = useAppSelector(getPreview)
    const selected = useAppSelector(getSelected)
    const [ currentTab, setCurrentTab ] = useState('Tracks');

    return (
        <div className="min-h-screen relative flex items-center ">
            <div className="w-full md:w-3/5 min-h-screen flex justify-center lg:justify-end items-center ">
                {/* Wrapper container for all left sided components */}
                <div className=" flex flex-col justify-center items-end h-fit w-fit ml-2 ">
                    {/* Naviation bar */}
                    <div className="w-full bg-primary flex ">
                        <div onClick = {() => setCurrentTab('Tracks')} className = {`w-fit my-2 mx-1 px-3 py-2 text-black font-semibold cursor-pointer rounded-md ${currentTab == 'Tracks' ? 'bg-button-secondary text-black' : 'bg-button-primary text-white'}  hover:bg-button-secondary hover:text-black  duration-100`}>Top Tracks</div>
                        <div onClick = {() => setCurrentTab('Artists')} className = {`w-fit my-2 mx-1 px-3 py-2 font-semibold cursor-pointer rounded-md ${currentTab == 'Artists' ? 'bg-button-secondary text-black' : 'bg-button-primary text-white'}   hover:bg-button-secondary hover:text-black  duration-100`}>Top Artists</div>
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
    )
}


export default TopStatsContainer;