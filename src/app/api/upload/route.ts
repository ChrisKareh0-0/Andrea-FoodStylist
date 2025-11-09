import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== 'Bearer admin-authenticated') {
      return NextResponse.json({
        error: 'Unauthorized'
      }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as string; // 'logo' or 'gallery'

    if (!file) {
      return NextResponse.json({
        error: 'No file provided'
      }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Determine upload directory based on type
    const uploadDir = type === 'logo'
      ? path.join(process.cwd(), 'public', 'assets', 'img', 'client-logos')
      : path.join(process.cwd(), 'public', 'assets', 'img', 'client-gallery');

    // Ensure directory exists
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (err) {
      // Directory already exists, continue
    }

    // Generate unique filename
    const timestamp = Date.now();
    const ext = file.name.split('.').pop();
    const filename = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const filepath = path.join(uploadDir, filename);

    // Write file
    await writeFile(filepath, buffer);

    // Return the public URL
    const publicUrl = type === 'logo'
      ? `/assets/img/client-logos/${filename}`
      : `/assets/img/client-gallery/${filename}`;

    return NextResponse.json({
      success: true,
      filename,
      url: publicUrl
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({
      error: 'Failed to upload file'
    }, { status: 500 });
  }
}
