import moment from "moment";
import { julian, moonposition, solar } from "astronomia";

export default function Panel({ date, time, setDate, setTime }) {
  const D2R = Math.PI / 180;
  const R2D = 180 / Math.PI;
  const jde = julian.DateToJD(date._d);
  const moonPos = moonposition.position(jde);
  const solarPos = solar.trueEquatorial(jde);

  return (
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
          Sun (RA, Dec) : ({solarPos._ra*R2D},{solarPos._dec*R2D})
        </a>
        <br />
        <a>
          Moon (RA, Dec) : ({moonPos._ra*R2D},{moonPos._dec*R2D})
        </a>
        <br />
        <a>{JSON.stringify(time)}</a>
      </div>
    </section>
  );
}
