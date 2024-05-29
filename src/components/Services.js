// components/Services.js
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Ring } from "@react-three/drei";
import * as THREE from "three";



const Services = () => {
  return (
    <div style={{ position: "relative", height: "100vh", background: "black" }}>
      <Canvas
        camera={{ position: [20, 10, 30] }}
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
      >
        <OrbitControls enablePan={false} enableRotate={true} maxDistance={60} minDistance={20} />
        <ambientLight intensity={0.5} />
        <pointLight position={[0, 0, 0]} intensity={1} color="#800080" />
        <Sun />
        <SolarSystem />
      </Canvas>
      <div style={{ position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)", zIndex: 10 }}>
        <div style={{ display: "flex", justifyContent: "center", gap: "2rem" }}>
          <Card title="Web Development" description="Our skilled developers and designers work collaboratively to create intuitive, user-friendly applications and websites that enhance your digital presence. Whether you need a robust e-commerce platform, a sleek corporate website, or a powerful mobile app, we tailor our solutions to meet your unique needs. We specialize in:

Custom Web Development
Mobile App Development (iOS and Android)
E-commerce Solutions
UI/UX Design
Progressive Web Apps (PWAs)
Responsive Design and Developmentr" />
          <Card title="AWS Services" description="Leverage the power of Amazon Web Services (AWS) to optimize your infrastructure, enhance security, and scale your operations seamlessly. Our AWS-certified experts provide end-to-end services, ensuring your cloud environment is efficient, secure, and cost-effective. Our offerings include:

AWS Cloud Migration
Infrastructure as Code (IaC)
DevOps and Continuous Integration/Continuous Deployment (CI/CD)
AWS Security and Compliance
Managed AWS Services
Cost Optimization and Management" />
          <Card title="Web3 Development" description="Embrace the future of decentralized technologies with our Web3 and blockchain consultancy services. We help you navigate the complexities of blockchain to unlock new business opportunities, improve transparency, and enhance security. Our expertise includes:

Blockchain Development
Smart Contract Development and Audits
Decentralized Applications (DApps)
Tokenization and Initial Coin Offerings (ICOs)
NFT Development
Blockchain Integration and Consulting" />
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
    { size: 1.8, distance: 36, color: "#ffff00", speed: 1.25004, ring: true },  // 5
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
<div style={{
  background: "linear-gradient(45deg, rgba(171,3,177,1) 0%, rgba(252,255,1) 100%)", 
  padding: "1rem", 
  borderRadius: "20px", 
  boxShadow: "0 0 10px rgba(0,0,0,0.3)", 
  width: "350px", 
  textAlign: "center",
  opacity: "0.7",
  
  
}}>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
    
  );
};


export default Services;
