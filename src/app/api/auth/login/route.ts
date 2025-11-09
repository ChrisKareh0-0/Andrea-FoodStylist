import { NextRequest, NextResponse } from 'next/server';
import { verifyPassword } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    const isValid = await verifyPassword(password);

    if (isValid) {
      return NextResponse.json({
        success: true,
        token: 'admin-authenticated'
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Invalid password'
      }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Server error'
    }, { status: 500 });
  }
}
