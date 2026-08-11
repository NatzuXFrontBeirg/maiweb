import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Edges } from "@react-three/drei";
import { prefersReducedMotion } from "../hooks/useInView.js";

// Catatan: sengaja TIDAK memakai <Environment> dari drei — preset bawaannya
// (mis. "city") mengunduh file HDR dari CDN pihak ketiga saat runtime,
// yang melanggar kebijakan nol-request-eksternal situs ini. Pencahayaan
// di bawah murni 2 lampu manual + ambient.
//
// Bentuknya sepasang peti (crate) matte bertumpuk — merujuk langsung ke
// peran Abhi sebagai koordinator sarana & logistik acara — bukan
// "gem"/poliedron generik yang jadi motif default di hampir semua
// portofolio hasil AI-generator.
//
// Radius maksimum gugusan (~1.42 unit) sengaja diberi margin ~30%
// terhadap frustum kamera (lihat kalkulasi di posisi kamera) supaya
// tidak ada sisi yang terpotong saat objek berotasi/mengambang.

function CrateCluster({ accent, accent2 }) {
  const bigRef = useRef(null);
  const smallRef = useRef(null);
  const reduced = useMemo(() => prefersReducedMotion(), []);

  useFrame((_, delta) => {
    if (reduced) return;
    if (bigRef.current) {
      bigRef.current.rotation.y += delta * 0.16;
      bigRef.current.rotation.x += delta * 0.05;
    }
    if (smallRef.current) {
      smallRef.current.rotation.y -= delta * 0.24;
      smallRef.current.rotation.x -= delta * 0.09;
    }
  });

  return (
    <group>
      <Float speed={reduced ? 0 : 1.1} rotationIntensity={reduced ? 0 : 0.2} floatIntensity={reduced ? 0 : 0.4}>
        <mesh ref={bigRef} position={[-0.15, 0.05, 0]} scale={1.05}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={accent} roughness={0.9} metalness={0} flatShading />
          <Edges color={accent2} threshold={1} />
        </mesh>
      </Float>
      <Float speed={reduced ? 0 : 1.4} rotationIntensity={reduced ? 0 : 0.25} floatIntensity={reduced ? 0 : 0.5}>
        <mesh ref={smallRef} position={[0.78, -0.5, 0.25]} scale={0.4}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={accent2} roughness={0.85} metalness={0} flatShading />
          <Edges color={accent} threshold={1} />
        </mesh>
      </Float>
    </group>
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
          camera={{ position: [0, 0, 5.2], fov: 42 }}
        >
          <ambientLight intensity={0.8} />
          <directionalLight position={[3, 3, 4]} intensity={1.2} color="#ffffff" />
          <directionalLight position={[-3, -2, -3]} intensity={0.4} color={accent2} />
          <CrateCluster accent={accent} accent2={accent2} />
        </Canvas>
      </Suspense>
    </div>
  );
}
