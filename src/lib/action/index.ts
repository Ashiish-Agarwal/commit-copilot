"use server";

import { db } from "~/server/db";
import {  } from "~/server/db/schema";
import { and, eq } from "drizzle-orm";
import getSessioncheck from "~/lib/action";
import { commitTable } from "auth-schema";

export type DashboardData = {
  repoName: string;
  filePath: string;
  schedule: "everyday" | "weekends";
  commitsPerDay: number;
  commitsToday: number;
  lastResetDate: string | null;
  githubUsername: string;
  createdAt: Date;
  updatedAt: Date;
};

export type DashboardResult = {
  data: DashboardData | null;
  username: string | null;
  avatarUrl: string | null;
  nextCronMinutes: number;
};

export default async function getDashboardData(productid: string): Promise<DashboardResult> {
  const session = await getSessioncheck();
  if (!session) {
    throw new Error("User not authenticated");
  }

  const userId = session.user.id;
  const now = new Date();
  const today = now.toISOString().split("T")[0]!;
  const nextCronMinutes = 10 - (now.getMinutes() % 10);

  try {
    const rows = await db
      .select()
      .from(commitTable)
      .where(and(eq(commitTable.userId, userId), eq(commitTable.id, productid)))
      // .limit(1);

     const row = rows[0];

    if (!row) {
      return { data: null, username: session.user.name ?? null, avatarUrl: session.user.image ?? null, nextCronMinutes };
    }

    return {
      data: {
        repoName: row.repoName,
        filePath: row.filePath,
        schedule: row.schedule as "everyday" | "weekends",
        commitsPerDay: row.commitsPerDay,
        commitsToday: row.lastResetDate === today ? (row.commitsToday ?? 0) : 0,
        lastResetDate: row.lastResetDate ?? null,
        githubUsername: row.githubUsername,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
      },
      username: session.user.name ?? null,
      avatarUrl: session.user.image ?? null,
      nextCronMinutes,
    };
  } catch (error) {
    console.error(error);
    return { data: null, username: session.user.name ?? null, avatarUrl: session.user.image ?? null, nextCronMinutes };
  }
}

export async function stop_automatic_commits(){
     const session = await getSessioncheck();
  if (!session) {
    throw new Error("User not authenticated");
  }

  const userId = session.user.id;


    
}