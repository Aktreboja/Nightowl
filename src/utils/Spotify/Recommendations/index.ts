
const spotifyEndpoint = "https://api.spotify.com/v1"


export const GetRecommendations = async (access_token: string, query: string) => {
    const recommendationResponse = await fetch(spotifyEndpoint + `/recommendations?${query}`)
    return await recommendationResponse;
}