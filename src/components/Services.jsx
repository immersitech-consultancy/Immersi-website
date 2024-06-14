// components/Services.js
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Ring } from "@react-three/drei";
import * as THREE from "three";
import { motion } from 'framer-motion'


const Services = () => {
  return (
    <div style={{ position: "relative", height: "100vh", width:"100vw", background: "black" }}>
      <Canvas
        camera={{ position: [20, 10, 30] }}
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
      >
        <OrbitControls enablePan={false} enableRotate={true} maxDistance={60} minDistance={20} />
        <ambientLight intensity={5.5} />
        <pointLight position={[0, 0, 0]} intensity={1} color="#800080" />
        <Sun />
        <SolarSystem />
      </Canvas>
      <div className=" absolute inset-0 flex items-center justify-center">
        <div className=" flex flex-col md:flex-row gap-3 md:gap-4">
          <Card title="Web Development" description="    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis dolor rem labore atque ipsa molestiae blanditiis, voluptatum, explicabo ex perferendis totam repellat optio minus ducimus fugiat cupiditate? Temporibus, sit incidunt." />
          <Card title="AWS Services" description="    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis dolor rem labore atque ipsa molestiae blanditiis, voluptatum, explicabo ex perferendis totam repellat optio minus ducimus fugiat cupiditate? Temporibus, sit incidunt." />
          <Card title="Blockchain Development" description="    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis dolor rem labore atque ipsa molestiae blanditiis, voluptatum, explicabo ex perferendis totam repellat optio minus ducimus fugiat cupiditate? Temporibus, sit incidunt." />
        </div>
      </div>
    </div>

  );
};

const Sun = () => {
  return (
    <Sphere args={[7, 32, 32]} position={[0, 0, 0]}>
      <meshStandardMaterial emissive="#800080" emissiveIntensity={1} />
    </Sphere>
  );
};

const SolarSystem = () => {
  const planets = useMemo(() => [
    { size: 0.9, distance: 12, color: "#ffcd3c", speed: 3.115, ring: true },  // 1
    { size: 1, distance: 16, color: "#0000ff", speed: 2.51, ring: true },  // 2
    { size: 0.53, distance: 20, color: "#ff4500", speed: 1.808, ring: true },  // 3
    { size: 2.2, distance: 28, color: "#ffa500", speed: 1.405, ring: true },  // 4
    { size: 1.8, distance: 36, color: "#ffff00", speed: 1.25004, ring: true },  //5
    { size: 1.6, distance: 44, color: "#00ffff", speed: 1.1503, ring: true },  // 6
    { size: 1.5, distance: 52, color: "#0000ff", speed: 1.2002, ring: true },  // 7
  ], []);

  return (
    <>
      {planets.map((planet, index) => (
        <Planet key={index} {...planet} />
      ))}
    </>
  );
};

const Planet = ({ size, distance, color, speed, ring }) => {
  const ref = useRef(null);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (ref.current) {
      ref.current.position.x = distance * Math.cos(time * speed);
      ref.current.position.z = distance * Math.sin(time * speed);
    }
  });

  return (
    <group>
      {ring && <OrbitRing distance={distance} />}
      <Sphere ref={ref} args={[size, 32, 32]}>
        <meshStandardMaterial color={color} />
      </Sphere>
    </group>
  );
};

const OrbitRing = ({ distance }) => {
  return (
    <Ring args={[distance - 0.1, distance + 0.1, 64]} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} />
    </Ring>
  );
};

const Card = ({ title, description }) => {
  return (
    // todo 1(abubakar): fix the card view on mobile view
    <motion.div
      className="bg-white relative bg-opacity-10 backdrop-filter backdrop-blur-lg p-6 rounded-xl shadow-lg w-80 text-center md:h-[500px] border-fuchsia-500 border-2 flex flex-col items-center justify-center"
      style={{ 
        background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.25) 100%)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
      }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.3)",
      }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-xl font-bold bg-gradient-to-tr from-fuchsia-500 via-purple-500 to-green-400 p-2 rounded-md absolute top-7">{title}</h2>
      <p className="text-gray-300 font-bold">{description}</p>
      <div className=" absolute bottom-3 items-center justify-center text-clip">
        <button className=" bg-fuchsia-500 text-slate-950 font-black p-2 md:px-6 md:py-3 rounded-md">
          Subscribe
        </button>
      </div>
    </motion.div>
  );
};

export default Services;
