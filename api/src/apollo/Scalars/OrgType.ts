import { enumType } from 'nexus';

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
