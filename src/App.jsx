import { useRef, useState, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Earth } from "./Earth";
import { Moon } from "./Moon";
import "./App.css";
import { OrthographicCamera, OrbitControls } from "@react-three/drei";
import { julian, moonposition, solar } from "astronomia";
import { Sun } from "./Sun";
import { useEffect } from "react";

const jde = julian.CalendarGregorianToJD(2023, 1, 20);
const moonPos = moonposition.position(jde);
const solarPos = solar.trueEquatorial(jde);
const deltaRA = Math.abs(solarPos._ra - moonPos._ra);
const D2R = Math.PI / 180;

const EqPlane = (props) => {
  const mesh = useRef();

  return (
    <mesh {...props} ref={mesh} rotation={[0, 0, 0]}>
      <polarGridHelper args={[1000, 64, 64, 64, "#3575ff", "#3158ac"]} />
    </mesh>
  );
};

function App() {
  const [current, setCurrent] = useState(new Date());

  useEffect(() => {
    setInterval(() => setCurrent(new Date()), 1000);
  }, []);
  return (
    <>
      <Canvas camera={{ position: [-600, 100, 400] }}>
        <ambientLight intensity={0.2} />
        {/* <OrthographicCamera /> */}

        <Earth
          position={[0, 0, 0]}
          rotation={[
            0,
            0 + Math.PI / 2 + current.getUTCHours() * 15 * D2R, //rotate earth to greenwich
            0,
          ]}
        />
        <Moon
          position={[
            // 200 * Math.cos((deltaRA + 90) * D2R),
            200 * Math.cos((deltaRA + 90) * D2R) * -1,
            moonPos._dec,
            200 * Math.sin((deltaRA + 90) * D2R),
          ]}
          rotation={[
            0,
            0 + Math.PI / 2, //normalize moon map direction
            0,
          ]}
        />
        <Sun position={[0, 0, 300]} />
        <EqPlane position={[0, 0, 0]} />
        <OrbitControls />
      </Canvas>

      <section>
        <p>{"JDE = " + jde}</p>
        <div>
          <input type="date" name="" id="" />
          <input type="time" name="" id="" />
        </div>
        <div>
          <a>
            Sun (RA, Dec) : ({solarPos._ra},{solarPos._dec})
          </a>
          <br />
          <a>
            Moon (RA, Dec) : ({moonPos._ra},{moonPos._dec})
          </a>
        </div>
      </section>
    </>
  );
}

export default App;
