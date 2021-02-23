import React from "react";
import { NotificationBell } from "./NotificationBell";

export const NavbarInfo = () => {
  return (
    <div class="max-w-screen-2xl w-full mx-auto flex justify-between">
      <div class="hidden md:block">
        <h1 class="text-2xl mb-1 font-bold text-blue-100">
          Bienvenid@ Adriana
        </h1>
        <p class="text-lg text-blue-200 hidden lg:block">
          Plataforma administrativa de la Hacienda
        </p>
      </div>
      <div class="flex space-x-4 flex-1 justify-between md:justify-end">
        <div class="relative md:max-w-xs w-full"></div>
        <div class="flex space-x-4">
          <button
            type="button"
            class="bg-gray-600 rounded-lg h-10 px-3 hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-60"
          >
            <svg
              class="w-6 h-6 text-blue-100 opacity-80"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
            </svg>
          </button>
          <NotificationBell />
        </div>
      </div>
    </div>
  );
};
