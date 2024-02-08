import { TopItems, SpotifyResponseError } from "../../../../spotify_api";

const spotifyEndpoint = "https://api.spotify.com/v1"

// Retrieves the user's top items
export const getTopSongs = async (access_token: string, type: string) : Promise<TopItems | SpotifyResponseError> => {
    const response = await fetch(spotifyEndpoint + `/me/top/${type}?limit=50`, {
        method: "GET",
        headers: {'Authorization': "Bearer " + access_token},
    })

    return await response.json();
}