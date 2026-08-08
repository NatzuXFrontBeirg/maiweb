import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { prefersReducedMotion } from "../hooks/useInView.js";

// Catatan: sengaja TIDAK memakai <Environment> dari drei — preset bawaannya
// (mis. "city") mengunduh file HDR dari CDN pihak ketiga saat runtime,
// yang melanggar kebijakan nol-request-eksternal situs ini. Pencahayaan
// di bawah murni 3 lampu manual, dituning supaya tetap terlihat mengkilap
// tanpa environment map.

function GemCore({ accent, accent2 }) {
  const meshRef = useRef(null);
  const wireRef = useRef(null);
  const reduced = useMemo(() => prefersReducedMotion(), []);

  useFrame((_, delta) => {
    if (reduced) return;
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.22;
      meshRef.current.rotation.x += delta * 0.08;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y -= delta * 0.14;
      wireRef.current.rotation.x -= delta * 0.05;
    }
  });

  return (
    <Float speed={reduced ? 0 : 1.6} rotationIntensity={reduced ? 0 : 0.5} floatIntensity={reduced ? 0 : 0.9}>
      <group>
        <mesh ref={meshRef} scale={1.35}>
          <icosahedronGeometry args={[1, 0]} />
          <meshPhysicalMaterial
            color={accent}
            roughness={0.25}
            metalness={0.35}
            clearcoat={0.5}
            clearcoatRoughness={0.2}
            emissive={accent2}
            emissiveIntensity={0.1}
          />
        </mesh>
        <mesh ref={wireRef} scale={1.72}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial color={accent2} wireframe transparent opacity={0.22} />
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
  const accent = theme === "light" ? "#0d9488" : "#5eead4";
  const accent2 = theme === "light" ? "#4f46e5" : "#818cf8";

  return (
    <div className="hero-3d" aria-hidden="true">
      <Suspense fallback={null}>
        <Canvas
          dpr={[1, 1.75]}
          gl={{ antialias: true, alpha: true }}
          camera={{ position: [0, 0, 4.4], fov: 42 }}
        >
          <ambientLight intensity={0.55} />
          <directionalLight position={[3, 3, 4]} intensity={1.3} color={accent} />
          <directionalLight position={[-3, -2, -3]} intensity={0.7} color={accent2} />
          <pointLight position={[0, 2.4, 2]} intensity={0.6} color="#ffffff" />
          <GemCore accent={accent} accent2={accent2} />
        </Canvas>
      </Suspense>
    </div>
  );
}
