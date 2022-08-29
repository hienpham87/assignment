import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Login } from './app/components/Login';
import { Register } from './app/components/Register';
import { Home } from './app/components/Home';

function App() {
  return (
    <div className="App">
      <h1>Welcome to React Router!</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
