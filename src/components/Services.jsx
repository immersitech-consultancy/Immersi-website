import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Ring } from "@react-three/drei";
import * as THREE from "three";
import { motion } from 'framer-motion';

const Services = () => {
  return (
    <div style={{ position: "relative", height: "100vh", width: "100vw", background: "black" }}>
      <Canvas
        camera={{ position: [10, 20, 30] }}
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
      >
        <OrbitControls enablePan={false} enableRotate={false} maxDistance={60} minDistance={20} />
        <ambientLight intensity={5.5} />
        <pointLight position={[0, 0, 0]} intensity={1} color="#800080" />
        <Sun />
        <Stars />
        <SolarSystem />
      </Canvas>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex gap-6 md:gap-8 max-w-screen-lg mx-auto p-6 md:p-0">
          <Card
            title="Web Development"
            description="Unlock the full potential of your business with our Full Stack Web Development and Design services. Our team specializes in front-end and back-end technologies, delivering stunning websites, robust e-commerce platforms, and powerful web applications."
          />
          <Card
            title="AWS Services"
            description="Maximize your cloud infrastructure with our AWS Services. Our AWS Certified team handles architecture design, implementation, management, and optimization, ensuring enhanced performance, security, and cost-efficiency."
          />
          <Card
            title="Blockchain Development"
            description="Explore Web3 Development and dApps with our Blockchain services. We create secure, transparent decentralized applications, from smart contracts to decentralized platforms, using cutting-edge blockchain technologies."
          />
        </div>
      </div>
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

const Sun = () => {
  return (
    <Sphere args={[7, 32, 32]} position={[0, 0, 0]}>
      <meshStandardMaterial emissive="#800080" emissiveIntensity={0} />
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
    <motion.div
      className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-4 rounded-xl shadow-lg text-center md:h-[300px] md:w-[300px] border-fuchsia-500 border-2 flex flex-col items-center justify-between"
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
      <h2 className="text-lg font-bold text-white bg-gradient-to-tr from-fuchsia-500 via-purple-500 to-green-400 p-2 rounded-md absolute top-0 left-0 right-0 -mt-7">{title}</h2>
      <p className="text-gray-300">{description}</p>
      <div className="mt-auto">
        <button className="bg-fuchsia-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-fuchsia-600 transition duration-300">
          Subscribe
        </button>
      </div>
    </motion.div>
  );
};

export default Services;
