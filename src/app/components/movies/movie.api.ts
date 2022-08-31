// A mock function to mimic making an async request for data

import { Movie } from "./movie.model";
import axios from "axios";
import { BASE_URL } from "../../utils";

export const fetchMovie = async () => {
  const response = await axios.get<Movie[]>(`${BASE_URL}/api/movie/`);
  console.log("response", response.data);
  return response.data;
};

export const shareMovie = async (id: string, sharedBy: string) => {
  const response = await axios.post<Movie>(`${BASE_URL}/api/movie/share`, {
    id,
    sharedBy,
  });
  return response.data;
};
