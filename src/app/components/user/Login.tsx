import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { loginAction, selectUser } from "./userSlice";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Form = styled.form`
  width: 400px;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
`;

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const { token, error } = useAppSelector(selectUser);
  const navigate = useNavigate();

  const login = () => {
    dispatch(loginAction({ username, password }));
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <Container>
      <Form>
        <h3>Sign In</h3>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <ErrorMessage>{error}</ErrorMessage>
        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>
        <div className="d-grid">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => login()}
          >
            Submit
          </button>
        </div>
        <p className="text-right">
          Doesn't have account <a href="/register">sign up?</a>
        </p>
      </Form>
    </Container>
  );
}
