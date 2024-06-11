import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { pointsInner, pointsOuter } from "./components/Ring";
import Orbs from "./components/orbs";
import Contacts from "./components/Contact";
import Services from "./components/Services";


const ParticleRing = () => {
  return (
    <div className="relative">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<CanvasScene />} />
          <Route path="/contact" element={<Contacts/>} />
          <Route path='/services' element={<Services/>}/>
        </Routes>
      </Router>
    </div>
  );
};

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-black bg-opacity-80 p-4 z-10">
  <ul className="flex justify-center list-none m-0 p-0">
    <li className="mx-4">
      <Link to="/" className="text-white no-underline md:text-2xl">Home</Link>
    </li>
    <li className="mx-4">
      <Link to="/contact" className="text-white no-underline md:text-2xl">Contact</Link>
    </li>
    <li className="mx-4">
      <Link to="/services" className="text-white no-underline md:text-2xl">Services</Link>
    </li>
  </ul>
</nav>

  );
};

const CanvasScene = () => {
  return (
    <Canvas
      camera={{ position: [14, -5, 20] }}
      style={{ height: "100vh", background: "black" }}
    >
      <OrbitControls enablePan={false} enableRotate={true} maxDistance={60} minDistance={20} />
      <directionalLight />
      <pointLight position={[-20, 0, -30]} intensity={1} />
      <PointCircle />
      <Orbs/>

    </Canvas>
  );
};

const PointCircle = () => {
  const ref = useRef(null);
  const points = useMemo(() => [...pointsInner, ...pointsOuter], []);

  useFrame(({ clock }) => {
    if (ref.current?.rotation) {
      ref.current.rotation.z = clock.getElapsedTime() * 0.10;
    }
  });

  return (
    <group ref={ref}>
      {points.map((point) => (
        <Point key={point.idx} position={point.position} color={point.color} />
      ))}
    </group>
  );
};

const Point = React.memo(({ position, color }) => {
  return (
    <Sphere position={position} args={[0.1, 10, 10]}>
      <meshStandardMaterial emissive={color} emissiveIntensity={0.5} roughness={0.5} color={color} />
    </Sphere>
  );
});

export default ParticleRing;
