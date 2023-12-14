import { useRef, useState } from "react";
import { image_baseURL } from "../apis/apis";
import { MovieDetailType } from "../types/MovieTypes";
import "./MovieInfo.style.scss";

const MovieInfo: React.FC<{
  movieData: MovieDetailType | undefined;
  movieSelectHandler: (movie: MovieDetailType) => void;
  MovieInfoRef: React.RefObject<HTMLDivElement>;
}> = ({ movieData, movieSelectHandler, MovieInfoRef }) => {
  const posterUrl = image_baseURL + movieData?.poster_path;
  const [visible, setVisible] = useState(true);

  const reservation = () => {
    setVisible(false);
    setTimeout(() => MovieInfoRef.current?.classList.add("display-none"), 1000);
    movieData && movieSelectHandler(movieData);
  };

  return (
    <div className="MovieInfo" ref={MovieInfoRef}>
      {movieData && (
        <div className={`movie-data-container ${visible ? "visible" : ""}`}>
          <div className="movie-main-data">
            <img src={posterUrl}></img>
            <div className="movie-data">
              <h1 className="title">{movieData.title}</h1>
              <div className="release">{movieData.release_date}</div>
              <div className="vote-average">{movieData.vote_average}</div>
            </div>
          </div>
          <div className="bottom-container">
            <div className="overview">{movieData.overview}</div>
            <div>
              <button className="reservation-btn" onClick={reservation}>
                예매하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieInfo;
