/* eslint-disable react/no-unknown-property */
import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import PropTypes from "prop-types";

import CanvasLoader from "../Loader";

const Computers = ({ isMobile }) => {
   const computer = useGLTF("./desktop_pc/scene.gltf");
   return (
      <mesh>
         {/* <hemisphereLight intensity={0.15} groundColor="black" /> */}
         <hemisphereLight intensity={1.5} groundColor="black" />
         <pointLight intensity={1} />

         <primitive
            scale={isMobile ? 0.7 : 0.75}
            position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
            object={computer.scene}
            rotation={[-0.01, -0.2, -0.1]}
         />
      </mesh>
   );
};
Computers.propTypes = {
   isMobile: PropTypes.bool.isRequired,
   // Other prop validations
};

const ComputersCanvas = () => {
   const [isMobile, setIsMobile] = useState(false);
   useEffect(() => {
      const mediaQuery = window.matchMedia("(max-width:500px)");
      setIsMobile(mediaQuery.matches);
      const handleMediaQueryChange = (event) => {
         setIsMobile(event.matches);
      };

      mediaQuery.addEventListener("change", handleMediaQueryChange);

      return () => {
         mediaQuery.removeEventListener("change", handleMediaQueryChange);
      };
   }, []);

   return (
      <Canvas
         frameloop="demand"
         shadows
         camera={{ position: [20, 3, 5], fov: 25 }}
         gl={{ preserveDrawingBuffer: true }}
      >
         <Suspense fallback={<CanvasLoader />}>
            <OrbitControls
               enableZoom={false}
               maxPolarAngle={Math.PI / 2}
               minPolarAngle={Math.PI / 2}
            />
            <Computers isMobile={isMobile} />
         </Suspense>
         <Preload all />
      </Canvas>
   );
};

export default ComputersCanvas;
