import Link from 'next/link';
import { getNewsById } from '@/lib/data';

export default async function NewsDetailPage({ params }) {
  const resolvedParams = await params;
  const news = getNewsById(resolvedParams.id);

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
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '40px', alignItems: 'start' }} className="responsive-grid">
          
          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            
            {/* Deskripsi */}
            <div>
              <h3 style={{ fontSize: '1.4rem', color: '#11B4BD', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px', fontFamily: 'var(--font-heading)' }}>
                <i className="fa-solid fa-graduation-cap"></i> Deskripsi
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '1.05rem', whiteSpace: 'pre-line' }}>
                {news.content}
              </p>
            </div>

            {/* Keuntungan Beasiswa */}
            {news.benefits && news.benefits.length > 0 && (
              <div>
                <h3 style={{ fontSize: '1.4rem', color: '#11B4BD', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px', fontFamily: 'var(--font-heading)' }}>
                  <i className="fa-solid fa-dollar-sign"></i> Keuntungan Beasiswa
                </h3>
                <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                  {news.benefits.map((benefit, idx) => (
                    <li key={idx} style={{ color: 'var(--text-secondary)', marginBottom: '14px', paddingLeft: '24px', position: 'relative', lineHeight: '1.6', fontSize: '1rem' }}>
                      <span style={{ position: 'absolute', left: 0, top: '10px', width: '5px', height: '5px', backgroundColor: 'var(--accent-cyan)', borderRadius: '50%' }}></span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Persyaratan */}
            {news.requirements && news.requirements.length > 0 && (
              <div>
                <h3 style={{ fontSize: '1.4rem', color: '#11B4BD', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px', fontFamily: 'var(--font-heading)' }}>
                  <i className="fa-regular fa-circle-check"></i> Persyaratan
                </h3>
                <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                  {news.requirements.map((req, idx) => (
                    <li key={idx} style={{ color: '#cbd5e1', marginBottom: '14px', paddingLeft: '24px', position: 'relative', lineHeight: '1.6', fontSize: '1rem' }}>
                      <span style={{ position: 'absolute', left: 0, top: '10px', width: '5px', height: '5px', backgroundColor: '#cbd5e1', borderRadius: '50%' }}></span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>

          {/* Right Column (Sidebar) */}
          <div className="glass-panel" style={{ borderRadius: '16px', padding: '30px', boxShadow: 'var(--shadow-md)' }}>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '24px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', fontFamily: 'var(--font-heading)' }}>
              Informasi Penting
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '30px' }}>
              {/* Tenggat Waktu */}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--bg-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#11B4BD', fontSize: '1.2rem', flexShrink: 0, border: '1px solid var(--border-color)' }}>
                  <i className="fa-regular fa-calendar"></i>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Tenggat Waktu</div>
                  <div style={{ color: 'var(--text-primary)', fontWeight: '600', fontSize: '0.95rem' }}>{news.deadline || "Tidak ditentukan"}</div>
                </div>
              </div>

              {/* Kategori */}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--bg-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#11B4BD', fontSize: '1.2rem', flexShrink: 0, border: '1px solid var(--border-color)' }}>
                  <i className="fa-solid fa-dollar-sign"></i>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Kategori</div>
                  <div style={{ color: 'var(--text-primary)', fontWeight: '600', fontSize: '0.95rem' }}>{news.category || "-"}</div>
                </div>
              </div>

              {/* Penyelenggara */}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--bg-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#11B4BD', fontSize: '1.2rem', flexShrink: 0, border: '1px solid var(--border-color)' }}>
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Penyelenggara</div>
                  <div style={{ color: 'var(--text-primary)', fontWeight: '600', fontSize: '0.95rem' }}>{news.provider || news.author || "-"}</div>
                </div>
              </div>
            </div>

            <Link href={news.register_link || "#"} target="_blank" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '1rem', borderRadius: '8px', marginBottom: '16px' }}>
              Daftar Sekarang
            </Link>
            
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', margin: 0, lineHeight: '1.6' }}>
              *Akan diarahkan ke website resmi<br/>penyelenggara
            </p>
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
