import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next"

interface SpotifyRequest {
    endpoint: string;
    method: string;
    access_token:  string
}

// API wrapper to call Spotify API with access tokens
const SpotifyApiWrapper = (requestHandler : NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse ) => {
    return requestHandler(req, res);
}

// Spotify API wrapper to be able to call Spotify API 
const SpotifyRequest = async ({endpoint, method, access_token}: SpotifyRequest) => {
    const response = await fetch(`https://api.spotify.com/v1${endpoint}`, {
        method: method,
        headers: {'Authorization': "Bearer " + access_token}
        
    })
}


// Sample code to be able to create a closure
// const createSpotifyRequest = (accessToken) => async ({ endpoint, method }) => {
//     const response = await fetch(`https://api.spotify.com/v1${endpoint}`, {
//         method: method,
//         headers: { 'Authorization': "Bearer " + accessToken }
//     });

//     // Add additional error handling or processing as needed
//     const data = await response.json();
//     return data;
// };

// // Example usage:
// const accessToken = "your_access_token";
// const spotifyRequest = createSpotifyRequest(accessToken);

// // Now you can use the spotifyRequest closure for different methods
// const getTrackInfo = async (trackId) => {
//     const response = await spotifyRequest({
//         endpoint: `/tracks/${trackId}`,
//         method: 'GET'
//     });
//     console.log(response);
// };

// const searchTracks = async (query) => {
//     const response = await spotifyRequest({
//         endpoint: `/search?q=${query}&type=track`,
//         method: 'GET'
//     });
//     console.log(response);
// };

// // Call the functions
// getTrackInfo("track_id_here");
// searchTracks("your_search_query");
