import { handleAuth } from '@auth0/nextjs-auth0';

export const GET = handleAuth();
export const POST = handleAuth();

// Configure for App Router
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
