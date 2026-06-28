import { PrismaClient } from '@prisma/client';
const globalPrisma = globalThis as unknown as {
    prisma : PrismaClient | undefined;
}

const globalForPrisa = globalThis as {
    prisma? : PrismaClient;
};
export const prisma = globalForPrisa.prisma ?? new PrismaClient()

if(process.env.NODE_ENV !== "production"){
    globalForPrisa.prisma = prisma;
}