import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Waitlist from '@/models/Waitlist';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, role, source } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, message: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    const conn = await connectToDatabase();

    if (conn) {
      // Store in MongoDB Atlas
      await Waitlist.create({
        email,
        role: role || 'Institution Owner / Leader',
        source: source || 'Website Waitlist Modal',
      });
    } else {
      console.log('[Waitlist Mock Success] Received entry without active MONGODB_URI:', {
        email,
        role,
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      success: true,
      message: "You're on the early access waitlist! We'll notify you first when CampusNova launches.",
    });
  } catch (error: any) {
    console.error('Waitlist API Error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error processing your request. Please try again later.' },
      { status: 500 }
    );
  }
}
