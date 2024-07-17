import { ApolloServer } from '@apollo/server';
import { NextRequest } from 'next/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';

// Schema imports
import { resolvers } from './schema/Resolvers';
import { typeDefs } from './schema/TypeDef';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => ({ req }),
});

export { handler as GET, handler as POST };
