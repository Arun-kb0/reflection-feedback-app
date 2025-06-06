import axios from "axios";

const BASE_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3001'

export const axiosInstance = axios.create({
  baseURL: BASE_URL
})

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
})