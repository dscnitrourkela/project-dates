import { GraphQLError } from 'graphql';

export const AuthenticationError = new GraphQLError(
  'You are not authorized to perform this action.',
  {
    extensions: {
      code: 'FORBIDDEN',
    },
  },
);
