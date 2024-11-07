import { ApolloServer } from '@apollo/server';
import { NextRequest } from 'next/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
// Schema imports
import { resolvers } from './schema/Resolvers';
import { typeDefs } from './schema/TypeDef';
import { InMemoryLRUCache } from '@apollo/utils.keyvaluecache';
import { SpotifyAPI } from './schema/spotify-api';

export interface ServerContext {
  req: NextRequest;
  dataSources: {
    spotifyAPI: SpotifyAPI;
  };
}
const cache = new InMemoryLRUCache();
const server = new ApolloServer<ServerContext>({
  typeDefs,
  resolvers,
});

// @ts-ignore
const handler = startServerAndCreateNextHandler<ServerContext>(server, {
  context: async (req: NextRequest) => {
    // @ts-ignore
    const token = req.headers.authorization || '';
    const spotifyAPI = new SpotifyAPI({ token, cache });

    return {
      req,
      dataSources: {
        spotifyAPI,
      },
    };
  },
});

export { handler as GET, handler as POST };
