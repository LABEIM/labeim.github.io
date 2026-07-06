'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Register() {
  const [formData, setFormData] = useState({
    nama: '', username: '', nim: '', telp: '', email: '', password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    setStatus(null);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        setStatus({ type: 'success', message: data.message });
        setFormData({ nama: '', username: '', nim: '', telp: '', email: '', password: '' });
      } else {
        setStatus({ type: 'error', message: data.error });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Terjadi kesalahan server' });
    }
  };

  return (
    <>
      <section className="page-header" style={{ paddingTop: '150px', paddingBottom: '50px' }}>
        <div className="container">
          <div className="page-header-content">
            <h1>Daftar <span className="text-gradient-cyan">Akun Baru</span></h1>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="registration-form-container glass-panel" style={{ maxWidth: '600px', margin: '0 auto', padding: '40px', borderTop: '3px solid var(--accent-cyan)' }}>
            <div className="registration-header" style={{ textAlign: 'center', marginBottom: '30px' }}>
              <h2>Buat Akun Anda</h2>
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

            <form onSubmit={handleRegister}>
              <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="form-group">
                  <label htmlFor="nama">Nama Lengkap</label>
                  <input type="text" name="nama" className="form-control" id="nama" placeholder="Nama Lengkap" required value={formData.nama} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input type="text" name="username" className="form-control" id="username" placeholder="Username" required value={formData.username} onChange={handleChange} />
                </div>
              </div>
              <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
                <div className="form-group">
                  <label htmlFor="nim">NIM</label>
                  <input type="text" name="nim" className="form-control" id="nim" placeholder="Nomor Induk Mahasiswa" required value={formData.nim} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="telp">No. Telepon (WhatsApp)</label>
                  <input type="text" name="telp" className="form-control" id="telp" placeholder="08xxxxxxxxx" required value={formData.telp} onChange={handleChange} />
                </div>
              </div>
              <div className="form-group" style={{ marginTop: '15px' }}>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" className="form-control" id="email" placeholder="Email" required value={formData.email} onChange={handleChange} />
              </div>
              <div className="form-group" style={{ marginTop: '15px' }}>
                <label htmlFor="password" style={{ display: 'block', marginBottom: '8px' }}>Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    style={{ paddingRight: '45px' }}
                  />
                  <div
                    onClick={() => setShowPassword(prev => !prev)}
                    style={{ 
                      position: 'absolute', 
                      right: '10px', 
                      top: '50%', 
                      transform: 'translateY(-50%)', 
                      zIndex: 100, 
                      color: 'var(--text-secondary)', 
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '30px',
                      height: '30px',
                      userSelect: 'none'
                    }}
                  >
                    <i className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </div>
                </div>
              </div>
              <div className="form-actions" style={{ justifyContent: 'center', marginTop: '40px' }}>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px', fontSize: '1.1rem' }}>
                  Daftar <i className="fa-solid fa-user-plus" style={{ marginLeft: '8px' }}></i>
                </button>
              </div>
            </form>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              Sudah punya akun? <Link href="/login" style={{ color: 'var(--accent-cyan)' }}>Login di sini</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
