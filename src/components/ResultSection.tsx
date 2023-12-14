import { useEffect, useRef, useState } from "react";
import { ReservationType } from "../types/MovieTypes";
import "./ResultSection.style.scss";
import { image_baseURL } from "../apis/apis";

const ResultSection: React.FC<{ reservation: ReservationType }> = ({ reservation }) => {
  const [posterUrl, setPosterUrl] = useState("");
  const reservationBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    reservation.movie?.poster_path && setPosterUrl(image_baseURL + reservation.movie.poster_path);
    if (
      reservation.movie &&
      reservation.theater &&
      reservation.day &&
      reservation.number &&
      reservation.seatList
    ) {
    }
  }, [reservation]);

  return (
    <div className="ResultSection">
      {reservation.movie ? (
        <div className="movie-result">
          <div className="poster-wrapper">
            <img src={posterUrl} />
          </div>
          <div className="reservation-data-wrapper">
            <p>
              영화명 : <span>{reservation.movie?.title}</span>
            </p>
            <p>
              영화관 :{" "}
              <span>
                {reservation.theater
                  ? reservation.number
                    ? `씨집이 ${reservation.theater}점 ${reservation.number}`
                    : `씨집이 ${reservation.theater}점`
                  : ""}
              </span>
            </p>
            <p>
              좌석 :{" "}
              <span>
                {reservation.seatList
                  ? reservation.seatList.map((seat, index) =>
                      index + 1 === reservation.seatList.length ? `${seat}` : `${seat}, `
                    )
                  : ""}
              </span>
            </p>
            <p>
              시간 :{" "}
              <span>
                {reservation.day
                  ? reservation.time
                    ? `${reservation.day} ${reservation.time}`
                    : reservation.day
                  : ""}
              </span>
            </p>
          </div>
        </div>
      ) : (
        <div className="no-data">
          <p>영화를 선택해주세요.</p>
        </div>
      )}
      <div className="reservation-btn-container">
        <button>예매하기</button>
      </div>
    </div>
  );
};

export default ResultSection;
