import { NextResponse } from 'next/server';
import { middlewareAuth as auth } from '@/lib/auth-edge';

export const runtime = 'edge';

export default auth((req) => {
  return NextResponse.json({
    env: {
      AUTH_SECRET: !!process.env.AUTH_SECRET ? '✅ set' : '❌ MISSING',
      AUTH_URL: process.env.AUTH_URL || '❌ MISSING',
      AUTH_TRUST_HOST: process.env.AUTH_TRUST_HOST || '❌ MISSING',
      VERCEL_URL: process.env.VERCEL_URL || 'not set',
    },
    auth: req.auth ? `✅ Session active — ${req.auth.user?.email}` : '❌ req.auth is null',
    cookies: req.cookies.getAll().map(c => c.name),
  });
});
