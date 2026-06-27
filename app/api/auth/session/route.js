import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'eim_secret_key_2026';

export async function GET(request) {
  try {
    const tokenCookie = request.cookies.get('admin_token');
    
    if (!tokenCookie) {
      return NextResponse.json({ loggedIn: false, role: 'guest' });
    }

    const decoded = jwt.verify(tokenCookie.value, JWT_SECRET);
    
    return NextResponse.json({
      loggedIn: true,
      user: {
        id: decoded.userId,
        nama: decoded.nama,
        username: decoded.username,
        email: decoded.email,
        role: decoded.role
      }
    });
  } catch (error) {
    // If token is invalid or expired
    return NextResponse.json({ loggedIn: false, role: 'guest' });
  }
}
