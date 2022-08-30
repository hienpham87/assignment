import React, { useEffect } from "react";
import styled from "styled-components";
import { MovieItem } from "./Movie";
import { fetchMovieAction, selectMovies } from "./movieSlice";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export function Movies() {
  const { movies, votes, isLoading } = useAppSelector(selectMovies);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMovieAction());
  }, []);

  return (
    <Container>
      {movies.map((movie) => (
        <MovieItem key={movie.id} movieItem={movie} vote={votes.find(vote => vote.idMovie === movie.id)}/>
      ))}
    </Container>
  );
}
