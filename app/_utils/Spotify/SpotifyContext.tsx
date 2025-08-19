import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { User } from '@spotify/web-api-ts-sdk';

interface SpotifyUser extends User {
  country: string;
}

interface SpotifyContextType {
  accessToken: string | null;
  refreshToken: string | null;
  user: SpotifyUser | null;
  setUser: (user: SpotifyUser | null) => void;
  isAuthenticated: boolean;
  logout: () => void;
  setTokens: (accessToken: string, refreshToken?: string) => void;
}

const SpotifyContext = createContext<SpotifyContextType>({
  accessToken: null,
  refreshToken: null,
  user: null,
  setUser: () => {},
  isAuthenticated: false,
  logout: () => {},
  setTokens: () => {},
});

export const useSpotify = () => useContext(SpotifyContext);

interface SpotifyProviderProps {
  children: ReactNode;
}

export const SpotifyProvider: React.FC<SpotifyProviderProps> = ({
  children,
}) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [user, setUser] = useState<SpotifyUser | null>(null);

  useEffect(() => {
    // Load tokens from localStorage on mount
    const storedAccessToken = localStorage.getItem('access_token');
    const storedRefreshToken = localStorage.getItem('refresh_token');

    if (storedAccessToken) setAccessToken(storedAccessToken);
    if (storedRefreshToken) setRefreshToken(storedRefreshToken);
  }, []);

  useEffect(() => {
    // Fetch user data when access token is available
    const fetchUserData = async () => {
      if (accessToken) {
        try {
          const response = await fetch('https://api.spotify.com/v1/me', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          if (response.ok) {
            const userData: SpotifyUser = await response.json();
            setUser(userData);
          } else {
            // Token might be expired, clear it
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('spotify_code_verifier');
            setAccessToken(null);
            setRefreshToken(null);
            setUser(null);
          }
        } catch (error) {
          console.error('Failed to fetch user data:', error);
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('spotify_code_verifier');
          setAccessToken(null);
          setRefreshToken(null);
          setUser(null);
        }
      }
    };

    fetchUserData();
  }, [accessToken]);

  const setTokens = (newAccessToken: string, newRefreshToken?: string) => {
    setAccessToken(newAccessToken);
    if (newRefreshToken) {
      setRefreshToken(newRefreshToken);
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('spotify_code_verifier');
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
  };

  return (
    <SpotifyContext.Provider
      value={{
        accessToken,
        refreshToken,
        user,
        isAuthenticated: !!accessToken,
        logout,
        setUser,
        setTokens,
      }}
    >
      {children}
    </SpotifyContext.Provider>
  );
};
