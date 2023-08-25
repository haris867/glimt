import { Canvas } from "@react-three/fiber";
import React, { useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import AnimatedLight from "../pointLight";
import Sphere from "../sphere";

// const textureLoader = new THREE.TextureLoader();
// const texture = textureLoader.load(glimtText);

// function ImageSegment({ texture, position }) {
//   const segmentRef = useRef(null);

//   const originalPhiLength = Math.PI * 0.5;
//   const originalThetaLength = Math.PI * 0.5;

//   const newPhiLength = originalPhiLength * 0.5;
//   const newThetaLength = originalThetaLength * 0.5;

//   return (
//     <mesh ref={segmentRef} position={position}>
//       <sphereGeometry
//         args={[
//           1,
//           64,
//           64,
//           Math.PI * 0.25 + (originalPhiLength - newPhiLength) * 0.1,
//           newPhiLength,
//           Math.PI * 0.25 + (originalThetaLength - newThetaLength),
//           newThetaLength,
//         ]}
//       />
//       <meshBasicMaterial
//         map={texture}
//         side={THREE.DoubleSide}
//         transparent={true}
//       />
//     </mesh>
//   );
// }

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
      <ambientLight intensity={4} />
      {/* <directionalLight position={[5, 5, -5]} intensity={1} /> */}
      <AnimatedLight />
      <OrbitControls
        enablePan={false}
        enableRotate={true}
        enableZoom={false}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
      />
      <Sphere position={[0, 1, 0]} />
    </Canvas>
  );
}
