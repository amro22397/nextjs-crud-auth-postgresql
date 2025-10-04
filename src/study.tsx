import { neon } from "@neondatabase/serverless";
import React from "react";
import { stackServerApp } from "./stack/server";

export async function getUserDetails(userId: string | undefined) {

    // i have 3 things

    if (!process.env.DATABASE_URL) {
        throw new Error("Database is not set")
    }

    if (!userId) {
        return null;
    }

    const sql = neon(process.env.DATABASE_URL);

    const [user] = await sql`SELECT * FROM neon_auth.users_sync WHERE id = ${userId}`

    return user;
}

// the id in prisma model
// id String @id @default(cuid())

const study = async ({params}: {params: {slug: string}}) => {

    const user = await stackServerApp.getUser();
  return <div>study</div>;
};

export default study;
