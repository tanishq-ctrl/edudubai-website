import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function getPrismaClient(): PrismaClient {
  // Skip initialization during build phase
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    // Return a mock client during build that will throw if actually used
    return {} as PrismaClient
  }
  
  if (process.env.NODE_ENV === 'production') {
    if (!globalForPrisma.prisma) {
      globalForPrisma.prisma = new PrismaClient({
        log: ['error'],
      })
    }
    return globalForPrisma.prisma
  } else {
    if (!globalForPrisma.prisma) {
      globalForPrisma.prisma = new PrismaClient({
        log: ['query'],
      })
    }
    return globalForPrisma.prisma
  }
}

// Export a function that returns the client, not the client itself
export function getPrisma(): PrismaClient {
  return getPrismaClient()
}

// For backward compatibility, export a proxy that lazily initializes
export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    const client = getPrismaClient()
    const value = (client as any)[prop]
    if (typeof value === 'function') {
      return value.bind(client)
    }
    return value
  },
})

