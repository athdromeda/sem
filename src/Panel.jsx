import moment from "moment";

export default function Panel({date, time, setDate, setTime}) {
  return (
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
  )
}
