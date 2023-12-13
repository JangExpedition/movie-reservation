import { useEffect, useState } from "react";
import { ReservationType } from "../types/MovieTypes";
import "./ResultSection.style.scss";
import { image_baseURL } from "../apis/apis";

const ResultSection: React.FC<{ reservation: ReservationType }> = ({ reservation }) => {
  const [posterUrl, setPosterUrl] = useState("");

  useEffect(() => {
    reservation.movie?.poster_path && setPosterUrl(image_baseURL + reservation.movie.poster_path);
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
              영화관 : <span>{reservation.theater ? `씨집이 ${reservation.theater}점` : ""}</span>
            </p>
            <p>
              상영관 : <span>{reservation.number}</span>
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
    </div>
  );
};

export default ResultSection;
