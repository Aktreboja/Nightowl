import useSpotifyApi from './useSpotifyApi';
import useSpotifyAuth from './useSpotifyAuth';
import useSpotifyTracks from './useSpotifyTracks';

const useSpotify = () => {
  const { getAccessToken, refreshAccessToken, request, getUser } =
    useSpotifyApi();
  const {
    base64encode,
    generateRandomString,
    redirectToSpotifyAuthorize,
    sha256,
  } = useSpotifyAuth();

  const { fetchTopTracks } = useSpotifyTracks();

  return {
    base64encode,
    generateRandomString,
    getAccessToken,
    redirectToSpotifyAuthorize,
    refreshAccessToken,
    request,
    sha256,
    getUser,
    fetchTopTracks,
  };
};

export default useSpotify;
