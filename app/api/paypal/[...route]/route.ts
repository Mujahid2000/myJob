import { NextRequest, NextResponse } from 'next/server';

// POST handler
export async function POST(
  req: NextRequest,
  context: { params: { route?: string[] } }
): Promise<NextResponse> {
  try {
    // Parse the route
    const route = context.params.route?.join('/') || '';
    console.log('Received route:', route);

    // Parse the request body
    let body;
    try {
      body = await req.json();
    } catch (error) {
      console.error('Failed to parse request body:', error);
      return NextResponse.json(
        { success: false, message: 'Invalid request body: Expected JSON' },
        { status: 400 }
      );
    }
    console.log('Request body:', body);

    // Validate backend URL
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';
    if (!backendUrl) {
      console.error('BACKEND_URL is not defined');
      return NextResponse.json(
        { success: false, message: 'Server configuration error: BACKEND_URL not defined' },
        { status: 500 }
      );
    }
    const targetUrl = `${backendUrl}/api/paypal/${route}`;
    console.log('Forwarding to backend:', targetUrl);

    // Forward the request to the backend
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    console.log('Backend response status:', response.status);
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    // Enhanced error logging
    console.error('Error in POST handler:', {
      message: error.message,
      stack: error.stack,
      cause: error.cause,
    });
    return NextResponse.json(
      { success: false, message: `Failed: ${error.message || 'Unknown error'}` },
      { status: 500 }
    );
  }
}