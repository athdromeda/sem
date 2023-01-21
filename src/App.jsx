import { useRef, useState, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Earth } from "./Earth";
import { Moon } from "./Moon";
import "./App.css";
import { OrthographicCamera, OrbitControls, Stats } from "@react-three/drei";
import { julian, moonposition, solar } from "astronomia";
import { Sun } from "./Sun";
import { useEffect } from "react";
import moment from "moment";

const EqPlane = (props) => {
  const mesh = useRef();

  return (
    <mesh {...props} ref={mesh} rotation={[0, 0, 0]}>
      <polarGridHelper args={[1000, 64, 64, 64, "#3575ff", "#3158ac"]} />
    </mesh>
  );
};

function App() {
  const [date, setDate] = useState(moment());
  const [time, setTime] = useState(moment());
  const [finalDate, setFinalDate] = useState(new Date());

  useEffect(() => {
    setFinalDate(
      new Date(`${date.format("YYYY-MM-DD")}T${time.format("HH:mm")}:00`)
    );
  }, [date, time]);

  const jde = julian.DateToJD(finalDate);
  const moonPos = moonposition.position(jde);
  const solarPos = solar.trueEquatorial(jde);
  const deltaRA = Math.abs(solarPos._ra - moonPos._ra);
  const D2R = Math.PI / 180;

  // useEffect(() => {
  //   setInterval(() => setdate(localdate), 10000);
  // }, []);

  return (
    <>
      <Canvas camera={{ position: [-600, 100, 400] }}>
        <ambientLight intensity={0.2} />
        {/* <OrthographicCamera /> */}

        <Earth
          position={[0, 0, 0]}
          rotation={[
            0,
            0 + Math.PI / 2 + date._d.getUTCHours() * 15 * D2R, //rotate earth to greenwich
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
        <div className="timepicker">
          <input
            type="date"
            value={date.format("YYYY-MM-DD")}
            onChange={(e) => setDate(moment(e.target.value, "YYYY-MM-DD"))}
          />
          <input
            type="time"
            value={time.format("HH:mm")}
            onChange={(e) => setTime(moment(e.target.value, "HH:mm"))}
          />
          <button
            onClick={() => {
              setTime(moment());
              setDate(moment());
            }}
          >
            reset
          </button>
        </div>
        <div className="panel">
          <a>
            Sun (RA, Dec) : ({solarPos._ra},{solarPos._dec})
          </a>
          <br />
          <a>
            Moon (RA, Dec) : ({moonPos._ra},{moonPos._dec})
          </a>
          <a>{JSON.stringify(time)}</a>
        </div>
      </section>
    </>
  );
}

export default App;
