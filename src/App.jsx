import { useRef, useState, useMemo, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrthographicCamera, OrbitControls, Stats } from "@react-three/drei";
import moment from "moment";
import "./App.css";

import { Earth } from "./Earth";
import { Moon } from "./Moon";
import { Sun } from "./Sun";
import EqPlane from "./grid/EqPlane";

function App() {
  const [date, setDate] = useState(moment());
  const [time, setTime] = useState(moment());
  const [finalDate, setFinalDate] = useState(new Date());

  useEffect(() => {
    setFinalDate(
      new Date(`${date.format("YYYY-MM-DD")}T${time.format("HH:mm")}:00`)
    );
  }, [date, time]);

  // useEffect(() => {
  //   setInterval(() => setdate(localdate), 10000);
  // }, []);

  return (
    <>
      <Canvas camera={{ position: [-600, 100, 400] }}>
        <ambientLight intensity={0.2} />
        {/* <OrthographicCamera /> */}

        <Earth date={finalDate}/>
        <Moon date={finalDate}/>
        <Sun/>
        <EqPlane/>
        <OrbitControls />
      </Canvas>

      <section>
        {/* <p>{"JDE = " + jde}</p> */}
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
            {/* Sun (RA, Dec) : ({solarPos._ra},{solarPos._dec}) */}
          </a>
          <br />
          <a>
            {/* Moon (RA, Dec) : ({moonPos._ra},{moonPos._dec}) */}
          </a>
          <a>{JSON.stringify(time)}</a>
        </div>
      </section>
    </>
  );
}

export default App;
