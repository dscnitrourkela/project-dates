import { enumType } from 'nexus';

export const TransactionType = enumType({
  name: 'TransactionType',
  members: ['REGISTRATION', 'MERCH', 'EVENT'],
  asNexusMethod: 'transactionType',
});
