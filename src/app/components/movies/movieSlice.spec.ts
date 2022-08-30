import { Movie } from "./movie.model";
import movieReducer, { fetchMovieAction, MovieState } from "./movieSlice";

const movies: Movie[] = [
  {
    id: "tgbNymZ7vqY",
    name: "First Blood Part II",
    tags: ["#action"],
    sharedBy: "root@gmail.com",
    votedUp: 89,
    votedDown: 32,
  },
  {
    id: "8IEezGQwgZk",
    name: "Tom and Jerry",
    tags: ["#music"],
    sharedBy: "root@gmail.com",
    votedUp: 12,
    votedDown: 3,
  },
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
      votes: [],
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
