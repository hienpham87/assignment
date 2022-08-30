// A mock function to mimic making an async request for data

import { Movie } from "./movie.model";
import axios from "axios";
import { BASE_URL } from "../../utils";

const movies: Movie[] = [
  {
    id: "tgbNymZ7vqY",
    name: "First Blood Part II",
    tags: ["#action"],
    sharedBy: 'root@gmail.com',
    votedUp: 89,
    votedDown: 32
  },
  {
    id: "8IEezGQwgZk",
    name: "Tom and Jerry",
    tags: ["#music"],
    sharedBy: 'root@gmail.com',
    votedUp: 12,
    votedDown: 3
  },
];

export const fetchMovie = async () => {
//   return new Promise<{ data: Movie[] }>((resolve) =>
//     setTimeout(() => resolve({ data: movies }), 500)
//   );
const response = await axios.get<Movie[]>(`${BASE_URL}/api/product/`);
console.log('response', response.data);
  return response.data;
};

export const shareMovie = async (id: string, sharedBy: string) => {
    const response = await axios.post<Movie>(`${BASE_URL}/api/product/share`, {
        id,
        sharedBy,
    });
    return response.data;
  };