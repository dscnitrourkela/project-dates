import { GraphQLDateTime } from 'graphql-iso-date';
import { asNexusMethod, enumType } from 'nexus';

export const GenderType = enumType({
  name: 'gender',
  members: ['male', 'female', 'others'],
  asNexusMethod: 'gender',
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const DateTime = asNexusMethod(GraphQLDateTime, 'date');
