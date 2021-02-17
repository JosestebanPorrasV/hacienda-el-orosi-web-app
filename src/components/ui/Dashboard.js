import React from "react";
import { FooterSmall } from "../ui/FooterSmall";
import { DashboardRoutes } from "../../routers/DashboardRoutes";
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

export const Dashboard = () => {
  return (

    <div class="flex flex-col md:flex-row">
      <div class="fixed z-30 inset-y-0 left-0 w-60 transition duration-300 transform bg-white dark:bg-gray-900 overflow-y-auto lg:translate-x-0 lg:static ">
        <div class="flex items-center justify-center ">
          <div class="flex items-center">
            <span class="text-gray-800 dark:text-white text-2xl font-semibold">
              Dashboard
            </span>
          </div>
        </div>

        <nav class="flex flex-col mt-10 px-4 text-center">
          <a
            href="/listar-administradores"
            class="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-pink-500"
          >
            <i class="fas fa-tasks pr-0 md:pr-3"></i>
            <span class="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">
              Administradores
            </span>
          </a>
          <a
            href="/listar-colaboradores"
            class="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-purple-500"
          >
            <i class="fa fa-envelope pr-0 md:pr-3"></i>
            <span class="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">
              Colaboradores
            </span>
          </a>
          <a
            href="/listar-prestamos"
            class="block py-1 md:py-3 pl-0 md:pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-red-500"
          >
            <i class="fa fa-wallet pr-0 md:pr-3"></i>
            <span class="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">
              Prestamos
            </span>
          </a>

          <a
            href="/prestamo-historial"
            class="block py-1 md:py-3 pl-0 md:pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-red-500"
          >
            <i class="fa fa-wallet pr-0 md:pr-3"></i>
            <span class="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">
              Historial
            </span>
          </a>

          <a
            href="#"
            class="block py-1 md:py-3 pl-0 md:pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-red-500"
          >
            <i class="fa fa-wallet pr-0 md:pr-3"></i>
            <span class="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">
              Payments
            </span>
          </a>
        </nav>
      </div>

      <div class="flex-1 flex flex-col overflow-hidden">
        <header class="flex justify-between items-center p-6">
          <div class="bg-gradient-to-b from-gray-300 to-gray-100 uppercase text-gray-800 border-b-2 border-gray-300 rounded-tl-lg rounded-tr-lg p-5">
            <h5 class="font-bold uppercase text-gray-600">
              Prestamos Cancelados
            </h5>
          </div>
        </header>

        <main class="flex-1 overflow-x-hidden overflow-y-auto">
          <div class="container mx-auto px-6 py-8">
          
          </div>
        </main>
      </div>

      <FooterSmall />
    </div>

  );
};
