import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../actions/AuthAction";
import { uiCloseMenu } from "../../actions/UIAction";

import logo from "../../assets/mainLogo.png";
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
      className={`bg-green-800 w-54 xl:w-64 2xl:w-80 px-4 lg:px-6 xl:px-8 py-4 lg:py-6 sticky ${
        menuOpen ? "overflow-hidden" : "hidden"
      } lg:flex flex-col shadow-2xl  z-10`}
    >
      <div className="flex-1 py-4">
        <h2 className="text-xl font-semibold text-center">HACIENDA EL OROSI</h2>
        <nav className="md:mt-8 -mx-2">
          <div className="flex flex-col items-center mt-6 -mx-2 pb-3">
            <img
              className="object-cover w-44 h-44 mx-2 rounded-full"
              src={logo}
              alt="avatar"
            />
            <p className="mb-1 font-boldtext-sm text-blue-200">
              <i className="fas fa-user pr-1"></i> {`${name} ${surname}`}
            </p>
            <p className="mb-1 font-bold text-sm text-blue-200">
              <i className="fas fa-briefcase pr-1"></i>
              {role === "GENERAL_ROLE"
                ? "Dueño"
                : role === "RESOURCES_ROLE"
                ? "Recursos Humanos"
                : "Encargado de Ganado"}
            </p>
          </div>
          <div className="border-solid border border-blue-200"></div>
          <ul className="text-base pt-4 space-y-3">
            <li>
              <Link
                to="/"
                className="bg-green-900 hover:bg-gray-900 transition-colors duration-100 flex items-end py-3 px-4 space-x-2 rounded-lg font-bold"
              >
                <span className="flex-1">
                  <i className="fas fa-envelope-open-text pr-4"></i>
                  Mensajes
                </span>

                <span className="bg-red-500  text-xs w-5 h-5 rounded-full inline-flex items-center justify-center">
                  6
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/herramientas-activas"
                className="bg-green-900 hover:bg-gray-900 transition-colors duration-100 flex items-end py-3 px-4 space-x-2 rounded-lg font-bold"
              >
                <span className="flex-1">
                  <i className="fas fa-hammer pr-4"></i>
                  Activos
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="bg-green-900 hover:bg-gray-900 transition-colors duration-100 flex items-end py-3 px-4 space-x-2 rounded-lg font-bold"
              >
                <span className="flex-1">
                  <i className="fas fa-users pr-4"></i>
                  Colaboradores
                </span>
              </Link>
            </li>

            <li>
              <Link
                to="/herramientas"
                className="bg-green-900 hover:bg-gray-900 transition-colors duration-100 flex items-end py-3 px-4 space-x-2 rounded-lg font-bold"
              >
                <span className="flex-1">
                  <i className="fas fa-tools pr-4"></i>
                  Herramientas
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="bg-green-900 hover:bg-gray-900 transition-colors duration-100 flex items-end py-3 px-4 space-x-2 rounded-lg font-bold"
              >
                <span className="flex-1">
                  <i className="fas fa-horse pr-4"></i>Ganado
                </span>
              </Link>
            </li>
            <li hidden={role !== "GENERAL_ROLE"}>
              <Link
                to="/listar-administradores"
                className="bg-green-900 hover:bg-gray-900 transition-colors duration-100 flex items-end py-3 px-4 space-x-2 rounded-lg font-bold"
              >
                <span className="flex-1">
                  <i className="fas fa-hat-cowboy-side pr-4"></i>
                  Administradores
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/prestamos"
                className="bg-green-900 hover:bg-gray-900 transition-colors duration-100 flex items-end py-3 px-4 space-x-2 rounded-lg font-bold"
              >
                <span className="flex-1">
                  <i className="fas fa-donate pr-4"></i>Prestamos
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <button
        className="px-4 py-2 font-medium tracking-wide capitalize transition-colors duration-200 transform bg-black rounded-md dark:bg-gray-800 hover:bg-blue-500 dark:hover:bg-gray-700 focus:outline-none focus:bg-blue-500 dark:focus:bg-gray-700"
        onClick={() => adminLogout()}
      >
        <span className="font-bold">
          <i className="fas fa-sign-out-alt pr-2"></i>
          Cerrar la sesión
        </span>
      </button>
    </div>
  );
};
