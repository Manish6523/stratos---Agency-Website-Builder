import { PrismaTiDBCloud } from "@tidbcloud/prisma-adapter";
import { PrismaClient } from "../../generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const getClient = () => {
  if (globalForPrisma.prisma) return globalForPrisma.prisma;

  const adapter = new PrismaTiDBCloud({ url: process.env.DATABASE_URL });

  return new PrismaClient({ adapter });
};

export const db = getClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}