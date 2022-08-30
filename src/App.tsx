import React from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import { Login } from "./app/components/user/Login";
import { Register } from "./app/components/Register";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { logoutAction, selectUser } from "./app/components/user/userSlice";
import styled from "styled-components";
import { Movies } from "./app/components/movies/Movies";
import { Share } from "./app/components/Share";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RightMenu = styled.div`
  display: flex;
  align-items: center;

  & > * + * {
    margin-left: 20px;
  }
`;
function App() {
  const { token, currentUser } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(logoutAction());
  };

  return (
    <div className="App">
      <Header>
        <h1>Welcome to Funny Movies!</h1>
        <RightMenu>
          {token ? (
            <>
              <span>Welcome {currentUser?.username}</span>
              <button
                className="btn btn-outline-primary"
                onClick={() => navigate("/share")}
              >
                Share a movie
              </button>
              <button
                className="btn btn-outline-primary"
                onClick={() => logout()}
              >
                Logout
              </button>
            </>
          ) : (
            <button
              className="btn btn-outline-primary"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
        </RightMenu>
      </Header>
      <Routes>
        <Route path="/" element={<Movies />} />
        <Route path="share" element={<Share />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
