'use client';

import { useState, useRef, useEffect } from 'react';

export default function DateRangePicker({ startDate, endDate, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(new Date());
  const [hoverDate, setHoverDate] = useState(null);
  const containerRef = useRef(null);

  // Close calendar when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Sync viewed month with selected start date if it changes
  useEffect(() => {
    if (startDate) {
      const parsed = new Date(startDate);
      if (!isNaN(parsed.getTime())) {
        setViewDate(parsed);
      }
    }
  }, [startDate]);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  // Helper to format date to YYYY-MM-DD
  const formatDateString = (y, m, d) => {
    const mm = String(m + 1).padStart(2, '0');
    const dd = String(d).padStart(2, '0');
    return `${y}-${mm}-${dd}`;
  };

  const handlePrevMonth = () => {
    setViewDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(year, month + 1, 1));
  };

  // Get days array for rendering calendar grid
  const getDaysArray = () => {
    const firstDayIndex = new Date(year, month, 1).getDay(); // 0 is Sunday
    const totalDays = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    // Add empty placeholders for offset days before the 1st of the month
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(null);
    }
    // Add actual month days
    for (let d = 1; d <= totalDays; d++) {
      days.push(formatDateString(year, month, d));
    }
    return days;
  };

  const handleDaySelect = (dayStr) => {
    if (!startDate || (startDate && endDate)) {
      // Start a new selection range
      onChange(dayStr, '');
    } else {
      // We have startDate but no endDate
      if (dayStr < startDate) {
        // If clicked date is before start date, treat it as the new start date
        onChange(dayStr, '');
      } else {
        // Set end date and close calendar
        onChange(startDate, dayStr);
        setIsOpen(false);
      }
    }
  };

  const isSelected = (dayStr) => {
    return dayStr === startDate || dayStr === endDate;
  };

  const isBetween = (dayStr) => {
    if (!startDate) return false;
    
    // If end date is set, check range
    if (endDate) {
      return dayStr > startDate && dayStr < endDate;
    }
    
    // If only start date is set and we are hovering, check range from start to hover
    if (hoverDate && dayStr > startDate && dayStr < hoverDate) {
      return true;
    }
    
    return false;
  };

  // Human readable display label inside input
  const getDisplayLabel = () => {
    if (!startDate) return '';
    if (!endDate) return startDate;
    return `${startDate} s/d ${endDate}`;
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange('', '');
  };

  const days = getDaysArray();
  const weekdays = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%' }}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          position: 'relative'
        }}
      >
        <input 
          type="text" 
          readOnly 
          placeholder="Pilih Tanggal Kegiatan..." 
          value={getDisplayLabel()}
          className="form-control modal-input"
          style={{ 
            width: '100%', 
            cursor: 'pointer',
            paddingRight: '35px'
          }}
        />
        <div style={{ position: 'absolute', right: '12px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
          {getDisplayLabel() && (
            <i 
              className="fa-solid fa-circle-xmark hover-text-danger" 
              onClick={handleClear} 
              style={{ fontSize: '0.95rem', cursor: 'pointer', opacity: 0.7, transition: 'opacity 0.2s' }}
              title="Reset Tanggal"
            />
          )}
          <i className="fa-solid fa-calendar-days" style={{ fontSize: '0.9rem' }} />
        </div>
      </div>

      {isOpen && (
        <div 
          className="glass-panel" 
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            left: 0,
            zIndex: 999,
            width: '300px',
            backgroundColor: 'rgba(20, 20, 25, 0.95)',
            border: '1px solid var(--border-color, rgba(255,255,255,0.1))',
            borderRadius: '12px',
            padding: '16px',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(8px)'
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <button 
              type="button" 
              onClick={handlePrevMonth}
              style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', fontSize: '0.9rem' }}
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <span style={{ color: 'var(--text-primary)', fontWeight: 'bold', fontSize: '0.9rem' }}>
              {monthNames[month]} {year}
            </span>
            <button 
              type="button" 
              onClick={handleNextMonth}
              style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', fontSize: '0.9rem' }}
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>

          {/* Weekdays */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', marginBottom: '10px' }}>
            {weekdays.map((wd) => (
              <span key={wd} style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--text-muted, #777)' }}>
                {wd}
              </span>
            ))}
          </div>

          {/* Days Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', rowGap: '4px', textAlign: 'center' }}>
            {days.map((day, idx) => {
              if (!day) return <div key={`empty-${idx}`} />;
              
              const isSel = isSelected(day);
              const isBtn = isBetween(day);
              const isStart = day === startDate;
              const isEnd = day === endDate;
              const dateObj = new Date(day);
              const dateNum = dateObj.getDate();

              let cellStyle = {
                fontSize: '0.8rem',
                padding: '6px 0',
                cursor: 'pointer',
                borderRadius: '4px',
                transition: 'all 0.15s ease',
                color: 'var(--text-primary, #fff)',
                position: 'relative'
              };

              if (isSel) {
                cellStyle = {
                  ...cellStyle,
                  backgroundColor: '#11B4BD',
                  color: '#fff',
                  fontWeight: 'bold',
                  borderRadius: isStart ? '4px 0 0 4px' : '0 4px 4px 0'
                };
                // If it is single date selection, keep it circular
                if (isStart && !endDate) {
                  cellStyle.borderRadius = '4px';
                }
              } else if (isBtn) {
                cellStyle = {
                  ...cellStyle,
                  backgroundColor: 'rgba(17, 180, 189, 0.15)',
                  borderRadius: '0'
                };
              }

              return (
                <div 
                  key={day}
                  onClick={() => handleDaySelect(day)}
                  onMouseEnter={() => setHoverDate(day)}
                  onMouseLeave={() => setHoverDate(null)}
                  style={cellStyle}
                  className="hover-bg-light"
                >
                  {dateNum}
                </div>
              );
            })}
          </div>

          {/* Footer Info */}
          <div style={{ marginTop: '15px', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.08)', fontSize: '0.75rem', color: 'var(--text-muted, #888)', textAlign: 'center' }}>
            {!startDate ? 'Pilih tanggal mulai' : !endDate ? 'Pilih tanggal selesai (atau klik luar untuk simpan 1 tanggal)' : 'Rentang tanggal terpilih'}
          </div>
        </div>
      )}

      {/* Styled hover custom transitions */}
      <style dangerouslySetInnerHTML={{__html: `
        .hover-bg-light:hover {
          background-color: rgba(17, 180, 189, 0.3) !important;
          color: #fff !important;
        }
        .hover-text-danger:hover {
          color: #ff4d4d !important;
          opacity: 1 !important;
        }
      `}} />
    </div>
  );
}
