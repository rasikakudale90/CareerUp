"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export function CareerOrbit3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Center Core Sphere (Career Intelligence Core)
    const coreGeometry = new THREE.SphereGeometry(2.2, 32, 32);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x8e705a,
      roughness: 0.3,
      metalness: 0.8,
      emissive: 0x47382a,
      emissiveIntensity: 0.6,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(coreMesh);

    // Orbit Rings
    const createRing = (radius: number, color: number, opacity: number, rotationX = 0, rotationY = 0) => {
      const ringGeo = new THREE.RingGeometry(radius - 0.04, radius + 0.04, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = rotationX;
      ringMesh.rotation.y = rotationY;
      scene.add(ringMesh);
      return ringMesh;
    };

    const ring1 = createRing(5.5, 0x8e705a, 0.4, Math.PI / 3, Math.PI / 6);
    const ring2 = createRing(8.5, 0xbabbc3, 0.35, -Math.PI / 4, Math.PI / 8);
    const ring3 = createRing(11.5, 0x8e705a, 0.25, Math.PI / 6, -Math.PI / 4);

    // Floating Skill Satellites
    const satellites: { mesh: THREE.Mesh; orbitRadius: number; speed: number; angle: number; yOffset: number }[] = [];
    const satelliteColors = [0x8e705a, 0x47382a, 0xa6866d, 0xbabbc3, 0x8e705a, 0xe8ded6];

    for (let i = 0; i < 6; i++) {
      const radius = 0.5 + Math.random() * 0.35;
      const satGeo = new THREE.SphereGeometry(radius, 16, 16);
      const satMat = new THREE.MeshStandardMaterial({
        color: satelliteColors[i % satelliteColors.length],
        roughness: 0.2,
        metalness: 0.7,
      });
      const satMesh = new THREE.Mesh(satGeo, satMat);
      scene.add(satMesh);

      satellites.push({
        mesh: satMesh,
        orbitRadius: 5.5 + i * 1.3,
        speed: 0.008 + (i % 3) * 0.004,
        angle: (i * Math.PI) / 3,
        yOffset: (Math.random() - 0.5) * 4,
      });
    }

    // Particle Cloud
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 28;
      positions[i + 1] = (Math.random() - 0.5) * 28;
      positions[i + 2] = (Math.random() - 0.5) * 28;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xbabbc3,
      size: 0.12,
      transparent: true,
      opacity: 0.6,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x8e705a, 3, 50);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xbabbc3, 2, 50);
    pointLight2.position.set(-10, -10, -10);
    scene.add(pointLight2);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth mouse lerp
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      coreMesh.rotation.y += 0.008;
      coreMesh.rotation.x += 0.004;

      ring1.rotation.z += 0.005;
      ring2.rotation.z -= 0.004;
      ring3.rotation.z += 0.003;

      satellites.forEach((sat) => {
        sat.angle += sat.speed;
        sat.mesh.position.x = Math.cos(sat.angle) * sat.orbitRadius;
        sat.mesh.position.z = Math.sin(sat.angle) * sat.orbitRadius;
        sat.mesh.position.y = Math.sin(sat.angle * 2) * 1.5 + sat.yOffset;
        sat.mesh.rotation.y += 0.02;
      });

      particles.rotation.y -= 0.001;
      particles.rotation.x += 0.0005;

      scene.rotation.y = targetX * 0.3;
      scene.rotation.x = -targetY * 0.3;

      renderer.render(scene, camera);
    };

    animate();

    // Touch Interaction
    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        const rect = container.getBoundingClientRect();
        mouseX = ((event.touches[0].clientX - rect.left) / rect.width) * 2 - 1;
        mouseY = -(((event.touches[0].clientY - rect.top) / rect.height) * 2 - 1);
      }
    };

    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[280px] sm:h-[380px] lg:h-[480px] flex items-center justify-center overflow-hidden">
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing touch-none" />
    </div>
  );
}
