import { TopItems, SpotifyResponseError } from "../../../../spotify_api";

const spotifyEndpoint = "https://api.spotify.com/v1"

// Get Top Artists for a Spotify User
export const GetTopArtists = async (access_token: string, type : string) => {
    const response = await fetch(spotifyEndpoint + `/me/top/${type}`, {
        method: "GET",
        headers: {'Authorization': "Bearer " + access_token},
    })
    return await response.json();
}






