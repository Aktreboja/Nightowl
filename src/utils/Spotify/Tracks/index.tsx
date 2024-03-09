import { TopItems, SpotifyResponseError } from "../../../../spotify_api";

/**
 * @description Gets the top songs for a user, based on a given time range
 * @param access_token the access token required to run the function
 * @param time_range the Time range of items to return for the user.
 * @returns {TopItems} The top Songs from a user
 */
export const getTopSongs = async (access_token: string, time_range: string) : Promise<TopItems | SpotifyResponseError> => {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_SPOTIFY_API_BASE + `/me/top/tracks?limit=50&time_range=${time_range}`, {
            method: "GET",
            headers: {'Authorization': "Bearer " + access_token},
        })

        if (response.ok) {
            return await response.json() as TopItems;
        } else {
            const errorData: SpotifyResponseError = await response.json();
            throw new Error(`Failed to get top items: ${response.status} - ${errorData.error.message}`)
        }
    } catch (error) {
        throw new Error(`Error retrieving top songs: ${(error as Error).message}` )
    }
}

/**
 * @description Checks for the User's saved Tracks
 * @param access_token access token required to run the function
 * @param ids the ids of the tracks to check if the user has saved
 * @returns {boolean[]} An Array of booleans if the track has been saved.
 */
export const checkSavedTracks = async (access_token: string, ids: string[]) : Promise<boolean[] | SpotifyResponseError> => {
    try {
        let queryString = ""
        for (let i = 0 ; i < ids.length; i++) {
            queryString += ids[i] + ","
        }
        const response = await fetch(process.env.NEXT_PUBLIC_SPOTIFY_API_BASE + `/me/tracks/contains?ids=${queryString.slice(0,-1)}`, {
            method: "GET",
            headers: {'Authorization': "Bearer " + access_token},
        })    
        if (response.ok) {
            return await response.json() as boolean[];
        } else {
            const errorData : SpotifyResponseError = await response.json();
            throw new Error(`Failed to check saved Tracks: ${response.status} - ${errorData.error.message}`)
        }
    } catch (error) {
        throw new Error(`Error retrieving saved Tracks: ${(error as Error).message}`)
    }
}