'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [admin, setAdmin] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch('/api/auth/session');
        const data = await res.json();
        if (data.loggedIn && data.user.role === 'admin') {
          setAdmin(data.user);
        } else {
          setAdmin(null);
        }
      } catch (err) {
        setAdmin(null);
      }
    };
    checkSession();
  }, [pathname]);

  const closeMenu = () => setIsOpen(false);

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' });
      if (res.ok) {
        setAdmin(null);
        window.location.reload();
      }
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="container">
        <Link href="/" className="logo-container" onClick={closeMenu}>
          <div className="logo-icon">
            <img src="/img/EIM Only Logo.png" alt="EIM Logo" />
          </div>
          <div className="logo-text">
            <span className="text-gradient-dual">EIM</span>
            <span className="logo-sub">Research Lab</span>
          </div>
        </Link>

        <ul className={`nav-links ${isOpen ? 'active' : ''}`} id="nav-links">
          <li className={pathname === '/' ? 'active' : ''}><Link href="/" onClick={closeMenu}>Home</Link></li>
          <li className={pathname === '/about' ? 'active' : ''}><Link href="/about" onClick={closeMenu}>About</Link></li>
          <li className={pathname === '/event' ? 'active' : ''}><Link href="/event" onClick={closeMenu}>Event</Link></li>
          <li className={pathname === '/structure' ? 'active' : ''}><Link href="/structure" onClick={closeMenu}>Structure</Link></li>
          <li className={pathname === '/news' ? 'active' : ''}><Link href="/news" onClick={closeMenu}>News</Link></li>
          <li className={pathname === '/pendaftaran' ? 'active' : ''}><Link href="/pendaftaran" onClick={closeMenu}>Pendaftaran</Link></li>
          
          {admin ? (
            <li>
              <a 
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleLogout();
                }} 
                style={{ 
                  cursor: 'pointer'
                }}
              >
                Logout
              </a>
            </li>
          ) : (
            <li className={pathname === '/login' ? 'active' : ''}>
              <Link href="/login" onClick={closeMenu}>
                Login
              </Link>
            </li>
          )}
        </ul>

        <div className={`nav-toggle ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
}
