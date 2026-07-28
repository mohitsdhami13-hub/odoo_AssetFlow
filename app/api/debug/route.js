import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const results = {
    env: {
      DATABASE_URL: !!process.env.DATABASE_URL ? '✅ set' : '❌ MISSING',
      AUTH_SECRET: !!process.env.AUTH_SECRET ? '✅ set' : '❌ MISSING',
      AUTH_URL: process.env.AUTH_URL || '❌ MISSING',
      AUTH_TRUST_HOST: process.env.AUTH_TRUST_HOST || '❌ MISSING',
      VERCEL_URL: process.env.VERCEL_URL || 'not set (local)',
      NODE_ENV: process.env.NODE_ENV,
    },
    db: null,
    error: null,
  };

  try {
    const { PrismaClient } = await import('@prisma/client');
    const { PrismaPg } = await import('@prisma/adapter-pg');
    const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
    const client = new PrismaClient({ adapter });
    const userCount = await client.user.count();
    await client.$disconnect();
    results.db = `✅ Connected — ${userCount} users`;
  } catch (e) {
    results.db = '❌ FAILED';
    results.error = e.message;
  }

  return NextResponse.json(results, { status: 200 });
}
