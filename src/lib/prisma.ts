// Lazy import PrismaClient to avoid issues during build
let PrismaClient: any

function getPrismaClientModule() {
  if (!PrismaClient) {
    try {
      PrismaClient = require('@prisma/client').PrismaClient
    } catch (error) {
      // Prisma Client not generated yet - this should not happen in production
      throw new Error('Prisma Client has not been generated. Please run "prisma generate" first.')
    }
  }
  return PrismaClient
}

const globalForPrisma = globalThis as unknown as {
  prisma: any | undefined
}

function getPrismaClient() {
  // Skip initialization during build phase
  if (process.env.NEXT_PHASE === 'phase-production-build' || process.env.VERCEL === '1') {
    // During Vercel build, try to initialize but handle gracefully if it fails
    try {
      const Prisma = getPrismaClientModule()
      if (!globalForPrisma.prisma) {
        globalForPrisma.prisma = new Prisma({
          log: process.env.NODE_ENV === 'development' ? ['query'] : ['error'],
        })
      }
      return globalForPrisma.prisma
    } catch (error) {
      // If Prisma Client isn't generated, return a mock that will fail gracefully
      console.warn('Prisma Client not available during build:', error)
      return {} as any
    }
  }
  
  const Prisma = getPrismaClientModule()
  
  if (process.env.NODE_ENV === 'production') {
    if (!globalForPrisma.prisma) {
      globalForPrisma.prisma = new Prisma({
        log: ['error'],
      })
    }
    return globalForPrisma.prisma
  } else {
    if (!globalForPrisma.prisma) {
      globalForPrisma.prisma = new Prisma({
        log: ['query'],
      })
    }
    return globalForPrisma.prisma
  }
}

// Export a function that returns the client, not the client itself
export function getPrisma() {
  return getPrismaClient()
}

// For backward compatibility, export a proxy that lazily initializes
export const prisma = new Proxy({} as any, {
  get(_target, prop) {
    try {
      const client = getPrismaClient()
      const value = (client as any)[prop]
      if (typeof value === 'function') {
        return value.bind(client)
      }
      return value
    } catch (error) {
      // Return a no-op function if Prisma isn't available
      return () => {
        throw new Error('Prisma Client is not available. Please ensure "prisma generate" has been run.')
      }
    }
  },
})

