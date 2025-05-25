import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, context: { params: { route?: string[] } }): Promise<NextResponse> {
  try {
    // রাউট সেগমেন্টগুলো একত্রিত করা (যেমন ['create-order', 'capture'] -> 'create-order/capture')
    const route = context.params.route?.join('/') || '';
    console.log('Received route:', route); // ডিবাগ লগ

    // রিকোয়েস্ট বডি পার্স করা
    const body = await req.json();
    console.log('Request body:', body); // ডিবাগ লগ

    // ব্যাকএন্ড URL পরিবেশ ভেরিয়েবল থেকে নেওয়া
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';
    console.log('Forwarding to backend:', `${backendUrl}/api/paypal/${route}`); // ডিবাগ লগ

    // ব্যাকএন্ডে রিকোয়েস্ট ফরওয়ার্ড করা
    const response = await fetch(`${backendUrl}/api/paypal/${route}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    console.log('Backend response status:', response.status); // ডিবাগ লগ
    const data = await response.json();

    // ব্যাকএন্ড থেকে প্রাপ্ত রেসপন্স রিটার্ন করা
    return NextResponse.json(data, { status: response.status });
  } catch (error: unknown) {
    // ত্রুটি হ্যান্ডলিং
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Error forwarding request:', errorMessage); // ত্রুটি লগ
    return NextResponse.json(
      { success: false, message: `Failed to forward request: ${errorMessage}` },
      { status: 500 }
    );
  }
}