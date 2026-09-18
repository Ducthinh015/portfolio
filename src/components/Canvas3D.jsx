import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Canvas3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05070c, 0.012);

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 5, 35);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    // 4. Sci-Fi Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const cursorLight = new THREE.PointLight(0x00f2fe, 4, 80);
    scene.add(cursorLight);

    const violetLight = new THREE.PointLight(0x8b5cf6, 3.5, 90);
    violetLight.position.set(-25, 15, -10);
    scene.add(violetLight);

    const pinkLight = new THREE.PointLight(0xec4899, 3, 70);
    pinkLight.position.set(25, -15, -10);
    scene.add(pinkLight);

    // 5. High-Tech Cyber Grid Floor Wave
    const gridWidth = 100;
    const gridDepth = 100;
    const gridSegments = 60;
    const gridGeom = new THREE.PlaneGeometry(gridWidth, gridDepth, gridSegments, gridSegments);
    gridGeom.rotateX(-Math.PI / 2);

    const gridMat = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      wireframe: true,
      transparent: true,
      opacity: 0.18
    });
    const gridMesh = new THREE.Mesh(gridGeom, gridMat);
    gridMesh.position.y = -18;
    scene.add(gridMesh);

    // Store original grid Y positions for wave animation
    const gridPosAttr = gridGeom.attributes.position;
    const originalGridY = new Float32Array(gridPosAttr.count);
    for (let i = 0; i < gridPosAttr.count; i++) {
      originalGridY[i] = gridPosAttr.getY(i);
    }

    // 6. Sci-Fi Core Reactor (Torus Knot + Dual Orbital Rings)
    const coreGroup = new THREE.Group();
    coreGroup.position.set(22, 4, -12);

    // Inner Glowing Core Sphere
    const innerCoreGeom = new THREE.SphereGeometry(3, 32, 32);
    const innerCoreMat = new THREE.MeshStandardMaterial({
      color: 0x00f2fe,
      emissive: 0x00f2fe,
      emissiveIntensity: 1.5,
      roughness: 0.1,
      metalness: 0.9
    });
    const innerCore = new THREE.Mesh(innerCoreGeom, innerCoreMat);
    coreGroup.add(innerCore);

    // Sci-Fi Wireframe TorusKnot
    const knotGeom = new THREE.TorusKnotGeometry(6, 1.2, 140, 16);
    const knotMat = new THREE.MeshStandardMaterial({
      color: 0x4facfe,
      wireframe: true,
      emissive: 0x00457c,
      emissiveIntensity: 0.8
    });
    const torusKnot = new THREE.Mesh(knotGeom, knotMat);
    coreGroup.add(torusKnot);

    // Dual Cyber Rings
    const ringGeom1 = new THREE.TorusGeometry(9, 0.15, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x8b5cf6, wireframe: true });
    const ring1 = new THREE.Mesh(ringGeom1, ringMat1);
    coreGroup.add(ring1);

    const ringGeom2 = new THREE.TorusGeometry(12, 0.1, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0xec4899, wireframe: true });
    const ring2 = new THREE.Mesh(ringGeom2, ringMat2);
    ring2.rotation.x = Math.PI / 2;
    coreGroup.add(ring2);

    scene.add(coreGroup);

    // 7. Left Floating Holographic Objects (Icosahedron & Data Cube)
    const leftGroup = new THREE.Group();
    leftGroup.position.set(-24, -2, -8);

    const icoGeom = new THREE.IcosahedronGeometry(4.5, 1);
    const icoMat = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      wireframe: true,
      emissive: 0x4c1d95,
      emissiveIntensity: 0.8
    });
    const icoMesh = new THREE.Mesh(icoGeom, icoMat);
    leftGroup.add(icoMesh);

    const cubeGeom = new THREE.BoxGeometry(3, 3, 3);
    const cubeMat = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      wireframe: true
    });
    const cubeMesh = new THREE.Mesh(cubeGeom, cubeMat);
    cubeMesh.position.set(6, 6, 4);
    leftGroup.add(cubeMesh);

    scene.add(leftGroup);

    // 8. 3D Sparkling Particle Starfield (800 particles)
    const particleCount = 850;
    const particleGeom = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const cCyan = new THREE.Color(0x00f2fe);
    const cViolet = new THREE.Color(0x8b5cf6);
    const cPink = new THREE.Color(0xec4899);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 140;
      particlePos[i + 1] = (Math.random() - 0.5) * 140;
      particlePos[i + 2] = (Math.random() - 0.5) * 140;

      const rand = Math.random();
      const chosenColor = rand < 0.4 ? cCyan : rand < 0.7 ? cViolet : cPink;
      particleColors[i] = chosenColor.r;
      particleColors[i + 1] = chosenColor.g;
      particleColors[i + 2] = chosenColor.b;
    }

    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    particleGeom.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });

    const particleSystem = new THREE.Points(particleGeom, particleMat);
    scene.add(particleSystem);

    // 9. Mouse Interactive Variables
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event) => {
      mouseX = (event.clientX - window.innerWidth / 2) * 0.02;
      mouseY = (event.clientY - window.innerHeight / 2) * 0.02;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 10. Animation Loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      const time = clock.getElapsedTime();

      // Smooth mouse lerp
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Cursor light follows mouse position in 3D
      cursorLight.position.x = targetX * 1.5;
      cursorLight.position.y = -targetY * 1.5 + 5;
      cursorLight.position.z = 20;

      // Animate Grid Wave Floor
      for (let i = 0; i < gridPosAttr.count; i++) {
        const x = gridPosAttr.getX(i);
        const z = gridPosAttr.getZ(i);
        const y = Math.sin(x * 0.15 + time * 1.5) * Math.cos(z * 0.15 + time * 1.5) * 1.8;
        gridPosAttr.setY(i, y);
      }
      gridPosAttr.needsUpdate = true;

      // Rotate Sci-Fi Core
      torusKnot.rotation.x = time * 0.4;
      torusKnot.rotation.y = time * 0.5;

      ring1.rotation.x = time * 0.6;
      ring1.rotation.y = time * 0.3;

      ring2.rotation.y = -time * 0.5;
      ring2.rotation.z = time * 0.4;

      // Pulse inner core brightness
      innerCoreMat.emissiveIntensity = 1.2 + Math.sin(time * 3) * 0.6;

      // Rotate Left Group
      icoMesh.rotation.x = -time * 0.3;
      icoMesh.rotation.y = time * 0.4;

      cubeMesh.rotation.x = time * 0.5;
      cubeMesh.rotation.y = time * 0.5;

      // Particle Field Slow Rotation
      particleSystem.rotation.y = time * 0.025;
      particleSystem.rotation.x = time * 0.01;

      // Parallax Camera Smooth Rotation
      camera.position.x = targetX * 2.5;
      camera.position.y = -targetY * 2.5 + 5;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // 11. Handle Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div id="canvas-container" ref={mountRef} />;
}
