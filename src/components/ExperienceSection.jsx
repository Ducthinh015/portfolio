import React from 'react';
import { Briefcase, GraduationCap, Calendar, CheckCircle2, Terminal, Code, Cpu, Server, ShieldCheck } from 'lucide-react';

export default function ExperienceSection() {
  const experiences = [
    {
      role: 'Software Developer',
      time: '05/2026 – Hiện tại',
      company: 'Virtual Tour 360° & Web Application',
      tags: ['React', 'krpano', 'JavaScript', 'HTML/CSS', 'Responsive UI', 'Linux'],
      points: [
        'Phát triển ứng dụng Virtual Tour 360° chuyên nghiệp bằng cách kết hợp React và engine krpano.',
        'Xây dựng linh hoạt hệ thống component, điểm hotspot, scene navigation và các tính năng tương tác đa dạng.',
        'Thiết kế prompt theo codebase context, technical constraints và yêu cầu tính năng để hỗ trợ phân tích, implementation và debugging React/krpano.',
        'Xử lý responsive UI chuẩn xác trên đa thiết bị, debugging và tối ưu trải nghiệm người dùng web.',
        'Trực tiếp tham gia build, deployment và troubleshooting ứng dụng trên hạ tầng server Linux.'
      ]
    },
    {
      role: 'Full-stack Developer',
      time: '12/2025 – 05/2026',
      company: 'Web Application & System Microservices',
      tags: ['Next.js', 'React', 'Node.js', 'Python', 'Redis', 'Message Queue', 'Microservices', 'Payment Flow'],
      points: [
        'Phát triển frontend, backend, RESTful API và business logic hoàn chỉnh cho ứng dụng web.',
        'Làm việc với kiến trúc microservices, tích hợp Caching Redis, Message Queue và quy trình xử lý thanh toán (payment flow).',
        'Tích hợp API, cơ sở dữ liệu và xử lý giao tiếp liền mạch giữa các thành phần dịch vụ trong hệ thống.',
        'Ứng dụng AI coding & prompt engineering để phân tích codebase kiến trúc phức tạp, chia nhỏ task, triển khai tính năng, debug và refactor code.',
        'Tham gia quản trị deployment và troubleshooting hệ thống vận hành trên môi trường Linux/Ubuntu.'
      ]
    }
  ];

  return (
    <section id="experience" className="section">
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div className="glass-pill" style={{ marginBottom: '16px' }}>
            <Briefcase size={16} color="var(--accent-cyan)" /> CAREER TIMELINE
          </div>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>
            Kinh Nghiệm <span className="gradient-text">Làm Việc Thực Chiến</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '680px', margin: '0 auto', fontSize: '1.05rem' }}>
            Hành trình phát triển sản phẩm từ Full-stack Web Microservices đến các ứng dụng 360° VR chuyên sâu.
          </p>
        </div>

        {/* Timeline List */}
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {experiences.map((exp, index) => (
            <div key={index} className="glass-panel" style={{ padding: '36px', borderLeft: '4px solid var(--accent-cyan)', position: 'relative' }}>
              
              {/* Header inside card */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '4px' }}>{exp.role}</h3>
                  <div style={{ color: 'var(--accent-cyan)', fontWeight: 600, fontSize: '1.05rem' }}>
                    {exp.company}
                  </div>
                </div>
                
                <span className="glass-pill" style={{ borderColor: 'rgba(0, 242, 254, 0.4)', background: 'rgba(0, 242, 254, 0.1)' }}>
                  <Calendar size={14} color="var(--accent-cyan)" /> {exp.time}
                </span>
              </div>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                {exp.tags.map((tag) => (
                  <span key={tag} style={{ background: 'rgba(255,255,255,0.06)', padding: '4px 12px', borderRadius: '6px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Bullet points */}
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {exp.points.map((pt, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', color: 'var(--text-main)', fontSize: '0.98rem', lineHeight: 1.6 }}>
                    <CheckCircle2 size={18} color="var(--accent-emerald)" style={{ flexShrink: 0, marginTop: '3px' }} />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

            </div>
          ))}

          {/* Education Box */}
          <div className="glass-panel" style={{ padding: '32px', borderLeft: '4px solid var(--accent-purple)', background: 'rgba(139, 92, 246, 0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
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
              <div>
                <h3 style={{ fontSize: '1.3rem', color: '#fff' }}>Học viện Hàng không Việt Nam</h3>
                <p style={{ color: 'var(--accent-purple)', fontWeight: 600 }}>Chuyên ngành: Công nghệ Thông tin</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
                  Trang bị nền tảng khoa học máy tính vững chắc, tư duy thuật toán và lập trình phần mềm hiện đại.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
