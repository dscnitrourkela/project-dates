import { objectType } from 'nexus';

export const EventRegistration = objectType({
  name: 'EventRegistration',
  description: 'Refers to the registrations of a user for a particular event',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.id('eventID');
    t.nonNull.id('userID');
  },
});
