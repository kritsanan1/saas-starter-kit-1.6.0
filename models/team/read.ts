import { prisma } from '@/lib/prisma';
import type { Team } from '@prisma/client';

export const getByCustomerId = async (
  billingId: string
): Promise<Team | null> => {
  return await prisma.team.findFirst({
    where: {
      billingId,
    },
  });
};

export const getTeam = async (key: { id: string } | { slug: string }) => {
  return await prisma.team.findUniqueOrThrow({
    where: key,
  });
};

export const getTeams = async (userId: string) => {
  return await prisma.team.findMany({
    where: {
      members: {
        some: {
          userId,
        },
      },
    },
    include: {
      _count: {
        select: { members: true },
      },
    },
  });
};