import { MovieDetailType } from "../types/MovieTypes";

const MovieResult: React.FC<{ movieResult: MovieDetailType | null }> = ({ movieResult }) => {
  return <div className="MovieResult">{movieResult ? <></> : <div className="no-data"></div>}</div>;
};

export default MovieResult;
