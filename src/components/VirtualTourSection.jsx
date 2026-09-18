import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Compass, Eye, Navigation, Zap, Cpu, Maximize2, RotateCcw, Info, Layers, Layers3, CheckCircle2 } from 'lucide-react';

export default function VirtualTourSection() {
  const mountRef = useRef(null);
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [fov, setFov] = useState(75);
  const [yaw, setYaw] = useState(0);

  const scenePresets = [
    {
      id: 'cyber-studio',
      name: '360° Cyber Virtual Gallery',
      desc: 'Không gian triển lãm 360° tương tác với các khối hiển thị 3D và điểm hotspot tích hợp krpano.',
      primaryColor: 0x00f2fe,
      secondaryColor: 0x8b5cf6,
      hotspots: [
        { id: 1, name: 'krpano Core Hotspot', phi: Math.PI / 2, theta: 0.5, detail: 'Tích hợp component React truyền thông điệp 2 chiều qua krpano JS API.' },
        { id: 2, name: 'Scene Navigation Node', phi: Math.PI / 2.2, theta: -1.2, detail: 'Điều hướng chuyển cảnh mượt mà không bị ngắt kết nối không gian 360°.' },
        { id: 3, name: 'AI Code Analysis Hotspot', phi: Math.PI / 1.8, theta: 2.2, detail: 'Prompt engineering theo codebase context tối ưu kiến trúc Virtual Tour.' }
      ]
    },
    {
      id: 'metaverse-hub',
      name: '360° Metaverse VR Environment',
      desc: 'Môi trường 360° độ phân giải cao với xử lý responsive UI và tối ưu hiệu năng mượt mà.',
      primaryColor: 0xec4899,
      secondaryColor: 0x3b82f6,
      hotspots: [
        { id: 4, name: 'Custom UI Controller', phi: Math.PI / 2.1, theta: -0.4, detail: 'Giao diện tùy chỉnh thanh công cụ zoom, góc nhìn và toàn màn hình.' },
        { id: 5, name: 'Linux Server Deployment', phi: Math.PI / 1.9, theta: 1.5, detail: 'Đóng gói và triển khai ứng dụng Virtual Tour 360° trên hạ tầng Linux/Ubuntu.' }
      ]
    }
  ];

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 0.1);

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    // 3. Create Procedural 360 Sci-Fi Panorama Texture Sphere
    const currentPreset = scenePresets[activeSceneIndex];
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1); // Invert sphere to render texture on inner surface

    // Create high-tech procedural canvas texture for 360 panorama
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    grad.addColorStop(0, '#050811');
    grad.addColorStop(0.5, activeSceneIndex === 0 ? '#0b1d33' : '#1a0b2e');
    grad.addColorStop(1, '#050811');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Render Sci-Fi Gridlines & Neon Orbs onto 360 Panorama Texture
    ctx.strokeStyle = activeSceneIndex === 0 ? 'rgba(0, 242, 254, 0.25)' : 'rgba(236, 72, 153, 0.25)';
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

    // Glowing Neon Cyber Circles in 360 Space
    const circleColors = activeSceneIndex === 0 ? ['#00f2fe', '#8b5cf6', '#4facfe'] : ['#ec4899', '#3b82f6', '#10b981'];
    for (let i = 0; i < 40; i++) {
      const cx = (Math.sin(i * 1.7) * 0.5 + 0.5) * canvas.width;
      const cy = (Math.cos(i * 2.3) * 0.4 + 0.5) * canvas.height;
      const r = 20 + (i % 5) * 15;

      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = circleColors[i % circleColors.length];
      ctx.lineWidth = 3;
      ctx.shadowBlur = 15;
      ctx.shadowColor = circleColors[i % circleColors.length];
      ctx.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const panoramaSphere = new THREE.Mesh(geometry, material);
    scene.add(panoramaSphere);

    // 4. Create Interactive 3D Hotspot Objects inside 360 Sphere
    const hotspotsGroup = new THREE.Group();
    scene.add(hotspotsGroup);

    currentPreset.hotspots.forEach((hs) => {
      const radius = 400;
      const x = radius * Math.sin(hs.phi) * Math.cos(hs.theta);
      const y = radius * Math.cos(hs.phi);
      const z = radius * Math.sin(hs.phi) * Math.sin(hs.theta);

      // Glowing Hotspot Orb
      const hsGeom = new THREE.SphereGeometry(12, 16, 16);
      const hsMat = new THREE.MeshBasicMaterial({
        color: currentPreset.primaryColor,
        wireframe: true
      });
      const hsMesh = new THREE.Mesh(hsGeom, hsMat);
      hsMesh.position.set(x, y, z);
      hsMesh.userData = hs;

      // Outer Ring
      const ringGeom = new THREE.RingGeometry(18, 22, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: currentPreset.secondaryColor,
        side: THREE.DoubleSide
      });
      const ringMesh = new THREE.Mesh(ringGeom, ringMat);
      ringMesh.position.set(x, y, z);
      ringMesh.lookAt(0, 0, 0);

      const hsHolder = new THREE.Group();
      hsHolder.add(hsMesh);
      hsHolder.add(ringMesh);
      hotspotsGroup.add(hsHolder);
    });

    // 5. Drag & Rotate Controls
    let isUserInteracting = false;
    let onPointerDownPointerX = 0, onPointerDownPointerY = 0;
    let lon = 0, onPointerDownLon = 0;
    let lat = 0, onPointerDownLat = 0;

    const onPointerDown = (event) => {
      isUserInteracting = true;
      onPointerDownPointerX = event.clientX;
      onPointerDownPointerY = event.clientY;
      onPointerDownLon = lon;
      onPointerDownLat = lat;
    };

    const onPointerMove = (event) => {
      if (!isUserInteracting) return;
      lon = (onPointerDownPointerX - event.clientX) * 0.2 + onPointerDownLon;
      lat = (event.clientY - onPointerDownPointerY) * 0.2 + onPointerDownLat;
      setYaw(Math.round(lon % 360));
    };

    const onPointerUp = () => {
      isUserInteracting = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // Raycaster for clicking 3D Hotspots
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onDocumentClick = (event) => {
      const rect = domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / domElement.clientWidth) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / domElement.clientHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(hotspotsGroup.children, true);

      if (intersects.length > 0) {
        let obj = intersects[0].object;
        while (obj && !obj.userData.id && obj.parent) {
          obj = obj.parent;
        }
        if (obj && obj.userData && obj.userData.name) {
          setSelectedHotspot(obj.userData);
        }
      }
    };

    domElement.addEventListener('click', onDocumentClick);

    // 6. Animation Loop
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (!isUserInteracting) {
        lon += 0.05; // Gentle auto-rotate
        setYaw(Math.round(lon % 360));
      }

      lat = Math.max(-85, Math.min(85, lat));
      const phi = THREE.MathUtils.degToRad(90 - lat);
      const theta = THREE.MathUtils.degToRad(lon);

      const targetX = 500 * Math.sin(phi) * Math.cos(theta);
      const targetY = 500 * Math.cos(phi);
      const targetZ = 500 * Math.sin(phi) * Math.sin(theta);

      camera.lookAt(targetX, targetY, targetZ);

      // Rotate hotspot rings
      const time = clock.getElapsedTime();
      hotspotsGroup.children.forEach((group) => {
        if (group.children[1]) {
          group.children[1].rotation.z = time * 2;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!currentMount) return;
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      domElement.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      domElement.removeEventListener('click', onDocumentClick);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [activeSceneIndex]);

  return (
    <section id="virtual-tour" className="section" style={{ background: 'rgba(5, 8, 16, 0.6)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div className="glass-pill" style={{ marginBottom: '16px', borderColor: 'var(--border-glow)' }}>
            <Compass size={16} color="var(--accent-cyan)" /> FEATURED 360° SPECIALTY
          </div>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>
            Virtual Tour 360° & <span className="gradient-text">krpano Engine Integration</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '750px', margin: '0 auto', fontSize: '1.05rem' }}>
            Trình diễn chuyên sâu kỹ năng lập trình **Virtual Tour 360°** kết hợp giữa **React và krpano**. Nhấn giữ và kéo chuột trên khung hình để xoay 360° không gian thực tế ảo.
          </p>
        </div>

        {/* 360 Interactive Viewport & Controls Container */}
        <div style={{ position: 'relative', marginBottom: '40px' }}>
          
          {/* Main 360 WebGL Canvas Box */}
          <div
            className="glass-panel"
            style={{
              height: '480px',
              width: '100%',
              position: 'relative',
              borderRadius: '24px',
              overflow: 'hidden',
              border: '1px solid rgba(0, 242, 254, 0.4)',
              cursor: 'grab'
            }}
          >
            {/* Embedded 360 Three.js Canvas Container */}
            <div ref={mountRef} style={{ width: '100%', height: '100%' }} />

            {/* Top HUD Overlay */}
            <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 10, display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <span className="glass-pill" style={{ background: 'rgba(7, 9, 14, 0.85)', color: 'var(--accent-cyan)', borderColor: 'var(--accent-cyan)' }}>
                <Eye size={14} /> Live 360° WebGL Panorama
              </span>
              <span className="glass-pill" style={{ background: 'rgba(7, 9, 14, 0.85)', color: 'var(--text-muted)' }}>
                <Navigation size={14} /> Angle: {yaw}° Yaw
              </span>
            </div>

            {/* Top Right Scene Switcher */}
            <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 10, display: 'flex', gap: '10px' }}>
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
                    padding: '8px 16px',
                    borderRadius: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {preset.name}
                </button>
              ))}
            </div>

            {/* Hotspot Info Modal Popup */}
            {selectedHotspot && (
              <div
                style={{
                  position: 'absolute',
                  bottom: '24px',
                  left: '24px',
                  right: '24px',
                  maxWidth: '500px',
                  margin: '0 auto',
                  zIndex: 20,
                  background: 'rgba(15, 23, 42, 0.95)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid var(--accent-cyan)',
                  borderRadius: '16px',
                  padding: '20px',
                  boxShadow: '0 0 30px rgba(0, 242, 254, 0.3)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <h4 style={{ color: 'var(--accent-cyan)', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Navigation size={16} /> {selectedHotspot.name}
                  </h4>
                  <button
                    onClick={() => setSelectedHotspot(null)}
                    style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.1rem' }}
                  >
                    ✕
                  </button>
                </div>
                <p style={{ color: '#fff', fontSize: '0.92rem', lineHeight: 1.5 }}>
                  {selectedHotspot.detail}
                </p>
              </div>
            )}

            {/* Drag Instruction Banner */}
            <div
              style={{
                position: 'absolute',
                bottom: '20px',
                right: '20px',
                zIndex: 10,
                background: 'rgba(7, 9, 14, 0.8)',
                padding: '6px 14px',
                borderRadius: '99px',
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
                pointerEvents: 'none',
                border: '1px solid var(--border-glass)'
              }}
            >
              🖱️ Nhấn giữ & rê chuột để quay góc nhìn 360°
            </div>

          </div>

        </div>

        {/* Technical Competencies Breakdown for 360° VR */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          
          <div className="glass-panel" style={{ padding: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(0, 242, 254, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-cyan)' }}>
                <Cpu size={22} />
              </div>
              <h3 style={{ fontSize: '1.2rem', color: '#fff' }}>React & krpano Wrapper</h3>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
              Xây dựng giao diện React bọc xung quanh engine krpano, kết nối dữ liệu 2 chiều giữa state React và hệ thống XML 360° qua krpano JavaScript API.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(139, 92, 246, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-purple)' }}>
                <Navigation size={22} />
              </div>
              <h3 style={{ fontSize: '1.2rem', color: '#fff' }}>Hotspots & Scene Navigation</h3>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
              Thiết kế các điểm hotspot tương tác sinh động, điều hướng chuyển cảnh giữa nhiều góc không gian 360° khác nhau mà không làm ngắt trải nghiệm người dùng.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(236, 72, 153, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-pink)' }}>
                <Zap size={22} />
              </div>
              <h3 style={{ fontSize: '1.2rem', color: '#fff' }}>AI Coding Prompt for krpano</h3>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
              Ứng dụng prompt engineering theo codebase context và ràng buộc kỹ thuật krpano để phân tích kiến trúc, triển khai tính năng và debug nhanh chóng.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
