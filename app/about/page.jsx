export default function AboutPage() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <div className="page-header-content">
            <div className="hero-tag"><span></span> Tentang Kami</div>
            <h1>Tentang <span className="text-gradient-red">EIM</span> Research Lab</h1>
            <p className="hero-desc">Mengenal lebih dekat laboratorium riset Enterprise Infrastructure Management di Telkom University.</p>
          </div>
        </div>
      </section>

      <section className="section-padding" id="about">
        <div className="container">
          <div className="about-overview-grid" style={{ marginBottom: '80px' }}>
            <div className="about-content">
              <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>Laboratorium Enterprise Infrastructure Management</h2>
              <p className="hero-desc" style={{ marginBottom: '20px', maxWidth: '100%' }}>
                EIM (Enterprise Infrastructure Management) adalah laboratorium riset di Program Studi S1 Sistem Informasi yang berada di bawah Kelompok Keahlian Enterprise and Industrial System, Fakultas Rekayasa Industri, Telkom University.
              </p>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
                Kami berfokus pada pemahaman dan pengembangan infrastruktur digital seperti jaringan komputer, sistem operasi, cloud computing, dan cybersecurity. Kami melakukan riset, pengkajian mendalam, dan pelatihan teknologi skala besar guna mempersiapkan talenta digital masa depan.
              </p>
            </div>
            <div className="about-image" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src="/img/Salinan EIM.png" alt="EIM Lab" />
            </div>
          </div>

          <div className="about-visimisi-grid glass-panel" style={{ marginBottom: '80px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px' }}>
              <div>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '16px', color: 'var(--accent-red)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <i className="fa-solid fa-eye"></i> Visi
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.6' }}>
                  Terwujudnya Laboratorium Riset Enterprise Infrastructure Management (EIM) sebagai wadah pengembangan potensi para asisten secara optimal, sehingga terbentuk laboratorium riset yang unggul, kolaboratif, dan berdaya saing, serta mampu mencetak sumber daya manusia yang inovatif, profesional, dan siap berkontribusi di tingkat akademik maupun industri.
                </p>
              </div>
              <div>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '16px', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <i className="fa-solid fa-bullseye"></i> Misi
                </h3>
                <ul style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', paddingLeft: '20px' }}>
                  <li style={{ marginBottom: '8px' }}>Menguatkan nilai keimanan dan ketakwaan sebagai landasan moral dalam setiap aktivitas Laboratorium Riset EIM.</li>
                  <li style={{ marginBottom: '8px' }}>Membentuk asisten yang cerdas, profesional, dan bertanggung jawab dalam akademik, riset, dan pengabdian.</li>
                  <li style={{ marginBottom: '8px' }}>Mewujudkan lingkungan laboratorium yang kondusif dan produktif dengan menjunjung nilai EIM Kerja.</li>
                  <li style={{ marginBottom: '8px' }}>Mengembangkan program kerja secara berkelanjutan melalui inovasi dan peningkatan kualitas.</li>
                  <li style={{ marginBottom: '8px' }}>Memperkuat komunikasi dan kolaborasi dengan seluruh pemangku kepentingan.</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <div className="section-title">
              <h2>Our Values</h2>
              <p>Nilai-nilai utama yang menjadi pilar dan budaya kerja di EIM Lab.</p>
            </div>

            <div className="focus-grid">
              <div className="focus-card glass-panel">
                <div className="focus-icon" style={{ color: 'var(--accent-red)' }}>
                  <i className="fa-solid fa-handshake"></i>
                </div>
                <h3>Reliability</h3>
                <p>Membangun kepercayaan melalui identitas yang kuat dan konsisten dalam setiap riset dan layanan.</p>
              </div>
              <div className="focus-card glass-panel">
                <div className="focus-icon">
                  <i className="fa-solid fa-award"></i>
                </div>
                <h3>Commitment</h3>
                <p>Menunjukkan dedikasi tinggi dalam menciptakan inovasi teknologi yang berdampak bagi masyarakat.</p>
              </div>
              <div className="focus-card glass-panel">
                <div className="focus-icon" style={{ color: 'var(--accent-red)' }}>
                  <i className="fa-solid fa-people-arrows"></i>
                </div>
                <h3>Availability</h3>
                <p>Selalu hadir sebagai wadah kolaborasi, bertukar ide, dan perkembangan keilmuan digital.</p>
              </div>
              <div className="focus-card glass-panel">
                <div className="focus-icon">
                  <i className="fa-solid fa-circle-check"></i>
                </div>
                <h3>Quality</h3>
                <p>Menghadirkan karya riset, solusi praktis, dan pelatihan dengan standar kualitas terbaik.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
