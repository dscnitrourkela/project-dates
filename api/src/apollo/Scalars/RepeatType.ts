import { enumType } from 'nexus';

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
