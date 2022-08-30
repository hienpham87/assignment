// A mock function to mimic making an async request for data

import { Movie } from "./movie.model";

const movies: Movie[] = [
  {
    id: 1,
    name: "First Blood Part II",
    tags: ["#action"],
    price: 12.5,
    sharedBy: 'root@gmail.com',
    votedUp: 89,
    votedDown: 32
  },
  {
    id: 2,
    name: "Tom and Jerry",
    tags: ["#cartoon"],
    price: 10.1,
    sharedBy: 'root@gmail.com',
    votedUp: 12,
    votedDown: 3
  },
];

export const fetchMovie = async () => {
  return new Promise<{ data: Movie[] }>((resolve) =>
    setTimeout(() => resolve({ data: movies }), 500)
  );
};
