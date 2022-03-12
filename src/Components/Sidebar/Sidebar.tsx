import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/Authcontext';
const Sidebar = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div className="d-flex flex-column flex-shrink-1 p-3 shadow-sm rounded">
      <a
        href="#"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto  text-decoration-none"
      >
        <span className="fs-4">Sidebar</span>
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-5">
        <li className="nav-item">
          <Link to="loans" className="nav-link active" aria-current="page">
            <i className="fa-solid fa-folder-plus  me-2"></i>
            Prestamos
          </Link>
        </li>
        <li>
          <Link to="laboratories" className="nav-link text-dark">
            <i className="fa-solid fa-screwdriver-wrench me-2"></i>
            Laboratorios
          </Link>
        </li>
        <li>
          <Link to="inventory" className="nav-link text-dark">
            <i className="fa-solid fa-box-archive me-2"></i>
            Inventario
          </Link>
        </li>
        <li>
          <Link to="users" className="nav-link text-dark">
            <i className="fa-solid fa-users me-2"></i>
            Usuarios
          </Link>
        </li>
        <li>
          <Link to="system-users" className="nav-link text-dark">
            <i className="fa-solid fa-user-lock me-2"></i>
            Usuarios de sistema
          </Link>
        </li>
        <li>
          <Link to="reports" className="nav-link text-dark">
            <i className="fa-solid fa-file-excel me-2"></i>
            Reportes
          </Link>
        </li>
      </ul>
      <hr />
      <div className="dropdown">
        <ul className="nav nav-pills flex-column">
          <li>
            <a
              href="#"
              className="nav-link text-dark"
              onClick={() => {
                logout();
              }}
            >
              <i className="fa-solid fa-right-from-bracket me-2"></i>
              Cerrar sesión
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Sidebar;
