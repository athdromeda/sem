import { useRef, useState, useMemo } from "react";
import * as THREE from "three";

export const Earth = (props) => {
  const mesh = useRef();
  const D2R = Math.PI / 180;

  const texture = useMemo(
    () => new THREE.TextureLoader().load(earthData.texture),
    []
  );

  console.log(JSON.stringify(props))

  return (
    <mesh
      {...props}
      ref={mesh}
      position={[0, 0, 0]}
      rotation={[
        0,
        0 + Math.PI / 2 + props.date.getUTCHours() * 15 * D2R, //rotate earth to greenwich and adjust
        0,
      ]}
    >
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
