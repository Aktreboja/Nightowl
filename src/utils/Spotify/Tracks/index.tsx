import { TopItems, SpotifyResponseError } from "../../../../spotify_api";

const spotifyEndpoint = "https://api.spotify.com/v1"

// Retrieves the user's top items
export const getTopSongs = async (access_token: string, time_range: string) : Promise<TopItems | SpotifyResponseError> => {
    const response = await fetch(spotifyEndpoint + `/me/top/tracks?limit=50&time_range=${time_range}`, {
        method: "GET",
        headers: {'Authorization': "Bearer " + access_token},
    })

    return response.json();
}