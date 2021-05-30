import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/AuthAction';
import { uiCloseMenu } from '../../actions/UIAction';

import logo from '../../assets/mainLogo.png';

import ganado from '../../assets/icons/ganado.svg';
export const Sidebar = () => {
  const dispatch = useDispatch();
  const { name, surname, role } = useSelector((state) => state.auth);
  const { menuOpen } = useSelector((state) => state.ui);

  const adminLogout = async () => {
    localStorage.clear();
    await dispatch(logout());
  };

  const menuClose = () => {
    dispatch(uiCloseMenu());
  };

  return (
    <div
      onClick={() => menuClose()}
      className={`bg-gradient-to-l from-green-900 to-green-700 w-54 px-4 py-4  sticky ${
        menuOpen ? 'overflow-hidden' : 'hidden'
      } lg:flex flex-col shadow-2xl  z-10`}
    >
      <div className="flex-1">
        <h2 className="text-center">HACIENDA EL OROSI</h2>
        <nav className="md:mt-8">
          <div className="flex flex-col items-center mt-6 -mx-2 pb-3">
            <img className="object-cover w-40 h-40 mx-2 rounded-full" src={logo} alt="avatar" />
            <p className="mb-1 text-blue-200">
              <i className="fas fa-user pr-1"></i> {`${name} ${surname}`}
            </p>
            <p className="mb-1 text-sm text-blue-200">
              <i className="fas fa-briefcase pr-1"></i>
              {role}
            </p>
          </div>
          <div className="border-solid border border-blue-200"></div>
          <ul className="text-base pt-2 space-y-3">
            <li hidden={role !== 'Dueño'}>
              <Link
                to="/administradores"
                className="hover:bg-gray-900 transition-colors duration-100 flex items-end py-3 px-2 rounded-lg"
              >
                <span className="flex-1">
                  <i className="fas fa-hat-cowboy-side pr-4"></i>
                  Administradores
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="hover:bg-gray-900 transition-colors duration-100 flex items-end py-3 px-2 rounded-lg"
              >
                <span className="flex-1">
                  <i className="fas fa-users pr-4"></i>
                  Colaboradores
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/medicamentos"
                className="hover:bg-gray-900 transition-colors duration-100 flex items-end py-3 px-2 rounded-lg"
              >
                <span className="flex-1">
                  <i className="fas fa-book-medical pr-4"></i>Medicamentos
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/herramientas"
                className="hover:bg-gray-900 transition-colors duration-100 flex items-end py-3 px-2 rounded-lg"
              >
                <span className="flex-1">
                  <i className="fas fa-tools pr-4"></i>
                  Herramientas
                </span>
              </Link>
            </li>
            <li hidden={role === 'Encargado del ganado'}>
              <Link
                to="/prestamos"
                className="hover:bg-gray-900 transition-colors duration-100 flex items-end py-3 px-2 rounded-lg"
              >
                <span className="flex-1">
                  <i className="fas fa-donate pr-4"></i>Prestamos
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/productos"
                className="hover:bg-gray-900 transition-colors duration-100 flex items-end py-3 px-2 rounded-lg"
              >
                <span className="flex-1">
                  <i className="fab fa-product-hunt pr-4"></i>Productos
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/trabajos"
                className="hover:bg-gray-900 transition-colors duration-100 flex items-end py-3 px-2 rounded-lg"
              >
                <span className="flex-1">
                  <i className="fas fa-briefcase pr-4"></i>
                  Trabajos
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/ganado"
                className="hover:bg-gray-900 transition-colors duration-100 flex items-end py-3 px-2 rounded-lg"
              >
                <img src={ganado} alt="Ganado" className="pr-4" width="36" height="36"></img>
                Ganado
              </Link>
            </li>
            <li>
              <Link
                to="/herramientas-activas"
                className="hover:bg-gray-900 transition-colors duration-100 flex items-end py-3 px-2 rounded-lg"
              >
                <span className="flex-1">
                  <i className="fas fa-hammer pr-4"></i>
                  Activos
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/pagos"
                className="hover:bg-gray-900 transition-colors duration-100 flex items-end py-3 px-2 rounded-lg"
              >
                <span className="flex-1">
                  <i className="fas fa-hand-holding-usd pr-4"></i>Pagos
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/dietas"
                className="hover:bg-gray-900 transition-colors duration-100 flex items-end py-3 px-2 rounded-lg"
              >
                <span className="flex-1">
                  <i className="fas fa-utensils pr-4"></i>Dietas
                </span>
              </Link>
            </li>

            <li>
              <Link
                to="/salud"
                className="hover:bg-gray-900 transition-colors duration-100 flex items-end py-3 px-2 rounded-lg"
              >
                <span className="flex-1">
                  <i className="fas fa-book-medical pr-4"></i>Salud
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <button
        className="px-4 py-2 mt-10 font-medium tracking-wide capitalize transition-colors duration-200 transform bg-black rounded-md dark:bg-gray-800 hover:bg-blue-500 dark:hover:bg-gray-700 focus:outline-none focus:bg-blue-500 dark:focus:bg-gray-700"
        onClick={() => adminLogout()}
      >
        <span>
          <i className="fas fa-sign-out-alt pr-2"></i>
          Cerrar la sesión
        </span>
      </button>
    </div>
  );
};
