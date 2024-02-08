import Image from "next/image";
import { ModalProps } from "../../../../component_types";


export default function TrackModal({modalData}: {modalData: ModalProps}) {
    const {track, artists, preview_url, recommendations, image, closeHandler} = modalData

    console.log("Recommendations: ", recommendations)

    return (            
            <div className="w-1/2 min-h-1/2 border bg-white p-2 rounded-md py-4 relative">
                {/* Close button */}
                <button className="absolute top-0 right-0 m-2" onClick={closeHandler}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500 hover:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                {/* Song data */}
                <div className="flex ">
                    <Image src = {image} alt = {`${track.name} Album art`} width = {150} height = {150}/>
                    <div className="px-3">
                        <strong>{track.name}</strong>
                        <p>{artists && artists.length > 0 ? artists.map(artist => artist.name).join(', ') : 'No Artists Available'}</p>
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
                            artists && artists.length > 0 ? (
                                artists.map((artist, key) => {
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
    );
}
