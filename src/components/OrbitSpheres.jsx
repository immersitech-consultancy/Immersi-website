// OrbitingSpheres.jsx
import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { vertexShader, fragmentShader } from './shaders';

const OrbitingSpheres = () => {
  const groupRef = useRef();
  const sphereRefs = useRef([]);

  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
  });

  // Create more spheres
  const numSpheres = 500; // Increase the number of spheres for a more complex shape
  const spherePositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < numSpheres; i++) {
      // Create positions based on a torus knot
      const t = (i / numSpheres) * Math.PI * 2;
      const x = Math.cos(3 * t) * (1 + Math.cos(2 * t));
      const y = Math.sin(3 * t) * (1 + Math.cos(2 * t));
      const z = Math.sin(2 * t);
      positions.push({ x, y, z, speed: Math.random() * 0. + 0.05 });
    }
    return positions;
  }, [numSpheres]);

  useEffect(() => {
    // Ensure sphereRefs has the correct number of refs
    sphereRefs.current = sphereRefs.current.slice(0, numSpheres);
  }, [numSpheres]);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    groupRef.current.rotation.y = elapsedTime * 0.1; // Rotate the group

    sphereRefs.current.forEach((ref, index) => {
      if (ref) {
        const { x, y, z, speed } = spherePositions[index];
        const angle = elapsedTime * speed;
        ref.position.x = x * Math.cos(angle) - z * Math.sin(angle);
        ref.position.y = y;
        ref.position.z = z * Math.cos(angle) + x * Math.sin(angle);
      }
    });
    groupRef.current.rotation.x = elapsedTime * 0.3; // Rotate the group
    groupRef.current.rotation.z = elapsedTime * 0.2; // Rotate the group
  });

  return (
    <group ref={groupRef}>
      {spherePositions.map((pos, index) => (
        <Sphere
          key={index}
          ref={(el) => (sphereRefs.current[index] = el)}
          args={[1.5, 32, 32]}
        >
          <primitive attach="material" object={material} />
        </Sphere>
      ))}
      {/* Simulating a black hole in the center */}
      <Sphere args={[1, 32, 32]}>
        <meshStandardMaterial color="black" />
      </Sphere>
    </group>
  );
};

export default OrbitingSpheres;
