import React from "react";
import { Link } from "react-router-dom";
import { DashboardRoutes } from "../../routers/DashboardRoutes";

export const Dashboard = () => {
  return (
    <div>
      <nav className="bg-gray-800 pt-2 md:pt-1 pb-1 px-1 mt-0 h-auto fixed w-full z-20 top-0">
        <div className="flex flex-wrap items-center">
          <div className="flex flex-shrink md:w-1/3 justify-center md:justify-start text-white">
            <a href="google.com">
              <span className="text-xl pl-2">
                <i className="em em-grinning"></i>
              </span>
            </a>
          </div>

          <div className="flex flex-1 md:w-1/3 justify-center md:justify-start text-white px-2"></div>

          <div className="flex w-full pt-2 content-center justify-between md:w-1/3 md:justify-end">
            <ul className="list-reset flex justify-between flex-1 md:flex-none items-center">
              <li className="flex-1 md:flex-none md:mr-3">
                <a
                  className="inline-block py-2 px-4 text-white no-underline"
                  href="google.com"
                >
                  Active
                </a>
              </li>
              <li className="flex-1 md:flex-none md:mr-3">
                <a
                  className="inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline py-2 px-4"
                  href="google.com"
                >
                  link
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="flex flex-col md:flex-row">
        <div className="bg-green-900 shadow-xl h-16 fixed bottom-0 mt-12 md:relative md:h-screen z-10 w-full md:w-48">
          <div className="md:mt-12 md:w-48 md:fixed md:left-0 md:top-0 content-center md:content-start text-left justify-between">
            <ul className="list-reset flex flex-row md:flex-col py-0 md:py-3 px-1 md:px-2 text-center md:text-left">
              <li className="mr-3 flex-1">
                <Link
                  className="block py-1 md:py-3 pl-0 md:pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-white-800 hover:border-red-500"
                  to="/menu-principal"
                >
                  Hacienda El Orosi
                </Link>
              </li>
              <li className="mr-3 flex-1">
                <Link
                  className="block py-1 md:py-3 pl-0 md:pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-white-800 hover:border-red-500"
                  to="/listar-administradores"
                >
                  Administradores
                </Link>
              </li>
              <li className="mr-3 flex-1">
                <Link
                  className="block py-1 md:py-3 pl-0 md:pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-white-800 hover:border-red-500"
                  to="/listar-colaboradores"
                >
                  Colaboradores
                </Link>
              </li>
              <li className="mr-3 flex-1">
                <Link
                  className="block py-1 md:py-3 pl-0 md:pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-white-800 hover:border-red-500"
                  to="/listar-prestamos"
                >
                  Prestamos
                </Link>
              </li>
              <li className="mr-3 flex-1">
                <Link
                  className="block py-1 md:py-3 pl-0 md:pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-white-800 hover:border-red-500"
                  to="/prestamo-historial"
                >
                  Historial de Prestamos
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <DashboardRoutes/>
      </div>
    </div>
  );
};
