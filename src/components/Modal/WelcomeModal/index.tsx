import { loginWithSpotifyClick } from "@/utils/Spotify/Spotify";

export default function WelcomeModal() {
    return (
        <div className="fixed w-full min-h-screen bg-black bg-opacity-45 flex justify-center items-center z-30 ">
            <div className="bg-white w-fit h-fit flex items-center justify-center flex-col px-4 py-2 rounded-md">
                <h1 className="font-semibold">Welcome to <strong className="underline"><i>Nightowl</i></strong></h1>
                <button onClick = {loginWithSpotifyClick} className="bg-button-primary text-white font-semibold px-3 py-2 hover:bg-button-secondary hover:text-black duration-75 rounded-sm">Get Started</button>
            </div>

        </div>
    )

}