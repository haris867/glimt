import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";

export default function AnimatedLight() {
  const lightRef = useRef();

  useFrame(({ clock }) => {
    if (lightRef.current) {
      const time = clock.getElapsedTime();
      const radius = 15; // The distance from the center

      lightRef.current.position.x = radius * Math.cos(time);
      lightRef.current.position.y = 25; // Keeping the Y position constant
      lightRef.current.position.z = radius * Math.sin(time) - 3;
    }
  });

  return (
    <pointLight
      ref={lightRef}
      position={[-10, 15, 15]}
      intensity={2000}
      distance={100}
    />
  );
}
