import { UserProfileResponse, SpotifyResponseError } from "../../../../spotify_api";

/**
 * 
 * @param access_token Gets the user's Spotify Data.
 * @returns {UserProfileResponse} the user profile or spotify response error
 */
export const getUserData = async (access_token: string) : Promise<UserProfileResponse | SpotifyResponseError> => {
    const response = await fetch("https://api.spotify.com/v1/me", {
        method: "GET",
        headers: { "Authorization": "Bearer " + access_token}
    })
    return await response.json();
}


