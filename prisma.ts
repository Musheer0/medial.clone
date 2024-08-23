import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient();
};

// Extend the global object to hold the Prisma Client instance
declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

// Initialize the Prisma Client or reuse the existing one
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

// In development, store the Prisma Client instance in globalThis
if (process.env.NODE_ENV !== 'production') {
  globalThis.prismaGlobal = prisma;
}
