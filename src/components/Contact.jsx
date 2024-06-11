import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere,Torus } from "@react-three/drei";
import OrbitingSpheres from "./OrbitSpheres";
import KleinBottle from "./KleinBottle";
import Harmonics from "../Harmonics";



const Contacts = () => {
  return (
    <div style={{ position: "relative", height: "100vh", background: "black" }}>
      <Canvas
        camera={{ position: [0, 0, 100] }}
        style={{ position: "absolute", top: 0, left: 0, width: "100vw", height: "100vh" }}
      >
        <OrbitControls enablePan={false} enableRotate={true}  maxDistance={20} minDistance={5} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 0, 5]} intensity={1} />
        <OrbitingSpheres />
        <Harmonics/>
        <KleinBottle />
        <Stars />
      </Canvas>
      
    </div>
  );
};

const Stars = () => {
  const ref = useRef(null);
  const points = useMemo(() => {
    return [...Array(500)].map((_, idx) => ({
      idx,
      position: [
        (Math.random() - 0.5) * 200,
        (Math.random() - 0.5) * 200,
        (Math.random() - 0.5) * 200,
      ],
      color: "blue"
    }));
  }, []);

  useFrame(({ clock }) => {
    if (ref.current?.rotation) {
      const elaspedtime = clock.getElapsedTime();
      const angularSpeed = 0.5;
      const radius = 1;
      const angle = elaspedtime * angularSpeed;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      ref.current.rotation.y = angle;
      ref.current.position.x = x;
      ref.current.position.z = z;
    
    }
  });

  return (
    <group ref={ref}>
      {points.map((point) => (
        <Star key={point.idx} position={point.position} color={point.color} />
      ))}
    </group>
  );
};

const Star = React.memo(({ position, color }) => {
  return (
    <Sphere position={position} args={[0.1, 6, 6]}>
      <meshStandardMaterial emissive={color} emissiveIntensity={1} roughness={0} color={color} />
    </Sphere>
  );
});




export default Contacts;
