'use client';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-about">
            <Link href="/" className="logo-container">
              <div className="logo-icon" style={{ width: '30px', height: '30px' }}>
                <img src="/img/EIM Only Logo.png" alt="EIM Logo" />
              </div>
              <div className="logo-text">
                <span className="text-gradient-dual" style={{ fontSize: '1.2rem' }}>EIM</span>
                <span className="logo-sub" style={{ fontSize: '0.6rem', letterSpacing: '1px' }}>Research Lab</span>
              </div>
            </Link>
            <p>Enterprise Infrastructure Management (EIM) Research Laboratory merupakan bagian dari Kelompok Keahlian Enterprise & Industrial System (EIS), Program Studi S1 Sistem Informasi, Fakultas Rekayasa Industri, Telkom University.</p>
          </div>

          <div>
            <h4 className="footer-title">Navigasi Cepat</h4>
            <ul className="footer-links">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/event">Event</Link></li>
              <li><Link href="/structure">Structure</Link></li>
              <li><Link href="/news">News</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-title">Kontak & Lokasi</h4>
            <ul className="footer-links" style={{ marginBottom: '20px' }}>
              <li><i className="fa-solid fa-location-dot" style={{ marginRight: '8px', color: 'var(--accent-red)' }}></i> Gedung TULT Lantai 8, Ruangan TULT.08.09</li>
              <li><i className="fa-solid fa-university" style={{ marginRight: '8px', color: 'var(--accent-red)' }}></i> Telkom University, Bandung, Indonesia</li>
              <li><i className="fa-solid fa-envelope" style={{ marginRight: '8px', color: 'var(--accent-cyan)' }}></i> eimlab@telkomuniversity.ac.id</li>
            </ul>
            <h4 className="footer-title" style={{ marginBottom: '12px', fontSize: '0.95rem' }}>Ikuti Media Sosial Kami</h4>
            <div className="footer-socials">
              <a href="https://www.instagram.com/eimresearchlab/" target="_blank" rel="noopener noreferrer" className="footer-social-btn" title="Instagram @eimresearchlab">
                <i className="fa-brands fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} EIM Research Laboratory. All Rights Reserved.</p>
          <p>Designed with <i className="fa-solid fa-heart" style={{ color: 'var(--accent-red)' }}></i> in Telkom University</p>
        </div>
      </div>
    </footer>
  );
}
