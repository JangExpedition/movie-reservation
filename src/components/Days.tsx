import { useEffect, useState } from "react";
import "./Days.style.scss";
import { OneDay } from "../types/MovieTypes";
import React from "react";
import { getTwentyOneDays } from "../apis/apis";

const Days: React.FC<{ daySelectHandler: (oneDay: string) => void }> = ({ daySelectHandler }) => {
  const [days, setDays] = useState<OneDay[]>([]);

  useEffect(() => {
    setDays(getTwentyOneDays());
  }, []);

  const selectDay = (day: OneDay) => {
    const selecteds = document.querySelectorAll(".select");

    selecteds.forEach((selected) => {
      if (selected) {
        selected.classList.contains("one-day") && selected.classList.remove("select");
      }
    });
    document.getElementById(`${day.date}-${day.day}`)?.classList.add("select");
    const result = `${day.year}-${day.month}-${day.date} (${day.day})`;
    daySelectHandler(result);
  };

  return (
    <div className="Days">
      {days.length > 0 &&
        days.map((day, index) =>
          index === 0 || Number(days[index - 1].date) > Number(day.date) ? (
            <React.Fragment key={`${day.year}-${day.month}`}>
              <div className="year">{day.year}</div>
              <div className="month">{day.month}</div>
              <div
                key={day.date}
                id={`${day.date}-${day.day}`}
                className={`one-day ${
                  day.isHoliday ? "holiday" : day.isSaturday ? "saturday" : ""
                }`}
                onClick={() => selectDay(day)}
              >
                {day.date}
                <span> ({day.day})</span>
              </div>
            </React.Fragment>
          ) : (
            <div
              key={day.date}
              id={`${day.date}-${day.day}`}
              className={`one-day ${day.isHoliday ? "holiday" : day.isSaturday ? "saturday" : ""}`}
              onClick={() => selectDay(day)}
            >
              {day.date}
              <span> ({day.day})</span>
            </div>
          )
        )}
    </div>
  );
};

export default Days;
