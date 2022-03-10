import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import { GlobalStyle } from './styles/GlobalStyle';
import Login from './Modules/Login/Login';
import Home from './Modules/Home/home';
import AuthProvider from './Context/Authcontext';
import Layout from './Components/Layout';

export function App() {
  return (
    <div>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}
