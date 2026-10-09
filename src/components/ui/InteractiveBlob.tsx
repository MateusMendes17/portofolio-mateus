"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Environment, Float } from "@react-three/drei";
import * as THREE from "three";
import { usePrefersReducedMotion } from "@/lib/hooks";

function BlobMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);

  // Rotate slowly over time
  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.1;
      meshRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh
        ref={meshRef}
        scale={hovered ? 1.1 : 1}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <icosahedronGeometry args={[1.5, 64]} />
        <MeshDistortMaterial
          color={hovered ? "#e09068" : "#c98e6c"}
          envMapIntensity={0.8}
          clearcoat={1}
          clearcoatRoughness={0.1}
          metalness={0.6}
          roughness={0.2}
          distort={hovered ? 0.6 : 0.4} // Amplitude of the distortion
          speed={hovered ? 4 : 2}       // Speed of the distortion
        />
      </mesh>
    </Float>
  );
}

/**
 * Testa se o browser suporta WebGL sem deixar um contexto pendurado:
 * cria um canvas temporário, tenta obter o contexto e liberta-o de seguida.
 */
function isWebGLAvailable(): boolean {
  try {
    if (typeof document === "undefined") return false;
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
    if (!gl) return false;
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}

/**
 * Blob 3D orgânico do hero.
 *
 * O canvas só é montado quando o browser suporta WebGL e o utilizador não pediu
 * movimento reduzido, e só renderiza enquanto a secção está visível no ecrã
 * (IntersectionObserver). Assim a animação corre de verdade — sem o antigo
 * `frameloop="demand"` que congelava o blob — sem queimar GPU em segundo plano.
 */
export default function InteractiveBlob() {
  const hostRef = useRef<HTMLDivElement>(null);
  // Suporte a WebGL é constante durante a sessão → inicializador preguiçoso.
  const [webglSupported] = useState(() => isWebGLAvailable());
  // Começa `true` para o primeiro frame já ser animado; o IntersectionObserver
  // corrige o valor de seguida (e serve de fallback onde não existe IO).
  const [inView, setInView] = useState(true);
  const prefersReducedMotion = usePrefersReducedMotion();

  const enabled = webglSupported && !prefersReducedMotion;

  // Pausa a renderização sempre que o hero sai do ecrã.
  useEffect(() => {
    if (!enabled) return;
    const host = hostRef.current;
    if (!host || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => setInView(entries.some((entry) => entry.isIntersecting)),
      { threshold: 0 }
    );
    observer.observe(host);
    return () => observer.disconnect();
  }, [enabled]);

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className={`absolute inset-0 z-0 opacity-60 ${
        enabled ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      {enabled && (
        <Canvas
          camera={{ position: [0, 0, 4], fov: 45 }}
          gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
          dpr={[1, 2]}
          // "always" enquanto visível (anima); "demand" quando não está —
          // renderiza um único frame estático e o loop para.
          frameloop={inView ? "always" : "demand"}
        >
          {/* Lights */}
          <ambientLight intensity={1.5} />
          <directionalLight position={[10, 10, 10]} intensity={2} />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#e5a93b" />

          {/* The Blob */}
          <BlobMesh />

          {/* Environment reflections */}
          <Environment preset="city" />
        </Canvas>
      )}
    </div>
  );
}
