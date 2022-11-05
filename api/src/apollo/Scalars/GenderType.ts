import { enumType } from 'nexus';

export const GenderType = enumType({
  name: 'GenderType',
  members: ['MALE', 'FEMALE', 'OTHERS'],
  asNexusMethod: 'gender',
});
