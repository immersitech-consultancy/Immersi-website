import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import { pointsInner, pointsOuter } from "./components/utils";
import Navbar from "./components/navbar";
//import { BrowserRouter as Router,Link } from "react-router-dom";


//import { BrowserRouter as Router,Route,Switch,Link } from "react-router-dom";
//linear-gradient(0deg, rgba(231, 16, 233, 1), rgba(255, 246, 27, 1))

const ParticleRing = () => {
  return (
    <div className="relative">
      <Canvas
        camera={{
          position: [10, -7.5, -5],
        }}
        style={{ height: "100vh", background: "black" }}
        
      >
        <OrbitControls enablePan={false} enableRotate={false} maxDistance={20} minDistance={10} />
        <directionalLight />
        <pointLight position={[-30, 0, -30]} intensity={1} />
        <PointCircle />

        <Navbar />
        
        
      </Canvas>
    </div>
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
      <meshStandardMaterial
        emissive={color}
        emissiveIntensity={0.5}
        roughness={0.5}
        color={color}
      />
    </Sphere>
  );
});

export default ParticleRing;
