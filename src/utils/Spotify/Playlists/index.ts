import { Playlist } from '@spotify/web-api-ts-sdk'

interface PlaylistMeta {
    name: string;
    public: boolean;
    collaborative: false | null;
    description: string | null;
}

/**
 * Playlist specific Spotify functions 
 *
 */





/**
 * @description retrieves the user's playlists
 * @param access_token 
 * @returns {Playlists} The playlists linked to the user
 */
export const GetUserPlaylists = async (access_token: string) : Promise<Playlist[]> => {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_SPOTIFY_API_BASE + "/me/playlists", {
            method: "GET",
            headers: {'Authorization': `Bearer ${access_token}`}
        })
        const playlists = await response.json();
        return playlists.items as Playlist[];
    } catch (error) {
        throw new Error(`Error retrieving user's playlists`)
    }
}

// Create a new playlist
export const CreatePlaylist = async ({userId, access_token, playlistMetadata}: {userId: string, access_token: string, playlistMetadata: PlaylistMeta}) => {    
    const {name, public: isPublic, collaborative, description } = playlistMetadata;

    // Creating a new object with the correct type
    const playlistData: Record<string, string> = {
        name,
        public: String(isPublic),
        collaborative: String(collaborative),
        description: description || "", // default to an empty string if description is null
    };
    
    const response = await fetch (process.env.NEXT_PUBLIC_SPOTIFY_API_BASE + `/users/${userId}/playlists`, {
        method: "POST",
        headers: {'Authorization': `Bearer ${access_token}`},
        body: new URLSearchParams(
            playlistData
        )
    })
}