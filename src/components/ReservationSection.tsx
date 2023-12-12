import { useEffect, useRef, useState } from "react";
import "./ReservationSection.style.scss";
import API, { getTimeList, requests } from "../apis/apis";
import { MovieDetailType, ReservationType } from "../types/MovieTypes";
import { Days, Movie, MovieInfo, Theater, Time } from "./index";

const reservationData: ReservationType = {
  movie: null,
  theater: "",
  day: "",
  number: "",
  time: "",
};

const ReservationSection = () => {
  const [otherVisible, setOtherVisible] = useState<boolean>(false);
  const [movieData, setMovieData] = useState<MovieDetailType | undefined>(undefined);
  const [reservation, setReservation] = useState(reservationData);
  const otherRef = useRef<HTMLDivElement>(null);
  const [timeList, setTimeList] = useState<Time[]>([]);

  useEffect(() => {
    if (reservation.movie && reservation.theater && reservation.day) {
      setTimeList(getTimeList());
    } else if (reservation.movie && reservation.theater && reservation.day && reservation.number) {
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

    setMovieData(movieData);
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
    <div className="ReservationSection">
      <Movie movieClickHandler={movieClickHandler} />
      <MovieInfo movieData={movieData} movieSelectHandler={movieSelectHandler} />
      <div className="others" ref={otherRef}>
        <Theater theaterSelectHandler={theaterSelectHandler} />
        <Days daySelectHandler={daySelectHandler} />
        <Time timeList={timeList} selectTimeHandler={selectTimeHandler} />
      </div>
    </div>
  );
};

export default ReservationSection;
