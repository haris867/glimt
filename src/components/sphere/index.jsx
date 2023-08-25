import React, { useRef } from "react";
import * as THREE from "three";
import { Text } from "@react-three/drei";
import fontJson from "../../assets/Poppins_Bold.json";
import GlimtText from "../../assets/Glimt-text.png";

console.log(GlimtText);

export default function Sphere({
  position = [0, 0, 0],
  textContent = "Glimt",
}) {
  const meshRef = useRef(null);
  // useFrame(() => {
  //   if (meshRef.current) {
  //     meshRef.current.rotation.x += 0.001;
  //     meshRef.current.rotation.y += 0.001;
  //   }
  // });
  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color={new THREE.Color("#2d6b79")}
          metalness={0.7}
          roughness={0.1}
          onBeforeCompile={(shader) => {
            shader.uniforms.topColor = { value: new THREE.Color("#C97BB1") };
            shader.uniforms.bottomColor = { value: new THREE.Color("#2d6b79") };
            // Add the gradient to the fragment shader
            shader.fragmentShader =
              "uniform vec3 topColor;\n" + shader.fragmentShader;
            shader.fragmentShader =
              "uniform vec3 bottomColor;\n" + shader.fragmentShader;
            shader.fragmentShader = shader.fragmentShader.replace(
              "vec4 diffuseColor = vec4( diffuse, opacity );",
              `
            vec3 gradientDirection = normalize(vec3(-2.5, 7.0, 2.0));  // Adjust this vector to tilt the gradient
            float gradient = dot(normalize(vNormal), gradientDirection) * 0.5 + 0.5;  // Use dot product to compute gradient based on direction
            gradient = pow(gradient, 3.0); 
            vec3 gradientColor = mix(bottomColor, topColor, gradient);
            vec4 diffuseColor = vec4( gradientColor, opacity );
            `
            );
          }}
        />
      </mesh>
      <Text
        font="../../assets/Poppins_Bold.json"
        color="#fff"
        fontSize={0.4}
        anchorX="center"
        anchorY="middle"
        position={[-0.15, -0.35, 1]} // Adjust position as needed. This will put the text on top of the sphere.
      >
        {textContent}
      </Text>
      // {/* <ImageSegment texture={texture} position={[0, 0, 0]} /> */}
    </group>
  );
}
