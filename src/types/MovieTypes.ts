export type MovieType = {
  id: number;
  title: string;
};

export type MovieDetailType = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
};

export type ReservationType = {
  movieId: number;
  movieTitle: string;
};
