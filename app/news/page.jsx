import Link from 'next/link';
import { news } from '@/lib/data';

export default function NewsPage() {
  return (
    <>
      <section className="page-header" style={{ background: 'linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)', padding: '120px 0 60px 0', textAlign: 'center' }}>
        <div className="container">
          <div className="page-header-content">
            <h1 style={{ fontSize: '3rem', marginBottom: '15px' }}>Berita & <span className="text-gradient-cyan">Artikel</span></h1>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>Informasi terbaru seputar kegiatan, riset, dan pengumuman dari Laboratorium EIM.</p>
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ background: 'var(--bg-primary)', minHeight: '60vh' }}>
        <div className="container">
          {news.length === 0 ? (
            <div className="news-empty-state glass-panel">
              <i className="fa-regular fa-newspaper"></i>
              <h3>Belum ada Berita</h3>
              <p>Belum ada artikel atau berita yang dipublikasikan.</p>
            </div>
          ) : (
            <div className="news-grid" id="news-grid">
              {news.map(item => {
                let coverImg = "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=600";
                if (item.image && item.image.length > 0) coverImg = item.image[0];

                return (
                  <div key={item.id} className="news-card glass-panel" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <div className="news-img" style={{ position: 'relative', height: '220px', overflow: 'hidden', borderRadius: '12px 12px 0 0' }}>
                      <img src={coverImg} alt={`Cover ${item.title}`} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }} />
                      <span className="news-tag" style={{ position: 'absolute', top: '15px', right: '15px', background: 'var(--accent-cyan)', color: '#000', padding: '5px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>{item.category}</span>
                    </div>
                    <div className="news-content" style={{ padding: '25px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                      <div className="news-date" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '12px' }}>
                        <i className="fa-regular fa-calendar" style={{ marginRight: '6px' }}></i> {new Date(item.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </div>
                      <h3 style={{ marginBottom: '15px', fontSize: '1.25rem', lineHeight: '1.4' }}>{item.title}</h3>
                      <p className="news-desc" style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '20px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {item.content}
                      </p>
                      <div style={{ marginTop: 'auto' }}>
                        <Link href={`/news/${item.id}`} className="btn btn-secondary btn-read-more" style={{ width: '100%', padding: '10px', fontSize: '0.95rem', textAlign: 'center' }}>
                          Baca Selengkapnya <i className="fa-solid fa-arrow-right" style={{ marginLeft: '5px' }}></i>
                        </Link>
                        <div className="news-footer" style={{ marginTop: '20px', paddingTop: '15px', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                          <span className="news-author"><i className="fa-solid fa-pen-nib" style={{ marginRight: '6px' }}></i> {item.author}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
