import 'dotenv/config'
import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import type { Environment } from 'vitest/environments'
import { prisma } from '@/lib/prisma.js'

function generateDatabaseUrl(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined in environment variables')
  }
  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schema)
  console.log('[TEST DB]', url.toString())
  return url.toString()
}

export default {
  name: 'prisma',
  transformMode: 'ssr',
  async setup() {
    const schema = randomUUID()
    const databaseUrl = generateDatabaseUrl(schema)

    process.env.DATABASE_URL = databaseUrl

    // Use db push instead of migrate deploy for testing environments
    execSync('npx prisma db push', { stdio: 'inherit' })

    return {
      async teardown() {
        try {
          await prisma.$executeRawUnsafe(
            `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
          )
        } catch (err) {
          console.error('[Prisma Test Env] Failed to drop schema:', err)
        } finally {
          await prisma.$disconnect()
        }
      },
    }
  },
} as Environment
