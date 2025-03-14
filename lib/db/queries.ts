import { desc, and, eq, isNull, gte, lte } from 'drizzle-orm';
import { db } from './drizzle';
import { activityLogs, teamMembers, teams, users, meals } from './schema';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth/session';

export async function getUser() {
  const sessionCookie = (await cookies()).get('session');
  if (!sessionCookie || !sessionCookie.value) {
    return null;
  }

  const sessionData = await verifyToken(sessionCookie.value);
  if (
    !sessionData ||
    !sessionData.user ||
    typeof sessionData.user.id !== 'number'
  ) {
    return null;
  }

  if (new Date(sessionData.expires) < new Date()) {
    return null;
  }

  const user = await db
    .select()
    .from(users)
    .where(and(eq(users.id, sessionData.user.id), isNull(users.deletedAt)))
    .limit(1);

  if (user.length === 0) {
    return null;
  }

  return user[0];
}

export async function getTeamByStripeCustomerId(customerId: string) {
  const result = await db
    .select()
    .from(teams)
    .where(eq(teams.stripeCustomerId, customerId))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

export async function updateTeamSubscription(
  teamId: number,
  subscriptionData: {
    stripeSubscriptionId: string | null;
    stripeProductId: string | null;
    planName: string | null;
    subscriptionStatus: string;
  }
) {
  await db
    .update(teams)
    .set({
      ...subscriptionData,
      updatedAt: new Date(),
    })
    .where(eq(teams.id, teamId));
}

export async function getUserWithTeam(userId: number) {
  const result = await db
    .select({
      user: users,
      teamId: teamMembers.teamId,
    })
    .from(users)
    .leftJoin(teamMembers, eq(users.id, teamMembers.userId))
    .where(eq(users.id, userId))
    .limit(1);

  return result[0];
}

export async function getActivityLogs() {
  const user = await getUser();
  if (!user) {
    throw new Error('User not authenticated');
  }

  return await db
    .select({
      id: activityLogs.id,
      action: activityLogs.action,
      timestamp: activityLogs.timestamp,
      ipAddress: activityLogs.ipAddress,
      userName: users.name,
    })
    .from(activityLogs)
    .leftJoin(users, eq(activityLogs.userId, users.id))
    .where(eq(activityLogs.userId, user.id))
    .orderBy(desc(activityLogs.timestamp))
    .limit(10);
}

export async function getTeamForUser(userId: number) {
  const result = await db.query.users.findFirst({
    where: eq(users.id, userId),
    with: {
      teamMembers: {
        with: {
          team: {
            with: {
              teamMembers: {
                with: {
                  user: {
                    columns: {
                      id: true,
                      name: true,
                      email: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  return result?.teamMembers[0]?.team || null;
}

export async function createMeal(
  userId: number,
  mealData: {
    name: string;
    calories?: number | null;
    protein?: number | null;
    carbs?: number | null;
    fat?: number | null;
    imageUrl?: string | null;
  }
) {
  return await db.insert(meals).values({
    userId: userId,
    name: mealData.name,
    calories: mealData.calories,
    protein: mealData.protein,
    carbs: mealData.carbs,
    fat: mealData.fat,
    imageurl: mealData.imageUrl,
  }).returning();
}

export async function getMealsForUser(userId: number) {
  return await db
    .select()
    .from(meals)
    .where(eq(meals.userId, userId))
    .orderBy(desc(meals.createdAt));
}

export async function getMealById(mealId: number, userId: number) {
  const result = await db
    .select()
    .from(meals)
    .where(and(
      eq(meals.id, mealId),
      eq(meals.userId, userId)
    ))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

export async function updateMeal(
  mealId: number,
  userId: number,
  mealData: {
    name?: string;
    calories?: number | null;
    protein?: number | null;
    carbs?: number | null;
    fat?: number | null;
    imageUrl?: string | null;
  }
) {
  const updateData: Record<string, any> = {
    ...mealData,
    updated_at: new Date(),
  };

  if (mealData.imageUrl !== undefined) {
    updateData.image_url = mealData.imageUrl;
    delete updateData.imageUrl;
  }

  return await db
    .update(meals)
    .set(updateData)
    .where(and(
      eq(meals.id, mealId),
      eq(meals.userId, userId)
    ))
    .returning();
}

export async function deleteMeal(mealId: number, userId: number) {
  return await db
    .delete(meals)
    .where(and(
      eq(meals.id, mealId),
      eq(meals.userId, userId)
    ));
}

export async function getMealsByDateRange(userId: number, startDate?: string, endDate?: string) {
  let query = db
    .select()
    .from(meals)
    .where(eq(meals.userId, userId));

  if (startDate && endDate) {
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    query = query.where(
      and(
        gte(meals.createdAt, start),
        lte(meals.createdAt, end)
      )
    );
  }

  return await query.orderBy(desc(meals.createdAt));
}
