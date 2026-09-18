import React from 'react';
import { Code2, Server, Cpu, Bot, Database, HardDrive, Compass, Layers } from 'lucide-react';

export default function SkillsSection() {
  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: <Code2 size={24} color="var(--accent-cyan)" />,
      skills: ['React.js', 'Next.js', 'JavaScript (ES6+)', 'TypeScript', 'HTML5 / CSS3', 'Tailwind CSS']
    },
    {
      title: 'Virtual Tour 360°',
      icon: <Compass size={24} color="var(--accent-pink)" />,
      skills: ['krpano Engine', 'React/krpano Wrapper', 'Hotspot Design', 'Scene Navigation', 'Responsive VR UI']
    },
    {
      title: 'Backend Development',
      icon: <Server size={24} color="var(--accent-blue)" />,
      skills: ['Node.js', 'Python', 'RESTful API', 'JWT Authentication', 'Webhook Integrations']
    },
    {
      title: 'System & Architecture',
      icon: <Cpu size={24} color="var(--accent-purple)" />,
      skills: ['Microservices', 'Redis Caching', 'Message Queue (RabbitMQ)', 'Payment Flow Integration']
    },
    {
      title: 'AI-assisted Development',
      icon: <Bot size={24} color="var(--accent-emerald)" />,
      skills: ['Prompt Engineering', 'Codebase Analysis', 'Task Decomposition', 'Debugging & Refactoring', 'Code Review']
    },
    {
      title: 'Database & DevOps',
      icon: <Database size={24} color="#facc15" />,
      skills: ['MySQL', 'MongoDB', 'Linux / Ubuntu', 'Docker', 'Git / GitHub', 'CI/CD & Deployment']
    }
  ];

  return (
    <section id="skills" className="section" style={{ background: 'rgba(5, 8, 16, 0.4)' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div className="glass-pill" style={{ marginBottom: '16px' }}>
            <Layers size={16} color="var(--accent-cyan)" /> TECHNICAL COMPETENCIES
          </div>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>
            Bộ Kỹ Năng <span className="gradient-text">Chuyên Môn</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '680px', margin: '0 auto', fontSize: '1.05rem' }}>
            Tổng hợp các công nghệ, framework và công cụ được sử dụng trong công việc thực tế.
          </p>
        </div>

        {/* Skills Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
          {skillCategories.map((cat, idx) => (
            <div
              key={idx}
              className="glass-panel"
              style={{
                padding: '28px',
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--border-glass)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {cat.icon}
                </div>
                <h3 style={{ fontSize: '1.25rem', color: '#fff' }}>{cat.title}</h3>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      padding: '6px 14px',
                      borderRadius: '8px',
                      fontSize: '0.9rem',
                      color: 'var(--text-main)',
                      fontFamily: 'var(--font-mono)'
                    }}
                  >
                    {skill}
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
