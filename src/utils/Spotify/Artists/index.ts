import { TopItems, SpotifyResponseError } from "../../../../spotify_api";

const spotifyEndpoint = "https://api.spotify.com/v1"

// todo: Error handle API functions.

// Get Top Artists for a Spotify User
export const GetTopArtists = async (access_token: string, time_range : string) => {
    const response = await fetch(spotifyEndpoint + `/me/top/artists?limit=50&time_range=${time_range}`, {
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
export const GetSeveralArtists = async (access_token: string, ids: string[]) => {
    try {
        const idsQuery = (ids.map((id) => id)).join(',');
        console.log("IDS: ", idsQuery)
        const response = await fetch(spotifyEndpoint + `/artists?ids=${idsQuery}`, {
            method: "GET",
            headers: {'Authorization': "Bearer " + access_token}
        })
        const artistsObject = await response.json()
        return artistsObject.artists;
    } catch (e) {
        console.error('Error at "Getting Several Artists": ', e)
    }
}


// Gets artists Top Tracks
export const GetArtistsTopTracks = async (access_token: string, id: string) => {
    const response = await fetch(spotifyEndpoint + `/artists/${id}/top-tracks?market=ES`, {
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

export const GetRelatedArtists = async (access_token: string, id: string) => {
    const response = await fetch(spotifyEndpoint + `/artists/${id}/related-artists`, {
        method: "GET",
        headers: {'Authorization': "Bearer " + access_token}
    })
    return await response.json();
}
