import { checkGqlPermissions } from 'helpers/auth/checkPermissions';
import { idArg, inputObjectType, mutationField, nonNull } from 'nexus';

export const ParticipantCreateInputType = inputObjectType({
  name: 'ParticipantCreateInputType',
  description: 'Input arguments used in createParticipant mutation',
  definition(t) {
    t.nonNull.string('email');
    t.nonNull.string('uid');
    t.nonNull.string('name');
    t.string('idCardPhoto');
    t.string('college');
    t.nonNull.string('mobile');
    t.string('rollNumber');
    t.string('aicheRegID');
    t.string('tSize');
    t.string('srcID');
  },
});

export const createParticipant = mutationField('createParticipant', {
  type: 'Participant',
  description: 'Creates a new Participant record',
  authorize: (_parent, _args, ctx) => checkGqlPermissions(ctx, []),
  args: {
    Participant: nonNull('ParticipantCreateInputType'),
  },
  async resolve(_parent, args, { prisma }) {
    const isMobileValid = args.Participant.mobile?.length === 10;
    const isEmailValid = args.Participant.email
      .toLowerCase()
      .match(/^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/);

    if (!isEmailValid) throw new Error('Invalid Email, please try again');
    if (!isMobileValid)
      throw new Error('Invalid Mobile Number, please try again');

    if (args.Participant.rollNumber) {
      const Participants = await prisma.Participant.findMany({
        where: {
          rollNumber: args.Participant.rollNumber,
          email: args.Participant.email,
          uid: args.Participant.uid,
          mobile: args.Participant.mobile,
        },
      });

      if (Participants.length > 0) {
        throw new Error('Roll Number already registered');
      }
    }

    return prisma.Participant.create({
      data: {
        ...args.Participant,
        selfID: args.Participant?.mobile,
      },
    });
  },
});

export const ParticipantUpdateInputType = inputObjectType({
  name: 'ParticipantUpdateInputType',
  description: 'Input arguments used in updateParticipant mutation',
  definition(t) {
    t.string('name');
    t.string('photo');
    t.gender('gender');
    t.date('dob');
    t.string('state');
    t.string('city');
    t.string('college');
    t.string('stream');
    t.string('mobile');
    t.string('selfID');
    t.id('festID');
    t.string('referredBy');
    t.string('rollNumber');
    t.id('ca');
  },
});

export const updateParticipant = mutationField('updateParticipant', {
  type: 'Participant',
  description: 'Updates an existing Participant record',
  authorize: (_parent, _args, ctx) => checkGqlPermissions(ctx, []),
  args: {
    id: nonNull(idArg()),
    Participant: nonNull('ParticipantUpdateInputType'),
  },
  resolve(_parent, args, { prisma }) {
    const isMobileValid = args.Participant.mobile?.length === 10;
    if (args.Participant.mobile && !isMobileValid)
      throw new Error('Invalid Mobile Number, please try again');

    return prisma.Participant.update({
      where: { id: args.id },
      data: {
        name: args.Participant?.name || undefined,
        photo: args.Participant?.photo || undefined,
        gender: args.Participant?.gender || undefined,
        dob: args.Participant?.dob || undefined,
        state: args.Participant?.state || undefined,
        city: args.Participant?.city || undefined,
        college: args.Participant?.college || undefined,
        stream: args.Participant?.stream || undefined,
        mobile: args.Participant?.mobile || undefined,
        selfID: args.Participant?.selfID || undefined,
        festID: args.Participant?.festID
          ? { push: args.Participant?.festID }
          : undefined,
        referredBy: args.Participant?.referredBy || undefined,
        rollNumber: args.Participant?.rollNumber || undefined,
        ca: args.Participant?.ca ? { push: args.Participant?.ca } : undefined,
      },
    });
  },
});
