import React from 'react';
import { Briefcase, GraduationCap, Calendar, CheckCircle2 } from 'lucide-react';

export default function ExperienceSection() {
  const experiences = [
    {
      role: 'Software Developer',
      time: '05/2026 – Hiện tại',
      company: 'React • krpano • JavaScript',
      tags: ['React', 'krpano', 'JavaScript', 'Responsive UI', 'Deployment', 'Debugging'],
      points: [
        'Phát triển ứng dụng Virtual Tour 360° bằng React và krpano.',
        'Xây dựng component, hotspot, scene navigation và các tính năng tương tác.',
        'Thiết kế prompt theo codebase context, technical constraints và yêu cầu tính năng để hỗ trợ phân tích, implementation và debugging React/krpano.',
        'Xử lý responsive UI, debugging và tối ưu trải nghiệm web.',
        'Tham gia build, deployment và troubleshooting ứng dụng.'
      ]
    },
    {
      role: 'Full-stack Developer',
      time: '12/2025 – 05/2026',
      company: 'Next.js • React • Node.js • Python',
      tags: ['Next.js', 'React', 'Node.js', 'Python', 'Microservices', 'Redis', 'RabbitMQ', 'Payment Flow'],
      points: [
        'Phát triển frontend, backend, RESTful API và business logic cho ứng dụng web.',
        'Làm việc với microservices, Redis, message queue và payment flow.',
        'Tích hợp API, database và xử lý giao tiếp giữa các thành phần hệ thống.',
        'Ứng dụng AI coding & prompt engineering để phân tích codebase, chia nhỏ task, triển khai tính năng, debug và refactor.',
        'Tham gia deployment và troubleshooting trên Linux/Ubuntu.'
      ]
    }
  ];

  return (
    <section id="experience" className="section">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div className="glass-pill" style={{ marginBottom: '16px' }}>
            <Briefcase size={16} color="var(--accent-cyan)" /> ENGINEERING TIMELINE
          </div>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>
            Kinh nghiệm <span className="gradient-text">backend & system thực chiến</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '760px', margin: '0 auto', fontSize: '1.05rem' }}>
            Không chỉ làm giao diện. Tôi quan tâm cách hệ thống chạy, cách dữ liệu đi qua API, cache, queue, database và cách deploy/debug khi lên môi trường thật.
          </p>
        </div>

        <div style={{ maxWidth: '940px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {experiences.map((exp, index) => (
            <div key={index} className="glass-panel" style={{ padding: '36px', borderLeft: '4px solid var(--accent-cyan)', position: 'relative', borderRadius: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '1.58rem', color: '#fff', marginBottom: '4px' }}>{exp.role}</h3>
                  <div style={{ color: 'var(--accent-cyan)', fontWeight: 700, fontSize: '1.02rem' }}>
                    {exp.company}
                  </div>
                </div>

                <span className="glass-pill" style={{ borderColor: 'rgba(0, 242, 254, 0.4)', background: 'rgba(0, 242, 254, 0.1)' }}>
                  <Calendar size={14} color="var(--accent-cyan)" /> {exp.time}
                </span>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                {exp.tags.map((tag) => (
                  <span key={tag} style={{ background: 'rgba(255,255,255,0.06)', padding: '4px 12px', borderRadius: '6px', fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    #{tag}
                  </span>
                ))}
              </div>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {exp.points.map((pt, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', color: 'var(--text-main)', fontSize: '0.98rem', lineHeight: 1.65 }}>
                    <CheckCircle2 size={18} color="var(--accent-emerald)" style={{ flexShrink: 0, marginTop: '4px' }} />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="glass-panel" style={{ padding: '32px', borderLeft: '4px solid var(--accent-purple)', background: 'rgba(139, 92, 246, 0.05)', borderRadius: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '12px',
                  background: 'rgba(139, 92, 246, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-purple)'
                }}
              >
                <GraduationCap size={28} />
              </div>
              <div style={{ flex: 1, minWidth: '260px' }}>
                <h3 style={{ fontSize: '1.3rem', color: '#fff' }}>Học viện Hàng không Việt Nam</h3>
                <p style={{ color: 'var(--accent-purple)', fontWeight: 700 }}>Chuyên ngành: Công nghệ thông tin</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
                  Nền tảng khoa học máy tính, tư duy thuật toán, lập trình phần mềm và tinh thần tự học liên tục.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
