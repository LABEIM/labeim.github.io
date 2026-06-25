import Link from 'next/link';
import { getEventById } from '@/lib/data';

export default async function EventDetailPage({ params }) {
  const resolvedParams = await params;
  const event = getEventById(resolvedParams.id);

  if (!event) {
    return (
      <div className="container page-transition" style={{ paddingTop: '150px', paddingBottom: '100px', textAlign: 'center' }}>
        <h2>Event tidak ditemukan</h2>
        <Link href="/event" className="btn btn-primary" style={{ marginTop: '20px' }}>Kembali ke Events</Link>
      </div>
    );
  }

  const images = event.image || [];

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Top Section */}
      <section style={{ paddingTop: '120px', paddingBottom: '40px', borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-dark-secondary)' }}>
        <div className="container">
          <Link href="/event" className="hover-text-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '0.9rem', fontWeight: '500' }}>
            <i className="fa-solid fa-arrow-left"></i> Kembali
          </Link>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '12px', fontFamily: 'var(--font-heading)' }}>{event.title}</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '1rem' }}>
                <i className="fa-solid fa-users"></i> Laboratorium EIM
              </div>
            </div>
            
            <button className="hover-bg-light" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: '30px', padding: '8px 20px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <i className="fa-solid fa-share-nodes"></i> Bagikan
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section style={{ padding: '60px 0' }}>
        <div className="container responsive-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '40px', alignItems: 'start' }}>
          
          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            
            {/* Deskripsi */}
            <div>
              <h3 style={{ fontSize: '1.4rem', color: '#11B4BD', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px', fontFamily: 'var(--font-heading)' }}>
                <i className="fa-solid fa-circle-info"></i> Deskripsi Kegiatan
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '1.05rem', whiteSpace: 'pre-line' }}>
                {event.description}
              </p>
            </div>

            {/* Dokumentasi */}
            {images.length > 0 && (
              <div>
                <h3 style={{ fontSize: '1.4rem', color: '#11B4BD', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px', fontFamily: 'var(--font-heading)' }}>
                  <i className="fa-solid fa-image"></i> Dokumentasi
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
                  {images.map((img, idx) => (
                    <div key={idx} style={{ borderRadius: '10px', overflow: 'hidden', height: '150px' }}>
                      <img src={img} alt={`Dokumentasi ${idx + 1}`} className="hover-scale" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Column (Sidebar) */}
          <div className="glass-panel" style={{ borderRadius: '16px', padding: '30px', boxShadow: 'var(--shadow-md)' }}>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '24px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', fontFamily: 'var(--font-heading)' }}>
              Informasi Penting
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '30px' }}>
              {/* Tanggal */}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--bg-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#11B4BD', fontSize: '1.2rem', flexShrink: 0, border: '1px solid var(--border-color)' }}>
                  <i className="fa-regular fa-calendar"></i>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Tanggal Pelaksanaan</div>
                  <div style={{ color: 'var(--text-primary)', fontWeight: '600', fontSize: '0.95rem' }}>{event.event_date || "-"}</div>
                </div>
              </div>

              {/* Status */}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--bg-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#11B4BD', fontSize: '1.2rem', flexShrink: 0, border: '1px solid var(--border-color)' }}>
                  <i className={`fa-solid ${event.status === 'completed' ? 'fa-circle-check' : 'fa-clock'}`}></i>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Status</div>
                  <div style={{ color: 'var(--text-primary)', fontWeight: '600', fontSize: '0.95rem' }}>{event.status === 'completed' ? 'Selesai' : 'Akan Datang'}</div>
                </div>
              </div>

              {/* Kategori */}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--bg-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#11B4BD', fontSize: '1.2rem', flexShrink: 0, border: '1px solid var(--border-color)' }}>
                  <i className="fa-solid fa-tag"></i>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Kategori</div>
                  <div style={{ color: 'var(--text-primary)', fontWeight: '600', fontSize: '0.95rem' }}>{event.category || "-"}</div>
                </div>
              </div>
            </div>

            {event.status !== 'completed' && (
              <>
                <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '1rem', borderRadius: '8px', marginBottom: '16px' }}>
                  Daftar Sekarang
                </button>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', margin: 0, lineHeight: '1.6' }}>
                  *Akan diarahkan ke form<br/>pendaftaran kegiatan
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Responsive media query */}
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 991px) {
          .responsive-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}} />
    </div>
  );
}
