import axios from "axios";
import { getCookie } from "./Cookie";

const api = axios.create({
  baseURL: "http://13.209.69.234/"
});

// Alter defaults after instance has been created
//api.defaults.headers.common['Authorization'] = AUTH_TOKEN;

api.interceptors.request.use(function (config) {
  const token = getCookie("token");
  // config.headers.common["token"] = `${accessToken}`;
  config.headers.common["authorization"] = `Bearer ${token}`;
  // config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const apis = {
  // user
  signup: (signup) => api.post("/api/signup", signup),
  login: (login) => api.post("/api/login", login ),
  getLoginUserInfo: () => api.get("/api/auth"),
  kakaoLogin: (code) => api.get(`/api/kakao/callback?code=${code}`),
  setDictUser: (script_id,word)=> api.get(`/opendict/user/${script_id}/${word}`),
  addDict: (script_id,word,meaning)=> api.post(`/opendict/${script_id}/${word}`,{meaning: meaning}),
  editDict: (script_id,word,word_id,meaning)=> api.put(`/opendict/${script_id}/${word}/${word_id}`,{meaning: meaning}),
  deleteDict: (script_id,word_id)=> api.delete(`/opendict/${script_id}/${word_id}`),
  upLike: (script_id,word_id)=> api.put(`/likeDislike/likeUp/${script_id}/${word_id}`),
  downLike: (script_id,word_id)=> api.put(`/likeDislike/likeDown/${script_id}/${word_id}`),
  upDislike: (script_id,word_id)=> api.put(`/likeDislike/dislikeUp/${script_id}/${word_id}`),
  downDislike: (script_id,word_id)=> api.put(`/likeDislike/dislikeDown/${script_id}/${word_id}`),
};