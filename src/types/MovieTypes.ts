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
  movie: MovieDetailType | null;
  theater: string;
  day: string;
  number: string;
  time: string;
};

export type OneDay = {
  year: string;
  month: string;
  date: string;
  day: string;
  isHoliday: boolean;
  isSaturday: boolean;
};

export type Time = {
  number: string;
  time: string[];
};
