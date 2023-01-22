import { useRef, useState, useMemo } from "react";
import * as THREE from "three";

export const Sun = (props) => {
  const mesh = useRef();

  const texture = useMemo(
    () => new THREE.TextureLoader().load(sunData.texture),
    []
  );

  return (
    <>
      <pointLight position={[0, 0, 1000]} intensity={2} />
      <mesh {...props} ref={mesh} scale={1} position={[0, 0, 300]}>
        <sphereGeometry args={[sunData.radius, 40, 24]} />
        <meshBasicMaterial
          attach="material"
          transparent
          side={THREE.DoubleSide}
        >
          <primitive attach="map" object={texture} />
        </meshBasicMaterial>
      </mesh>
    </>
  );
};

const sunData = {
  texture: "/texture/sun.jpg",
  radius: 30,
};
