'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


export default function EventsPage() {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  const [modalActive, setModalActive] = useState(false);
  
  // Form State
  const [eventId, setEventId] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Study Group');
  const [status, setStatus] = useState('upcoming');
  const [eventDate, setEventDate] = useState('');
  const [eventStartTime, setEventStartTime] = useState('');
  const [eventEndTime, setEventEndTime] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [organizer, setOrganizer] = useState('');

  const [benefitsText, setBenefitsText] = useState('');
  const [requirementsText, setRequirementsText] = useState('');
  
  const [fileLabel, setFileLabel] = useState('Klik atau seret gambar ke sini (Opsional)');
  const [base64Images, setBase64Images] = useState([]);
  const [showRegister, setShowRegister] = useState(true);

  useEffect(() => {
    fetchEvents();
    checkAdmin();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch('/api/events', { cache: 'no-store' });
      const data = await res.json();
      if (res.ok) {
        setEvents(data);
      }
    } catch (err) {
      console.error('Error fetching events:', err);
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
      }
    } catch (err) {
      console.error('Error checking session:', err);
    }
  };

  const openAddModal = () => {
    setEventId('');
    setTitle('');
    setCategory('Study Group');
    setStatus('upcoming');
    setEventDate('');
    setEventStartTime('');
    setEventEndTime('');
    setDescription('');

    setImageUrl('');
    setOrganizer('');
    setBenefitsText('');
    setRequirementsText('');
    setFileLabel('Klik atau seret gambar ke sini (Opsional)');
    setBase64Images([]);
    setShowRegister(true);
    setModalActive(true);
  };

  const openEditModal = (event) => {
    setEventId(event.id);
    setTitle(event.title);
    setCategory(event.category);
    setStatus(event.status);
    
    let parsedDate = '';
    let parsedStartTime = '';
    let parsedEndTime = '';

    if (event.event_date) {
      const str = event.event_date.trim();
      const timeMatch = str.match(/\(([^)]+)\)/);
      let datePart = str;
      let timePart = '';
      
      if (timeMatch) {
        timePart = timeMatch[1].trim();
        datePart = str.replace(/\([^)]+\)/, '').trim();
      } else {
        const spaceParts = str.split(' ');
        if (spaceParts.length > 1) {
          const lastPart = spaceParts[spaceParts.length - 1];
          if (lastPart.includes(':')) {
            if (str.includes(' - ') && !str.includes('s/d')) {
              parsedDate = spaceParts[0];
              parsedStartTime = spaceParts[1];
              parsedEndTime = spaceParts[3] || '';
              datePart = '';
            } else {
              parsedDate = spaceParts[0];
              parsedStartTime = spaceParts[1];
              datePart = '';
            }
          }
        }
      }

      if (datePart) {
        parsedDate = datePart.trim();
      }

      if (timePart) {
        const timeParts = timePart.split('-');
        parsedStartTime = timeParts[0] ? timeParts[0].trim() : '';
        parsedEndTime = timeParts[1] ? timeParts[1].trim() : '';
      }
    }

    setEventDate(parsedDate);
    setEventStartTime(parsedStartTime);
    setEventEndTime(parsedEndTime);

    setDescription(event.description);

    setImageUrl('');
    setOrganizer(event.organizer || '');
    setBenefitsText(Array.isArray(event.benefits) ? event.benefits.join('\n') : '');
    setRequirementsText(Array.isArray(event.requirements) ? event.requirements.join('\n') : '');
    setFileLabel(event.image && event.image.length > 0 ? `${event.image.length} file gambar tersimpan` : 'Klik atau seret gambar ke sini (Opsional)');
    setBase64Images(event.image || []);
    setShowRegister(event.show_register !== false);
    setModalActive(true);
  };


  const handleFileChange = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    let allValid = true;
    Array.from(files).forEach(file => {
      if (file.size > 10 * 1024 * 1024) {
        alert(`File ${file.name} terlalu besar! Maksimal 10MB.`);
        allValid = false;
      }
    });

    if (!allValid) {
      e.target.value = '';
      return;
    }

    setFileLabel(`${files.length} file dipilih`);
    setImageUrl(''); // Clear URL if upload is used

    const newBase64s = [];
    let processed = 0;
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        newBase64s.push(event.target.result);
        processed++;
        if (processed === files.length) {
          setBase64Images(newBase64s);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDelete = async (id) => {
    if (!confirm('Apakah Anda yakin ingin menghapus event ini?')) return;
    try {
      const res = await fetch('/api/events', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      if (res.ok) {
        alert('Event berhasil dihapus!');
        fetchEvents();
      } else {
        const err = await res.json();
        alert(err.error || 'Gagal menghapus event');
      }
    } catch (err) {
      alert('Terjadi kesalahan');
    }
  };

  const getEventIcon = (cat) => {
    switch(cat) {
      case "Study Group": return "fa-graduation-cap";
      case "Kuliah Umum": return "fa-chalkboard-user";
      case "Company Visit": return "fa-building-columns";
      case "EIM Peduli": return "fa-heart";
      default: return "fa-calendar";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const benefits = benefitsText ? benefitsText.split('\n').map(s => s.trim()).filter(s => s) : [];
    const requirements = requirementsText ? requirementsText.split('\n').map(s => s.trim()).filter(s => s) : [];
    
    let finalImage = [];
    if (base64Images.length > 0) {
      finalImage = base64Images;
    } else if (imageUrl) {
      finalImage = [imageUrl];
    } else {
      finalImage = ["https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=600"];
    }

    let dateStr = eventDate;

    let timeStr = '';
    if (eventStartTime && eventEndTime) {
      timeStr = `${eventStartTime} - ${eventEndTime}`;
    } else if (eventStartTime) {
      timeStr = eventStartTime;
    }

    const combinedDate = timeStr ? `${dateStr} (${timeStr})` : dateStr;

    const payload = {
      title,
      category,
      status,
      event_date: combinedDate,
      description,

      link: 'event-detail.php',
      image: finalImage,
      icon: getEventIcon(category),
      organizer,
      benefits,
      requirements,
      show_register: showRegister
    };

    if (eventId) {
      payload.id = eventId;
    }

    try {
      const res = await fetch('/api/events', {
        method: eventId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (res.ok) {
        alert(eventId ? 'Event berhasil diperbarui!' : 'Event baru berhasil ditambahkan!');
        setModalActive(false);
        fetchEvents();
        router.refresh();
      } else {
        const err = await res.json();

        alert(err.error || 'Gagal menyimpan event');
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
            <h1 style={{ fontSize: '3rem', marginBottom: '15px' }}>Agenda <span className="text-gradient-dual">Kegiatan</span></h1>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>Ikuti terus kegiatan, pelatihan, dan acara riset terbaru dari Laboratorium EIM.</p>
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ background: 'var(--bg-primary)', minHeight: '60vh' }}>
        <div className="container">
          {admin && (
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <button onClick={openAddModal} className="btn btn-primary" style={{ boxShadow: 'var(--glow-cyan-intense)', transform: 'scale(1.05)' }}>
                Tambah Event Baru <i className="fa-solid fa-plus" style={{ marginLeft: '8px' }}></i>
              </button>
            </div>
          )}

          {loading ? (
            <div style={{ textAlign: 'center', padding: '50px 0', color: 'var(--text-secondary)' }}>
              <i className="fa-solid fa-circle-notch fa-spin fa-3x" style={{ color: 'var(--accent-cyan)' }}></i>
              <p style={{ marginTop: '15px' }}>Memuat kegiatan...</p>
            </div>
          ) : events.length === 0 ? (
            <div className="news-empty-state" style={{ textAlign: 'center', padding: '50px 0' }}>
              <i className="fa-regular fa-folder-open" style={{ fontSize: '4rem', opacity: 0.3, marginBottom: '20px' }}></i>
              <h3>Belum ada Event</h3>
              <p>Belum ada agenda kegiatan yang diterbitkan.</p>
            </div>
          ) : (
            <div className="news-grid" id="events-grid">
              {events.map(event => {
                let statusClass = 'upcoming';
                let statusIcon = 'fa-clock';
                let statusText = 'Akan Datang';

                if (event.status === 'completed') {
                  statusClass = 'completed';
                  statusIcon = 'fa-circle-check';
                  statusText = 'Selesai';
                } else if (event.status === 'ongoing') {
                  statusClass = 'ongoing';
                  statusIcon = 'fa-spinner fa-spin';
                  statusText = 'Sedang Berlangsung';
                }

                let coverImg = "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=600";
                if (event.image && event.image.length > 0) coverImg = event.image[0];

                return (
                  <div key={event.id} className="event-card glass-panel" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <div className="event-cover-img">
                      <img src={coverImg} alt={`Cover ${event.title}`} />
                    </div>
                    <div className={`event-status ${statusClass}`}>
                      <i className={`fa-solid ${statusIcon}`}></i> {statusText}
                    </div>
                    <div className="event-icon">
                      <i className={`fa-solid ${event.icon}`}></i>
                    </div>
                    <h3>{event.title}</h3>
                    <p className="event-cat">Kategori: {event.category}</p>
                    <p>{event.description}</p>

                    <Link href={`/event/${event.id}`} className="btn btn-secondary btn-read-more" style={{ width: '100%', marginTop: '15px', padding: '8px', fontSize: '0.9rem', textAlign: 'center' }}>
                      Baca Selengkapnya <i className="fa-solid fa-arrow-right" style={{ marginLeft: '5px' }}></i>
                    </Link>

                    {admin && (
                      <div className="news-action-btns" style={{ display: 'flex', gap: '10px', marginTop: '15px', borderTop: '1px solid var(--border-color)', paddingTop: '15px' }}>
                        <button className="btn btn-secondary" onClick={() => openEditModal(event)} style={{ flex: 1, padding: '8px', fontSize: '0.85rem' }}>
                          <i className="fa-solid fa-pen-to-square" style={{ marginRight: '6px' }}></i> Edit
                        </button>
                        <button className="btn btn-danger" onClick={() => handleDelete(event.id)} style={{ flex: 1, padding: '8px', fontSize: '0.85rem' }}>
                          <i className="fa-solid fa-trash-can" style={{ marginRight: '6px' }}></i> Hapus
                        </button>
                      </div>
                    )}

                    <div className="event-footer" style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
                      <span className="event-date"><i className="fa-regular fa-calendar"></i> {event.event_date}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* --- ADD / EDIT EVENT MODAL --- */}
      <div className={`modal ${modalActive ? 'active' : ''}`} id="event-modal">
        <div className="modal-overlay" onClick={() => setModalActive(false)}></div>
        <div className="modal-wrapper" style={{ color: 'var(--text-primary)' }}>
          <div className="modal-header">
            <h3 style={{ fontSize: '1.4rem', fontWeight: 'bold' }} id="event-modal-title">
              {eventId ? 'Sunting Event' : 'Tambah Event Baru'}
            </h3>
            <span className="modal-close" onClick={() => setModalActive(false)}>&times;</span>
          </div>
          
          <form onSubmit={handleSubmit} id="event-form">
            <div className="form-group">
              <label htmlFor="event-input-title">Judul Event</label>
              <input type="text" className="form-control modal-input" id="event-input-title" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Masukkan judul kegiatan" />
            </div>

            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div className="form-group">
                <label htmlFor="event-input-category">Kategori</label>
                <input 
                  type="text" 
                  className="form-control modal-input" 
                  id="event-input-category" 
                  required 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)} 
                  placeholder="Masukkan kategori (misal: Study Group)" 
                />
              </div>
              <div className="form-group">
                <label htmlFor="event-input-status">Status</label>
                <select className="form-control modal-input" id="event-input-status" value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="upcoming">Upcoming (Akan Datang)</option>
                  <option value="ongoing">Ongoing (Sedang Berlangsung)</option>
                  <option value="completed">Completed (Selesai)</option>
                </select>
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label htmlFor="event-input-date" style={{ display: 'block', marginBottom: '8px' }}>Tanggal Kegiatan</label>
              <input type="date" className="form-control modal-input" id="event-input-date" required value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
            </div>

            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', height: '21px' }}>
                  <label htmlFor="event-input-start-time" style={{ margin: 0, whiteSpace: 'nowrap' }}>Jam Mulai</label>
                  {eventStartTime && (
                    <button 
                      type="button" 
                      onClick={() => setEventStartTime('')} 
                      style={{ 
                        background: 'none', 
                        border: 'none', 
                        color: '#ff4d4d', 
                        cursor: 'pointer', 
                        fontSize: '0.85rem', 
                        padding: 0,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '3px',
                        opacity: 0.8,
                        transition: 'opacity 0.2s ease',
                        outline: 'none',
                        marginLeft: '6px'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
                      title="Bersihkan jam mulai"
                    >
                      <i className="fa-solid fa-circle-xmark"></i>
                    </button>
                  )}
                </div>
                <input type="time" className="form-control modal-input" id="event-input-start-time" value={eventStartTime} onChange={(e) => setEventStartTime(e.target.value)} />
              </div>
              <div className="form-group" style={{ margin: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', height: '21px' }}>
                  <label htmlFor="event-input-end-time" style={{ margin: 0, whiteSpace: 'nowrap' }}>Jam Selesai</label>
                  {eventEndTime && (
                    <button 
                      type="button" 
                      onClick={() => setEventEndTime('')} 
                      style={{ 
                        background: 'none', 
                        border: 'none', 
                        color: '#ff4d4d', 
                        cursor: 'pointer', 
                        fontSize: '0.85rem', 
                        padding: 0,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '3px',
                        opacity: 0.8,
                        transition: 'opacity 0.2s ease',
                        outline: 'none',
                        marginLeft: '6px'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
                      title="Bersihkan jam selesai"
                    >
                      <i className="fa-solid fa-circle-xmark"></i>
                    </button>
                  )}
                </div>
                <input type="time" className="form-control modal-input" id="event-input-end-time" value={eventEndTime} onChange={(e) => setEventEndTime(e.target.value)} />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="event-input-organizer" style={{ display: 'block', marginBottom: '8px' }}>Penyelenggara</label>
              <input type="text" className="form-control modal-input" id="event-input-organizer" value={organizer} onChange={(e) => setOrganizer(e.target.value)} placeholder="Contoh: EIM Research Lab" />
            </div>






            <div className="form-group">
              <label htmlFor="event-input-desc">Deskripsi Kegiatan</label>
              <textarea className="form-control modal-input" id="event-input-desc" required value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Tuliskan detail kegiatan di sini..."></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="event-input-benefits">Benefit Kegiatan (Satu per baris)</label>
              <textarea className="form-control modal-input" id="event-input-benefits" value={benefitsText} onChange={(e) => setBenefitsText(e.target.value)} placeholder="Contoh:&#10;E-Certificate&#10;Snack & Drink"></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="event-input-reqs">Persyaratan Peserta (Satu per baris)</label>
              <textarea className="form-control modal-input" id="event-input-reqs" value={requirementsText} onChange={(e) => setRequirementsText(e.target.value)} placeholder="Contoh:&#10;Membawa laptop pribadi&#10;Mahasiswa Telkom University"></textarea>
            </div>

            <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '20px 0' }}>
              <input 
                type="checkbox" 
                id="event-input-show-register" 
                checked={showRegister} 
                onChange={(e) => setShowRegister(e.target.checked)} 
                style={{ width: '20px', height: '20px', cursor: 'pointer' }}
              />
              <label htmlFor="event-input-show-register" style={{ cursor: 'pointer', margin: 0, fontWeight: 'normal', color: 'var(--text-secondary)' }}>
                Tampilkan Tombol "Daftar Sekarang" di halaman detail
              </label>
            </div>

            <div className="form-group" style={{ border: '1px dashed var(--border-color)', borderRadius: '8px', padding: '20px', textAlign: 'center' }}>
              <label htmlFor="event-input-file" style={{ cursor: 'pointer', margin: 0 }}>
                <i className="fa-solid fa-cloud-arrow-up fa-2x" style={{ color: 'var(--accent-cyan)', marginBottom: '10px', display: 'block' }}></i>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{fileLabel}</span>
                <input type="file" id="event-input-file" accept="image/*" multiple onChange={handleFileChange} style={{ display: 'none' }} />
              </label>
            </div>

            <div className="form-group" style={{ textAlign: 'center', margin: '10px 0' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>ATAU Masukkan URL Gambar:</span>
              <input type="text" className="form-control modal-input" id="event-input-url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Contoh: https://example.com/image.jpg" />
            </div>

            <div className="form-actions" style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
              <button type="button" className="btn btn-secondary" onClick={() => setModalActive(false)} style={{ flex: 1 }}>
                Batal
              </button>
              <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
