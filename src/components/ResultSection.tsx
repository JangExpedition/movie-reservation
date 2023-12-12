import { MovieType, ReservationType } from "../types/MovieTypes";
import { MovieResult } from "./index";
import "./ResultSection.style.scss";

const ResultSection: React.FC<{ reservation: ReservationType }> = ({ reservation }) => {
  return (
    <div className="ResultSection">
      <MovieResult movieResult={reservation.movie} />
      <div className="movie-result">
        <div>
          <img />
        </div>
        <div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default ResultSection;
