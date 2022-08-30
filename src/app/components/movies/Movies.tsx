import React, { useEffect } from "react";
import styled from "styled-components";
import { MovieItem } from "./Movie";
import { fetchMovieAction, selectMovies } from "./movieSlice";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";

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
        <MovieItem movieItem={movie} vote={votes.find(vote => vote.idMovie === movie.id)}/>
      ))}
    </Container>
  );
}
