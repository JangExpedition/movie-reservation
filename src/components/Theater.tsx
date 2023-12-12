import { getTheaterList } from "../apis/apis";
import "./Theater.style.scss";

const theaters = getTheaterList();

const Theater: React.FC<{ theaterSelectHandler: (theater: string) => void }> = ({
  theaterSelectHandler,
}) => {
  const selectTheater = (theater: string) => {
    const selecteds = document.querySelectorAll(".select");

    selecteds.forEach((selected) => {
      if (selected) {
        selected.classList.contains("one-theater") && selected.classList.remove("select");
      }
    });
    document.getElementById(theater)?.classList.add("select");
    theaterSelectHandler(theater);
  };

  return (
    <div className="Theater">
      {theaters.map((theater) => (
        <div
          id={theater}
          key={theater}
          className="one-theater"
          onClick={() => selectTheater(theater)}
        >
          {theater}
        </div>
      ))}
    </div>
  );
};

export default Theater;
