import { useRef, useState, useMemo } from "react";
import * as THREE from "three";
import { julian, solar } from "astronomia";
import EcPlane from "./grid/EcPlane";
import { useCallback } from "react";
import { useEffect } from "react";

export const Sun = (props) => {
  const [showEcliptic, setShowEcliptic] = useState(false);
  const mesh = useRef();

  const handleKeyPress = useCallback((e) => {
    if (e.key === "c") {
      setShowEcliptic(!showEcliptic);
    }
  });

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  const D2R = Math.PI / 180;
  const R2D = 180 / Math.PI;
  const jde = julian.DateToJD(props.date);
  const solarDec = solar.trueEquatorial(jde)._dec * R2D;

  const texture = useMemo(
    () => new THREE.TextureLoader().load(sunData.texture),
    []
  );

  return (
    <>
      {showEcliptic && (
        <EcPlane
          position={[
            0,

            300 * Math.sin(solarDec * D2R),
            300 * Math.cos(solarDec * D2R),
          ]}
          rotation={[-solarDec * D2R, 0, 0]}
        />
      )}

      <directionalLight
        position={[
          0,
          1000 * Math.sin((solarDec - 0) * D2R),
          1000 * Math.cos((solarDec - 0) * D2R),
        ]}
        intensity={2}
      />

      <mesh
        {...props}
        ref={mesh}
        scale={1}
        position={[
          0,

          300 * Math.sin(solarDec * D2R),
          300 * Math.cos(solarDec * D2R),
        ]}
      >
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
