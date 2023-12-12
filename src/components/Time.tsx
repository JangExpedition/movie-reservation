import { Time } from "../types/MovieTypes";
import "./Time.style.scss";

const Time: React.FC<{
  timeList: Time[];
  selectTimeHandler: (number: string, time: string) => void;
}> = ({ timeList, selectTimeHandler }) => {
  const selectTime = (number: string, time: string) => {
    const selecteds = document.querySelectorAll(".select");

    selecteds.forEach((selected) => {
      if (selected) {
        selected.classList.contains("one-time") && selected.classList.remove("select");
      }
    });
    document.getElementById(`${number}-${time}`)?.classList.add("select");
    selectTimeHandler(number, time);
  };

  return (
    <div className="Time">
      {timeList.length > 0 &&
        timeList.map((time) => (
          <div className="time-wrapper">
            <div className="number">{time.number}</div>
            <div className="time-container">
              {time.time?.map((t) => (
                <div
                  className="one-time"
                  id={`${time.number}-${time.time}`}
                  onClick={() => selectTime(time.number, t)}
                >
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Time;
