import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

// Se `prisma` não existe em `globalThis` (ou seja, é undefined), crie um novo PrismaClient
// Caso contrário, use o `prisma` existente em `globalThis`
// Isso garante que apenas uma instância do PrismaClient seja criada
const prisma = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}

// Exporte a instância do Prisma Client
export default prisma
