import React from "react";
import { DashboardRoutes } from "../../routers/DashboardRoutes";

import { Link } from "react-router-dom";

export const Dashboard = () => {
  return (
    <div class="flex flex-col md:flex-row">

      <div class="bg-gray-800 shadow-xl h-16 fixed bottom-0 mt-12 md:relative md:h-screen z-10 w-full md:w-48">

        <div class="md:mt-12 md:w-48 md:fixed md:left-0 md:top-0 content-center md:content-start text-left justify-between">
          <ul class="list-reset flex flex-row md:flex-col py-0 md:py-3 px-1 md:px-2 text-center md:text-left">
            <li class="mr-3 flex-1">
              <a
                href="/listar-administradores"
                class="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-pink-500"
              >
                <i class="fas fa-tasks pr-0 md:pr-3"></i>
                <span class="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">
                  Administradores
                </span>
              </a>
            </li>
            <li class="mr-3 flex-1">
              <a
                href="/listar-colaboradores"
                class="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-purple-500"
              >
                <i class="fa fa-envelope pr-0 md:pr-3"></i>
                <span class="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">
                  Colaboradores
                </span>
              </a>
            </li>
            <li class="mr-3 flex-1">
            <a
                href="/listar-prestamos"
                class="block py-1 md:py-3 pl-0 md:pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-red-500"
              >
                <i class="fa fa-wallet pr-0 md:pr-3"></i>
                <span class="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">
                  Prestamos
                </span>
              </a>

              <ul class="list-reset flex flex-row md:flex-col py-0 md:py-3 px-1 md:px-2 text-center md:text-left">
      <li class="mr-3 flex-1">
      <a
                href="/prestamo-historial"
                class="block py-1 md:py-3 pl-0 md:pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-red-500"
              >
                <i class="fa fa-wallet pr-0 md:pr-3"></i>
                <span class="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">
                  Historial
                </span>
              </a>
        </li>
    </ul>
            </li>
            <li class="mr-3 flex-1">
              <a
                href="#"
                class="block py-1 md:py-3 pl-0 md:pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-red-500"
              >
                <i class="fa fa-wallet pr-0 md:pr-3"></i>
                <span class="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">
                  Payments
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="main-content flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5">
            
        </div>

    </div>
  );
};
