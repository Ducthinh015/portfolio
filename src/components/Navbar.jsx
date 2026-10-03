import React, { useState, useEffect } from 'react';
import { Cpu, Eye, Menu, X } from 'lucide-react';

export default function Navbar({ isXray, setIsXray, isHidden }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isFirstView, setIsFirstView] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const heroElement = document.getElementById('trang-chu');
      if (heroElement) {
        const rect = heroElement.getBoundingClientRect();
        setIsFirstView(rect.bottom > 250);
      } else {
        setIsFirstView(window.scrollY < 300);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isHidden) return null;

  const navItems = [
    { label: 'Trang chủ', href: '#trang-chu' },
    { label: 'Hệ thống', href: '#he-thong' },
    { label: 'Kiến trúc', href: '#kien-truc' },
    { label: 'Năng lực', href: '#nang-luc' },
    { label: 'Dự án', href: '#du-an' },
    { label: 'Hành trình', href: '#hanh-trinh' },
    { label: 'Liên hệ', href: '#lien-he' }
  ];

  const handleNavClick = (e, href) => {
    setMobileMenuOpen(false);
    if (href === '#trang-chu') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBrandClick = (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="site-navbar">
      <a href="#trang-chu" className="site-brand" onClick={handleBrandClick}>
        <span className="site-logo">NDT</span>
        <span className="site-brand-line" />
        <span>
          <strong>NGUYỄN ĐỨC THỊNH</strong>
          <em>BACKEND ENGINEER</em>
        </span>
      </a>

      <nav className="site-nav-links">
        {navItems.map((item) => (
          <a key={item.href} href={item.href} onClick={(e) => handleNavClick(e, item.href)}>{item.label}</a>
        ))}
      </nav>

      <div className="site-nav-actions">
        {isFirstView && (
          <div className="mode-switch animate-in fade-in zoom-in-95 duration-300">
            <button type="button" onClick={() => setIsXray(false)} className={!isXray ? 'is-active' : ''}>
              <Eye size={15} />
              <span>Thường</span>
            </button>
            <button type="button" onClick={() => setIsXray(true)} className={isXray ? 'is-active' : ''}>
              <Cpu size={15} />
              <span>X-Ray</span>
            </button>
          </div>
        )}

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-overlay animate-in fade-in duration-200">
          <nav className="mobile-nav-menu">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="mobile-nav-link"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

