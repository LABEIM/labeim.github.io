import { NextResponse } from 'next/server';
import { getDbPool } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  try {
    const db = await getDbPool();
    const [rows] = await db.query('SELECT * FROM news ORDER BY news_date DESC');

    const news = rows.map(item => {
      let image = [];
      try { 
        image = item.image ? JSON.parse(item.image) : []; 
      } catch(e) { 
        image = item.image ? [item.image] : []; 
      }
      return {
        ...item,
        date: item.news_date, // map news_date to date for frontend compatibility
        image
      };
    });

    return NextResponse.json(news);
  } catch (error) {
    console.error('News GET API Error:', error);
    return NextResponse.json({ error: 'Gagal mengambil data berita' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const admin = await getAdminSession();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, category, author, content, image } = body;

    if (!title || !category || !author || !content) {
      return NextResponse.json({ error: 'Field penting wajib diisi' }, { status: 400 });
    }

    const db = await getDbPool();
    const imgStr = typeof image === 'string' ? image : JSON.stringify(image || []);

    const date = new Date().toISOString().split('T')[0];

    await db.query(
      'INSERT INTO news (title, category, author, news_date, content, image) VALUES (?, ?, ?, ?, ?, ?)',
      [title, category, author, date, content, imgStr]
    );

    return NextResponse.json({ message: 'Berita berhasil ditambahkan' }, { status: 201 });
  } catch (error) {
    console.error('News POST API Error:', error);
    return NextResponse.json({ error: 'Gagal menyimpan berita' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const admin = await getAdminSession();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { id, title, category, author, content, image } = body;

    if (!id || !title || !category || !author || !content) {
      return NextResponse.json({ error: 'Data tidak lengkap' }, { status: 400 });
    }

    const db = await getDbPool();
    const imgStr = typeof image === 'string' ? image : JSON.stringify(image || []);

    await db.query(
      'UPDATE news SET title=?, category=?, author=?, content=?, image=? WHERE id=?',
      [title, category, author, content, imgStr, id]
    );

    return NextResponse.json({ message: 'Berita berhasil diperbarui' });
  } catch (error) {
    console.error('News PUT API Error:', error);
    return NextResponse.json({ error: 'Gagal memperbarui berita' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const admin = await getAdminSession();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: 'ID wajib disertakan' }, { status: 400 });
    }

    const db = await getDbPool();
    await db.query('DELETE FROM news WHERE id = ?', [id]);

    return NextResponse.json({ message: 'Berita berhasil dihapus' });
  } catch (error) {
    console.error('News DELETE API Error:', error);
    return NextResponse.json({ error: 'Gagal menghapus berita' }, { status: 500 });
  }
}
