import React from "react";

import bgLogin from "../../assets/bglogin4.jpg";
import bgLogin2 from "../../assets/bgLogin2.jpg";
import mainLogo from "../../assets/mainLogo.png";
import { FooterSmall } from "../ui/FooterSmall";

export const LoginScreen3 = () => {
  return (
    <div class="m-0 p-0 box-border relative h-screen w-full text-white bg-cover bg-center"
    style={{ backgroundImage: `url(${bgLogin})` }}
    >
      <div class="flex flex-col items-center flex-1 h-full justify-center px-4 sm:px-0">
        <div
          class="flex rounded-lg shadow-lg w-full sm:w-3/4 lg:w-1/2 bg-black bg-opacity-50  sm:mx-0"
          style={{"height" : "500px",}}
        >
          <div class="flex flex-col w-full md:w-1/2 p-4">
            <div class="flex flex-col flex-1 justify-center mb-8">
              <h1 class="text-4xl text-center font-thin">HACIENDA EL OROSI</h1>
              <div class="w-full mt-4">
                <form
                  class="form-horizontal w-3/4 mx-auto"
                  method="POST"
                  action="#"
                >
                  <div class="flex flex-col mt-4">
                    <input
                      id="Cédula"
                      type="text"
                      class="flex-grow h-8 px-2 border rounded border-grey-400"
                      name="Cédula"
                      value=""
                      placeholder="Cédula"
                    />
                  </div>
                  <div class="flex flex-col mt-4">
                    <input
                      id="password"
                      type="password"
                      class="flex-grow h-8 px-2 rounded border border-grey-400"
                      name="password"
                      required
                      placeholder="******"
                    />
                  </div>
                  <div class="flex flex-col mt-8">
                    <button
                      type="submit"
                      class="bg-green-500 hover:bg-yellow-600 text-white text-sm font-semibold py-2 px-4 rounded"
                    >
                      Ingresar
                    </button>
                  </div>
                </form>
                <div class="text-center mt-4">
                  <a
                    class="no-underline hover:underline text-blue-dark text-xs"
                    href="{{ route('password.request') }}"
                  >
                  ¿Problemas para iniciar sesión?
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div
            class="hidden md:block md:w-1/2 rounded-r-lg bg-cover bg-center"
    
            style={{ backgroundImage: `url(${bgLogin2})` }}
          ></div>
        </div>
      </div>

      <FooterSmall/>
    </div>
  );
};
