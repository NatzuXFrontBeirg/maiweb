import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { prefersReducedMotion } from "../hooks/useInView.js";

// Catatan: sengaja TIDAK memakai <Environment> dari drei — preset bawaannya
// (mis. "city") mengunduh file HDR dari CDN pihak ketiga saat runtime,
// yang melanggar kebijakan nol-request-eksternal situs ini. Pencahayaan
// di bawah murni 2 lampu manual + ambient.
//
// Materialnya sengaja matte/flat-shaded (bukan kaca mengkilap dengan
// clearcoat/iridescence) — bentuk teknis-diagramatik yang lebih senada
// dengan identitas editorial situs ini, bukan "gem" generik.

function GemCore({ accent, accent2 }) {
  const meshRef = useRef(null);
  const wireRef = useRef(null);
  const reduced = useMemo(() => prefersReducedMotion(), []);

  useFrame((_, delta) => {
    if (reduced) return;
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
      meshRef.current.rotation.x += delta * 0.07;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y -= delta * 0.13;
      wireRef.current.rotation.x -= delta * 0.045;
    }
  });

  return (
    <Float speed={reduced ? 0 : 1.4} rotationIntensity={reduced ? 0 : 0.4} floatIntensity={reduced ? 0 : 0.7}>
      <group>
        <mesh ref={meshRef} scale={1.3}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color={accent} roughness={0.85} metalness={0} flatShading />
        </mesh>
        <mesh ref={wireRef} scale={1.68}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial color={accent2} wireframe transparent opacity={0.35} />
        </mesh>
      </group>
    </Float>
  );
}

/**
 * Objek 3D dekoratif untuk hero — dibundel sendiri lewat Vite (three.js
 * + react-three-fiber), bukan lewat CDN, jadi tetap konsisten dengan
 * kebijakan "nol request pihak ketiga" di seluruh situs ini.
 */
export default function Hero3D({ theme }) {
  const accent = theme === "light" ? "#c8481f" : "#e8632c";
  const accent2 = theme === "light" ? "#2f6b4c" : "#3f7d5c";

  return (
    <div className="hero-3d" aria-hidden="true">
      <Suspense fallback={null}>
        <Canvas
          dpr={[1, 1.75]}
          gl={{ antialias: true, alpha: true }}
          camera={{ position: [0, 0, 4.4], fov: 42 }}
        >
          <ambientLight intensity={0.75} />
          <directionalLight position={[3, 3, 4]} intensity={1.2} color="#ffffff" />
          <directionalLight position={[-3, -2, -3]} intensity={0.4} color={accent2} />
          <GemCore accent={accent} accent2={accent2} />
        </Canvas>
      </Suspense>
    </div>
  );
}
