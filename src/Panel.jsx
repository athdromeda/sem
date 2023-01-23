import { useState, useEffect } from "react";
import moment from "moment";
import { julian, moonposition, solar } from "astronomia";
import Draggable from "react-draggable";
import "./Panel.css";
import { useRef } from "react";

export default function Panel({ date, time, setDate, setTime }) {
  const [initDay, initMonth, initYear, initHour, initMinute] = [
    parseInt(moment().format("D")),
    parseInt(moment().format("M")),
    parseInt(moment().format("Y")),
    parseInt(moment().format("H")),
    parseInt(moment().format("m")),
  ];

  const [day, setDay] = useState(initDay);
  const [month, setMonth] = useState(initMonth);
  const [year, setYear] = useState(initYear);
  const [hour, setHour] = useState(initHour);
  const [minute, setMinute] = useState(initMinute);

  useEffect(() => {
    setDate(moment(`${year}-${month}-${day}`, "Y-M-D"));
    setTime(moment(`${hour}:${minute}`, "H:m"));
  }, [day, month, year, hour, minute]);

  const D2R = Math.PI / 180;
  const R2D = 180 / Math.PI;
  const jde = julian.DateToJD(date._d);
  const moonPos = moonposition.position(jde);
  const solarPos = solar.trueEquatorial(jde);

  function decToDMS(decimal) {
    var degrees = Math.floor(decimal);
    var minutes = Math.floor((decimal - degrees) * 60);
    var seconds = ((decimal - degrees) * 60 - minutes) * 60;
    return degrees + "° " + minutes + "' " + seconds.toFixed(2) + "''";
  }

  const nodeRef = useRef(null)

  return (
    <Draggable nodeRef={nodeRef}>
      <div className="section">
        <div className="datetime-picker">
          <div className="date-picker">
            <a>📅</a>
            <input
              type="number"
              id="day"
              min={1}
              max={31}
              value={day}
              pattern="[0-9]*"
              onChange={(e) => setDay(parseInt(e.target.value))}
            />
            <p>{"/"}</p>
            <input
              type="number"
              id="month"
              min={1}
              max={12}
              value={month}
              pattern="[0-9]*"
              onChange={(e) => setMonth(parseInt(e.target.value))}
            />
            <p>{"/"}</p>
            <input
              type="number"
              id="year"
              min={1}
              max={2999}
              value={year}
              pattern="[0-9]*"
              onChange={(e) => setYear(parseInt(e.target.value))}
            />
          </div>
          <div className="time-picker">
            <a>🕗</a>
            <input
              type="number"
              min={0}
              max={23}
              value={hour}
              pattern="[0-9]*"
              onChange={(e) => setHour(parseInt(e.target.value))}
            />
            <p>{":"}</p>
            <input
              type="number"
              min={0}
              max={59}
              value={minute}
              pattern="[0-9]*"
              onChange={(e) => setMinute(parseInt(e.target.value))}
            />
          </div>
          <button
            onClick={() => {
              setDay(initDay);
              setMonth(initMonth);
              setYear(initYear);
              setHour(initHour);
              setMinute(initMinute);
              console.log("clicked!");
            }}
          >
            🔄
          </button>
          <div id="handle" ref={nodeRef}>handle</div>
        </div>
        <div className="panel">
          <a>🗓 JDE : {jde.toFixed(4)}</a>
          <br />
          <a>
            🌞 (α, δ) : ({decToDMS(solarPos._ra * R2D)},{" "}
            {decToDMS(solarPos._dec * R2D)})
          </a>
          <br />
          <a>
            🌛 (α, δ) : ({decToDMS(moonPos._ra * R2D)},{" "}
            {decToDMS(moonPos._dec * R2D)})
          </a>
        </div>
      </div>
    </Draggable>
  );
}
