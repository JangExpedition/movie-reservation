import { useEffect, useState } from "react";
import "./Days.style.scss";
import { OneDay } from "../types/MovieTypes";
import React from "react";

const Days: React.FC<{ daySelectHandler: (oneDay: string) => void }> = ({ daySelectHandler }) => {
  const [days, setDays] = useState<OneDay[]>([]);
  const [isNextYear, setIsNextYear] = useState(false);
  const [isNextMonth, setIsNextMonth] = useState(false);

  useEffect(() => {
    setDays(twentyOneDays());
  }, []);

  useEffect(() => {
    console.log(days);
  }, [days]);

  // 21일 계산 메서드
  const twentyOneDays = (): OneDay[] => {
    const today = new Date();
    let result: OneDay[] = [];
    let years: string[] = [];
    let months: string[] = [];

    const _days = [];

    for (let i = 0; i < 21; i++) {
      let day = new Date(new Date().setDate(today.getDate() + i));
      _days.push(day);
    }

    _days.map((_day) => {
      const year = String(_day.getFullYear());
      const month = String(_day.getMonth() + 1);
      const date = String(_day.getDate());
      const day = intToCharDay(_day.getDay());

      years.length === 0 ? years.push(year) : years[0] !== year && years.push(year);
      months.length === 0 ? months.push(month) : months[0] !== month && months.push(month);

      let oneDay: OneDay = {
        year,
        month,
        date,
        day,
        isHoliday: false,
        isSaturday: false,
      };

      oneDay = coloringHolidays(oneDay);

      result.push(oneDay);
    });

    years.length > 1 && setIsNextYear(true);
    months.length > 1 && setIsNextMonth(true);

    return result;
  };

  //요일 숫자에서 문자로 변경 메서드
  const intToCharDay = (day: number) => {
    let result: string = "";

    switch (day) {
      case 0:
        result = "일";
        break;
      case 1:
        result = "월";
        break;
      case 2:
        result = "화";
        break;
      case 3:
        result = "수";
        break;
      case 4:
        result = "목";
        break;
      case 5:
        result = "금";
        break;
      case 6:
        result = "토";
        break;
    }

    return result;
  };

  // 주말, 공휴일 색상 변경 메서드
  const coloringHolidays = (oneDay: OneDay): OneDay => {
    const monthAndDate = oneDay.month + oneDay.date;
    const solarHolidays = ["0101", "0301", "0505", "0606", "0815", "1003", "1009", "1225"];
    if (solarHolidays.indexOf(monthAndDate) > -1) {
      oneDay.isHoliday = true;
    }

    const day = oneDay.day;
    if (day === "토") {
      oneDay.isSaturday = true;
    } else if (day === "일") {
      oneDay.isHoliday = true;
    }

    return oneDay;
  };

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
