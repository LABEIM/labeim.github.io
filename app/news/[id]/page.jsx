import Link from 'next/link';
import { getNewsById } from '@/lib/data';

export default async function NewsDetailPage({ params }) {
  const resolvedParams = await params;
  const news = getNewsById(resolvedParams.id);

  if (!news) {
    return (
      <div className="container" style={{ paddingTop: '150px', paddingBottom: '100px', textAlign: 'center' }}>
        <h2>Berita tidak ditemukan</h2>
        <Link href="/news" className="btn btn-primary" style={{ marginTop: '20px' }}>Kembali ke Berita</Link>
      </div>
    );
  }

  const images = news.image || [];
  const coverImg = images.length > 0 ? images[0] : "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1200";

  return (
    <>
      <section className="page-header" style={{ paddingTop: '150px', paddingBottom: '50px' }}>
        <div className="container">
          <div className="page-header-content">
            <h1>{news.title}</h1>
            <p style={{ marginTop: '15px', color: 'var(--text-secondary)' }}>Kategori: {news.category} | Oleh: {news.author}</p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="glass-panel" style={{ padding: '40px' }}>
            <img src={coverImg} alt={news.title} style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '15px', marginBottom: '30px' }} />
            <div style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
              <i className="fa-regular fa-calendar"></i> {new Date(news.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            
            <div className="content-body" style={{ lineHeight: '1.8', fontSize: '1.1rem', color: '#dddddd', whiteSpace: 'pre-line' }}>
              {news.content}
            </div>

            <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid var(--border-color)', textAlign: 'center' }}>
              <Link href="/news" className="btn btn-outline">
                <i className="fa-solid fa-arrow-left"></i> Kembali ke Berita
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
