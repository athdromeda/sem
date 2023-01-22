import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrthographicCamera, OrbitControls, Stats } from "@react-three/drei";
import moment from "moment";
import "./App.css";

import { Earth } from "./Earth";
import { Moon } from "./Moon";
import { Sun } from "./Sun";
import EqPlane from "./grid/EqPlane";
import Panel from "./Panel";

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

        <Earth date={finalDate} />
        <Moon date={finalDate} />
        <Sun date={finalDate} />
        <EqPlane />
        <OrbitControls />
      </Canvas>

      <Panel date={date} time={time} setDate={setDate} setTime={setTime} />
    </>
  );
}

export default App;
