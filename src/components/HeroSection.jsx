import React from 'react';
import { ArrowUpRight, Box, Cuboid, Folder, Mail, Send } from 'lucide-react';
import BackendCityCanvas from './BackendCityCanvas';

const heroCards = [
  {
    num: '01',
    title: 'HỆ THỐNG',
    text: 'Reliable services for real-world scale.',
    href: '#he-thong',
    icon: Box,
    image: '/assets/ecommerce_backend.jpg'
  },
  {
    num: '02',
    title: 'KIẾN TRÚC',
    text: 'Clean design. Long-term thinking.',
    href: '#kien-truc',
    icon: Cuboid,
    image: '/assets/ai_analyzer.jpg'
  },
  {
    num: '03',
    title: 'DỰ ÁN',
    text: 'From ideas to real products.',
    href: '#du-an',
    icon: Folder,
    image: '/assets/virtual_tour.jpg'
  },
  {
    num: '04',
    title: 'LIÊN HỆ',
    text: 'Let’s build something great.',
    href: '#lien-he',
    icon: Send,
    image: '/assets/backend_city_premium_normal.png'
  }
];

export default function HeroSection({ isXray }) {
  return (
    <section id="trang-chu" className="hero-cinematic">
      <BackendCityCanvas isXray={isXray} />

      <div className="hero-content">
        <div className="hero-eyebrow">
          <span />
          <p>XÂY DỰNG PHẦN VÔ HÌNH - VẬN HÀNH PHẦN HỮU HÌNH</p>
        </div>

        <h1 className="hero-name">
          NGUYỄN ĐỨC<br /> THỊNH
        </h1>
        <div className="hero-role">BACKEND ENGINEER</div>

        <p className="hero-description">
          Tôi xây dựng các hệ thống backend ổn định, có khả năng mở rộng và vận hành đáng tin cậy, biến những yêu cầu phức tạp thành sản phẩm thực tế.
        </p>

        <div className="hero-actions">
          <a href="#du-an" className="hero-cta hero-cta-primary">
            <ArrowUpRight size={18} />
            <span>Xem dự án</span>
          </a>
          <a href="#lien-he" className="hero-cta hero-cta-secondary">
            <Mail size={17} />
            <span>Liên hệ</span>
          </a>
        </div>

      </div>

      <div className="hero-bottom-cards">
        {heroCards.map((card) => {
          const Icon = card.icon;
          return (
            <a
              key={card.num}
              href={card.href}
              className="hero-nav-card"
              onMouseMove={(event) => {
                const rect = event.currentTarget.getBoundingClientRect();
                event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`);
                event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`);
              }}
            >
              <img src={card.image} alt="" />
              <div className="hero-nav-card-overlay" />
              <div className="hero-nav-card-scan" />
              <div className="hero-nav-card-content">
                <div>
                  <span className="hero-nav-card-num">{card.num}</span>
                  <div className="hero-nav-card-header">
                    <Icon className="hero-nav-card-icon" size={24} />
                    <h3>{card.title}</h3>
                  </div>
                  <p>{card.text}</p>
                </div>
                <span className="hero-nav-card-arrow">
                  <ArrowUpRight size={20} />
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
