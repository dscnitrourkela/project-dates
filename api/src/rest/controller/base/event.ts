import { Request, Response } from 'express';

import { prisma } from '@utils';

type Empty = Record<string, unknown>;

export const createEvent = async (req: Request, res: Response) => {
  try {
    const {
      name,
      description,
      poster,
      startDate,
      endDate,
      priority,
      type,
      subHeading,
      prizeMoney,
    } = req.body;

    const event = await prisma.event.create({
      data: {
        name,
        subHeading,
        prizeMoney,
        description,
        poster,
        locationID: '635e1c662e3082fe09bc498e',
        startDate,
        endDate,
        orgID: '65133eb72c5708eb84bf53d6',
        orgType: 'FEST',
        priority,
        status: 'ACTIVE',
        type: type.toUpperCase(),
      },
    });

    return res.status(200).send(event);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const getEvents = async (
  req: Request<
    Empty,
    Empty,
    Empty,
    {
      type: string;
      orgID: string;
    }
  >,
  res: Response,
) => {
  try {
    const { type, orgID } = req.query;

    if (!type) {
      const events = await prisma.event.findMany({
        where: {
          orgID: {
            has: orgID,
          },
        },
      });
      return res.status(200).send(events);
    }

    if (
      ![
        'TECHNICAL',
        'FLAGSHIP',
        'MAIN',
        'FUN',
        'PRO',
        'EXHIBITIONS',
        'WORKSHOP',
        'GUEST-LECTURES',
        'OTHER',
      ].includes(type.toUpperCase())
    ) {
      return res.status(400).send('invalid type query parameter value');
    }

    const events = await prisma.event.findMany({
      where: {
        AND: [
          {
            type: type.toUpperCase(),
            orgID: {
              has: orgID,
            },
          },
        ],
      },
    });

    return res.status(200).send(events);
  } catch (error) {
    return res.status(500).send('internal server error');
  }
};

export const registerUserForEvent = async (
  req: Request<Empty, Empty, { userID: string; eventID: string }>,
  res: Response,
) => {
  try {
    const { userID, eventID } = req.body;

    if (!userID || !eventID) {
      return res.status(400).send('userID and eventID are required parameters');
    }

    const existingRegistration = await prisma.eventRegistration.findMany({
      where: {
        AND: [{ eventID }, { userID }],
      },
    });

    if (existingRegistration.length > 0) {
      return res.status(400).send('user already registered for this event');
    }

    const eventRegistration = await prisma.eventRegistration.create({
      data: {
        eventID,
        userID,
      },
    });

    return res.status(200).send(eventRegistration);
  } catch (error) {
    return res.status(500).send('internal server error');
  }
};

export const getUserRegistrations = async (
  req: Request<Empty, Empty, Empty, { userID: string }>,
  res: Response,
) => {
  try {
    const { userID } = req.query;

    if (!userID) {
      return res.status(400).send('userID is a required parameter');
    }

    const registrationIDs = await prisma.eventRegistration.findMany({
      where: {
        userID,
      },
    });

    const promiseList = registrationIDs.map(({ eventID }) =>
      prisma.event.findUnique({
        where: {
          id: eventID,
        },
      }),
    );

    const registrations = await Promise.all(promiseList);

    return res.status(200).send(registrations);
  } catch (error) {
    return res.status(500).send('internal server error');
  }
};
