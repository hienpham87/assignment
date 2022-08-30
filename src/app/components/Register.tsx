import React, { useState } from "react";
import styled from "styled-components";
import { signup } from "./user/user.api";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Form = styled.form`
  width: 400px;
`;

export function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSuccess, setSuccess] = useState(false);

  const signUp = async () => {
    const response = await signup(username, password);
    setSuccess(true);
  };

  return (
    <Container>
      {isSuccess ? (
        <span>
          Your account is created success <a href="/login">sign in?</a>
        </span>
      ) : (
        <Form>
          <h3>Sign Up</h3>
          <div className="mb-3">
            <label>First name</label>
            <input
              type="text"
              className="form-control"
              placeholder="First name"
            />
          </div>
          <div className="mb-3">
            <label>Last name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Last name"
            />
          </div>
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
          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={() => signUp()}
            >
              Sign Up
            </button>
          </div>
          <p className="forgot-password text-right">
            Already registered <a href="/login">sign in?</a>
          </p>
        </Form>
      )}
    </Container>
  );
}
