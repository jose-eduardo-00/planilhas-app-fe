import axios from "axios";

export const http = axios.create({
  baseURL: "http://192.168.0.2:3000",
  // baseURL: "",
});

export const baseUrl = "http://192.168.0.2:3000";
// export const baseUrl = "";
