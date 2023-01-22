import { useRef } from "react";

const EqPlane = (props) => {
  const mesh = useRef();

  return (
    <mesh {...props} ref={mesh} rotation={[0, 0, 0]}>
      <polarGridHelper args={[1000, 64, 64, 64, "#3575ff", "#3158ac"]} />
    </mesh>
  );
};

export default EqPlane;
