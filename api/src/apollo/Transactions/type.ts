import { objectType } from 'nexus';

export const Transaction = objectType({
  name: 'Transaction',
  description: 'Refers to the transaction details of any sort of payment',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.int('amount');
    t.nonNull.id('userID');
    t.nonNull.id('transactionID');
    t.nonNull.transactionType('type');
    t.nonNull.date('timestamp');
    t.nonNull.id('orgID');
    t.string('comment');
  },
});
