import useSpline from "@splinetool/r3f-spline";
import { OrthographicCamera } from "@react-three/drei";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function Scene({ ...props }) {
  const { nodes, materials } = useSpline("/assets/camera_copy.spline");

  return (
    <>
      <color attach="background" args={["#74B5B7"]} />
      <group {...props} dispose={null}>
        <scene name="Scene">
          <group name="object_camera" position={[0, 54.67, 0]}>
            <mesh
              name="buttonback2"
              geometry={nodes.buttonback2.geometry}
              material={materials.button}
              castShadow
              receiveShadow
              position={[-130.69, -4.92, -175.66]}
              rotation={[Math.PI / 2, 0, -Math.PI]}
              scale={1}
            />
            <mesh
              name="buttonback1"
              geometry={nodes.buttonback1.geometry}
              material={materials.button}
              castShadow
              receiveShadow
              position={[-130.69, 45.92, -175.66]}
              rotation={[Math.PI / 2, 0, -Math.PI]}
              scale={1}
            />
            <mesh
              name="contornscreen"
              geometry={nodes.contornscreen.geometry}
              material={materials.screen}
              castShadow
              receiveShadow
              position={[27.92, -2.77, -179.48]}
              rotation={[-Math.PI, 0, -Math.PI]}
              scale={1.02}
            />
            <mesh
              name="screen"
              geometry={nodes.screen.geometry}
              material={materials.button}
              castShadow
              receiveShadow
              position={[27.92, -2.77, -183.19]}
              rotation={[-Math.PI, 0, -Math.PI]}
              scale={0.91}
            />
            <mesh
              name="camera"
              geometry={nodes.camera.geometry}
              material={materials.camera}
              castShadow
              receiveShadow
              position={[0, -10.58, -73.48]}
              scale={[1.08, 1, 1]}
            />
            <mesh
              name="lens"
              geometry={nodes.lens.geometry}
              material={materials.cameralens}
              castShadow
              receiveShadow
              position={[17.91, -8.88, 18.94]}
              rotation={[1.59, 0, 0]}
            />
            <mesh
              name="focus"
              geometry={nodes.focus.geometry}
              material={materials.focus}
              castShadow
              receiveShadow
              position={[17.91, -5.78, 60.23]}
              rotation={[1.59, 0, 0]}
            />
            <mesh
              name="glass"
              geometry={nodes.glass.geometry}
              material={materials.button}
              castShadow
              receiveShadow
              position={[19.41, -10.58, 124.88]}
            />
            <mesh
              name="baseflash"
              geometry={nodes.baseflash.geometry}
              material={materials.pieceflashbase}
              castShadow
              receiveShadow
              position={[-135.77, 85.27, 36.73]}
              scale={[0.68, 0.68, 0.37]}
            />
            <mesh
              name="light"
              geometry={nodes.light.geometry}
              material={materials.focus}
              castShadow
              receiveShadow
              position={[155.65, 85.46, 28.83]}
              scale={0.68}
            />
            <mesh
              name="flash"
              geometry={nodes.flash.geometry}
              material={materials.flash}
              castShadow
              receiveShadow
              position={[-135.77, 85.46, 44.88]}
              scale={[0.68, 0.68, 0.37]}
            />
            <mesh
              name="button"
              geometry={nodes.button.geometry}
              material={materials.button}
              castShadow
              receiveShadow
              position={[-115.73, 118.91, -73.48]}
              scale={1}
            />
          </group>
          <OrthographicCamera
            name="Default Camera"
            makeDefault={true}
            zoom={0.2}
            far={100000}
            near={-50000}
            position={[-193.5, 390.79, 964.96]}
            rotation={[-0.47, -0.52, -0.25]}
            scale={1}
          ></OrthographicCamera>

          <ambientLight name="Default Ambient Light" intensity={2.4} />
          <hemisphereLight name="Default Hemisphere Light" intensity={1.3} />
        </scene>
      </group>
    </>
  );
}

export default function TestingCamera() {
  return (
    <Suspense fallback={null}>
      <Canvas flat linear>
        <Scene />
        <OrbitControls
          enablePan={false}
          enableRotate={true}
          enableZoom={false}
          minPolarAngle={Math.PI / 2 - 0.2}
          maxPolarAngle={Math.PI / 2 + 0.6}
          rotateSpeed={0.4}
        />
      </Canvas>
    </Suspense>
  );
}
