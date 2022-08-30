import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../hooks";
import { shareMovieAction } from "./movies/movieSlice";
import { selectUser } from "./user/userSlice";

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 100px;
`;

const Panel = styled.div`
  position: relative;
  width: 400px;
  border: 1px solid gray;
  padding: 20px;
`;

const Label = styled.label`
  position: absolute;
  top: -20px;
  left: 20px;
  background: white;
  padding: 5px;
`;
export function Share() {
  const [url, setUrl] = useState("");
  const { currentUser } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const getId = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return match && match[2].length === 11 ? match[2] : "";
  };

  return (
    <Container>
      <Panel>
        <Label>Share a youtube movie</Label>

        <div className="mb-3">
          <label>Youtube URL</label>
          <input
            type="text"
            className="form-control"
            placeholder="link"
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div className="d-grid">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={() => {
              dispatch(
                shareMovieAction({
                  id: getId(url),
                  sharedBy: currentUser?.username || "Guest",
                })
              );
              navigate("/");
            }}
          >
            Share
          </button>
        </div>
      </Panel>
    </Container>
  );
}
