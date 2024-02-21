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

// Checks a song(s) if the user has liked them already or not
export const checkSavedTracks = async (access_token: string, ids: string[]) => {
    try {
        let queryString = ""
        for (let i = 0 ; i < ids.length; i++) {
            queryString += ids[i] + ","
        }
    
        const response = await fetch(spotifyEndpoint + `/me/tracks/contains?ids=${queryString.slice(0,-1)}`, {
            method: "GET",
            headers: {'Authorization': "Bearer " + access_token},
        })
    
        return response.json();
    } catch (e) {
        console.error("Error at /me/tracks/contains: ", e)
    }

}