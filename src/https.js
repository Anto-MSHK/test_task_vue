import axios from "axios";

export const API_URL = `https://search.wb.ru/exactmatch/ru/common/v4/search`;

export const $api = axios.create({
  //   withCredentials: true,
  baseURL: API_URL,
  params: {
    appType: 1,
    curr: "rub",
    dest: "-1059500,-108082,-365233,-1116490",
    lang: "ru",
    locale: "ru",
    resultset: "catalog",
    sort: "popular",
  },
});
