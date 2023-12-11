import { useEffect, useRef, useState } from "react";
import "./index.style.scss";
import API, { requests } from "../../apis/apis";
import { MovieDetailType, ReservationType } from "../../types/MovieTypes";
import { Date, Movie, MovieInfo, Theater, Time } from "../../components";

const reservationData: ReservationType = {
  movieId: 0,
  movieTitle: "",
};

const MainPage = () => {
  const [otherVisible, setOtherVisible] = useState<boolean>(false);
  const [movieData, setMovieData] = useState<MovieDetailType | undefined>(undefined);
  const [reservation, setReservation] = useState(reservationData);
  const otherRef = useRef<HTMLDivElement>(null);

  useEffect(() => {}, [reservation]);

  useEffect(() => {
    if (otherVisible) {
      const other = otherRef.current;
      if (other) {
        other.style.display = "flex";
        other.classList.add("visible");
      }
    }
  }, [otherVisible]);

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
    setTimeout(() => setOtherVisible(true), 1000);
  };

  return (
    <div className="MainPage">
      <div className="reservation-section">
        <Movie movieClickHandler={movieClickHandler} />
        <MovieInfo movieData={movieData} movieSelectHandler={movieSelectHandler} />
        <div className="others" ref={otherRef}>
          <Theater />
          <Date />
          <Time />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
