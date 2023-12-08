import { useEffect, useState } from "react";
import API, { requests } from "../apis/apis";
import "./Movie.style.scss";
import { MovieType } from "../types/MovieTypes";

const Movie: React.FC<{ movieClickHandler: (id: number) => void }> = ({ movieClickHandler }) => {
  const [movieList, setMovieList] = useState<MovieType[]>();
  useEffect(() => {
    getMovieList();
  }, []);

  const getMovieList = async () => {
    const response: MovieType[] = (await API.get(requests.fetchTopRated)).data.results;
    console.log(response);
    setMovieList(response);
    selectMovie(response[0].id);
  };

  const selectMovie = (id: number) => {
    const selected = document.querySelector(".select");

    if (selected) {
      selected.classList.remove("select");
    }
    document.getElementById(`${id}`)?.classList.add("select");
    movieClickHandler(id);
  };

  return (
    <div className="Movie">
      <div className="title">영화</div>
      <div className="movie-list">
        {movieList &&
          movieList.map((movie) => (
            <div
              key={movie.id}
              id={String(movie.id)}
              className="one-movie"
              onClick={() => selectMovie(movie.id)}
            >
              {movie.title}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Movie;
