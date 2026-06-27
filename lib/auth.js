import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'eim_secret_key_2026';

export async function getAdminSession() {
  try {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get('admin_token');
    
    if (!tokenCookie) return null;

    const decoded = jwt.verify(tokenCookie.value, JWT_SECRET);
    
    if (decoded && decoded.role === 'admin') {
      return decoded;
    }
    
    return null;
  } catch (error) {
    return null;
  }
}
