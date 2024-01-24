import { TokenResponse } from "../../../types";
import { UserProfileResponse, SpotifyResponseError, TopItems} from "../../../spotify_api";


// todo: Move these variables into an .env file
const clientId = "3e169807feee4783b5c5ec496565f8b2"
const redirectUrl = "http://localhost:3000"

const authorizationEndpoint = "https://accounts.spotify.com/authorize"
const tokenEndpoint = "https://accounts.spotify.com/api/token";
const scope = "user-top-read playlist-read-private playlist-modify-public playlist-modify-private"
const spotifyEndpoint = "https://api.spotify.com/v1"

// Spotify Authorization Utils
const generateRandomString = (length: number) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}


const sha256 = async (plain: string) => {
    const encoder = new TextEncoder()
    const data = encoder.encode(plain)
    return window.crypto.subtle.digest('SHA-256', data)
}

const base64encode = (input: ArrayBuffer) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}


async function redirectToSpotifyAuthorize() {
    const code_verifier = generateRandomString(64);

    const hashed = await sha256(code_verifier);
    const code_challenge_base64 = base64encode(hashed);

    window.localStorage.setItem('code_verifier', code_verifier);
    
    const authUrl = new URL(authorizationEndpoint)
    const params = {
        response_type: 'code',
        client_id: clientId,
        scope: scope,
        code_challenge_method: 'S256',
        code_challenge: code_challenge_base64,
        redirect_uri: redirectUrl
    }

    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();
}


export const isValidTokenResponse = (token: any): token is TokenResponse => {
    return (
        typeof token === 'object' &&
        'access_token' in token &&
        'refresh_token' in token &&
        'expires_in' in token
      );
}


/**
 *  Spotify API Calls
 */
export async function getToken(code: string) {
    const code_verifier = localStorage.getItem("code_verifier");
    const response = await fetch(tokenEndpoint, {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            client_id: clientId,
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: redirectUrl,
            code_verifier: code_verifier || ''
        })
    })

    return await response.json();
}

export function getAccessToken() {
    return localStorage.getItem("access_token")
}

// Function for getting the refresh token
async function refreshToken(refresh_token: string) {
    const response = await fetch( tokenEndpoint, {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            client_id: clientId,
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        })
    })
}



export async function loginWithSpotifyClick() {
    await redirectToSpotifyAuthorize()
}

// Logs you out of spotify app
async function logoutClick() {
    localStorage.clear();
    window.location.href = redirectUrl;
}



async function refreshTokenClick() {
    // const token = await refreshToken();
    // currentToken.save(token);
    // renderTemplate("oauth", "oauth-template", currentToken);
  }

