import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Compass, Eye, Navigation, Cpu, Terminal, CheckCircle2 } from 'lucide-react';

export default function VirtualTourSection() {
  const mountRef = useRef(null);
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [yaw, setYaw] = useState(0);

  const scenePresets = [
    {
      id: 'system-map',
      name: 'System Map',
      primaryColor: 0x00f2fe,
      secondaryColor: 0x10b981,
      hotspots: [
        { id: 1, name: 'API Boundary', phi: Math.PI / 2, theta: 0.45, detail: 'Tư duy rõ service boundary, request/response contract và điểm cần validate dữ liệu.' },
        { id: 2, name: 'Async Worker', phi: Math.PI / 2.15, theta: -1.15, detail: 'Tách tác vụ nặng sang queue/worker để giảm coupling và tránh chặn request chính.' },
        { id: 3, name: 'Cache Layer', phi: Math.PI / 1.85, theta: 2.1, detail: 'Dùng cache có chủ đích: tăng tốc đọc dữ liệu nhưng vẫn chú ý invalidation và consistency.' }
      ]
    },
    {
      id: 'runtime-view',
      name: 'Runtime View',
      primaryColor: 0x4facfe,
      secondaryColor: 0x8b5cf6,
      hotspots: [
        { id: 4, name: 'Linux Deployment', phi: Math.PI / 2.05, theta: -0.35, detail: 'Build, deploy, cấu hình environment và kiểm tra log trên Linux/Ubuntu.' },
        { id: 5, name: 'AI Coding Loop', phi: Math.PI / 1.9, theta: 1.45, detail: 'Dùng AI để tăng tốc phân tích, sau đó tự kiểm chứng bằng đọc code, chạy build và review edge case.' }
      ]
    }
  ];

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return undefined;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 0.1);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    const currentPreset = scenePresets[activeSceneIndex];
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1);

    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    grad.addColorStop(0, '#050811');
    grad.addColorStop(0.5, activeSceneIndex === 0 ? '#0b1d33' : '#101232');
    grad.addColorStop(1, '#050811');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = activeSceneIndex === 0 ? 'rgba(0, 242, 254, 0.24)' : 'rgba(139, 92, 246, 0.24)';
    ctx.lineWidth = 2;
    for (let x = 0; x <= canvas.width; x += 64) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y <= canvas.height; y += 64) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    const colors = activeSceneIndex === 0 ? ['#00f2fe', '#10b981', '#4facfe'] : ['#4facfe', '#8b5cf6', '#10b981'];
    for (let i = 0; i < 36; i += 1) {
      const cx = (Math.sin(i * 1.7) * 0.5 + 0.5) * canvas.width;
      const cy = (Math.cos(i * 2.3) * 0.4 + 0.5) * canvas.height;
      const r = 18 + (i % 5) * 14;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = colors[i % colors.length];
      ctx.lineWidth = 3;
      ctx.shadowBlur = 15;
      ctx.shadowColor = colors[i % colors.length];
      ctx.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    scene.add(new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ map: texture })));

    const hotspotsGroup = new THREE.Group();
    scene.add(hotspotsGroup);

    currentPreset.hotspots.forEach((hs) => {
      const radius = 400;
      const x = radius * Math.sin(hs.phi) * Math.cos(hs.theta);
      const y = radius * Math.cos(hs.phi);
      const z = radius * Math.sin(hs.phi) * Math.sin(hs.theta);

      const hsMesh = new THREE.Mesh(
        new THREE.SphereGeometry(12, 16, 16),
        new THREE.MeshBasicMaterial({ color: currentPreset.primaryColor, wireframe: true })
      );
      hsMesh.position.set(x, y, z);
      hsMesh.userData = hs;

      const ringMesh = new THREE.Mesh(
        new THREE.RingGeometry(18, 22, 32),
        new THREE.MeshBasicMaterial({ color: currentPreset.secondaryColor, side: THREE.DoubleSide })
      );
      ringMesh.position.set(x, y, z);
      ringMesh.lookAt(0, 0, 0);

      const holder = new THREE.Group();
      holder.add(hsMesh);
      holder.add(ringMesh);
      hotspotsGroup.add(holder);
    });

    let isUserInteracting = false;
    let startX = 0;
    let startY = 0;
    let lon = 0;
    let startLon = 0;
    let lat = 0;
    let startLat = 0;

    const onPointerDown = (event) => {
      isUserInteracting = true;
      startX = event.clientX;
      startY = event.clientY;
      startLon = lon;
      startLat = lat;
    };

    const onPointerMove = (event) => {
      if (!isUserInteracting) return;
      lon = (startX - event.clientX) * 0.2 + startLon;
      lat = (event.clientY - startY) * 0.2 + startLat;
      setYaw(Math.round(lon % 360));
    };

    const onPointerUp = () => {
      isUserInteracting = false;
    };

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onClick = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / renderer.domElement.clientWidth) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / renderer.domElement.clientHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(hotspotsGroup.children, true);
      if (!intersects.length) return;
      let obj = intersects[0].object;
      while (obj && !obj.userData.id && obj.parent) obj = obj.parent;
      if (obj?.userData?.name) setSelectedHotspot(obj.userData);
    };

    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('click', onClick);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    const clock = new THREE.Clock();
    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isUserInteracting) {
        lon += 0.05;
        setYaw(Math.round(lon % 360));
      }
      lat = Math.max(-85, Math.min(85, lat));
      const phi = THREE.MathUtils.degToRad(90 - lat);
      const theta = THREE.MathUtils.degToRad(lon);
      camera.lookAt(500 * Math.sin(phi) * Math.cos(theta), 500 * Math.cos(phi), 500 * Math.sin(phi) * Math.sin(theta));

      const time = clock.getElapsedTime();
      hotspotsGroup.children.forEach((group) => {
        if (group.children[1]) group.children[1].rotation.z = time * 2;
      });
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.domElement.removeEventListener('click', onClick);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      if (currentMount.contains(renderer.domElement)) currentMount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [activeSceneIndex]);

  return (
    <section id="virtual-tour" className="section" style={{ background: 'rgba(5, 8, 16, 0.6)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div className="glass-pill" style={{ marginBottom: '16px', borderColor: 'var(--border-glow)' }}>
            <Compass size={16} color="var(--accent-cyan)" /> INTERACTIVE SYSTEM CASE
          </div>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>
            360° demo như một <span className="gradient-text">case study kỹ thuật</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '780px', margin: '0 auto', fontSize: '1.05rem' }}>
            Demo này giữ điểm khác biệt của portfolio, nhưng được đặt đúng vai trò: một bài toán tích hợp engine, state, tương tác, hiệu năng và triển khai.
          </p>
        </div>

        <div style={{ position: 'relative', marginBottom: '36px' }}>
          <div
            className="glass-panel"
            style={{
              height: '480px',
              width: '100%',
              position: 'relative',
              borderRadius: '14px',
              overflow: 'hidden',
              border: '1px solid rgba(0, 242, 254, 0.4)',
              cursor: 'grab'
            }}
          >
            <div ref={mountRef} style={{ width: '100%', height: '100%' }} />

            <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 10, display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <span className="glass-pill" style={{ background: 'rgba(7, 9, 14, 0.85)', color: 'var(--accent-cyan)', borderColor: 'var(--accent-cyan)' }}>
                <Eye size={14} /> Live WebGL
              </span>
              <span className="glass-pill" style={{ background: 'rgba(7, 9, 14, 0.85)', color: 'var(--text-muted)' }}>
                <Navigation size={14} /> Angle: {yaw}° yaw
              </span>
            </div>

            <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 10, display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
              {scenePresets.map((preset, idx) => (
                <button
                  key={preset.id}
                  onClick={() => {
                    setActiveSceneIndex(idx);
                    setSelectedHotspot(null);
                  }}
                  style={{
                    background: activeSceneIndex === idx ? 'linear-gradient(135deg, #00f2fe, #4facfe)' : 'rgba(15, 23, 42, 0.85)',
                    color: activeSceneIndex === idx ? '#07090e' : '#fff',
                    border: '1px solid var(--border-glass)',
                    padding: '8px 14px',
                    borderRadius: '10px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontSize: '0.84rem',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  {preset.name}
                </button>
              ))}
            </div>

            {selectedHotspot && (
              <div
                style={{
                  position: 'absolute',
                  bottom: '24px',
                  left: '24px',
                  right: '24px',
                  maxWidth: '520px',
                  margin: '0 auto',
                  zIndex: 20,
                  background: 'rgba(15, 23, 42, 0.95)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid var(--accent-cyan)',
                  borderRadius: '14px',
                  padding: '20px',
                  boxShadow: '0 0 30px rgba(0, 242, 254, 0.3)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', gap: '12px' }}>
                  <h4 style={{ color: 'var(--accent-cyan)', fontSize: '1.08rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Navigation size={16} /> {selectedHotspot.name}
                  </h4>
                  <button onClick={() => setSelectedHotspot(null)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.1rem' }}>
                    x
                  </button>
                </div>
                <p style={{ color: '#fff', fontSize: '0.92rem', lineHeight: 1.5 }}>{selectedHotspot.detail}</p>
              </div>
            )}

            <div
              style={{
                position: 'absolute',
                bottom: '20px',
                right: '20px',
                zIndex: 10,
                background: 'rgba(7, 9, 14, 0.82)',
                padding: '6px 14px',
                borderRadius: '99px',
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
                pointerEvents: 'none',
                border: '1px solid var(--border-glass)'
              }}
            >
              Nhấn giữ và rê chuột để xoay góc nhìn
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {[
            { icon: <Cpu size={22} />, title: 'Integration Thinking', text: 'Tách UI, engine và dữ liệu cấu hình để code dễ đọc, dễ mở rộng và ít lỗi lan truyền.' },
            { icon: <Terminal size={22} />, title: 'Runtime Mindset', text: 'Quan tâm build, deploy, log, môi trường chạy và cách kiểm chứng sau khi đưa lên server.' },
            { icon: <CheckCircle2 size={22} />, title: 'AI With Ownership', text: 'Dùng AI coding để tăng tốc, nhưng vẫn review, test và chịu trách nhiệm với code cuối cùng.' }
          ].map((item) => (
            <div key={item.title} className="glass-panel" style={{ padding: '26px', borderRadius: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(0, 242, 254, 0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-cyan)' }}>
                  {item.icon}
                </div>
                <h3 style={{ fontSize: '1.14rem', color: '#fff' }}>{item.title}</h3>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
