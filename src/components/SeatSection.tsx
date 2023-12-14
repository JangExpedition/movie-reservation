import { useState } from "react";
import "./SeatSection.style.scss";
import { ReservationType } from "../types/MovieTypes";

const seat = ["A", "B", "C", "D", "E", "F"];
const seatNum = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const SeatSection: React.FC<{
  reservation: ReservationType;
  setReservation: React.Dispatch<React.SetStateAction<ReservationType>>;
  seatRef: React.RefObject<HTMLDivElement>;
}> = ({ reservation, setReservation, seatRef }) => {
  const [limit, setLimit] = useState(0);

  const countPerson = (e: React.ChangeEvent<HTMLInputElement>) => {
    let totalCount = 0;
    document.querySelectorAll<HTMLInputElement>(".p-select").forEach((p) => {
      totalCount += Number(p.value);
      if (totalCount > 8) {
        alert("인원은 최대 8명까지 선택 가능합니다.");
        e.target.value = String(Number(e.target.value) - 1);
        return;
      }
    });
    setLimit(totalCount);
  };

  const selectSeat = (e: React.MouseEvent<HTMLSpanElement>) => {
    const target = e.target as HTMLSpanElement;

    if (target.classList.contains("select")) {
      target.classList.remove("select");
    } else {
      let selecteds = document.querySelectorAll(".select");

      let selectedNum = 0;

      selecteds.forEach((selected) => {
        selected.classList.contains("one-seat") && selectedNum++;
      });

      if (limit <= selectedNum) {
        alert("지정한 인원 수 보다 많이 선택하셨습니다.");
      } else {
        target.classList.add("select");
        const seatList: string[] = [];
        selecteds = document.querySelectorAll(".select");
        selecteds.forEach((selected) => {
          selected.classList.contains("one-seat") && seatList.push(selected.innerHTML);
        });
        setReservation({ ...reservation, seatList });
      }
    }
  };

  return (
    <div className="SeatSection not-visible" ref={seatRef}>
      <div className="personal-select">
        <div className="p-select-box">
          <span>일반 : </span>
          <input className="p-select" type="number" min={0} onChange={(e) => countPerson(e)} />
        </div>
        <div className="p-select-box">
          <span>청소년 : </span>
          <input className="p-select" type="number" min={0} onChange={(e) => countPerson(e)} />
        </div>
        <div className="p-select-box">
          <span>경로 : </span>
          <input className="p-select" type="number" min={0} onChange={(e) => countPerson(e)} />
        </div>
      </div>
      <div className="seat-select">
        <div className="screen">
          <span>SCREEN</span>
        </div>
        <div className="seat-list">
          {seat.map((oneRow) => (
            <div key={oneRow} className="row">
              {seatNum.map((oneSeat) => (
                <span
                  key={`${oneRow}${oneSeat}`}
                  className="one-seat"
                  onClick={(e) => selectSeat(e)}
                >{`${oneRow}${oneSeat}`}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeatSection;
