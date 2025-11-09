import bcrypt from 'bcryptjs';

// Admin credentials - In production, use environment variables
const ADMIN_PASSWORD_HASH = bcrypt.hashSync('admin123', 10);

export async function verifyPassword(password: string): Promise<boolean> {
  return bcrypt.compare(password, ADMIN_PASSWORD_HASH);
}

export function isAuthenticated(request: Request): boolean {
  const authHeader = request.headers.get('authorization');
  return authHeader === 'Bearer admin-authenticated';
}
