import { enumType } from 'nexus';

export const StatusType = enumType({
  name: 'StatusType',
  members: ['ACTIVE', 'DRAFT', 'EXPIRED'],
  asNexusMethod: 'status',
});
