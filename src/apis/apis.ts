import axios from "axios";
import { OneDay, Time } from "../types/MovieTypes";

const API_KEY = "284ec9657d9253a2be11b08039a7d815";

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

export const getTheaterList = () => {
  return theaters;
};

export default API;

// 21일 계산 메서드
export const getTwentyOneDays = (): OneDay[] => {
  const today = new Date();
  let result: OneDay[] = [];
  let years: string[] = [];
  let months: string[] = [];

  const _days = [];

  for (let i = 0; i < 21; i++) {
    let day = new Date(new Date().setDate(today.getDate() + i));
    _days.push(day);
  }

  _days.map((_day) => {
    const year = String(_day.getFullYear());
    const month = String(_day.getMonth() + 1);
    const date = String(_day.getDate());
    const day = intToCharDay(_day.getDay());

    years.length === 0 ? years.push(year) : years[0] !== year && years.push(year);
    months.length === 0 ? months.push(month) : months[0] !== month && months.push(month);

    let oneDay: OneDay = {
      year,
      month,
      date,
      day,
      isHoliday: false,
      isSaturday: false,
    };

    oneDay = coloringHolidays(oneDay);

    result.push(oneDay);
  });

  return result;
};

//요일 숫자에서 문자로 변경 메서드
const intToCharDay = (day: number) => {
  let result: string = "";

  switch (day) {
    case 0:
      result = "일";
      break;
    case 1:
      result = "월";
      break;
    case 2:
      result = "화";
      break;
    case 3:
      result = "수";
      break;
    case 4:
      result = "목";
      break;
    case 5:
      result = "금";
      break;
    case 6:
      result = "토";
      break;
  }

  return result;
};

// 주말, 공휴일 색상 변경 메서드
const coloringHolidays = (oneDay: OneDay): OneDay => {
  const monthAndDate = oneDay.month + oneDay.date;
  const solarHolidays = ["0101", "0301", "0505", "0606", "0815", "1003", "1009", "1225"];
  if (solarHolidays.indexOf(monthAndDate) > -1) {
    oneDay.isHoliday = true;
  }

  const day = oneDay.day;
  if (day === "토") {
    oneDay.isSaturday = true;
  } else if (day === "일") {
    oneDay.isHoliday = true;
  }

  return oneDay;
};

const times = [
  ["10:30", "13:10", "16:00", "19:50", "22:40"],
  ["11:10", "14:00", "16:50", "19:40", "22:30"],
  ["09:00", "11:30", "14:00", "16:40", "19:10"],
  ["08:30", "12:20", "14:00", "18:40", "21:10"],
  ["09:00", "11:50", "15:40", "19:40", "23:10"],
];

const timeList: Time[] = [
  { number: "1관", time: times[Math.floor(Math.random() * 5)] },
  { number: "2관", time: times[Math.floor(Math.random() * 5)] },
  { number: "3관", time: times[Math.floor(Math.random() * 5)] },
];

export const getTimeList = () => {
  return timeList;
};
