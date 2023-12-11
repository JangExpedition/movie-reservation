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
  theater: string;
  day: string;
};

export type OneDay = {
  year: string;
  month: string;
  date: string;
  day: string;
  isHoliday: boolean;
  isSaturday: boolean;
};
