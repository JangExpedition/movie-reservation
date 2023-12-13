import "./SeatSection.style.scss";

const SeatSection: React.FC<{ seatRef: React.RefObject<HTMLDivElement> }> = ({ seatRef }) => {
  return <div className="SeatSection not-visible" ref={seatRef}></div>;
};

export default SeatSection;
