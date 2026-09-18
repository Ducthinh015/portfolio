import React, { useState } from 'react';
import { Mail, Phone, Github, MapPin, GraduationCap, CheckCircle, Copy, ExternalLink } from 'lucide-react';

export default function ContactSection() {
  const [copied, setCopied] = useState('');

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2500);
  };

  return (
    <section id="contact" className="section" style={{ background: 'rgba(5, 8, 16, 0.6)' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div className="glass-pill" style={{ marginBottom: '16px', borderColor: 'var(--border-glow)' }}>
            <Mail size={16} color="var(--accent-cyan)" /> DIRECT CONTACT
          </div>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>
            Thông Tin <span className="gradient-text">Liên Hệ Trực Tiếp</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '640px', margin: '0 auto', fontSize: '1.05rem' }}>
            Rất hân hạnh được hợp tác và trao đổi chi tiết hơn về các cơ hội công việc Full-stack & 360° Developer.
          </p>
        </div>

        {/* 4 Clean High-Tech Contact Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '24px' }}>
          
          {/* Email Card */}
          <div className="glass-panel" style={{ padding: '28px', borderRadius: '18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1px solid rgba(0, 242, 254, 0.3)' }}>
            <div>
              <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'rgba(0, 242, 254, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-cyan)', marginBottom: '16px' }}>
                <Mail size={26} />
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Email Cá Nhân</div>
              <h3 style={{ fontSize: '1.1rem', color: '#fff', wordBreak: 'break-all', marginBottom: '16px' }}>thinh0408205@gmail.com</h3>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <a href="mailto:thinh0408205@gmail.com" className="btn-primary" style={{ flex: 1, padding: '10px 14px', fontSize: '0.85rem', justifyContent: 'center' }}>
                Gửi Email
              </a>
              <button
                onClick={() => handleCopy('thinh0408205@gmail.com', 'email')}
                className="btn-secondary"
                style={{ padding: '10px 14px', fontSize: '0.85rem' }}
                title="Sao chép Email"
              >
                {copied === 'email' ? <CheckCircle size={18} color="var(--accent-emerald)" /> : <Copy size={18} />}
              </button>
            </div>
          </div>

          {/* Phone Card */}
          <div className="glass-panel" style={{ padding: '28px', borderRadius: '18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1px solid rgba(79, 172, 254, 0.3)' }}>
            <div>
              <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'rgba(79, 172, 254, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-blue)', marginBottom: '16px' }}>
                <Phone size={26} />
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Số Điện Thoại</div>
              <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '16px' }}>0905 175 313</h3>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <a href="tel:0905175313" className="btn-primary" style={{ flex: 1, padding: '10px 14px', fontSize: '0.85rem', justifyContent: 'center' }}>
                Gọi Điện
              </a>
              <button
                onClick={() => handleCopy('0905175313', 'phone')}
                className="btn-secondary"
                style={{ padding: '10px 14px', fontSize: '0.85rem' }}
                title="Sao chép Số điện thoại"
              >
                {copied === 'phone' ? <CheckCircle size={18} color="var(--accent-emerald)" /> : <Copy size={18} />}
              </button>
            </div>
          </div>

          {/* GitHub Card */}
          <div className="glass-panel" style={{ padding: '28px', borderRadius: '18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
            <div>
              <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'rgba(255, 255, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', marginBottom: '16px' }}>
                <Github size={26} />
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>GitHub Profile</div>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--accent-cyan)', marginBottom: '16px' }}>github.com/Ducthinh015</h3>
            </div>

            <a
              href="https://github.com/Ducthinh015"
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
              style={{ padding: '10px 14px', fontSize: '0.85rem', justifyContent: 'center' }}
            >
              Truy Cập GitHub <ExternalLink size={16} />
            </a>
          </div>

          {/* Education & Location Card */}
          <div className="glass-panel" style={{ padding: '28px', borderRadius: '18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
            <div>
              <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'rgba(139, 92, 246, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-purple)', marginBottom: '16px' }}>
                <GraduationCap size={26} />
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Học Vấn / Trường</div>
              <h3 style={{ fontSize: '1.05rem', color: '#fff', marginBottom: '4px' }}>Học viện Hàng không Việt Nam</h3>
              <p style={{ color: 'var(--accent-purple)', fontSize: '0.88rem', fontWeight: 600 }}>Công nghệ Thông tin</p>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '10px 14px', borderRadius: '10px', fontSize: '0.85rem', color: 'var(--text-dim)', marginTop: '16px' }}>
              📍 Sẵn sàng nhận việc & phỏng vấn
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
