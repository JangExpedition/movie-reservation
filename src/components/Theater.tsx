import "./Theater.style.scss";

const theaters = [
  "강남",
  "강변",
  "건대입구",
  "구로",
  "대학로",
  "동대문",
  "등촌",
  "명동",
  "미아",
  "방학",
  "성신여대입구",
  "송파",
  "수유",
  "신촌",
  "압구정",
  "여의도",
  "연남",
  "용산",
  "천호",
  "청담",
  "홍대",
];

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
