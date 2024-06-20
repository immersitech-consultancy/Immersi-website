
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Ring } from "@react-three/drei";
import * as THREE from "three";
import { motion } from 'framer-motion'
import { pointsOuter } from "./utils";


const Services = () => {
  return (
    <div style={{ position: "relative", height: "100vh", width:"100vw", background: "black" }}>
      <Canvas
        camera={{ position: [10, 20, 30] }}
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
        <OrbitControls enablePan={false} enableRotate={false} maxDistance={60} minDistance={20} />
        <ambientLight intensity={5.5} />
        <pointLight position={[0, 0, 0]} intensity={1} color="#800080" />
        <Sun />
        <Stars/>
        <SolarSystem />
      </Canvas>
      <div className=" absolute inset-0 flex items-center justify-center">
        <div className=" flex flex-col md:flex-row gap-3 md:gap-4">
          <Card title="Web Development" description=" Unlock the full potential of your business with our comprehensive Full Stack Web Development and Design services. Our talented team of developers and designers are experts in both front-end and back-end technologies, ensuring a seamless and dynamic user experience. Whether you need a stunning website, a robust e-commerce platform, or a powerful web application, " />
          <Card title="AWS Services" description="Maximize your cloud infrastructure with our specialized AWS Services. Our AWS Certified team, holding both AWS Certified Cloud Practitioner and AWS Certified Solutions Architect certifications, is equipped to handle all your cloud computing needs, from architecture design and implementation to ongoing management and optimization. We offer scalable solutions that enhance performance, ensure security, and reduce costs." />
          <Card title="Blockchain Development" description="Step into the future with our cutting-edge Web3 Development and dApps services. Our dedicated Blockchain division specializes in creating decentralized applications that are secure, transparent, and efficient. Whether you’re looking to develop smart contracts, launch a new cryptocurrency, or build a robust decentralized platform, our expert team is here to help. We leverage the latest blockchain technologies to deliver innovative solutions" />
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
      <h2 className="text-xl font-bold bg-gradient-to-tr from-fuchsia-500 via-purple-500 to-green-400 md:p-2 p-[1px] rounded-md md:absolute top-7">{title}</h2>
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
