'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';


const initialMembers = [
  // INTI Division
  { id: 1, name: "Ferdyansyah Adi Saputra", role: "Koordinator Lab EIM", division: "inti", image: "/person/inti/ferday.JPG", scale: "3", position: "center 32%" },
  { id: 2, name: "Raffi Raditya Sofwan", role: "Sekretaris", division: "inti", image: "/person/inti/bewok.JPG", scale: "2.8", position: "55% 35%" },
  { id: 3, name: "Kania Shafa", role: "Bendahara", division: "inti", image: "/person/inti/kania.JPG", scale: "2.7", position: "45% 52%" },

  // RISET Division
  { id: 4, name: "Ardy Maulana Nayottama Nugroho", role: "Koordinator Riset", division: "riset", image: "/person/riset/ardyy.JPG", scale: "2.3", position: "53% 15%" },
  { id: 5, name: "Tb. Alta Ulil Abshor", role: "Staff", division: "riset", image: "/person/riset/alta.JPG", scale: "3", position: "49% 35%" },
  { id: 6, name: "Nayla Aulia Rusyda", role: "Staff", division: "riset", image: "/person/riset/nayla.JPG", scale: "3", position: "52% 43%" },
  { id: 7, name: "Hana Humaira", role: "Staff", division: "riset", image: "/person/riset/hana.JPG", scale: "3", position: "center 40%" },
  { id: 8, name: "Dara Saifa Mahiroh", role: "Staff", division: "riset", image: "/person/riset/dara.JPG", scale: "2.5", position: "48% 34%" },

  // PKU Division
  { id: 9, name: "Winsenlaus Alfero Krisna Ivander Lael", role: "Koordinator PKU", division: "pku", image: "/person/pku/lael.JPG", scale: "2.8", position: "50% 13%" },
  { id: 10, name: "Fakhri Muhammad Habibi", role: "Staff", division: "pku", image: "/person/pku/habibi.JPG", scale: "2.8", position: "50% 15%" },
  { id: 11, name: "Faiz Dhya Muhamad Rahmantyo", role: "Staff", division: "pku", image: "/person/pku/faiz.JPG", scale: "2.8", position: "50% 15%" },

  // LOMBA Division
  { id: 12, name: "Akchmad Reza Zandri", role: "Koordinator Lomba", division: "lomba", image: "/person/lomba/reza.JPG", scale: "2.8", position: "49% 35%" },
  { id: 13, name: "Ganda Dwiyana", role: "Staff", division: "lomba", image: "/person/lomba/ganda.JPG", scale: "2.8", position: "50% 31%" },
  { id: 14, name: "Frixtho Alex Credorius Latumahina", role: "Staff", division: "lomba", image: "/person/lomba/frixtho.JPG", scale: "2.8", position: "48% 25%" },
  { id: 15, name: "Muhammad Fizry Alifta", role: "Staff", division: "lomba", image: "/person/lomba/alif.JPG", scale: "2.8", position: "50% 36%" },

  // MEDHUM Division
  { id: 17, name: "Aura Haya Azka", role: "Koordinator Medhum", division: "medhum", image: "/person/medhum/aura.JPG", scale: "2.2", position: "50% 40%" },
  { id: 18, name: "Firman Zuhdi Affandi", role: "Staff", division: "medhum", image: "/person/medhum/firman.JPG", scale: "2.8", position: "50% 33%" },
  { id: 19, name: "Affan Maulana Raffi", role: "Staff", division: "medhum", image: "/person/medhum/affan.JPG", scale: "2.4", position: "48% 19%" },
  { id: 20, name: "Wildan Zaaqi", role: "Staff", division: "medhum", image: "/person/medhum/wildan.JPG", scale: "2.4", position: "51% 45%" },


  // PENGMAS Division
  { id: 21, name: "Bagas Haris Saputro", role: "Koordinator Pengmas", division: "pengmas", image: "/person/pengmas/bagas.JPG", scale: "3", position: "50% 20%" },
  { id: 22, name: "Levi Soraya", role: "Staff", division: "pengmas", image: "/person/pengmas/raya.JPG", scale: "2", position: "50% 18%" },
  { id: 23, name: "Salman Alfarisy", role: "Staff", division: "pengmas", image: "/person/pengmas/salman.JPG", scale: "2.3", position: "50% 43%" },
  { id: 24, name: "Deidanisa Aulia Pradina Kya", role: "Staff", division: "pengmas", image: "/person/pengmas/kya.JPG", scale: "3.3", position: "50% 45%" },
  { id: 25, name: "Raffi Akbar Firdaus", role: "Staff", division: "pengmas", image: "/person/pengmas/rafiakbar.JPG", scale: "2.4", position: "45% 51%" },
];

function StructureContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const divParam = searchParams.get('div') || searchParams.get('divisi') || 'all';
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (divParam) {
      setFilter(divParam);
    }
  }, [divParam]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    if (typeof window !== 'undefined') {
      const newUrl = `${window.location.protocol}//${window.location.host}${pathname}?div=${newFilter}`;
      window.history.pushState({ path: newUrl }, '', newUrl);
    }
  };

  const filteredMembers = filter === 'all' 
    ? initialMembers 
    : initialMembers.filter(m => m.division.toLowerCase() === filter.toLowerCase());


  return (
    <>
      <section className="page-header" style={{ paddingTop: '150px', paddingBottom: '50px' }}>
        <div className="container">
          <div className="page-header-content">
            <h1>Struktur <span className="text-gradient-cyan">Kepengurusan</span></h1>
            <p style={{ marginTop: '15px', color: 'var(--text-secondary)' }}>Mengenal asisten laboratorium EIM di setiap divisi.</p>
          </div>
        </div>
      </section>

      <section className="section-padding" id="structure">
        <div className="container">
          <div className="filter-container">
            <button className={`filter-tab ${filter === 'all' ? 'active' : ''}`} onClick={() => handleFilterChange('all')}>Semua Divisi</button>
            <button className={`filter-tab ${filter === 'inti' ? 'active' : ''}`} onClick={() => handleFilterChange('inti')}>INTI</button>
            <button className={`filter-tab ${filter === 'riset' ? 'active' : ''}`} onClick={() => handleFilterChange('riset')}>RISET</button>
            <button className={`filter-tab ${filter === 'pku' ? 'active' : ''}`} onClick={() => handleFilterChange('pku')}>PKU</button>
            <button className={`filter-tab ${filter === 'lomba' ? 'active' : ''}`} onClick={() => handleFilterChange('lomba')}>LOMBA</button>
            <button className={`filter-tab ${filter === 'medhum' ? 'active' : ''}`} onClick={() => handleFilterChange('medhum')}>MEDHUM</button>
            <button className={`filter-tab ${filter === 'pengmas' ? 'active' : ''}`} onClick={() => handleFilterChange('pengmas')}>PENGMAS</button>
          </div>

          <div className="member-grid">
            {filteredMembers.map((member, idx) => (
              <div key={member.id} className={`member-card glass-panel div-${member.division}`} style={{ animationDelay: `${idx * 0.06}s` }}>
                <div className="member-avatar-wrapper">
                  <div className="member-avatar" style={member.image ? { background: 'transparent' } : {}}>
                    {member.image ? (
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        style={{ 
                          width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit', display: 'block',
                          transform: member.scale ? `scale(${member.scale})` : 'none',
                          transformOrigin: member.position || 'center'
                        }} 
                      />
                    ) : (
                      <i className="fa-solid fa-user" style={{ fontSize: '2.5rem', opacity: 0.5 }}></i>
                    )}
                  </div>
                </div>
                <div className="member-info">
                  <h3>{member.name}</h3>
                  <div className="member-role">{member.role}</div>
                  <span className="member-div">{member.division.toUpperCase()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default function StructurePage() {
  return (
    <Suspense fallback={
      <section className="page-header" style={{ paddingTop: '150px', paddingBottom: '50px' }}>
        <div className="container">
          <div className="page-header-content">
            <h1>Struktur <span className="text-gradient-cyan">Kepengurusan</span></h1>
            <p style={{ marginTop: '15px', color: 'var(--text-secondary)' }}>Mengenal asisten laboratorium EIM di setiap divisi.</p>
          </div>
        </div>
      </section>
    }>
      <StructureContent />
    </Suspense>
  );
}

