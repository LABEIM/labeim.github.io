import Link from 'next/link';
import { events, news } from '@/lib/data';

export default function Home() {
  const latestEvents = events.slice(0, 3);
  const latestNews = news.slice(0, 3);

  return (
    <>
      <header className="hero" id="home">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <div className="hero-tag">
                <span></span> Enterprise Infrastructure Management Lab
              </div>
              <h1>
                Membangun <span className="text-gradient-red">Infrastruktur</span> Digital Masa Depan dengan <span className="text-gradient-cyan">Riset & AI</span>
              </h1>
              <p className="hero-desc">
                Kami melakukan riset, pengkajian mendalam, dan pelatihan di bidang teknologi jaringan enterprise, optimalisasi data center, cloud computing, serta otomasi infrastruktur.
              </p>
              <div className="hero-actions">
                <Link href="/pendaftaran" className="btn btn-primary" style={{ boxShadow: 'var(--glow-cyan-intense)', transform: 'scale(1.05)' }}>
                  Daftar Asisten Sekarang <i className="fa-solid fa-user-plus"></i>
                </Link>
                <Link href="/structure" className="btn btn-secondary">
                  Lihat Struktur Asisten <i className="fa-solid fa-users"></i>
                </Link>
              </div>
            </div>
            <div className="hero-visual">
              <div className="visual-orbit">
                <div className="visual-core">
                  <i className="fa-solid fa-server fa-3x text-gradient-dual"></i>
                </div>
                <div className="visual-node node-1" title="Cloud Computing">
                  <i className="fa-solid fa-cloud"></i>
                </div>
                <div className="visual-node node-2" title="Cyber Security">
                  <i className="fa-solid fa-shield-halved"></i>
                </div>
                <div className="visual-node node-3" title="Network Infrastructure">
                  <i className="fa-solid fa-network-wired"></i>
                </div>
                <div className="visual-node node-4" title="AI & Data Optimization">
                  <i className="fa-solid fa-microchip"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Fokus Riset & Laboratorium */}
          <div style={{ marginTop: '100px' }}>
            <div className="section-title">
              <h2>Fokus Riset & Laboratorium</h2>
              <p>Kami berfokus pada pilar-pilar penting teknologi infrastruktur teknologi informasi skala besar.</p>
            </div>
            <div className="focus-grid">
              <div className="focus-card glass-panel">
                <div className="focus-icon">
                  <i className="fa-solid fa-network-wired"></i>
                </div>
                <h3>Network Optimization</h3>
                <p>Mengkaji efisiensi rute, protokol switching & routing, simulasi beban trafik jaringan, dan interkoneksi regional berskala enterprise.</p>
              </div>
              <div className="focus-card glass-panel">
                <div className="focus-icon">
                  <i className="fa-solid fa-cloud-arrow-up"></i>
                </div>
                <h3>Cloud Infrastructure</h3>
                <p>Implementasi private & public cloud, containerization (Docker, Kubernetes), network virtualization, dan integrasi hybrid data center.</p>
              </div>
              <div className="focus-card glass-panel">
                <div className="focus-icon">
                  <i className="fa-solid fa-robot"></i>
                </div>
                <h3>Network Automation & AI</h3>
                <p>Otomatisasi konfigurasi switch/router menggunakan Ansible/Python, monitoring performa jaringan cerdas berbasis kecerdasan buatan.</p>
              </div>
            </div>
          </div>

          {/* Divisi Lab EIM secara singkat */}
          <div style={{ marginTop: '100px' }}>
            <div className="section-title">
              <h2>Divisi Laboratorium EIM</h2>
              <p>Laboratorium EIM terdiri dari 6 divisi utama yang saling berkolaborasi dalam riset dan operasional secara terpadu.</p>
            </div>
            <div className="divisions-brief-grid">
              {['INTI', 'RISET', 'PKU', 'LOMBA', 'MEDHUM', 'PENGMAS'].map(div => (
                <div key={div} className="div-brief-card glass-panel">
                  <h4>{div}</h4>
                  <p>
                    {div === 'INTI' && 'Koordinator, Sekretaris, dan Bendahara yang mengelola operasional internal lab.'}
                    {div === 'RISET' && 'Fokus pada penelitian infrastruktur, AI, dan publikasi ilmiah.'}
                    {div === 'PKU' && 'Pengembangan Kapasitas Utama melalui pelatihan Cisco dan networking.'}
                    {div === 'LOMBA' && 'Mempersiapkan tim kompetitif untuk ajang kejuaraan IT & Jaringan nasional.'}
                    {div === 'MEDHUM' && 'Media dan Hubungan Masyarakat untuk branding dan penyebaran informasi.'}
                    {div === 'PENGMAS' && 'Pengabdian Masyarakat yang selalu dilakukan secara berkala untuk membantu masyarakat.'}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Berita Terakhir */}
          <div style={{ marginTop: '100px', marginBottom: '20px' }}>
            <div className="section-title">
              <h2>Berita Terakhir</h2>
              <p>Kabar terbaru dan rilis artikel terkini dari EIM Research Lab.</p>
            </div>
            <div className="news-grid">
              {latestNews.length === 0 ? (
                <div className="news-empty-state glass-panel" style={{ gridColumn: '1 / -1' }}>
                  <i className="fa-regular fa-newspaper"></i>
                  <p style={{ color: 'var(--text-secondary)' }}>Belum ada berita terbaru.</p>
                </div>
              ) : (
                latestNews.map(news => (
                  <div key={news.id} className="news-card glass-panel">
                    <div className="news-img" style={{ position: 'relative', height: '200px', overflow: 'hidden', borderRadius: '12px 12px 0 0' }}>
                      <img src={news.image || "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=600"} alt={news.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <span className="news-tag" style={{ position: 'absolute', top: '15px', right: '15px', background: 'var(--accent-cyan)', color: '#000', padding: '5px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>{news.category}</span>
                    </div>
                    <div className="news-content" style={{ padding: '20px' }}>
                      <div className="news-date" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '10px' }}>
                        <i className="fa-regular fa-calendar"></i> {new Date(news.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </div>
                      <h3 style={{ marginBottom: '10px', fontSize: '1.2rem', lineHeight: '1.4' }}>{news.title}</h3>
                      <p className="news-desc" style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{news.content}</p>
                      <div className="news-footer" style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid var(--border-color)', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                        <span className="news-author">Oleh: {news.author}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <Link href="/news" className="btn btn-secondary">
                Lihat Semua Berita <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
