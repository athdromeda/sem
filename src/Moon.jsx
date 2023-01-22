import { useRef, useState, useMemo } from "react";
import * as THREE from "three";
import { julian, moonposition, solar } from "astronomia";

export const Moon = (props) => {
  const mesh = useRef();

  const jde = julian.DateToJD(props.date);
  const moonPos = moonposition.position(jde);
  const solarPos = solar.trueEquatorial(jde);
  const deltaRA = Math.abs(solarPos._ra - moonPos._ra);
  const D2R = Math.PI / 180;

  const texture = useMemo(
    () => new THREE.TextureLoader().load(moonData.texture),
    []
  );

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={1}
      position={[
        200 * Math.cos((deltaRA + 90) * D2R) * -1,
        moonPos._dec,
        200 * Math.sin((deltaRA + 90) * D2R),
      ]}
      rotation={[
        0,
        0 + Math.PI / 2, //normalize moon map direction
        0,
      ]}
    >
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
