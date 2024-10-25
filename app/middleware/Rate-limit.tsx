import { NextRequest, NextResponse } from 'next/server';

// In-memory store for IP-based rate limiting
const rateLimitMap = new Map();

const RATE_LIMIT = 100; // Max number of requests
const TIME_WINDOW = 60 * 1000; // 1 minute in milliseconds

export async function RateLimitmiddleware(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || req.ip || 'UNKNOWN_IP';
  const now = Date.now();
  
  const userData = rateLimitMap.get(ip) || { count: 0, lastRequest: now };

  if (now - userData.lastRequest > TIME_WINDOW) {
    // Reset the count if outside of time window
    userData.count = 1;
    userData.lastRequest = now;
    rateLimitMap.set(ip, userData);
  } else {
    userData.count++;
    if (userData.count > RATE_LIMIT) {
      // If request limit is exceeded, return a 429 (Too Many Requests) response
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    } else {
      rateLimitMap.set(ip, userData);
    }
  }

  return NextResponse.next(); // Allow the request to continue
}
