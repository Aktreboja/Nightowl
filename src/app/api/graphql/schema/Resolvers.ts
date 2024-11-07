import { NextRequest } from 'next/server';
import { SpotifyAPI } from './spotify-api';

type requestContext = {
  req: NextRequest;
  dataSources: {
    spotifyAPI: SpotifyAPI;
  };
};

export const resolvers = {
  Query: {
    // todo: Args has to do with k
    hello: async (parent: any, args: any, context: requestContext) => {
      const { req, dataSources } = context;

      return req.url;
    },
    name: (parent: any, args: any, context: requestContext) => {
      const { req } = context;
      console.log(req.headers.get('authorization'));

      return 'Aldrich Reboja';
    },
  },
};
