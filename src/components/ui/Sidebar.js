import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiOpenMenu, uiCloseMenu } from "../../actions/UIAction";

import logo from "../../assets/mainLogo.png";
export const Sidebar = () => {

  const dispatch = useDispatch();
  const { menuOpen } = useSelector((state) => state.ui);

  return (
    <div class="bg-green-800 w-54 xl:w-64 2xl:w-80 px-4 lg:px-6 xl:px-8 py-4 lg:py-6 sticky top-0 hidden lg:flex flex-col shadow-2xl h-screen  z-10">
      <div class="flex-1 py-4">
        <h2 class="text-2xl font-semibold text-center">HACIENDA EL OROSI</h2>
        <nav class="md:mt-8 -mx-2">
          <div class="flex flex-col items-center mt-6 -mx-2 pb-3">
            <img
              class="object-cover w-44 h-44 mx-2 rounded-full"
              src={logo}
              alt="avatar"
            />
            <p class="mb-1 font-boldtext-sm text-blue-200">
              <i class="fas fa-user pr-1"></i> Joseseteban Gonzalez
            </p>
            <p class="mb-1 font-bold text-sm text-blue-200">
              <i class="fas fa-briefcase pr-1"></i>Recursos Humanos
            </p>
          </div>
          <div class="border-solid border-2 border-blue-200"></div>
          <ul class="text-base pt-4 space-y-3">
            <li>
              <a
                href="/"
                class="bg-green-900 hover:bg-gray-900 transition-colors duration-100 flex items-end py-3 px-4 space-x-2 rounded-lg font-bold"
              >
                <span class="flex-1">
                  <i class="fas fa-envelope-open-text pr-4"></i>
                  Mensajes
                </span>

                <span class="bg-red-500  text-xs w-5 h-5 rounded-full inline-flex items-center justify-center">
                  6
                </span>
              </a>
            </li>
            <li>
              <a
                href="/"
                class="bg-green-900 hover:bg-gray-900 transition-colors duration-100 flex items-end py-3 px-4 space-x-2 rounded-lg font-bold"
              >
                <span class="flex-1">
                  <i class="fas fa-users pr-4"></i>
                  Colaboradores
                </span>
              </a>
            </li>
            <li>
              <a
                href="/"
                class="bg-green-900 hover:bg-gray-900 transition-colors duration-100 flex items-end py-3 px-4 space-x-2 rounded-lg font-bold"
              >
                <span class="flex-1">
                  <i class="fas fa-tools pr-4"></i>
                  Herramientas
                </span>
              </a>
            </li>
            <li>
              <a
                href="/"
                class="bg-green-900 hover:bg-gray-900 transition-colors duration-100 flex items-end py-3 px-4 space-x-2 rounded-lg font-bold"
              >
                <span class="flex-1">
                  <i class="fas fa-horse pr-4"></i>Ganado
                </span>
              </a>
            </li>
            <li>
              <a
                href="/"
                class="bg-green-900 hover:bg-gray-900 transition-colors duration-100 flex items-end py-3 px-4 space-x-2 rounded-lg font-bold"
              >
                <span class="flex-1">
                  <i class="fas fa-hat-cowboy-side pr-4"></i>
                  Administradores
                </span>
              </a>
            </li>
            <li>
              <a
                href="/"
                class="bg-green-900 hover:bg-gray-900 transition-colors duration-100 flex items-end py-3 px-4 space-x-2 rounded-lg font-bold"
              >
                <span class="flex-1">
                  <i class="fas fa-user-cog pr-4"></i>
                  Mi perfil
                </span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <button class="px-4 py-2 font-medium tracking-wide capitalize transition-colors duration-200 transform bg-black rounded-md dark:bg-gray-800 hover:bg-blue-500 dark:hover:bg-gray-700 focus:outline-none focus:bg-blue-500 dark:focus:bg-gray-700">
        <span class="font-bold">
          <i class="fas fa-sign-out-alt pr-2"></i>
          Cerrar la sesión
        </span>
      </button>
    </div>
  );
};
