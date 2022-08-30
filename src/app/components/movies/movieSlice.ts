import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { idText } from "typescript";
import { RootState, AppThunk } from "../../../app/store";
import { fetchMovie, shareMovie } from "./movie.api";
import { Movie, Voted } from "./movie.model";

export interface MovieState {
  movies: Movie[];
  votes: Voted[];
  isLoading: boolean;
}

const initialState: MovieState = {
  movies: [],
  votes: [],
  isLoading: false,
};

export const fetchMovieAction = createAsyncThunk<Movie[]>(
  "movie/fetchMovie",
  async () => {
    return await fetchMovie();
  }
);

export const shareMovieAction = createAsyncThunk<
  Movie,
  { id: string; sharedBy: string }
>("movie/shareMovie", async ({ id, sharedBy }) => {
  return await shareMovie(id, sharedBy);
});

export interface ShareMovieProps {
  id: string;
  sharedBy: string;
}
export const movieSlice = createSlice({
  name: "movie",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    voteAction: (state, action: PayloadAction<Voted>) => {
      state.votes = state.votes.concat(action.payload);
    }
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMovieAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.movies = action.payload;
      })
      .addCase(fetchMovieAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(shareMovieAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.movies = state.movies.concat(action.payload);
      });
  },
});

export const selectMovies = (state: RootState): MovieState => state.movie;

export const { voteAction } = movieSlice.actions;

export default movieSlice.reducer;