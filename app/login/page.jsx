'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [formData, setFormData] = useState({ emailOrUsername: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setStatus(null);
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        setStatus({ type: 'success', message: 'Login berhasil! Mengalihkan...' });
        setTimeout(() => {
          router.push('/');
          router.refresh();
        }, 1000);
      } else {
        setStatus({ type: 'error', message: data.error });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Terjadi kesalahan server' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="page-header" style={{ paddingTop: '150px', paddingBottom: '50px' }}>
        <div className="container">
          <div className="page-header-content">
            <h1>Login <span className="text-gradient-cyan">Admin</span></h1>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="registration-form-container glass-panel" style={{ maxWidth: '500px', margin: '0 auto', padding: '40px', borderTop: '3px solid var(--accent-cyan)' }}>
            <div className="registration-header" style={{ textAlign: 'center', marginBottom: '30px' }}>
              <h2>Masuk ke Akun Admin</h2>
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
            
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="emailOrUsername">Username atau Email</label>
                <input 
                  type="text" 
                  name="emailOrUsername" 
                  className="form-control" 
                  id="emailOrUsername" 
                  placeholder="Masukkan Username atau Email" 
                  required 
                  value={formData.emailOrUsername} 
                  onChange={handleChange} 
                />
              </div>
              <div className="form-group" style={{ marginTop: '15px', position: 'relative' }}>
                <label htmlFor="password">Password</label>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  name="password" 
                  className="form-control" 
                  id="password" 
                  placeholder="Password" 
                  required 
                  value={formData.password} 
                  onChange={handleChange} 
                  style={{ paddingRight: '40px' }}
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '10px', top: '35px', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
                >
                  <i className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
              <div className="form-actions" style={{ justifyContent: 'center', marginTop: '40px' }}>
                <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', padding: '14px', fontSize: '1.1rem' }}>
                  {loading ? 'Masuk...' : 'Login'} <i className="fa-solid fa-right-to-bracket" style={{ marginLeft: '8px' }}></i>
                </button>
              </div>
            </form>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              Belum punya akun admin? <Link href="/register" style={{ color: 'var(--accent-cyan)' }}>Daftar di sini</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
