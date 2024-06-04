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
    <nav style={{ position: "fixed", top: 0, width: "100%", background: "rgba(0, 0, 0, 0.8)", padding: "1rem", zIndex: 10 }}>
      <ul style={{ display: "flex", justifyContent: "center", listStyle: "none", margin: 0, padding: 0 }}>
        <li style={{ margin: "0 1rem" }}>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>Home</Link>
        </li>
        <li style={{ margin: "0 1rem" }}>
          <Link to="/contact" style={{ color: "white", textDecoration: "none" }}>Contact</Link>
        </li>
        <li style={{ margin: "0 1rem" }}>
          <Link to="/services" style={{ color: "white", textDecoration: "none" }}>Services</Link>
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
