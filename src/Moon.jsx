import { useRef, useState, useMemo } from "react";
import * as THREE from "three";

export const Moon = (props) => {
  const mesh = useRef();

  const texture = useMemo(
    () => new THREE.TextureLoader().load(moonData.texture),
    []
  );

  return (
    <mesh {...props} ref={mesh} scale={1}>
      <sphereGeometry args={[moonData.radius, 40, 24]} />
      <meshPhongMaterial attach="material" transparent side={THREE.DoubleSide}>
        <primitive attach="map" object={texture} />
      </meshPhongMaterial>
    </mesh>
  );
};

const moonData = {
  texture: "/texture/moon.jpg",
  radius: 10,
};
