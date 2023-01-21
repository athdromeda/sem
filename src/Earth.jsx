import { useRef, useState, useMemo } from "react";
import * as THREE from "three";

export const Earth = (props) => {
  const mesh = useRef();

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
