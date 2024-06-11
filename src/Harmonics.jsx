
import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';
import {vertexShader,fragmentShader} from "./components/shaders";

const Harmonics = () => {
  const groupRef = useRef();
  const sphereRefs = useRef([]);

  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
  });

  const numSpheres = 300; // Increase the number of spheres
  const spherePositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < numSpheres; i++) {
      // Superformula parameters
      const t = (i / numSpheres) * Math.PI * 2;
      const a = 1, b = 1, m = 5, n1 = 0.3, n2 = 0.3, n3 = 0.3;
      const r = Math.pow(
        Math.pow(Math.abs(Math.cos(m * t / 4) / a), n2) +
        Math.pow(Math.abs(Math.sin(m * t / 4) / b), n3),
        -1 / n1
      );
      const x = r * Math.cos(t);
      const y = r * Math.sin(t);
      const z = r * Math.sin(t / 2); // Added z dimension for 3D effect
      positions.push({ x, y, z, speed: Math.random() * 0.1 + 0.05 });
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

export default Harmonics;
