import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Sphere, Torus } from '@react-three/drei';
import * as THREE from 'three';

const Orbs = () => {
  const scene = new THREE.Scene();

  //point light
  const pointLight = new THREE.PointLight(0xffffff);
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);

  //ambient light
  const ambientLight = new THREE.AmbientLight(0x404040);
  scene.add(ambientLight);

  const NavLink = ({ label, page, initialPosition }) => {
    const groupRef = useRef();

    useFrame(({ clock }) => {
      const elapsedTime = clock.getElapsedTime();
      const angularSpeed = 0.5;
      const angle = elapsedTime * angularSpeed;
      groupRef.current.rotation.y = angle;
    });

    return (
      <group ref={groupRef}>
        <Sphere args={[6.5, 16, 16]} position={[0, 1, 0]}>
          <meshStandardMaterial 
          emissive="#800080"
          emissiveIntensity={1}
          color={0xff3357} 
          wireframe
          />
        </Sphere>

        <Sphere args={[2.5, 10, 10]} position={[18, 1, 0]}>
          <meshStandardMaterial 
          color={0x6e3a70} 
          emissive={0x4b2253} 
          emissiveIntensity={2.5} 
           
          />
        </Sphere>

        <Sphere args={[3.5, 10, 10]} position={[-18, 1, 0]}>
          <meshStandardMaterial
            color={0x6e3a70}
            emissive={0x4b2253} 
            emissiveIntensity={2.5}
             
          />
        </Sphere>
      </group>
    );
  };

  return (
    <group>
      <Sphere args={[20, 52, 25]} position={[5, 0, 5]}>
        <meshStandardMaterial color={0x6e3a70} transparent opacity={0} />
      </Sphere>

      <Torus args={[19, 0.05, 19, 40]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color={0x6e3a70} />
      </Torus>

      {/* Navbar Links */}
      {[
        { label: '', page: 'contact', initialPosition: [0, 2, 6] },
        { label: ' ', page: 'home', initialPosition: [0, 2, 6] }
      ].map((item, index) => (
        <NavLink key={index} label={item.label} page={item.page} initialPosition={item.initialPosition} />
      ))}
    </group>
  );
};

const WrappedText = ({ text, radius, fontSize }) => {
  const letters = text.split('').map((char, index) => {
    const angle = (index / text.length) * Math.PI * 2;
    const x = radius * Math.cos(angle);
    const z = radius * Math.sin(angle);

    return (
      <Text
        key={index}
        position={[x, 0, z]}
        rotation={[0, -angle, 0]}
        fontSize={fontSize}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {char}
      </Text>
    );
  });

  return <group>{letters}</group>;
};

export default Orbs;