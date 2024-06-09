import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere,Torus } from "@react-three/drei";

const Contacts = () => {
  return (
    <div style={{ position: "relative", height: "100vh", background: "black" }}>
      <Canvas
        camera={{ position: [10, 0, 20] }}
        style={{ position: "absolute", top: 0, left: 0, width: "100vw", height: "100vh" }}
      >
        <OrbitControls enablePan={false} enableRotate={true} maxDistance={60} minDistance={20} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 0, 5]} intensity={1} />
        <PointCircle />
        <AdditionalShapes />
        <OrbitingSpheres />
      </Canvas>

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
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 80,
      ],
      color: "#ff00ff"
    }));
    return [...innerPoints, ...outerPoints];
  }, []);

  useFrame(({ clock }) => {
    if (ref.current?.rotation) {
      const time = clock.getElapsedTime();
      const speed = 0.5;
      const angle = time * speed;
      ref.current.rotation.y = angle;
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
    <Sphere position={position} args={[0.6, 10, 10]}>
      <meshStandardMaterial emissive={color} emissiveIntensity={0.5} roughness={0.5} color={color} />
    </Sphere>
  );
});

const AdditionalShapes = () => {
  const ref = useRef(null);
  const shapes = useMemo(() => {
    return [...Array(6)].map((_, idx) => ({
      idx,
      position: [
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
      ],
      shape: Math.random() > 0.5 ? "Box" : "Torus",
      color: Math.random() > 0.5 ? "#00ff00" : "#0000ff"
    }));
  }, []);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.x = clock.getElapsedTime() * 0.1;
      ref.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group>
      {shapes.map(({ idx, position, shape, color }) => {
        if (shape === "Torus") {
          return (
            <Torus key={idx} position={position} args={[1.8, 1, 1]}>
              <meshStandardMaterial color={color} />
            </Torus>
          );
        } else {
          return (
            <Torus key={idx} position={position} args={[3.5, 0.2, 16, 100]}>
              <meshStandardMaterial color={color} />
            </Torus>
          );
        }
      })}
    </group>
  );
};

const OrbitingSpheres = () => {
  const ref = useRef(null);
  const spheres = useMemo(() => {
    return [...Array(5)].map((_, idx) => ({
      idx,
      position: [
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
      ],
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      segments: [...Array(8)].map((_, segIdx) => ({
        segIdx,
        angle: (Math.PI * 2 * segIdx) / 8,
        distance: 2 + Math.random() * 3
      }))
    }));
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      spheres.forEach((sphere) => {
        sphere.segments.forEach((segment) => {
          const angle = segment.angle + clock.getElapsedTime() * 0.5;
          segment.x = Math.cos(angle) * segment.distance;
          segment.z = Math.sin(angle) * segment.distance;
        });
      });
    }
  });

  return (
    <group ref={ref}>
      {spheres.map(({ idx, position, color, segments }) => (
        <group key={idx} position={position}>
          <Sphere args={[1, 32, 32]}>
            <meshStandardMaterial emissive={color} emissiveIntensity={0.5} roughness={0.5} color={color} />
          </Sphere>
          {segments.map(({ segIdx, x, z }) => (
            <Sphere key={segIdx} position={[x, 0, z]} args={[0.2, 16, 16]}>
              <meshStandardMaterial color="#ffffff" />
            </Sphere>
          ))}
        </group>
      ))}
    </group>
  );
};

export default Contacts;
