import { PrismaTiDBCloud } from "@tidbcloud/prisma-adapter";
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from "../../generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const getClient = () => {
  if (globalForPrisma.prisma) return globalForPrisma.prisma;

  if (process.env.DEPLOY_MODE === "local") {
    // Use 127.0.0.1 instead of localhost to avoid IPv6 resolution delays (DNS lag)
    const adapter = new PrismaMariaDb({
      host: process.env.DATABASE_HOST || '127.0.0.1',
      port: Number(process.env.DATABASE_PORT || 3306),
      user: process.env.DATABASE_USER || 'root',
      password: process.env.DATABASE_PASSWORD || 'root',
      database: process.env.DATABASE_NAME || 'stratos',
      connectionLimit: 20,
    });
    return new PrismaClient({ adapter });
  }

  // Default to Production / TiDB adapter
  const adapter = new PrismaTiDBCloud({ url: process.env.PROD_DATABASE_URL || process.env.DATABASE_URL });
  return new PrismaClient({ adapter });
};

export const db = getClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
