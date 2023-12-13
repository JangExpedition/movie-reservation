import { useEffect, useRef, useState } from "react";
import "./ReservationSection.style.scss";
import API, { getTimeList, requests } from "../apis/apis";
import { MovieDetailType, ReservationType } from "../types/MovieTypes";
import { Days, Movie, MovieInfo, Theater, Time } from "./index";

const ReservationSection: React.FC<{
  reservation: ReservationType;
  setReservation: React.Dispatch<React.SetStateAction<ReservationType>>;
  reservationRef: React.RefObject<HTMLDivElement>;
}> = ({ reservation, setReservation, reservationRef }) => {
  const [otherVisible, setOtherVisible] = useState<boolean>(false);
  const [movieData, setMovieData] = useState<MovieDetailType | undefined>(undefined);
  const otherRef = useRef<HTMLDivElement>(null);
  const [timeList, setTimeList] = useState<Time[]>([]);
  const MovieInfoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reservation.movie && reservation.theater && reservation.day) {
      setTimeList(getTimeList());
    }
  }, [reservation]);

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

    MovieInfoRef.current?.classList.contains("display-none")
      ? movieSelectHandler(movieData)
      : setMovieData(movieData);
  };

  const movieSelectHandler = (movie: MovieDetailType) => {
    setReservation({
      ...reservation,
      movie,
    });
    setTimeout(() => setOtherVisible(true), 1000);
  };

  const theaterSelectHandler = (theater: string) => {
    setReservation({
      ...reservation,
      theater: theater,
    });
  };

  const daySelectHandler = (day: string) => {
    setReservation({
      ...reservation,
      day: day,
    });
  };

  const selectTimeHandler = (number: string, time: string) => {
    setReservation({
      ...reservation,
      number,
      time,
    });
  };

  return (
    <div className="ReservationSection" ref={reservationRef}>
      <Movie movieClickHandler={movieClickHandler} />
      <MovieInfo
        movieData={movieData}
        movieSelectHandler={movieSelectHandler}
        MovieInfoRef={MovieInfoRef}
      />
      <div className="others" ref={otherRef}>
        <Theater theaterSelectHandler={theaterSelectHandler} />
        <Days daySelectHandler={daySelectHandler} />
        <Time timeList={timeList} selectTimeHandler={selectTimeHandler} />
      </div>
    </div>
  );
};

export default ReservationSection;
