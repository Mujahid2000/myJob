import { NextRequest, NextResponse } from 'next/server';

// POST handler
export async function POST(
  req: NextRequest,
  context: { params: { route: string[] } }
) {
  const route = context.params.route.join('/');
  console.log('Received route:', route);

  const body = await req.json();
  console.log('Request body:', body);

  try {
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';
    const response = await fetch(`${backendUrl}/api/paypal/${route}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error('Error:', error.message);
    return NextResponse.json(
      { success: false, message: `Failed: ${error.message}` },
      { status: 500 }
    );
  }
}
