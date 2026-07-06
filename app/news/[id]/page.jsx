import Link from 'next/link';
import { getDbPool } from '@/lib/db';

export default async function NewsDetailPage({ params }) {
  const resolvedParams = await params;
  
  let news = null;
  try {
    const db = await getDbPool();
    const [rows] = await db.query('SELECT * FROM news WHERE id = ?', [resolvedParams.id]);
    if (rows.length > 0) {
      const item = rows[0];
      
      let image = [];
      try { 
        image = item.image ? JSON.parse(item.image) : []; 
      } catch(err) { 
        image = item.image ? [item.image] : []; 
      }
      
      news = {
        ...item,
        date: item.news_date,
        image
      };
    }
  } catch (err) {
    console.error('Failed to query news detail from database:', err);
  }

  if (!news) {
    return (
      <div className="container page-transition" style={{ paddingTop: '150px', paddingBottom: '100px', textAlign: 'center' }}>
        <h2>Berita tidak ditemukan</h2>
        <Link href="/news" className="btn btn-primary" style={{ marginTop: '20px' }}>Kembali ke Berita</Link>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Top Section */}
      <section style={{ paddingTop: '120px', paddingBottom: '40px', borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-dark-secondary)' }}>
        <div className="container">
          <Link href="/news" className="hover-text-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '0.9rem', fontWeight: '500' }}>
            <i className="fa-solid fa-arrow-left"></i> Kembali
          </Link>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '12px', fontFamily: 'var(--font-heading)' }}>{news.title}</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '1rem' }}>
                <i className="fa-regular fa-building"></i> {news.provider || news.author}
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            
            {/* Cover Image */}
            {news.image && news.image.length > 0 && (
              <div style={{ borderRadius: '16px', overflow: 'hidden', width: '100%', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                <img src={news.image[0]} alt={news.title} style={{ width: '100%', maxHeight: '500px', objectFit: 'cover', display: 'block' }} />
              </div>
            )}

            {/* Content */}
            <div className="news-content-body" style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '1.1rem', whiteSpace: 'pre-line' }}>
              {news.content}
            </div>
          </div>

          {/* Right Column (Sidebar) */}
          <div className="glass-panel" style={{ borderRadius: '16px', padding: '30px', boxShadow: 'var(--shadow-md)', position: 'sticky', top: '100px' }}>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '24px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', fontFamily: 'var(--font-heading)' }}>
              Informasi Berita
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '30px' }}>
              {/* Tanggal */}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--bg-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#11B4BD', fontSize: '1.2rem', flexShrink: 0, border: '1px solid var(--border-color)' }}>
                  <i className="fa-regular fa-calendar-days"></i>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Tanggal Publikasi</div>
                  <div style={{ color: 'var(--text-primary)', fontWeight: '600', fontSize: '0.95rem' }}>
                    {new Date(news.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                </div>
              </div>

              {/* Kategori */}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--bg-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#11B4BD', fontSize: '1.2rem', flexShrink: 0, border: '1px solid var(--border-color)' }}>
                  <i className="fa-solid fa-tag"></i>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Kategori</div>
                  <div style={{ color: 'var(--text-primary)', fontWeight: '600', fontSize: '0.95rem' }}>{news.category || "-"}</div>
                </div>
              </div>

              {/* Penulis */}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--bg-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#11B4BD', fontSize: '1.2rem', flexShrink: 0, border: '1px solid var(--border-color)' }}>
                  <i className="fa-solid fa-pen-nib"></i>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Penulis</div>
                  <div style={{ color: 'var(--text-primary)', fontWeight: '600', fontSize: '0.95rem' }}>{news.author || "-"}</div>
                </div>
              </div>
            </div>

            <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '0.95rem', borderRadius: '8px', display: 'flex', gap: '8px', alignItems: 'center' }}>
              <i className="fa-solid fa-share-nodes"></i> Bagikan Berita
            </button>
          </div>
        </div>
      </section>

      {/* Add a responsive media query for grid */}
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
