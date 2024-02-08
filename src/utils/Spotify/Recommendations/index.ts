
const spotifyEndpoint = "https://api.spotify.com/v1"


export const GetRecommendations = async (access_token: string, query: string) => {
    const recommendationResponse = await fetch(spotifyEndpoint + `/recommendations?${query}&market=ES`, {
        method: 'GET',
        headers: {'Authorization': "Bearer " + access_token}
    })
    return await recommendationResponse.json();
}