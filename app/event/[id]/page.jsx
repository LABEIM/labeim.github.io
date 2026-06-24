import Link from 'next/link';
import { getEventById } from '@/lib/data';

export default async function EventDetailPage({ params }) {
  const resolvedParams = await params;
  const event = getEventById(resolvedParams.id);

  if (!event) {
    return (
      <div className="container" style={{ paddingTop: '150px', paddingBottom: '100px', textAlign: 'center' }}>
        <h2>Event tidak ditemukan</h2>
        <Link href="/event" className="btn btn-primary" style={{ marginTop: '20px' }}>Kembali ke Events</Link>
      </div>
    );
  }

  const images = event.image || [];
  const coverImg = images.length > 0 ? images[0] : "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1200";

  return (
    <>
      <section className="page-header" style={{ paddingTop: '150px', paddingBottom: '50px' }}>
        <div className="container">
          <div className="page-header-content">
            <h1>{event.title}</h1>
            <p style={{ marginTop: '15px', color: 'var(--text-secondary)' }}>Kategori: {event.category}</p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="glass-panel" style={{ padding: '40px' }}>
            <div style={{ marginBottom: '30px', borderRadius: '15px', overflow: 'hidden' }}>
              <img src={coverImg} alt={event.title} style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }} />
            </div>

            <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', flexWrap: 'wrap' }}>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '15px 25px', borderRadius: '10px' }}>
                <i className="fa-regular fa-calendar" style={{ color: 'var(--accent-red)', marginRight: '10px' }}></i>
                <strong>Tanggal:</strong> {event.event_date}
              </div>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '15px 25px', borderRadius: '10px' }}>
                <i className={`fa-solid ${event.status === 'completed' ? 'fa-circle-check' : 'fa-clock'}`} style={{ color: 'var(--accent-cyan)', marginRight: '10px' }}></i>
                <strong>Status:</strong> {event.status === 'completed' ? 'Selesai' : 'Akan Datang'}
              </div>
            </div>

            <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Deskripsi Kegiatan</h3>
            <div style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '40px', whiteSpace: 'pre-wrap' }}>
              {event.description}
            </div>

            {images.length > 1 && (
              <>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Dokumentasi</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
                  {images.slice(1).map((img, idx) => (
                    <div key={idx} style={{ borderRadius: '10px', overflow: 'hidden', height: '150px' }}>
                      <img src={img} alt={`Dokumentasi ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} />
                    </div>
                  ))}
                </div>
              </>
            )}

            <div style={{ marginTop: '40px', textAlign: 'center' }}>
              <Link href="/event" className="btn btn-secondary">
                <i className="fa-solid fa-arrow-left" style={{ marginRight: '8px' }}></i> Kembali ke Events
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
