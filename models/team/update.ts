import { prisma } from '@/lib/prisma';
import type { Team } from '@prisma/client';

export const updateTeam = async (slug: string, data: Partial<Team>) => {
  return await prisma.team.update({
    where: {
      slug,
    },
    data: data,
  });
};