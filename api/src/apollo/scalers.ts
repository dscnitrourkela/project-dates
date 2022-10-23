import { GraphQLDateTime } from 'graphql-iso-date';
import { asNexusMethod, enumType } from 'nexus';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const DateTime = asNexusMethod(GraphQLDateTime, 'date');

export const GenderType = enumType({
  name: 'GenderType',
  members: ['MALE', 'FEMALE', 'OTHERS'],
  asNexusMethod: 'gender',
});

export const StatusType = enumType({
  name: 'StatusType',
  members: ['ACTIVE', 'DRAFT', 'EXPIRED'],
  asNexusMethod: 'status',
});

export const OrgSubType = enumType({
  name: 'OrgSubType',
  members: ['TECHNICAL', 'CULTURAL', 'SPORTS', 'HACKATHON', 'LITERARY', 'FMS'],
  asNexusMethod: 'orgSubType',
});

export const OrgType = enumType({
  name: 'OrgType',
  members: [
    'CLUB',
    'HOSTEL',
    'INSTITUTE',
    'BRANCH',
    'FEST',
    'BRANCH_SEM',
    'MESS',
  ],
  asNexusMethod: 'orgType',
});

export const RepeatType = enumType({
  name: 'RepeatType',
  members: [
    'SUNDAY',
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY',
  ],
  asNexusMethod: 'repeatType',
});

export const TransactionType = enumType({
  name: 'TransactionType',
  members: ['REGISTRATION', 'MERCH', 'EVENT'],
  asNexusMethod: 'transactionType',
});
