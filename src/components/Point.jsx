import React from 'react'
import { Sphere } from "@react-three/drei";

const Point = React.memo(({ position, color, index }) => {
    return (
      <Sphere position={position} args={[0.1, 10, 10]} index={index}>
        <meshStandardMaterial emissive={color} emissiveIntensity={0.5} roughness={0.5} color={color} />
      </Sphere>
    );
  });

export default Point;
