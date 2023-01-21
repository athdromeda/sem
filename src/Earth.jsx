import { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const Earth = (props) => {
  const mesh = useRef();

  useFrame(() => {
    // mesh.current.rotation.y += 0.01;
  });

  const texture = useMemo(
    () => new THREE.TextureLoader().load(earthData.texture),
    []
  );

  return (
    <mesh {...props} ref={mesh}>
      <sphereGeometry args={[earthData.radius, 40, 24]} />
      <meshPhongMaterial attach="material" transparent side={THREE.DoubleSide}>
        <primitive attach="map" object={texture} />
      </meshPhongMaterial>
    </mesh>
  );
};


const earthData = {
    texture: "/texture/earth.jpg",
    radius: 100,
  };
