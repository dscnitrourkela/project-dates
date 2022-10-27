import { Request } from 'express';

import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
  req: Request;
}

export const context = async ({ req }: { req: Request }): Promise<Context> => ({
  prisma,
  req,
});
