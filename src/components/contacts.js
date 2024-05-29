// contacts.js
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";

const Contacts = () => {
  return (
    <div style={{ position: "relative", height: "100vh", background: "black" }}>
      <Canvas
        camera={{ position: [10, 0, 20] }}
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
      >
        <OrbitControls enablePan={false} enableRotate={true} maxDistance={60} minDistance={20} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 0, 5]} intensity={1} />
        <PointCircle />
      </Canvas>
      <div style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        background: "rgba(255, 255, 255, 0.8)", padding: "2rem", borderRadius: "10px", zIndex: 10
      }}>
        <h1>Contact Us</h1>
        <form style={{ display: "flex", flexDirection: "column" }}>
          <label>
            Name:
            <input type="text" name="name" style={{ margin: "0.5rem 0", padding: "0.5rem", borderRadius: "5px" }} />
          </label>
          <label>
            Email:
            <input type="email" name="email" style={{ margin: "0.5rem 0", padding: "0.5rem", borderRadius: "5px" }} />
          </label>
          <label>
            Message:
            <textarea name="message" style={{ margin: "0.5rem 0", padding: "0.5rem", borderRadius: "5px" }} />
          </label>
          <button type="submit" style={{
            marginTop: "1rem", padding: "0.5rem", borderRadius: "5px",
            background: "#333", color: "white", border: "none"
          }}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

const PointCircle = () => {
  const ref = useRef(null);
  const points = useMemo(() => {
    const innerPoints = [...Array(50)].map((_, idx) => ({
      idx,
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
      ],
      color: "#00ffff"
    }));
    const outerPoints = [...Array(50)].map((_, idx) => ({
      idx: idx + 50,
      position: [
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40,
      ],
      color: "#ff00ff"
    }));
    return [...innerPoints, ...outerPoints];
  }, []);

  useFrame(({ clock }) => {
    if (ref.current?.rotation) {
      ref.current.rotation.z = clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group ref={ref}>
      {points.map((point) => (
        <Point key={point.idx} position={point.position} color={point.color} />
      ))}
    </group>
  );
};

const Point = React.memo(({ position, color }) => {
  return (
    <Sphere position={position} args={[0.1, 10, 10]}>
      <meshStandardMaterial emissive={color} emissiveIntensity={0.5} roughness={0.5} color={color} />
    </Sphere>
  );
});

export default Contacts;
