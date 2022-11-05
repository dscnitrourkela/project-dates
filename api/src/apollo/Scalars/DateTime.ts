import { GraphQLDateTime } from 'graphql-iso-date';
import { asNexusMethod } from 'nexus';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const DateTime = asNexusMethod(GraphQLDateTime, 'date');
