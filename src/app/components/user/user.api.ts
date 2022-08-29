import axios from "axios";
import { BASE_URL } from "../../utils";

export const login = async (username: string, password: string) => {
  const response = await axios.post<string>(`${BASE_URL}/api/user/auth`, {
    username,
    password,
  });
  return response.data;
};

export const signup = async (username: string, password: string) => {
  const response = await axios.post<string>(`${BASE_URL}/api/user/signup`, {
    username,
    password,
  });
  return response.data;
};
