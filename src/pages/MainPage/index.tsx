import "./index.style.scss";
import {
  ReservationResult,
  ReservationSection,
  ResultSection,
  SeatSection,
} from "../../components/index";
import { ReservationType } from "../../types/MovieTypes";
import { useEffect, useRef, useState } from "react";

const reservationData: ReservationType = {
  movie: null,
  theater: "",
  day: "",
  number: "",
  time: "",
  seatList: [],
};

const MainPage = () => {
  const [reservation, setReservation] = useState(reservationData);
  const [start, setStart] = useState(false);
  const reservationRef = useRef<HTMLDivElement>(null);
  const seatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reservation.movie && reservation.theater && reservation.day && reservation.number) {
      const reRef = reservationRef.current;
      if (reRef) {
        reRef.classList.add("not-visible");
        setTimeout(() => (reRef.style.display = "none"), 1000);
      }
      setTimeout(() => seatRef.current?.classList.remove("not-visible"), 1000);
    }
  }, [reservation]);

  const reservationStart = () => {
    setStart(true);
  };

  return (
    <div className="MainPage">
      <div className="reservation-wrapper">
        {start ? (
          <ReservationResult reservation={reservation} />
        ) : (
          <>
            <ReservationSection
              reservation={reservation}
              setReservation={setReservation}
              reservationRef={reservationRef}
            />
            <SeatSection
              reservation={reservation}
              setReservation={setReservation}
              seatRef={seatRef}
            />
            <ResultSection reservation={reservation} reservationStart={reservationStart} />
          </>
        )}
      </div>
    </div>
  );
};

export default MainPage;
