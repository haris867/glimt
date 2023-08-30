import { Canvas } from "@react-three/fiber";
import React, { useEffect, useState } from "react";
import { OrbitControls } from "@react-three/drei";
import AnimatedLight from "../pointLight";
import Sphere from "../sphere";
// import * as THREE from "three";

export default function ThreeFiberScene(props) {
  console.log("props.isClicked", props.isClicked);

  // const targetXPosition = props.isClicked ? -3.6 : 0;
  // const [currentXPosition, setCurrentXPosition] = useState(targetXPosition);
  const [canvasStyle, setCanvasStyle] = useState({});

  useEffect(() => {
    if (props.isClicked) {
      setCanvasStyle({
        bottom: "50px",
      });
    } else {
      setCanvasStyle({
        bottom: "0px",
      });
    }
  }, [props.isClicked]);

  // useEffect(() => {
  //   if (props.isClicked) {
  //     canvasWrapper.style.bottom = "80px";
  //     canvasWrapper.style.marginBottom = "calc(-100px - 10vw)";
  //   }
  //   const interval = setInterval(() => {
  //     setCurrentXPosition((prevXPosition) => {
  //       // The 0.05 here determines the speed of the interpolation.
  //       const newXPosition = THREE.MathUtils.lerp(
  //         prevXPosition,
  //         targetXPosition,
  //         0.05
  //       );
  //       if (Math.abs(newXPosition - targetXPosition) < 0.01) {
  //         clearInterval(interval);
  //         return targetXPosition;
  //       }
  //       return newXPosition;
  //     });
  //   }, 16); // Roughly 60 frames per second
  //   return () => clearInterval(interval);
  // }, [props.isClicked]);

  return (
    <Canvas style={canvasStyle} className="canvas-wrapper pt-4">
      {/* <perspectiveCamera
        ref={cameraRef}
        aspect={1 / 4}
        fov={75}
        position={[0, 2, 25]}
      /> */}
      <ambientLight intensity={2.3} />
      {/* <directionalLight position={[5, 5, -5]} intensity={1} /> */}
      <AnimatedLight />
      <OrbitControls
        enablePan={false}
        enableRotate={true}
        enableZoom={false}
        minPolarAngle={Math.PI / 2 - 0.2}
        maxPolarAngle={Math.PI / 2 + 0.6}
        minAzimuthAngle={-Math.PI / 4}
        maxAzimuthAngle={Math.PI / 4 - 0.5}
      />
      <Sphere isClicked={props.isClicked} position={[0, 0, 0]} />
    </Canvas>
  );
}
