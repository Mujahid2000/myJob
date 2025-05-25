import { NextRequest, NextResponse } from 'next/server';

// POST handler for /api/paypal/* routes
export async function POST(req: NextRequest, { params }: { params: { route: string[] } }) {
  // Join route segments into a single string (e.g., ['create-order'] -> 'create-order')
  const route = params.route.join('/');
  console.log('Received route:', route); // Debug log
  const body = await req.json();
  console.log('Request body:', body); // Debug log

  try {
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';
    console.log('Forwarding to backend:', `${backendUrl}/api/paypal/${route}`); // Debug log
    const response = await fetch(`${backendUrl}/api/paypal/${route}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    console.log('Backend response status:', response.status); // Debug log
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error('Error forwarding request:', error.message); // Error log
    return NextResponse.json(
      { success: false, message: `Failed to forward request: ${error.message}` },
      { status: 500 }
    );
  }
}