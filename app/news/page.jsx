'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function NewsPage() {
  const [news, setNews] = useState([]);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalActive, setModalActive] = useState(false);

  // Form State
  const [newsId, setNewsId] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Pengumuman');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const [fileLabel, setFileLabel] = useState('Klik atau seret gambar ke sini (Opsional)');
  const [base64Image, setBase64Image] = useState('');

  useEffect(() => {
    fetchNews();
    checkAdmin();
  }, []);

  const fetchNews = async () => {
    try {
      const res = await fetch('/api/news');
      const data = await res.json();
      if (res.ok) {
        setNews(data);
      }
    } catch (err) {
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
    }
  };

  const checkAdmin = async () => {
    try {
      const res = await fetch('/api/auth/session');
      const data = await res.json();
      if (data.loggedIn && data.user.role === 'admin') {
        setAdmin(data.user);
        setAuthor(data.user.nama); // Set current admin name as default author
      }
    } catch (err) {
      console.error('Error checking session:', err);
    }
  };

  const openAddModal = () => {
    setNewsId('');
    setTitle('');
    setCategory('Pengumuman');
    setAuthor(admin ? admin.nama : '');
    setContent('');
    setImageUrl('');
    setFileLabel('Klik atau seret gambar ke sini (Opsional)');
    setBase64Image('');
    setModalActive(true);
  };

  const openEditModal = (item) => {
    setNewsId(item.id);
    setTitle(item.title);
    setCategory(item.category);
    setAuthor(item.author);
    setContent(item.content);
    setImageUrl('');
    setFileLabel(item.image && item.image.length > 0 ? 'Gambar tersimpan di database' : 'Klik atau seret gambar ke sini (Opsional)');
    setBase64Image(item.image && item.image.length > 0 ? item.image[0] : '');
    setModalActive(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert('Ukuran gambar terlalu besar! Maksimal 10MB.');
      e.target.value = '';
      return;
    }

    setFileLabel(`Berkas: ${file.name}`);
    setImageUrl(''); // Clear URL field if upload is used

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        const MAX_SIZE = 1200;
        if (width > height && width > MAX_SIZE) {
          height *= MAX_SIZE / width;
          width = MAX_SIZE;
        } else if (height > MAX_SIZE) {
          width *= MAX_SIZE / height;
          height = MAX_SIZE;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.8);
        setBase64Image(compressedBase64);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleDelete = async (id) => {
    if (!confirm('Apakah Anda yakin ingin menghapus berita ini?')) return;
    try {
      const res = await fetch('/api/news', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      if (res.ok) {
        alert('Berita berhasil dihapus!');
        fetchNews();
      } else {
        const err = await res.json();
        alert(err.error || 'Gagal menghapus berita');
      }
    } catch (err) {
      alert('Terjadi kesalahan');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let finalImage = [];
    if (base64Image) {
      finalImage = [base64Image];
    } else if (imageUrl) {
      finalImage = [imageUrl];
    } else {
      finalImage = ["https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=600"];
    }

    const payload = {
      title,
      category,
      author,
      content,
      image: finalImage
    };

    if (newsId) {
      payload.id = newsId;
    }

    try {
      const res = await fetch('/api/news', {
        method: newsId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert(newsId ? 'Berita berhasil diperbarui!' : 'Berita baru berhasil diterbitkan!');
        setModalActive(false);
        fetchNews();
      } else {
        const err = await res.json();
        alert(err.error || 'Gagal menyimpan berita');
      }
    } catch (err) {
      alert('Terjadi kesalahan server');
    }
  };

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
          {admin && (
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <button onClick={openAddModal} className="btn btn-primary" style={{ boxShadow: 'var(--glow-cyan-intense)', transform: 'scale(1.05)' }}>
                Tambah Berita Baru <i className="fa-solid fa-plus" style={{ marginLeft: '8px' }}></i>
              </button>
            </div>
          )}

          {loading ? (
            <div style={{ textAlign: 'center', padding: '50px 0', color: 'var(--text-secondary)' }}>
              <i className="fa-solid fa-circle-notch fa-spin fa-3x" style={{ color: 'var(--accent-cyan)' }}></i>
              <p style={{ marginTop: '15px' }}>Memuat berita...</p>
            </div>
          ) : news.length === 0 ? (
            <div className="news-empty-state glass-panel" style={{ textAlign: 'center', padding: '50px 0' }}>
              <i className="fa-regular fa-newspaper" style={{ fontSize: '4rem', opacity: 0.3, marginBottom: '20px' }}></i>
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

                        {admin && (
                          <div className="news-action-btns" style={{ display: 'flex', gap: '10px', marginTop: '15px', borderTop: '1px solid var(--border-color)', paddingTop: '15px' }}>
                            <button className="btn btn-secondary" onClick={() => openEditModal(item)} style={{ flex: 1, padding: '8px', fontSize: '0.85rem' }}>
                              <i className="fa-solid fa-pen-to-square" style={{ marginRight: '6px' }}></i> Edit
                            </button>
                            <button className="btn btn-danger" onClick={() => handleDelete(item.id)} style={{ flex: 1, padding: '8px', fontSize: '0.85rem', color: '#fff' }}>
                              <i className="fa-solid fa-trash-can" style={{ marginRight: '6px' }}></i> Hapus
                            </button>
                          </div>
                        )}

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

      {/* --- ADD / EDIT NEWS MODAL --- */}
      <div className={`modal ${modalActive ? 'active' : ''}`} id="news-modal">
        <div className="modal-overlay" onClick={() => setModalActive(false)}></div>
        <div className="modal-wrapper" style={{ color: 'var(--text-primary)' }}>
          <div className="modal-header">
            <h3 style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>
              {newsId ? 'Sunting Berita' : 'Tambah Berita Baru'}
            </h3>
            <span className="modal-close" onClick={() => setModalActive(false)}>&times;</span>
          </div>

          <form onSubmit={handleSubmit} id="news-form">
            <div className="form-group">
              <label htmlFor="news-input-title">Judul Berita</label>
              <input type="text" className="form-control modal-input" id="news-input-title" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Masukkan judul berita" />
            </div>

            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div className="form-group">
                <label htmlFor="news-input-category">Kategori</label>
                <select className="form-control modal-input" id="news-input-category" value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="Pengumuman">Pengumuman</option>
                  <option value="Beasiswa">Beasiswa</option>
                  <option value="Riset & Teknologi">Riset & Teknologi</option>
                  <option value="Prestasi">Prestasi</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="news-input-author">Penulis</label>
                <input type="text" className="form-control modal-input" id="news-input-author" required value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Nama penulis" />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="news-input-content">Konten Berita</label>
              <textarea className="form-control modal-input" id="news-input-content" required value={content} onChange={(e) => setContent(e.target.value)} placeholder="Tuliskan isi berita di sini..." style={{ minHeight: '180px' }}></textarea>
            </div>

            <div className="form-group" style={{ border: '1px dashed var(--border-color)', borderRadius: '8px', padding: '20px', textAlign: 'center' }}>
              <label htmlFor="news-input-file" style={{ cursor: 'pointer', margin: 0 }}>
                <i className="fa-solid fa-cloud-arrow-up fa-2x" style={{ color: 'var(--accent-cyan)', marginBottom: '10px', display: 'block' }}></i>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{fileLabel}</span>
                <input type="file" id="news-input-file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
              </label>
            </div>

            <div className="form-group" style={{ textAlign: 'center', margin: '10px 0' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>ATAU Masukkan URL Gambar:</span>
              <input type="text" className="form-control modal-input" id="news-input-url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Contoh: https://example.com/image.jpg" />
            </div>

            <div className="form-actions" style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
              <button type="button" className="btn btn-secondary" onClick={() => setModalActive(false)} style={{ flex: 1 }}>
                Batal
              </button>
              <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                Terbitkan
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
