import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL || "file:dummy.db",
  authToken: process.env.TURSO_AUTH_TOKEN || "dummy",
});

export const db = drizzle(client);
