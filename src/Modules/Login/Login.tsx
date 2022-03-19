import React, { useState, useContext } from 'react';
import prueba from '../../../assets/images/Maquinaria.jpg';
import loginLogic from './Login.logic';
import Home from '../Home/home';
import { AuthContext } from '../../Context/Authcontext';

const Login = () => {
  const { register, handleSubmit, onSubmit } = loginLogic();
  const { isLogin } = useContext(AuthContext);

  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: '1rem' }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src={prueba}
                    alt="login form"
                    style={{
                      borderRadius: '1rem 0 0 1rem',
                      objectFit: 'fill',
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <span
                          className="h3 fw-bold mb-0"
                          style={{ color: 'var(--blue)' }}
                        >
                          Sistema de Control y Recursos
                        </span>
                      </div>

                      <h5
                        className="fw-normal mb-1 pb-3"
                        style={{
                          letterSpacing: '1px',
                        }}
                      >
                        Inicio de sesión
                      </h5>

                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          id="institutionalCode"
                          className="form-control form-control-lg"
                          {...register('institutionalCode', {
                            required: true,
                          })}
                        />
                        <label className="form-label">Número de control</label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="password"
                          className="form-control form-control-lg"
                          {...register('password', { required: true })}
                        />
                        <label className="form-label">Contraseña</label>
                      </div>
                      <div className="pt-1 mb-4">
                        <button
                          className="btn btn-dark btn-lg btn-block"
                          type="submit"
                        >
                          Iniciar sesión
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
