import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import OrbitingSpheres from "./OrbitSpheres";
import KleinBottle from "./KleinBottle";
import Harmonics from "../Harmonics";

const Contacts = () => {
  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        background: "linear-gradient(to bottom, #6a0dad, #000)",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 100] }}
        style={{ position: "absolute", top: 0, left: 0, width: "100vw", height: "100vh" }}
      >
        <OrbitControls enablePan={false} enableRotate={true} maxDistance={10} minDistance={5} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 0, 5]} intensity={1} />
        <OrbitingSpheres />
        <Harmonics />
        <KleinBottle />
        <Stars />
      </Canvas>

      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
        <form className="bg-white m-3 bg-opacity-70 p-8 rounded-lg shadow-lg max-w-lg w-full animate-form pointer-events-auto">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Sign up for interactive demo </h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2 text-center" htmlFor="name">
              Business Name
            </label>
            <input
              className="justify-center shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pointer-events-auto"
              id="name"
              type="text"
              placeholder="Business Name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2 text-center" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pointer-events-auto"
              id="email"
              type="email"
              placeholder="Your Email"
            />
          </div>
          <div className="mb-4">
          <label className="block text-gray-700 text-3x1 font-bold mb-2 text-center">Business Type</label>
          <div className="flex flex-col">
          <label className="inline-flex items-center mt-2">
          <input type="radio" className="form-radio pointer-events-auto" name="websiteType"value="personal"/>
          <span className="ml-2 text-gray-700">Immersive Website</span>
          </label>
          <label className="inline-flex items-center mt-2">
          <input type="radio" className="form-radio pointer-events-auto" name="websiteType" value="Website"/>
          <span className="ml-2 text-gray-700">Decentralized Application</span>
          </label>
          <label className="inline-flex items-center mt-2">
          <input type="radio" className="form-radio pointer-events-auto" name="websiteType" value="DApp"/>
          <span className="ml-2 text-gray-700 text-left">Certified AWS Cloud Services</span>
          </label>
          <label className="inline-flex items-center mt-2">
          <input type="radio" className="form-radio pointer-events-auto" name="websiteType" value="portfolio"/>
          <span className="ml-2 text-gray-700">Mobile Application</span>
          </label>
          </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="w-96 bg-blue-500 hover:bg-blue-700 m-6 text-white font-bold py-1 px-1 rounded focus:outline-none focus:shadow-outline pointer-events-auto text-center" type="button">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Stars = () => {
  const ref = useRef(null);
  const points = useMemo(() => {
    return [...Array(500)].map((_, idx) => ({
      idx,
      position: [
        (Math.random() - 0.5) * 200,
        (Math.random() - 0.5) * 200,
        (Math.random() - 0.5) * 200,
      ],
      color: "blue",
    }));
  }, []);

  useFrame(({ clock }) => {
    if (ref.current?.rotation) {
      const elaspedtime = clock.getElapsedTime();
      const angularSpeed = 0.5;
      const radius = 1;
      const angle = elaspedtime * angularSpeed;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      ref.current.rotation.y = angle;
      ref.current.position.x = x;
      ref.current.position.z = z;
    }
  });

  return (
    <group ref={ref}>
      {points.map((point) => (
        <Star key={point.idx} position={point.position} color={point.color} />
      ))}
    </group>
  );
};

const Star = React.memo(({ position, color }) => {
  return (
    <Sphere position={position} args={[0.1, 6, 6]}>
      <meshStandardMaterial emissive={color} emissiveIntensity={1} roughness={0} color={color} />
    </Sphere>
  );
});

export default Contacts;
