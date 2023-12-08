import { useEffect, useState } from "react";
import Movie from "../../components/Movie";
import MovieInfo from "../../components/MovieInfo";
import "./index.style.scss";
import API, { requests } from "../../apis/apis";
import { MovieDetailType, ReservationType } from "../../types/MovieTypes";

const reservationData: ReservationType = {
  movieId: 0,
  movieTitle: "",
};

const MainPage = () => {
  const [isSelect, setIsSelect] = useState<boolean>(false);
  const [movieData, setMovieData] = useState<MovieDetailType | undefined>(undefined);
  const [reservation, setReservation] = useState(reservationData);

  useEffect(() => {}, [reservation]);

  const movieClickHandler = async (id: number) => {
    const movieData: MovieDetailType = (await API.get(requests.fetchTopRated)).data.results.filter(
      (movie: MovieDetailType) => movie.id === id
    )[0];

    setMovieData(movieData);
  };

  const movieSelectHandler = (id: number, title: string) => {
    setReservation({
      movieId: id,
      movieTitle: title,
    });
  };

  return (
    <div className="MainPage">
      <div className="reservation-section">
        <Movie movieClickHandler={movieClickHandler} />
        <MovieInfo movieData={movieData} movieSelectHandler={movieSelectHandler} />
        <div className="theater display-none"></div>
        <div className="date display-none"></div>
        <div className="time display-none"></div>
      </div>
    </div>
  );
};

export default MainPage;
