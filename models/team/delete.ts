import { prisma } from '@/lib/prisma';
import type { Team } from '@prisma/client';

export const deleteTeam = async (key: { id: string } | { slug: string }) => {
  return await prisma.team.delete({
    where: key,
  });
};