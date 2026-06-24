'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Pendaftaran() {
  const [formData, setFormData] = useState({
    nama_lengkap: '', kelas: '', nim: '', email: '', nomor_telp: '',
    divisi_1: '', divisi_2: '', alasan: ''
  });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();



  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    if (formData.divisi_1 === formData.divisi_2) {
      setStatus({ type: 'error', message: 'Pilihan Divisi 1 dan Divisi 2 tidak boleh sama!' });
      return;
    }

    setLoading(true);
    try {
      const scriptURL = "https://script.google.com/macros/s/AKfycbz8AXxyFoeeq453EjMEtu_A9Cd10DSgVa8Le2YTZ0PvnIdSf43aN_C9d_2wc_hoRWpY/exec";
      const formPayload = new FormData();
      formPayload.append('Nama Lengkap', formData.nama_lengkap);
      formPayload.append('Kelas', formData.kelas);
      formPayload.append('NIM', formData.nim);
      formPayload.append('Email', formData.email);
      formPayload.append('Nomor Telepon', formData.nomor_telp);
      formPayload.append('Divisi 1', formData.divisi_1);
      formPayload.append('Divisi 2', formData.divisi_2);
      formPayload.append('Alasan', formData.alasan);

      await fetch(scriptURL, { method: 'POST', body: formPayload });
      
      setStatus({ type: 'success', message: 'Pendaftaran berhasil dikirim! Silakan cek email Anda.' });
      setFormData({
        nama_lengkap: '', kelas: '', nim: '', email: '', nomor_telp: '',
        divisi_1: '', divisi_2: '', alasan: ''
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setStatus({ type: 'error', message: 'Gagal mengirim data. Coba lagi beberapa saat.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="page-header" style={{ paddingTop: '150px', paddingBottom: '50px' }}>
        <div className="container">
          <div className="page-header-content">
            <div className="hero-tag"><span></span> Oprec Asisten</div>
            <h1>Pendaftaran <span className="text-gradient-cyan">Asisten Lab</span></h1>
            <p className="hero-desc">Mari bergabung menjadi bagian dari EIM Research Lab. Kembangkan potensimu di bidang infrastruktur IT, jaringan, dan riset teknologi.</p>
          </div>
        </div>
      </section>

      <section className="section-padding" id="pendaftaran">
        <div className="container">
          <div className="registration-form-container glass-panel" style={{ maxWidth: '800px', margin: '0 auto', padding: '40px', borderTop: '3px solid var(--accent-cyan)' }}>
            <div className="registration-header" style={{ textAlign: 'center', marginBottom: '30px' }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>Formulir Pendaftaran Asisten</h2>
              <p style={{ color: 'var(--text-secondary)' }}>Lengkapi formulir di bawah ini dengan data yang valid dan benar.</p>
            </div>

            {status?.type === 'error' && (
              <div style={{ backgroundColor: 'rgba(255,0,0,0.1)', color: '#ff6b6b', padding: '10px', borderRadius: '5px', marginBottom: '15px', textAlign: 'center' }}>
                {status.message}
              </div>
            )}
            {status?.type === 'success' && (
              <div style={{ backgroundColor: 'rgba(0,255,0,0.1)', color: '#20c997', padding: '10px', borderRadius: '5px', marginBottom: '15px', textAlign: 'center' }}>
                {status.message}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="nama_lengkap">Nama Lengkap</label>
                <input type="text" className="form-control" id="nama_lengkap" placeholder="Nama lengkap" required value={formData.nama_lengkap} onChange={handleChange} />
              </div>

              <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
                <div className="form-group">
                  <label htmlFor="kelas">Kelas</label>
                  <input type="text" className="form-control" id="kelas" placeholder="Contoh: SI4XXX" required value={formData.kelas} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="nim">NIM</label>
                  <input type="text" className="form-control" id="nim" placeholder="NIM" pattern="[0-9]+" required value={formData.nim} onChange={handleChange} />
                </div>
              </div>

              <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" className="form-control" id="email" placeholder="Email" required value={formData.email} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="nomor_telp">Nomor Telepon (WhatsApp)</label>
                  <input type="tel" className="form-control" id="nomor_telp" placeholder="Contoh: 081XXXXX" pattern="[0-9]+" required value={formData.nomor_telp} onChange={handleChange} />
                </div>
              </div>

              <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
                <div className="form-group">
                  <label htmlFor="divisi_1">Pilihan Divisi 1 (Prioritas Utama)</label>
                  <select className="form-control" id="divisi_1" required value={formData.divisi_1} onChange={handleChange}>
                    <option value="" disabled>Pilih Divisi 1</option>
                    <option value="Inti">INTI (Koordinator, Sekretaris, Bendahara)</option>
                    <option value="Riset">RISET (Penelitian Infrastruktur & AI)</option>
                    <option value="PKU">PKU (Pengembangan Kapasitas Utama)</option>
                    <option value="Lomba">LOMBA (Kompetisi IT & Jaringan)</option>
                    <option value="Medhum">MEDHUM (Media & Hubungan Masyarakat)</option>
                    <option value="Pengmas">PENGMAS (Pengabdian Masyarakat)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="divisi_2">Pilihan Divisi 2</label>
                  <select className="form-control" id="divisi_2" required value={formData.divisi_2} onChange={handleChange}>
                    <option value="" disabled>Pilih Divisi 2</option>
                    <option value="Inti">INTI (Koordinator, Sekretaris, Bendahara)</option>
                    <option value="Riset">RISET (Penelitian Infrastruktur & AI)</option>
                    <option value="PKU">PKU (Pengembangan Kapasitas Utama)</option>
                    <option value="Lomba">LOMBA (Kompetisi IT & Jaringan)</option>
                    <option value="Medhum">MEDHUM (Media & Hubungan Masyarakat)</option>
                    <option value="Pengmas">PENGMAS (Pengabdian Masyarakat)</option>
                  </select>
                </div>
              </div>

              <div className="form-group" style={{ marginTop: '15px' }}>
                <label htmlFor="alasan">Alasan Mendaftar</label>
                <textarea className="form-control" id="alasan" rows="4" placeholder="Ceritakan motivasi dan alasan Anda ingin bergabung dengan divisi pilihan Anda..." required value={formData.alasan} onChange={handleChange}></textarea>
              </div>

              <div className="form-actions" style={{ justifyContent: 'center', marginTop: '40px' }}>
                <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', maxWidth: '300px', padding: '14px', fontSize: '1.1rem' }}>
                  {loading ? (
                    <>Mengirim... <i className="fa-solid fa-circle-notch fa-spin" style={{ marginLeft: '8px' }}></i></>
                  ) : (
                    <>Kirim Pendaftaran <i className="fa-solid fa-paper-plane" style={{ marginLeft: '8px' }}></i></>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
