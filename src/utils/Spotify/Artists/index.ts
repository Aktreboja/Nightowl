import { TopItems, SpotifyResponseError } from "../../../../spotify_api";

const spotifyEndpoint = "https://api.spotify.com/v1"

// todo: Error handle API functions.

// Get Top Artists for a Spotify User
export const GetTopArtists = async (access_token: string, type : string) => {
    const response = await fetch(spotifyEndpoint + `/me/top/${type}`, {
        method: "GET",
        headers: {'Authorization': "Bearer " + access_token},
    })
    return await response.json();
}


// Gets a specific artist
export const GetArtist = async (access_token: string, id: string) => {
    const response = await fetch(spotifyEndpoint + `/artists/${id}`, {
        method: "GET",
        headers: {'Authorization': "Bearer " + access_token}
    })
    return await response.json()
}

// Get Several Artists
// Comma-separated list of Spotify Ids
export const GetSeveralArtists = async (access_token: string, ids: string) => {
    const response = await fetch(spotifyEndpoint + `/artists?ids=${ids}`, {
        method: "GET",
        headers: {'Authorization': "Bearer " + access_token}
    })
    return await response.json()
}


// Gets artists Top Tracks
export const GetArtistsTopTracks = async (access_token: string, id: string) => {
    const response = await fetch(spotifyEndpoint + `/artists/${id}/top-tracks`, {
        method: "GET",
        headers: {'Authorization': "Bearer " + access_token}
    })
    return await response.json()
}

// Gets artist's albums
export const GetArtistsAlbums = async (access_token: string, id: string) => {
    const response = await fetch(spotifyEndpoint + `/artists/${id}/albums`, {
        method: "GET",
        headers: {'Authorization': "Bearer " + access_token}
    })
    return await response.json()
}
