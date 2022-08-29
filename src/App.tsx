import React, { useEffect } from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { Login } from "./app/components/user/Login";
import { Register } from "./app/components/Register";
import { Home } from "./app/components/Home";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { logoutAction, selectUser } from "./app/components/user/userSlice";
import styled from "styled-components";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RightMenu = styled.div`
  display: flex;
`;
function App() {
  const { token, currentUser } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  console.log("token", token);

  useEffect(() => {
    if (!token && !["/login", "/register"].includes(location.pathname)) {
      navigate("/login");
    }
  }, [token]);

  const logout = () => {
    dispatch(logoutAction());
  };

  return (
    <div className="App">
      <Header>
        <h1>Welcome to Funny Movies!</h1>
        <RightMenu>
          {token && (
            <>
              Welcome {currentUser?.username}
              <button className="btn btn-primary" onClick={() => logout()}>
                Logout
              </button>
            </>
          )}
        </RightMenu>
      </Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
