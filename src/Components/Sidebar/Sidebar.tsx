import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/authcontext';
import LogoIndustrial from '../../../assets/images/Industrial.png';
import { fontSize } from '@mui/system';

const Sidebar = () => {
  const { logout, auth } = useContext(AuthContext);

  return (
    <div
      className="d-flex flex-column flex-shrink-1 p-3 shadow-sm rounded w-100 bg-white"
      style={{ height: '100vh' }}
    >
      <div className="d-flex flex-column justify-content-center align-items-center text-center">
        <img
          src={LogoIndustrial}
          alt=""
          className="rounded float-start"
          style={{ width: 150 }}
        />
        <span
          className="fs-4 fw-bolder"
          style={{ color: 'var(--blue)', marginTop: 5 }}
        >
          Ingeniería industrial
        </span>
        <span className="fs-5 fw-normal">
          {auth
            ? auth.IdRole === 1
              ? 'Administrador'
              : 'Operador'
            : 'User not found'}
        </span>
        <span className="fs-6 fw-light">
          {auth
            ? auth?.FirstName + ' ' + auth.FatherLastName
            : 'User not found'}
        </span>
      </div>
      <hr />
      <ul className="nav nav-pills flex-column mb-5">
        <li className="nav-item mb-1">
          <Link
            to="loans"
            className={`nav-link  ${
              location.hash === '#/loans' ? 'active' : 'text-dark'
            }`}
            aria-current="page"
          >
            <i className="fa-solid fa-folder-plus  me-3"></i>
            Prestamos
          </Link>
        </li>
        <li className="nav-item mb-1">
          <Link
            to="inventory"
            className={`nav-link  ${
              location.hash === '#/inventory' ? 'active' : 'text-dark'
            }`}
          >
            <i className="fa-solid fa-box-archive me-3"></i>
            Inventario
          </Link>
        </li>
        <li className="nav-item mb-1">
          <Link
            to="Maintenance"
            className={`nav-link  ${
              location.hash === '#/Maintenance' ? 'active' : 'text-dark'
            }`}
          >
            <i className="fa-solid fa-screwdriver-wrench me-3"></i>
            Mantenimiento
          </Link>
        </li>
        <li className="nav-item mb-1">
          <Link
            to="users"
            className={`nav-link  ${
              location.hash === '#/users' ? 'active' : 'text-dark'
            }`}
          >
            <i className="fa-solid fa-users me-3"></i>
            Usuarios
          </Link>
        </li>
        {auth?.IdRole !== 1 ? (
          ''
        ) : (
          <li className="nav-item mb-1">
            <Link
              to="SystemUsers"
              className={`nav-link  ${
                location.hash === '#/SystemUsers' ? 'active' : 'text-dark'
              }`}
            >
              <i className="fa-solid fa-user-lock me-3"></i>
              Usuarios de sistema
            </Link>
          </li>
        )}
        {auth?.IdRole !== 1 ? (
          ''
        ) : (
          <li className="nav-item mb-1">
            <Link
              to="Reports"
              className={`nav-link  ${
                location.hash === '#/Reports' ? 'active' : 'text-dark'
              }`}
            >
              <i className="fa-solid fa-file-excel me-3"></i>
              Reportes
            </Link>
          </li>
        )}
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
