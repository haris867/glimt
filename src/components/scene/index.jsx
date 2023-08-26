import { Canvas } from "@react-three/fiber";
import React, { useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import AnimatedLight from "../pointLight";
import Sphere from "../sphere";

export default function ThreeFiberScene() {
  const cameraRef = useRef();

  return (
    <Canvas className="canvas-wrapper">
      <perspectiveCamera
        ref={cameraRef}
        aspect={1 / 4}
        fov={75}
        position={[0, 0, 25]}
      />
      <ambientLight intensity={2.3} />
      {/* <directionalLight position={[5, 5, -5]} intensity={1} /> */}
      <AnimatedLight />
      <OrbitControls
        camera={cameraRef.current}
        enablePan={false}
        enableRotate={true}
        enableZoom={false}
        minPolarAngle={Math.PI / 2 - 0.2}
        maxPolarAngle={Math.PI / 2 + 0.2}
        enableRotateUp={false}
      />
      <Sphere position={[0, 1, 0]} />
    </Canvas>
  );
}
