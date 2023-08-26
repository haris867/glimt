import React, { useRef, useState, useEffect } from "react";
import * as THREE from "three";

async function createTextTexture(text) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;

  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "transparent";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = "bold 108px Poppins, sans-serif";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.measureText(text);
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  console.log("Text drawn to canvas:", text);

  return new THREE.CanvasTexture(canvas);
}

export default function Sphere({
  position = [0, 0, 0],
  text = "Glimt",
  isClicked,
}) {
  console.log("isClicked", isClicked);
  const targetRadius = isClicked ? 1 : 3;
  const [currentRadius, setCurrentRadius] = useState(targetRadius);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRadius((prevRadius) => {
        // The 0.05 here determines the speed of the interpolation.
        const newRadius = THREE.MathUtils.lerp(prevRadius, targetRadius, 0.05);
        if (Math.abs(newRadius - targetRadius) < 0.01) {
          clearInterval(interval);
          return targetRadius;
        }
        return newRadius;
      });
    }, 16); // Roughly 60 frames per second
    return () => clearInterval(interval);
  }, [isClicked]);

  const [textTexture, setTextTexture] = useState(null);
  const [fontLoaded, setFontLoaded] = useState(false);
  const meshRef = useRef(null);

  useEffect(() => {
    document.fonts
      .load("bold 108px Poppins")
      .then(() => {
        setFontLoaded(true);
      })
      .catch((err) => {
        console.log("Font loading error:", err);
      });
  }, []);

  useEffect(() => {
    const loadTexture = async () => {
      try {
        const texture = await createTextTexture(text);
        setTextTexture(texture);
      } catch (err) {
        console.log("Error in text texture creation:", err);
        // Handle the error, potentially setting a fallback font or texture
      }
    };

    if (fontLoaded) {
      loadTexture();
    }
  }, [text, fontLoaded]);

  if (!textTexture) return null; // or return a placeholder/loading state

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        10
        <sphereGeometry args={[currentRadius, 64, 64]} />
        <meshStandardMaterial
          color={new THREE.Color("#2d6b79")}
          metalness={0.2}
          roughness={0.3}
          onBeforeCompile={(shader) => {
            shader.uniforms.topColor = { value: new THREE.Color("#C97BB1") };
            shader.uniforms.bottomColor = { value: new THREE.Color("#2d6b79") };
            // Adding the gradient to the fragment shader
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
      <mesh>
        <sphereGeometry
          args={[
            currentRadius + 0.001,
            64,
            64,
            Math.PI * 0.22,
            Math.PI * 0.5,
            Math.PI * 0.32,
            Math.PI * 0.5,
          ]}
        />
        <meshBasicMaterial map={textTexture} transparent={true} />
      </mesh>
    </group>
  );
}
