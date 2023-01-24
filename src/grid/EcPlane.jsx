import { useRef } from "react";
import * as THREE from "three";

const EcPlane = (props) => {
  const mesh = useRef();

  return (
    <>
      <mesh {...props} ref={mesh}>
        <polarGridHelper args={[1000, 64, 64, 64, "#ffa53e", "#ff8800"]} />
      </mesh>
      <mesh rotation={[Math.PI / 2 + props.rotation[0], 0, 0]}>
        <circleGeometry args={[101, 64]} />
        <meshBasicMaterial color={"#ff8800"} side={THREE.DoubleSide} />
      </mesh>
      <mesh {...props} rotation={[Math.PI / 2 + props.rotation[0], 0, 0]}>
        <circleGeometry args={[1000, 64]} />
        <meshStandardMaterial
          color={"#ff8800"}
          side={THREE.DoubleSide}
          opacity={0.2}
          transparent
        />
      </mesh>
    </>
  );
};

export default EcPlane;
