import Link from 'next/link';
import { events } from '@/lib/data';

export default function EventsPage() {
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
          {events.length === 0 ? (
            <div className="news-empty-state">
              <i className="fa-regular fa-folder-open"></i>
              <h3>Belum ada Event</h3>
              <p>Tambahkan event pertama Anda!</p>
            </div>
          ) : (
            <div className="news-grid" id="events-grid">
              {events.map(event => {
                const statusClass = event.status === 'completed' ? 'completed' : 'upcoming';
                const statusIcon = event.status === 'completed' ? 'fa-circle-check' : 'fa-clock';
                const statusText = event.status === 'completed' ? 'Selesai' : 'Akan Datang';

                let coverImg = "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=600";
                if (event.image && event.image.length > 0) coverImg = event.image[0];

                return (
                  <div key={event.id} className="event-card glass-panel">
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
    </>
  );
}
