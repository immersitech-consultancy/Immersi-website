import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { vertexShader, fragmentShader } from './shaders';

const KleinBottle = () => {
  const groupRef = useRef();
  const sphereRefs = useRef([]);

  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
  });
  

  // Create more spheres
  const numSpheres = 1000; //spheres for a more complex shape
  const spherePositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < numSpheres; i++) {
      // Create positions based on a Klein bottle parametric equation
      const u = Math.random() * 2 * Math.PI;
      const v = Math.random() * 2 * Math.PI;
      const x = (6 * Math.cos(u) * (1 + Math.sin(u)) +
        4 * (1 - Math.cos(u) / 2) * Math.cos(u) * Math.cos(v)) * Math.cos(v);
      const y = 16 * Math.sin(u) +
        4 * (1 - Math.cos(u) / 2) * Math.sin(u) * Math.cos(v);
      const z = 4 * (1 - Math.cos(u) / 2) * Math.sin(v);
      positions.push({ x, y, z, speed: Math.random() * 0.5 + 0.05 });
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


  });

  return (
    <group ref={groupRef}>
      {spherePositions.map((pos, index) => (
        <Sphere
          key={index}
          ref={(el) => (sphereRefs.current[index] = el)}
          args={[0.15, 16, 16]}
          position={[pos.x, pos.y, pos.z]}
        >
          <primitive attach="material" object={material} />
        </Sphere>
      ))}
    </group>
  );
};

export default KleinBottle;
