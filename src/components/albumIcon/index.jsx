import useSpline from "@splinetool/r3f-spline";
import { OrthographicCamera } from "@react-three/drei";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function Scene({ ...props }) {
  const { nodes, materials } = useSpline("/assets/album.spline");

  return (
    <>
      <group {...props} dispose={null}>
        <scene name="Scene 1">
          <group name="Photo" position={[0, 0, -10]} scale={0.4}>
            <mesh
              name="Shape"
              geometry={nodes.Shape.geometry}
              material={materials.main}
              castShadow
              receiveShadow
              position={[-73.76, -50.01, 1.11]}
              scale={1.29}
            />
            <mesh
              name="Sphere"
              geometry={nodes.Sphere.geometry}
              material={materials.pink}
              castShadow
              receiveShadow
              position={[-38.58, 21.89, 1.33]}
              scale={1.29}
            />
            <mesh
              name="Rectangle 2"
              geometry={nodes["Rectangle 2"].geometry}
              material={materials.grey}
              castShadow
              receiveShadow
              position={[0, 0, -23.22]}
              scale={1.29}
            />
          </group>
          <directionalLight
            name="Directional Light"
            castShadow
            intensity={0.7}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-near={-10000}
            shadow-camera-far={100000}
            shadow-camera-left={-1000}
            shadow-camera-right={1000}
            shadow-camera-top={1000}
            shadow-camera-bottom={-1000}
            position={[200, 300, 300]}
          />
          <OrthographicCamera
            name="1"
            makeDefault={true}
            far={10000}
            near={-50000}
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

export default function AlbumIcon() {
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
