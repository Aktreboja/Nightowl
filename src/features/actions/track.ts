import { createAsyncThunk } from "@reduxjs/toolkit"
import { saveSpotifyTrack, unsaveSpotifyTrack, checkSavedTrack } from "@/utils/Spotify/Tracks"
import { setSaved } from "../reducers/MusicReducer"
import { RecommendationQuery } from "../../../spotify_api"
import { GetRecommendations } from "@/utils/Spotify/Recommendations"

export const saveTrack = createAsyncThunk(
    'music/saveTrack',
    async ( payload : { access_token: string, id: string }, thunkAPI) => {
        const {access_token, id} = payload
        const response = await saveSpotifyTrack(access_token, id)
        thunkAPI.dispatch(setSaved(true))
    }
)

export const unsaveTrack = createAsyncThunk(
    'music/unsaveTrack',
    async ( payload : { access_token: string, id: string }, thunkAPI) => {
        const {access_token, id} = payload
        const response = await unsaveSpotifyTrack(access_token, id)
        thunkAPI.dispatch(setSaved(false))
    }
)

export const checkForSaved = createAsyncThunk(
    'music/checkForSaved',
    async ( payload: { access_token: string, id: string },thunkAPI ) => {
        const {access_token, id} = payload
        const response = await checkSavedTrack(access_token, id)
        return response
    }
)

export const fetchSimilarTracks = createAsyncThunk(
    'music/fetchSimilarTracks',
    async ( payload: {access_token: string, recommendationQuery : RecommendationQuery }, thunkAPI ) => {
        const response = await GetRecommendations(payload.access_token, payload.recommendationQuery)
        return response.tracks
    }
)
