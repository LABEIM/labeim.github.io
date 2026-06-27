import { NextResponse } from 'next/server';
import { getDbPool } from '@/lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'eim_secret_key_2026';

export async function POST(request) {
  try {
    const { emailOrUsername, password } = await request.json();

    if (!emailOrUsername || !password) {
      return NextResponse.json({ error: 'Username/Email dan Password wajib diisi' }, { status: 400 });
    }

    const db = await getDbPool();

    // Check by email or username
    const [users] = await db.query(
      'SELECT * FROM users WHERE email = ? OR username = ?',
      [emailOrUsername, emailOrUsername]
    );

    if (users.length === 0) {
      return NextResponse.json({ error: 'Kredensial tidak valid' }, { status: 400 });
    }

    const user = users[0];

    // Restrict access to admin only
    if (user.role !== 'admin') {
      return NextResponse.json({ error: 'Akses ditolak. Hanya untuk Admin.' }, { status: 403 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Kredensial tidak valid' }, { status: 400 });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id, username: user.username, email: user.email, role: user.role, nama: user.nama },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    const response = NextResponse.json({
      message: 'Login berhasil',
      user: { id: user.id, nama: user.nama, username: user.username, role: user.role }
    });

    // Save token in HttpOnly cookie
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/'
    });

    return response;
  } catch (error) {
    console.error('Login API Error:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 });
  }
}
