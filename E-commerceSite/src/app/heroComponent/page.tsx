'use client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { Suspense } from 'react';

function WireframeSphere() {
  return (
    <mesh rotation={[0.4, 0.2, 0]}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshBasicMaterial color="#C4A69F" wireframe />
    </mesh>
  );
}

export default function Hero3D() {
  return (
    <section className="relative h-[85vh] text-white">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Suspense fallback={null}>
          <Stage environment="sunset" intensity={0.5}>
            <WireframeSphere />
          </Stage>
        </Suspense>
        <OrbitControls enableZoom={false} autoRotate />
      </Canvas>

      <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-4 z-10">
        <h1 className="text-5xl font-extrabold mb-4 tracking-tight leading-tight max-w-3xl">
          Discover Smart Deals for Smarter Living
        </h1>
        <p className="text-lg mb-6 max-w-xl opacity-90">
          Elevate your lifestyle with handpicked electronics, fashion & more.
        </p>
        <a
          href="/exploreProducts"
          className="bg-[#C4A69F] text-[#3C2A4D] px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-[#A2678A] transition"
        >
          Explore Products
        </a>
      </div>
    </section>
  );
}
