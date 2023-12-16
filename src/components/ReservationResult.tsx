import { image_baseURL } from "../apis/apis";
import { ReservationType } from "../types/MovieTypes";
import "./ReservationResult.style.scss";

const ReservationResult: React.FC<{ reservation: ReservationType }> = ({ reservation }) => {
  return (
    <div className="ReservationResult">
      <h1>예약이 완료됐습니다.</h1>
      <h2>예약 정보</h2>
      <div className="result-container">
        <div className="poster-wrapper">
          <img src={`${image_baseURL}${reservation.movie?.poster_path}`} />
        </div>
        <div className="result-wrapper">
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
    </div>
  );
};

export default ReservationResult;
