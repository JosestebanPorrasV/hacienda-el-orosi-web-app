import React from "react";
import { FooterSmall } from "../ui/FooterSmall";

import bgLogin from "../../assets/bgLogin2.jpg";
import mainLogo from "../../assets/mainLogo.png";


export const LoginScreen2 = () => {
  return (
    <div className="bg-green-700 font-family-karla text-white h-screen">
      <div class="w-full flex flex-wrap">
        <div class="w-full md:w-1/2 flex flex-col">
          <div class="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-24">
            <img src={mainLogo} width="105" />
          </div>

          <div class="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
            <p class="text-center text-xl uppercase">Hacienda El Orosi</p>
            <form
              class="flex flex-col pt-3 md:pt-8"
              onsubmit="event.preventDefault();"
            >
              <div class="flex flex-col pt-4">
                <label for="Cédula" class="text-lg">
                  Cédula
                </label>
                <input
                  type="Cédula"
                  id="Cédula"
                  placeholder="X-XXX-XXX"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div class="flex flex-col pt-4">
                <label for="password" class="text-lg">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="******"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <input
                type="submit"
                value="Ingresar"
                class="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"
              />
            </form>
            <div class="text-center pt-12 pb-12">
              <a href="#" class="pl-3  hover:underline">
                ¿Problemas para iniciar sesión?
              </a>
            </div>
          </div>
        </div>

        <div class="w-1/2 shadow-2xl">
          <img
            class="m-0 p-0 box-border relative h-screen w-full bg-cover bg-center hidden md:block"
            src={bgLogin}
          />
        </div>
      </div>
    </div>
  );
};
