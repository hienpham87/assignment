import { Movie } from "./movie.model";
import movieReducer, { fetchMovieAction, MovieState } from "./movieSlice";

const movies: Movie[] = [
  {
    id: 1,
    name: "First Blood Part II",
    tags: ["#action"],
    price: 12.5,
    sharedBy: "root@gmail.com",
    votedUp: 89,
    votedDown: 32,
  },
  {
    id: 2,
    name: "Tom and Jerry",
    tags: ["#cartoon"],
    price: 10.1,
    sharedBy: "root@gmail.com",
    votedUp: 12,
    votedDown: 3,
  }
];

describe("movie reducer", () => {
  const initialState: MovieState = {
    movies: [],
    votes: [],
    isLoading: false,
  };
  it("should handle initial state", () => {
    expect(movieReducer(undefined, { type: "unknown" })).toEqual({
      movies: [],
      isLoading: false,
    });
  });

  it("fetchMovieAction.pending should show empty movies", () => {
    const actual = movieReducer(initialState, fetchMovieAction.pending(""));
    expect(actual.isLoading).toBeTruthy();
  });

  it("fetchMovieAction.fulfilled should return movies", () => {
    const actual = movieReducer(
      initialState,
      fetchMovieAction.fulfilled(movies, "")
    );
    expect(actual.movies).toEqual(movies);
    expect(actual.isLoading).toBeFalsy();
  });
});
