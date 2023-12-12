import "./index.style.scss";
import { ReservationSection, ResultSection } from "../../components/index";

const MainPage = () => {
  return (
    <div className="MainPage">
      <div className="reservation-wrapper">
        <ReservationSection />
        <ResultSection />
      </div>
    </div>
  );
};

export default MainPage;
