import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Get the Python backend URL from environment variables, fallback to localhost for development
    const backendUrl = process.env.CHAT_API_URL || 'http://127.0.0.1:8000';
    
    // Forward the request to the Python backend
    const response = await fetch(`${backendUrl}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      console.error(`Backend returned ${response.status} ${response.statusText}`);
      throw new Error('Failed to fetch from backend');
    }

    const data = await response.json();
    
    // Return the response back to the frontend
    return NextResponse.json({ reply: data.reply });
    
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat request' },
      { status: 500 }
    );
  }
}
