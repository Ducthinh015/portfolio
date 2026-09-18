import React from 'react';
import { ArrowRight, Github, Mail, Sparkles, Layers, Cpu, Compass, CheckCircle2, Terminal } from 'lucide-react';

export default function HeroSection() {
  return (
    <section id="about" style={{ paddingTop: '160px', paddingBottom: '100px', position: 'relative' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '48px', alignItems: 'center' }} className="hero-grid">
          
          {/* Left Hero Content */}
          <div>
            {/* Status Pill */}
            <div className="glass-pill" style={{ marginBottom: '20px', borderColor: 'rgba(16, 185, 129, 0.4)' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', display: 'inline-block', boxShadow: '0 0 10px #10b981' }}></span>
              <span style={{ color: '#10b981', fontWeight: 600 }}>Sẵn sàng nhận vị trí công việc mới</span>
            </div>

            <h1 style={{ fontSize: '3.6rem', lineHeight: 1.1, marginBottom: '16px' }}>
              Xin chào, tôi là <br />
              <span className="gradient-text">NGUYỄN ĐỨC THỊNH</span>
            </h1>

            <h2 style={{ fontSize: '1.4rem', color: 'var(--accent-cyan)', fontWeight: 600, marginBottom: '24px', fontFamily: 'var(--font-mono)' }}>
              &gt; FULL-STACK & 360° VIRTUAL TOUR DEVELOPER
            </h2>

            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '32px', maxWidth: '620px' }}>
              Kỹ sư phần mềm phát triển hệ thống web hiện đại với <b>React, Next.js, Node.js, Python</b> và kiến trúc <b>Microservices</b>. Chuyên thiết kế ứng dụng <b>Virtual Tour 360°</b> tương tác cao và áp dụng <b>AI-assisted Coding</b> nâng cao tốc độ & chất lượng triển khai dự án.
            </p>

            {/* Quick Tech Badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '36px' }}>
              {['React.js', 'Next.js', 'Node.js', 'Python', 'krpano 360°', 'Microservices', 'Redis', 'Docker', 'Linux/Ubuntu'].map((skill) => (
                <span key={skill} className="glass-pill">
                  {skill}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
              <a href="#virtual-tour" className="btn-primary">
                <Sparkles size={18} /> Trải Nghiệm Demo 360° VR <ArrowRight size={18} />
              </a>
              <a href="https://github.com/Ducthinh015" target="_blank" rel="noreferrer" className="btn-secondary">
                <Github size={18} /> GitHub Ducthinh015
              </a>
            </div>
          </div>

          {/* Right Hero Card / Real Avatar Container */}
          <div style={{ position: 'relative' }}>
            {/* Glowing background aura */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '340px',
                height: '340px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(0,242,254,0.3) 0%, rgba(139,92,246,0.2) 50%, transparent 75%)',
                filter: 'blur(35px)',
                zIndex: 0
              }}
            />

            <div className="glass-panel" style={{ padding: '32px', textAlign: 'center', position: 'relative', zIndex: 1, border: '1px solid rgba(0, 242, 254, 0.4)' }}>
              
              {/* Actual Portrait Photo of Nguyễn Đức Thịnh */}
              <div style={{ position: 'relative', width: '200px', height: '200px', margin: '0 auto 24px auto' }}>
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    padding: '4px',
                    background: 'linear-gradient(135deg, #00f2fe, #8b5cf6, #ec4899)',
                    boxShadow: '0 0 35px rgba(0, 242, 254, 0.5)'
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      background: '#0f172a',
                      overflow: 'hidden',
                      position: 'relative'
                    }}
                  >
                    <img
                      src="./avatar.jpg"
                      alt="Nguyễn Đức Thịnh"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center top'
                      }}
                      onError={(e) => {
                        // Fallback if image fails to load
                        e.target.style.display = 'none';
                        e.target.parentNode.innerText = 'NĐT';
                        e.target.parentNode.style.display = 'flex';
                        e.target.parentNode.style.alignItems = 'center';
                        e.target.parentNode.style.justifyContent = 'center';
                        e.target.parentNode.style.fontSize = '2.5rem';
                        e.target.parentNode.style.fontWeight = 'bold';
                        e.target.parentNode.style.color = 'var(--accent-cyan)';
                      }}
                    />
                  </div>
                </div>

                {/* Floating Badge */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-8px',
                    right: '-8px',
                    background: 'rgba(7, 9, 14, 0.95)',
                    border: '1px solid var(--accent-cyan)',
                    borderRadius: '12px',
                    padding: '6px 14px',
                    fontSize: '0.85rem',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 20px rgba(0, 242, 254, 0.4)'
                  }}
                >
                  <Compass size={16} color="var(--accent-cyan)" /> 360° VR Expert
                </div>
              </div>

              {/* Information Cards Inside Right Box */}
              <h3 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '4px' }}>Nguyễn Đức Thịnh</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '20px' }}>
                Học viện Hàng không Việt Nam — CNTT
              </p>

              {/* Highlights Checklist */}
              <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '12px', background: 'rgba(0,0,0,0.3)', padding: '18px', borderRadius: '14px', border: '1px solid var(--border-glass)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.92rem' }}>
                  <CheckCircle2 size={16} color="var(--accent-cyan)" />
                  <span>Next.js, React & Node.js Microservices</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.92rem' }}>
                  <CheckCircle2 size={16} color="var(--accent-cyan)" />
                  <span>Virtual Tour 360° với krpano & React</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.92rem' }}>
                  <CheckCircle2 size={16} color="var(--accent-cyan)" />
                  <span>AI Prompt Engineering & Code Architecture</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.92rem' }}>
                  <CheckCircle2 size={16} color="var(--accent-cyan)" />
                  <span>Linux, Docker, Redis, CI/CD Deployment</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}
