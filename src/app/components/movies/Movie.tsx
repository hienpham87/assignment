import React from "react";
import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { selectUser } from "../user/userSlice";
import { voteAction } from "./movieSlice";

const Container = styled.div`
  max-width: 800px;
  border-radius: 5px;
  display: flex;
  box-shadow: 0 5px 20px 10px rgb(0 0 0 / 20%);
  overflow: hidden;
  margin-bottom: 20px;
`;

const Content = styled.div`
  background-color: #fff;
  flex: 1;
  padding: 35px 30px;
  display: flex;
  flex-direction: column;
`;

const MovieTitle = styled.div`
  display: flex;
  align-items: center;

  span {
    font-size: 16px;
    margin-right: auto;
    color: royalblue;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 215px;
  }
`;

const MovieTag = styled.div`
  font-size: 10px;
  color: #fff;
  padding: 2px 7px;
  border-radius: 100px;
  margin-right: 8px;
  display: block;
  text-transform: uppercase;
  background-color: #a9c9ff;
`;

const VoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  & > .votedAction {
    display: flex;
    justify-content: space-between;
    font-size: 14px;

    svg {
      margin-left: 10px;
      cursor: pointer;
      height: 20px;

      &:hover {
        color: blue;
      }
    }
  }

  & > .votedInfo {
    display: flex;
    font-size: 14px;
    align-items: center;

    & > span + span {
      margin-left: 20px;
    }
  }
`;

const MovieDescription = styled.p`
  font-size: 14px;
  text-align: left;
`;

const Price = styled.div`
  background: linear-gradient(to bottom, #a9c9ff 0%, #ffbbec 100%);
  flex: 0 0 50px;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 2px;
  color: rgb(255, 255, 255);
  writing-mode: vertical-lr;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #a9c9ff;
`;

export function MovieItem({ movieItem, vote }: any) {
  const { id, name, tags, sharedBy, votedUp, votedDown } = movieItem;
  const { voteStatus } = vote || {};
  const { token } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const isVotedUp = voteStatus === "votedUp";
  const isVotedDown = voteStatus === "votedDown";

  return (
    <Container className="movieItem">
      <iframe
        width="420"
        height="300"
        src={`https://www.youtube.com/embed/${id}`}
      ></iframe>
      <Content>
        <MovieTitle>
          <span>
            {name}
          </span>
          {tags.map((tag: string) => (
            <MovieTag>{tag}</MovieTag>
          ))}
        </MovieTitle>
        <VoteContainer>
          <div className="votedAction">
            <span>Shared by: {sharedBy}</span>
            {token && (
              <span>
                {!isVotedDown && (
                  <FontAwesomeIcon
                    icon={faThumbsUp}
                    onClick={() =>
                      dispatch(
                        voteAction({ idMovie: id, voteStatus: "votedUp" })
                      )
                    }
                  />
                )}
                {!isVotedUp && (
                  <FontAwesomeIcon
                    icon={faThumbsDown}
                    onClick={() =>
                      dispatch(
                        voteAction({ idMovie: id, voteStatus: "votedDown" })
                      )
                    }
                  />
                )}
              </span>
            )}
          </div>
          <div className="votedInfo">
            <span>
              {isVotedUp ? votedUp + 1 : votedUp}{" "}
              <FontAwesomeIcon icon={faThumbsUp} />
            </span>
            <span>
              {isVotedDown ? votedDown + 1 : votedDown}{" "}
              <FontAwesomeIcon icon={faThumbsDown} />
            </span>
          </div>
        </VoteContainer>
        <MovieDescription>
          First Blood is a 1982 American action film directed by Ted Kotcheff,
          and co-written by Sylvester Stallone, who also stars as Vietnam War
          veteran John Rambo.
        </MovieDescription>
      </Content>
      <Price></Price>
    </Container>
  );
}
