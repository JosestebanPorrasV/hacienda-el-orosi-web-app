import React from "react";

import bgLogin from "../../assets/bgLogin.jpg";

export const LoginScreen = () => {
  return (
    <div
      className="m-0 p-0 box-border relative h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${bgLogin})` }}
    >
      <div class="min-h-screen text-white antialiased px-4 py-6 flex flex-col justify-center sm:py-12 font-body">
        <div class="relative py-3 sm:max-w-xl mx-auto text-center">
          <span class="text-5xl uppercase">Hacienda El Orosi</span>
          <div class="relative mt-4 bg-black bg-opacity-50 shadow-md sm:rounded-lg text-left">
            <div class="h-2 bg-green-900 rounded-t-md"></div>
            <div class="py-6 px-8">
              <label class="block font-semibold">Cédula</label>
              <input
                type="text"
                placeholder="X-XXX-XXX"
                class="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-md"
              />
              <label class="block mt-3 font-semibold">Contraseña</label>
              <input
                type="password"
                placeholder="******"
                class=" border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-md"
              />
              <div class="flex justify-between items-baseline">
                <button class="mt-4 bg-green-900 text-white py-2 px-6 rounded-lg">
                  Ingresar
                </button>
                <a href="#" class="pl-3 text-sm hover:underline">
                ¿Problemas para iniciar sesión?
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};