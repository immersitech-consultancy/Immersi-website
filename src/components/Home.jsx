import React from 'react'
import { OrbitControls, } from "@react-three/drei";
import Orbs from './Orbs';
import { Canvas } from '@react-three/fiber';
import PointCircle from './PointCircle';



const Home = () => {
    return (
      <Canvas
        camera={{ position: [14, -15, 30] }}
        style={{ height: "100vh", background: "black" }}>
        <OrbitControls enablePan={false} enableRotate={true} maxDistance={60} minDistance={20} />
        <directionalLight />
        <pointLight position={[-20, 0, -30]} intensity={1} />
        <PointCircle />
        
        <Orbs/>
      </Canvas>
      
    );
  };

export default Home
