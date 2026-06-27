import { NextResponse } from 'next/server';
import { getDbPool } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    const { nama, username, nim, telp, email, password } = await request.json();

    if (!nama || !username || !nim || !telp || !email || !password) {
      return NextResponse.json({ error: 'Semua field wajib diisi' }, { status: 400 });
    }

    const db = await getDbPool();

    // Check if email or username is already taken
    const [existing] = await db.query('SELECT id FROM users WHERE email = ? OR username = ?', [email, username]);
    if (existing.length > 0) {
      return NextResponse.json({ error: 'Email atau Username sudah terdaftar' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // All registrations via Next.js are created with 'admin' role
    await db.query(
      'INSERT INTO users (nama, username, nim, telp, email, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [nama, username, nim, telp, email, hashedPassword, 'admin']
    );

    return NextResponse.json({ message: 'Registrasi Admin berhasil! Silakan login.' }, { status: 201 });
  } catch (error) {
    console.error('Registration API Error:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 });
  }
}
