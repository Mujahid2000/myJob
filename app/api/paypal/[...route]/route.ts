import { NextRequest, NextResponse } from 'next/server';
import type { NextApiRequest } from 'next';

export async function POST(
  req: NextRequest,
  { params }: { params: { route?: string[] } }
) {
  const route = params.route?.join('/') || '';
  console.log('Received route:', route);

  const body = await req.json();
  console.log('Request body:', body);

  try {
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';
    console.log('Forwarding to backend:', `${backendUrl}/api/paypal/${route}`);
    const response = await fetch(`${backendUrl}/api/paypal/${route}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    console.log('Backend response status:', response.status);
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error('Error forwarding request:', error.message);
    return NextResponse.json(
      { success: false, message: `Failed to forward request: ${error.message}` },
      { status: 500 }
    );
  }
}
