import "./index.style.scss";
import { ReservationSection, ResultSection } from "../../components/index";
import { ReservationType } from "../../types/MovieTypes";
import { useEffect, useState } from "react";

const reservationData: ReservationType = {
  movie: null,
  theater: "",
  day: "",
  number: "",
  time: "",
};

const MainPage = () => {
  const [reservation, setReservation] = useState(reservationData);

  useEffect(() => {
    console.log(reservation);
    if (reservation.movie && reservation.theater && reservation.day && reservation.number) {
      console.log("!!!");
    }
  }, [reservation]);

  return (
    <div className="MainPage">
      <div className="reservation-wrapper">
        <ReservationSection reservation={reservation} setReservation={setReservation} />
        <ResultSection reservation={reservation} />
      </div>
    </div>
  );
};

export default MainPage;
