import React from 'react';
import { Compass, Server, Bot, Code, CheckCircle2 } from 'lucide-react';

export default function ProjectsSection() {
  const projects = [
    {
      title: '360° Virtual Tour Web Application',
      category: 'Virtual Reality & React krpano',
      icon: <Compass size={24} color="var(--accent-cyan)" />,
      desc: 'Ứng dụng Virtual Tour 360° tương tác cao kết hợp React và krpano. Cho phép di chuyển giữa các scene 360, tương tác với các hotspot thông tin, tối ưu hiệu năng mượt mà trên đa màn hình.',
      highlights: [
        'Tương tác 2 chiều giữa React component và engine krpano',
        'Quản lý danh sách scene và hotspot 3D linh hoạt',
        'Tối ưu responsive và tốc độ tải trang trên môi trường Linux'
      ],
      tags: ['React', 'krpano', 'JavaScript', 'Virtual Tour 360°', 'Responsive UI', 'Linux']
    },
    {
      title: 'Microservices Web Platform & Payment Flow',
      category: 'Full-stack & Enterprise Architecture',
      icon: <Server size={24} color="var(--accent-blue)" />,
      desc: 'Hệ thống web microservices được phát triển với Next.js, Node.js và Python. Tích hợp Redis Caching, RabbitMQ Message Queue và quy trình xử lý thanh toán tự động hóa.',
      highlights: [
        'Xây dựng RESTful API và business logic microservices',
        'Tích hợp Caching Redis & Message Queue xử lý bất đồng bộ',
        'Triển khai quy trình Payment Flow an toàn và ổn định'
      ],
      tags: ['Next.js', 'React', 'Node.js', 'Python', 'Redis', 'Message Queue', 'Microservices']
    },
    {
      title: 'AI Prompt Engineering & Code Analysis Kit',
      category: 'AI Software Development',
      icon: <Bot size={24} color="var(--accent-emerald)" />,
      desc: 'Hệ thống thiết kế prompt chuyên biệt theo codebase context, hỗ trợ phân tích kiến trúc, chia nhỏ nhiệm vụ kỹ thuật, triển khai tính năng và refactor code tự động.',
      highlights: [
        'Thiết kế prompt theo ràng buộc kỹ thuật codebase context',
        'Phân tích kiến trúc hệ thống và chia nhỏ công việc triển khai',
        'Tự động hóa refactoring, code review và khắc phục sự cố'
      ],
      tags: ['Prompt Engineering', 'AI Coding', 'Code Architecture', 'Refactoring', 'Task Decomposition']
    }
  ];

  return (
    <section id="projects" className="section">
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div className="glass-pill" style={{ marginBottom: '16px' }}>
            <Code size={16} color="var(--accent-cyan)" /> FEATURED DEDICATED WORKS
          </div>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>
            Dự Án <span className="gradient-text">Tiêu Biểu</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '680px', margin: '0 auto', fontSize: '1.05rem' }}>
            Những sản phẩm phần mềm được thiết kế và triển khai với tiêu chuẩn kỹ thuật cao.
          </p>
        </div>

        {/* Projects Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px' }}>
          {projects.map((proj, idx) => (
            <div
              key={idx}
              className="glass-panel"
              style={{
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderRadius: '20px',
                position: 'relative'
              }}
            >
              <div>
                <div style={{ marginBottom: '16px' }}>
                  <span className="glass-pill" style={{ background: 'rgba(0, 242, 254, 0.1)', color: 'var(--accent-cyan)', fontSize: '0.8rem' }}>
                    {proj.category}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.35rem', color: '#fff', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {proj.icon} {proj.title}
                </h3>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '20px' }}>
                  {proj.desc}
                </p>

                {/* Technical Highlights */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', background: 'rgba(0,0,0,0.25)', padding: '16px', borderRadius: '12px', marginBottom: '24px' }}>
                  {proj.highlights.map((hl, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: 'var(--text-main)' }}>
                      <CheckCircle2 size={15} color="var(--accent-cyan)" style={{ flexShrink: 0 }} />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {proj.tags.map((tag) => (
                  <span key={tag} style={{ background: 'rgba(255,255,255,0.05)', padding: '4px 10px', borderRadius: '6px', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
