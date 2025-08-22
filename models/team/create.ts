import { prisma } from '@/lib/prisma';
import { findOrCreateApp } from '@/lib/svix';
import { Role } from '@prisma/client';

export const createTeam = async (param: {
  userId: string;
  name: string;
  slug: string;
}) => {
  const { userId, name, slug } = param;

  const team = await prisma.team.create({
    data: {
      name,
      slug,
    },
  });

  await addTeamMember(team.id, userId, Role.OWNER);

  await findOrCreateApp(team.name, team.id);

  return team;
};

export const isTeamExists = async (slug: string) => {
  return await prisma.team.count({
    where: {
      slug,
    },
  });
};

// This function is temporarily here to resolve circular dependency.
// It will be moved to models/team/members.ts in the next step.
export const addTeamMember = async (
  teamId: string,
  userId: string,
  role: Role
) => {
  return await prisma.teamMember.upsert({
    create: {
      teamId,
      userId,
      role,
    },
    update: {
      role,
    },
    where: {
      teamId_userId: {
        teamId,
        userId,
      },
    },
  });
};