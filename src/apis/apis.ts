import axios from "axios";

const API_KEY = "284ec9657d9253a2be11b08039a7d815";

export const image_baseURL = "https://image.tmdb.org/t/p/original/";

const API = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: API_KEY,
    language: "ko-KR",
  },
});

export const requests = {
  fetchTopRated: `/movie/top_rated`,
};

export default API;
