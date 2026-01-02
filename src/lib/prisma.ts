// Lazy import PrismaClient to avoid issues during build
let PrismaClient: any

function getPrismaClientModule() {
  if (!PrismaClient) {
    // During build phase, don't try to load Prisma Client
    if (process.env.NEXT_PHASE === 'phase-production-build') {
      throw new Error('Prisma Client should not be accessed during build phase')
    }
    
    try {
      PrismaClient = require('@prisma/client').PrismaClient
    } catch (error: any) {
      // Prisma Client not generated yet
      if (error.code === 'MODULE_NOT_FOUND' || error.message?.includes('Prisma Client')) {
        throw new Error('Prisma Client has not been generated. Please run "prisma generate" first.')
      }
      throw error
    }
  }
  return PrismaClient
}

const globalForPrisma = globalThis as unknown as {
  prisma: any | undefined
}

function getPrismaClient() {
  // Skip initialization during build phase
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    // During build, throw an error to prevent usage
    throw new Error('Prisma Client cannot be accessed during build phase. This route should be marked as dynamic.')
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

