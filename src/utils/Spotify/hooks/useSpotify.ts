import useSpotifyApi from './useSpotifyApi';
import useSpotifyAuth from './useSpotifyAuth';

const useSpotify = () => {
  const { getAccessToken, refreshAccessToken, request } = useSpotifyApi();
  const {
    base64encode,
    generateRandomString,
    redirectToSpotifyAuthorize,
    sha256,
  } = useSpotifyAuth();

  return {
    base64encode,
    generateRandomString,
    getAccessToken,
    redirectToSpotifyAuthorize,
    refreshAccessToken,
    request,
    sha256,
  };
};

export default useSpotify;
