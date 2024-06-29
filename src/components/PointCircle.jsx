import React from 'react'
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { pointsInner,pointsOuter } from './Ring';
//import { Sphere } from 'three/src/Three.js';
//import Point from './Point';
import { Sphere } from '@react-three/drei';


const PointCircle = () => {
    const ref = useRef(null);
    const points = useMemo(() => [...pointsInner, ...pointsOuter], []);
  
    useFrame(({ clock }) => {
      if (ref.current?.rotation) {
        ref.current.rotation.z = clock.getElapsedTime() * 0.10;
      }
    });
  
    return (
      <group ref={ref}>
        {points.map((point, index) => (
          <Point key={point.idx} position={point.position} color={point.color} index={index} />
        ))}
      </group>
    );
  };
  const Point = React.memo(({ position, color, index }) => {
    return (
      <Sphere position={position} args={[0.1, 10, 10]} index={index}>
        <meshStandardMaterial emissive={color} emissiveIntensity={0.5} roughness={0.5} color={color} />
      </Sphere>
    );
  });

export default PointCircle
