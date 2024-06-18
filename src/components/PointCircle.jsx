import React from 'react'
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { pointsInner,pointsOuter } from './Ring';
import Point from './Point';

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

export default PointCircle
