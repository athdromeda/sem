import { useState, useEffect } from "react";
import moment from "moment";
import { julian, moonposition, solar } from "astronomia";
import "./Panel.css";

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

  return (
    <section>
      <p>{"JDE = " + jde}</p>
      <div className="datetime-picker">
        <div className="date-picker">
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
          reset
        </button>
      </div>
      <div className="panel">
        <a>
          Sun (RA, Dec) : ({solarPos._ra * R2D},{solarPos._dec * R2D})
        </a>
        <br />
        <a>
          Moon (RA, Dec) : ({moonPos._ra * R2D},{moonPos._dec * R2D})
        </a>
      </div>
    </section>
  );
}
