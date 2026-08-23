import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Contact from '@/models/Contact';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, academyName, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    if (!email.includes('@')) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    const conn = await connectToDatabase();

    if (conn) {
      // Store in MongoDB Atlas
      await Contact.create({
        name,
        email,
        academyName: academyName || '',
        message,
      });
    } else {
      console.log('[Contact Mock Success] Received contact submission:', {
        name,
        email,
        academyName,
        message,
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Your message was received.',
    });
  } catch (error: unknown) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error. Please try again.' },
      { status: 500 }
    );
  }
}
