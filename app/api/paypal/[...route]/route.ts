import { NextRequest, NextResponse } from 'next/server';

// Define the type for the dynamic route params
type RouteParams = {
  params: {
    route: string[];
  };
};

// POST handler for /api/paypal/* routes
export async function POST(req: NextRequest, { params }: RouteParams): Promise<NextResponse> {
  try {
    // Join route segments into a single string (e.g., ['create-order'] -> 'create-order')
    const route = params.route.join('/');
    console.log('Received route:', route); // Debug log

    // Parse the request body
    const body = await req.json();
    console.log('Request body:', body); // Debug log

    // Get the backend URL from environment variables
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';
    console.log('Forwarding to backend:', `${backendUrl}/api/paypal/${route}`); // Debug log

    // Forward the request to the backend
    const response = await fetch(`${backendUrl}/api/paypal/${route}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    console.log('Backend response status:', response.status); // Debug log
    const data = await response.json();

    // Return the backend response
    return NextResponse.json(data, { status: response.status });
  } catch (error: unknown) {
    // Handle errors with safer typing
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Error forwarding request:', errorMessage); // Error log
    return NextResponse.json(
      { success: false, message: `Failed to forward request: ${errorMessage}` },
      { status: 500 }
    );
  }
}