import useSpline from "@splinetool/r3f-spline";
import { OrthographicCamera } from "@react-three/drei";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function Scene({ ...props }) {
  const { nodes, materials } = useSpline("/assets/help.spline");

  return (
    <>
      <group {...props} dispose={null}>
        <scene name="Scene">
          <mesh
            name="Text"
            geometry={nodes.Text.geometry}
            material={materials["Text Material"]}
            castShadow
            receiveShadow
            position={[0, 0, 0]}
          />

          <OrthographicCamera
            name="1"
            makeDefault={true}
            far={10000}
            near={-50000}
            zoom={0.4}
            position={[-193.5, 390.79, 964.96]}
          />
          <hemisphereLight
            name="Default Ambient Light"
            intensity={0.75}
            color="#fff"
          />
        </scene>
      </group>
    </>
  );
}

export default function HelpIcon() {
  return (
    <Suspense fallback={null}>
      <Canvas flat linear>
        <Scene />
        <OrbitControls
          enablePan={false}
          enableRotate={true}
          enableZoom={false}
          minPolarAngle={Math.PI / 2 - 0.3}
          maxPolarAngle={Math.PI / 2 + 0.3}
          rotateSpeed={0.4}
        />
      </Canvas>
    </Suspense>
  );
}
