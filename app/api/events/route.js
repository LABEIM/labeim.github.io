import { NextResponse } from 'next/server';
import { getDbPool } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = await getDbPool();
    const [rows] = await db.query('SELECT * FROM events ORDER BY event_date DESC');
    
    // Parse JSON strings to arrays for client response consistency
    const events = rows.map(event => {
      let image = [];
      let benefits = [];
      let requirements = [];
      
      try { 
        image = event.image ? JSON.parse(event.image) : []; 
      } catch(e) { 
        image = event.image ? [event.image] : []; 
      }
      try { 
        benefits = event.benefits ? JSON.parse(event.benefits) : []; 
      } catch(e) { 
        benefits = []; 
      }
      try { 
        requirements = event.requirements ? JSON.parse(event.requirements) : []; 
      } catch(e) { 
        requirements = []; 
      }
      
      return {
        ...event,
        image,
        benefits,
        requirements,
        show_register: event.show_register !== 0
      };
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error('Events GET API Error:', error);
    return NextResponse.json({ error: 'Gagal mengambil data event' }, { status: 500 });
  }
}


export async function POST(request) {
  try {
    const admin = await getAdminSession();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, category, status, event_date, description, link, image, icon, organizer, benefits, requirements, show_register } = body;

    if (!title || !category || !status || !event_date || !description) {
      return NextResponse.json({ error: 'Field penting wajib diisi' }, { status: 400 });
    }

    const db = await getDbPool();
    
    // Ensure arrays are stringified for DB storage
    const imgStr = typeof image === 'string' ? image : JSON.stringify(image || []);
    const benefitsStr = typeof benefits === 'string' ? benefits : JSON.stringify(benefits || []);
    const reqStr = typeof requirements === 'string' ? requirements : JSON.stringify(requirements || []);
    const showRegVal = show_register === undefined ? 1 : (show_register ? 1 : 0);

    await db.query(
      'INSERT INTO events (title, category, status, event_date, description, link, image, icon, organizer, benefits, requirements, show_register) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [title, category, status, event_date, description, link || 'event-detail.php', imgStr, icon || 'fa-calendar', organizer || '', benefitsStr, reqStr, showRegVal]
    );

    return NextResponse.json({ message: 'Event berhasil ditambahkan' }, { status: 201 });
  } catch (error) {
    console.error('Events POST API Error:', error);
    return NextResponse.json({ error: 'Gagal menyimpan event' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const admin = await getAdminSession();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { id, title, category, status, event_date, description, link, image, icon, organizer, benefits, requirements, show_register } = body;

    if (!id || !title || !category || !status || !event_date || !description) {
      return NextResponse.json({ error: 'Data tidak lengkap' }, { status: 400 });
    }

    const db = await getDbPool();

    // Ensure arrays are stringified for DB storage
    const imgStr = typeof image === 'string' ? image : JSON.stringify(image || []);
    const benefitsStr = typeof benefits === 'string' ? benefits : JSON.stringify(benefits || []);
    const reqStr = typeof requirements === 'string' ? requirements : JSON.stringify(requirements || []);
    const showRegVal = show_register === undefined ? 1 : (show_register ? 1 : 0);

    await db.query(
      'UPDATE events SET title=?, category=?, status=?, event_date=?, description=?, link=?, image=?, icon=?, organizer=?, benefits=?, requirements=?, show_register=? WHERE id=?',
      [title, category, status, event_date, description, link || 'event-detail.php', imgStr, icon || 'fa-calendar', organizer || '', benefitsStr, reqStr, showRegVal, id]
    );

    return NextResponse.json({ message: 'Event berhasil diperbarui' });
  } catch (error) {
    console.error('Events PUT API Error:', error);
    return NextResponse.json({ error: 'Gagal memperbarui event' }, { status: 500 });
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
    await db.query('DELETE FROM events WHERE id = ?', [id]);

    return NextResponse.json({ message: 'Event berhasil dihapus' });
  } catch (error) {
    console.error('Events DELETE API Error:', error);
    return NextResponse.json({ error: 'Gagal menghapus event' }, { status: 500 });
  }
}
