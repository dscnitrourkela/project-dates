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

export const StatusType = enumType({
  name: 'status',
  members: ['active', 'draft', 'expired'],
  asNexusMethod: 'status',
});

export const OrgSubType = enumType({
  name: 'orgSubType',
  members: ['technical', 'cultural', 'sports', 'hackathon', 'literary', 'fms'],
  asNexusMethod: 'orgSubType',
});

export const OrgType = enumType({
  name: 'orgType',
  members: [
    'club',
    'hostel',
    'institute',
    'branch',
    'fest',
    'branch_sem',
    'mess',
  ],
  asNexusMethod: 'orgType',
});

export const RepeatType = enumType({
  name: 'repeatType',
  members: [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ],
  asNexusMethod: 'repeatType',
});
