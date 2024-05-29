import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const Orbs = () => {
  const navPosition = [0, -3, 0]; // Position of the navbar in 3D space
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
      <Text fontSize={1.5} color="white" position={[1, 13, 0]} anchorX="center" anchorY="middle" textAlign="center">
         
      </Text>
      <Text fontSize={1.5} color="white" position={[1, 10, 0]} anchorX="center" anchorY="middle" textAlign="center">
        
      </Text>

      {/* Navbar Background */}
      <Sphere args={[20, 52, 25]} position={[5, 0, 5]} onClick={() => handleNavigation('home')}>
        <meshStandardMaterial color={0x6e3a70} transparent opacity={0} />
      </Sphere>

      {/* Navbar Links */}
      // Inside Navbars component
{[
  { label: '', page: 'contact', initialPosition: [0, 2, 6] },
  { label: ' ', page: 'home', initialPosition: [0, 2, 6] }
].map((item, index) => (
  <NavLink key={index} label={item.label} page={item.page} initialPosition={item.initialPosition} handleNavigation={handleNavigation} />
))}

    </group>
  );
};

const NavLink = ({ id,label, page, initialPosition, handleNavigation }) => {
  const groupRef = useRef();

  useFrame(({ clock }) => {
    // Calculate the new position for rotation around the origin
    const elapsedTime = clock.getElapsedTime();
    const angularSpeed = 0.5; // Adjust the speed of rotation as needed
    const angle = elapsedTime * angularSpeed; // Continuous rotation
    const radius = 1; // Distance from the center
    
    const x = initialPosition[0] + radius * Math.cos(angle);
    const z = initialPosition[2] + radius * Math.sin(angle);
  
    // Apply rotation to the group
    groupRef.current.rotation.y = angle; // Rotate around y-axis
  });
  

  return (
    <group ref={groupRef}>
      {/* Link Sphere */}
      <Sphere  args={[4.5, 16, 16]} position={[0, 2, 0]} onClick={() => handleNavigation(page)}>
        <meshStandardMaterial color={0xff3357} emissive={0x4b2253} emissiveIntensity={2.5} />
      </Sphere>
      <Sphere args={[2.5,10,10]} position={[19, 2, 0]} onClick={() => handleNavigation(page)}>
        <meshStandardMaterial color={0x6e3a70} emissive={0x4b2253} emissiveIntensity={2.5} />
      </Sphere>
      <Sphere args={[3.5,10,10]} position={[-19, 2, 0]}>
        <meshStandardMaterial color={0x6e3a70} emissive={0x4b2253} emissiveIntensity={2.5} />
      </Sphere>

      

      {/* Text Label */}
      <Text
        fontSize={0.75}
        color="white"
        position={[0, 0, 0]} // Position text behind the sphere
        anchorX="center"
        anchorY="middle"
        textAlign="center"
      >
        {label}
      </Text>
    </group>
  );
};

export default Orbs;