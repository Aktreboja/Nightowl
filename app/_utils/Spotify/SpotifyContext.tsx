import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { SpotifyClient } from './SpotifyClient';

interface SpotifyUser {
  id: string;
  display_name: string;
  email: string;
  images: { url: string }[];
}

interface SpotifyContextType {
  client: SpotifyClient | null;
  accessToken: string | null;
  refreshToken: string | null;
  user: SpotifyUser | null;
  setUser: (user: SpotifyUser | null) => void;
  isAuthenticated: boolean;
  logout: () => void;
}

const SpotifyContext = createContext<SpotifyContextType>({
  client: null,
  accessToken: null,
  refreshToken: null,
  user: null,
  setUser: () => {},
  isAuthenticated: false,
  logout: () => {},
});

export const useSpotify = () => useContext(SpotifyContext);

interface SpotifyProviderProps {
  children: ReactNode;
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}

export const SpotifyProvider: React.FC<SpotifyProviderProps> = ({
  children,
  clientId,
  clientSecret,
  redirectUri,
}) => {
  const [client] = useState(
    () => new SpotifyClient(clientId, clientSecret, redirectUri)
  );
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
      if (accessToken && client) {
        const userData = await client.get<SpotifyUser>(
          '/me',
          accessToken,
          refreshToken || undefined
        );
        if (userData) {
          setUser(userData);
        }
      }
    };

    fetchUserData();
  }, [accessToken, client, refreshToken]);

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
  };

  return (
    <SpotifyContext.Provider
      value={{
        client,
        accessToken,
        refreshToken,
        user,
        isAuthenticated: !!accessToken,
        logout,
        setUser,
      }}
    >
      {children}
    </SpotifyContext.Provider>
  );
};
