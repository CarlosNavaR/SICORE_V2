import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import '@fortawesome/fontawesome-free/js/all';
import './styles/Fonts';
import React, { useContext } from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';
import { GlobalStyle } from './styles/GlobalStyle';
import { ToastContainer } from 'react-toastify';
import Login from './Modules/Login/Login';
import Users from './Modules/Users/Users';
import SystemUsers from './Modules/SystemUsers/systemUsers';
import Home from './Modules/Home/home';
import AuthProvider from './Context/Authcontext';
import PrivateRoute from './Routes/PrivateRoute';
import Layout from './Components/Layout/Layout';

export function App() {
  return (
    <div>
      <HashRouter>
        <GlobalStyle />
        <AuthProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/home"
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />
              <Route
                path="/Users"
                element={
                  <PrivateRoute>
                    <Users />
                  </PrivateRoute>
                }
              />
              <Route
                path="/SystemUsers"
                element={
                  <PrivateRoute>
                    <SystemUsers />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<p>There's nothing here: 404!</p>} />
            </Route>
          </Routes>
        </AuthProvider>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          draggable
          pauseOnHover={false}
        />
      </HashRouter>
    </div>
  );
}
