import { RecommendationQuery } from "../../../../spotify_api";

const spotifyEndpoint = "https://api.spotify.com/v1"


export const GetRecommendations = async (access_token: string, query: RecommendationQuery) => {

    const {seedArtists, seedTracks} = query
    let artistQuery = "seed_artists="
    let trackQuery = "seed_tracks="

    for (let i = 0; i < seedTracks.length; i++) {
        trackQuery += seedTracks[i] + ","
    }

    for (let i = 0; i < seedArtists.length; i++) {
        artistQuery += seedArtists[i] + ","
    }
    let recArray = [trackQuery.slice(0,-1), artistQuery.slice(0,-1)].join('&')
    // console.log("ARTISTS QUERY: ", recArray)

    const recommendationResponse = await fetch(spotifyEndpoint + `/recommendations?${recArray}&market=ES&limit=40`, {
        method: 'GET',
        headers: {'Authorization': "Bearer " + access_token}
    })
    return await recommendationResponse.json();
}