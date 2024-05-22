
import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const Navbar = () => {
  const navPosition = [0, 0, 8]; // Position of the navbar in 3D space
  const { camera, scene } = useThree();
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  const handleNavigation = (page) => {
    console.log(`Navigating to ${page} page...`);
    // Implement navigation logic here
  };

  const onPointerMove = (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    if (intersects.length > 0) {
      // Handle mouse over interaction
      console.log('Mouse over navbar button!');
    }
  };

  return (
    <group position={navPosition} onPointerMove={onPointerMove}>
      <Text fontSize={1.5} color="white" position={[0, 3, 0]} anchorX="center" anchorY="middle" textAlign="center">
        ImmersiTech Consulting
      </Text>

      {/* Navbar Background */}
      <Sphere args={[12, 32, 16]} position={[10, 0, 7]} onClick={() => handleNavigation('home')}>
        <meshStandardMaterial color={0x6e3a70} transparent opacity={0} />
      </Sphere>

      {/* Navbar Links */}
      {[
        { label: 'About Us', page: './components/zoomer.js', position: [-5, 0, -4] },
        { label: 'Services', page: 'services', position: [0, 0, 0] },
        { label: 'Contact Us', page: 'contact', position: [5, 0, 6] },
      ].map((item, index) => (
        <NavLink key={index} label={item.label} page={item.page} position={item.position} handleNavigation={handleNavigation} />
      ))}
    </group>
  );
};

const NavLink = ({ label, page, position, handleNavigation }) => {
  const textRef = useRef();
  const sphereRef = useRef()

  useFrame(({ clock }) => {
    // Animate the scale of the sphere based on time
    const scale = Math.sin(clock.elapsedTime * 2.2) * 0.2 + 1; // Scale oscillates between 0.8 and 1.2
    sphereRef.current.scale.set(scale, scale, scale);

    if (textRef.current) {
      textRef.current.rotation.y += 0.01; // Rotate the text around the y-axis
    }
  });

  return (
    <group position={position}>
      {/* Link Sphere */}
      <Sphere args={[1.75, 16, 16]} position={[0,0,-8]} ref={sphereRef} onClick={() => handleNavigation(page)}>
        <meshStandardMaterial color={0x4b2253} emissive={0x4b2253} emissiveIntensity={0.5} />
      </Sphere>

      {/* Text Label */}
      <Text
        ref={textRef}
        fontSize={0.5}
        color="black"
        position={[0, 10, 1.8]} // Position text behind the sphere
        rotation={[0, Math.PI, 0]} // Rotate text to face away from camera
        anchorX="center"
        anchorY="middle"
        textAlign="center"
      >
        {label}
      </Text>
    </group>
  );
};

export default Navbar;