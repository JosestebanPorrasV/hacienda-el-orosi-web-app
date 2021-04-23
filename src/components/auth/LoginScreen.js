import React from "react";

import bgLogin from "../../assets/bgLogin.jpg";
import bgLogin2 from "../../assets/bgLogin2.jpg";

import { useDispatch } from "react-redux";
import { UseForm } from "../../hooks/UseForm";
import { startLogin } from "../../actions/AuthAction";
import { Link } from "react-router-dom";

import '../../assets/css/TopLoaderService.css'

export const LoginScreen = () => {
  const dispatch = useDispatch();

  const [formLoginValues, handleLoginInputChange] = UseForm({
    lDocument_id: 503030707,
    lPassword: "",
  });

  const { lDocument_id, lPassword } = formLoginValues;

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(startLogin(lDocument_id, lPassword));
  };

  return (
    <div
      className="m-0 p-0 box-border relative h-screen w-full text-white bg-cover bg-center"
      style={{ backgroundImage: `url(${bgLogin})` }}
    >
      <div className="flex flex-col items-center flex-1 h-full justify-center px-4 sm:px-0">
        <div
          className="flex rounded-lg shadow-2xl w-full sm:w-3/4 lg:w-1/2 bg-black bg-opacity-50  sm:mx-0"
          style={{ height: "500px" }}
        >
          <div className="flex flex-col w-full md:w-1/2 p-4">
            <div className="flex flex-col flex-1 justify-center mb-8">
              <h1 className="text-4xl text-center font-bold text-gray-300">HACIENDA EL OROSI</h1>
              <div className="w-full mt-4">
                <form
                  className="form-horizontal w-3/4 mx-auto"
                  onSubmit={handleLogin}
                >
                  <div className="flex flex-col mt-4">
                    <input
                      id="lDocument_id"
                      type="Number"
                      className="flex-grow h-8 px-2 border text-black rounded border-grey-400"
                      name="lDocument_id"
                      placeholder="Cédula"
                      required
                      value={lDocument_id}
                      onChange={handleLoginInputChange}
                    />
                  </div>
                  <div className="flex flex-col mt-4">
                    <input
                      id="lPassword"
                      type="password"
                      className="flex-grow h-8 px-2 rounded border text-black border-grey-400 "
                      name="lPassword"
                      required
                      placeholder="******"
                      value={lPassword}
                      onChange={handleLoginInputChange}
                    />
                  </div>
                  <div className="flex flex-col mt-8">
                    <button
                      type="submit"
                      className="bg-green-900 hover:bg-green-600 text-white text-sm font-semibold py-2 px-4 rounded"
                    >
                     <i className="fas fa-sign-in-alt"></i> Ingresar
                    </button>
                  </div>
                </form>
                <div className="text-center mt-8">

                  <Link className="no-underline hover:underline text-blue-dark text-base" to="/recuperar-cuenta"> ¿Problemas para iniciar sesión? </Link>

                </div>
              </div>
            </div>
          </div>
          <div
            className="hidden md:block md:w-1/2 rounded-r-lg bg-cover bg-center"
            style={{ backgroundImage: `url(${bgLogin2})` }}
          ></div>
        </div>
      </div>
    </div>
  );
};
