import "./index.style.scss";
import { ReservationSection, ResultSection, SeatSection } from "../../components/index";
import { ReservationType } from "../../types/MovieTypes";
import { useEffect, useRef, useState } from "react";

const reservationData: ReservationType = {
  movie: null,
  theater: "",
  day: "",
  number: "",
  time: "",
};

const MainPage = () => {
  const [reservation, setReservation] = useState(reservationData);
  const reservationRef = useRef<HTMLDivElement>(null);
  const seatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reservation.movie && reservation.theater && reservation.day && reservation.number) {
      const reRef = reservationRef.current;
      if (reRef) {
        reRef.classList.add("not-visible");
        setTimeout(() => (reRef.style.display = "none"), 1000);
      }
      seatRef.current?.classList.remove("not-visible");
    }
  }, [reservation]);

  return (
    <div className="MainPage">
      <div className="reservation-wrapper">
        <ReservationSection
          reservation={reservation}
          setReservation={setReservation}
          reservationRef={reservationRef}
        />
        <SeatSection seatRef={seatRef} />
        <ResultSection reservation={reservation} />
      </div>
    </div>
  );
};

export default MainPage;
