import React from 'react';
import Swal from 'sweetalert2';
import bgLogin from '../../assets/bgLogin.jpg';

import { useDispatch, useSelector } from 'react-redux';
import { UseForm } from '../../hooks/UseForm';
import { setRecoveryKey } from '../../actions/AuthAction';
import { verifyRecoveryKey } from '../../actions/AuthAction';
import { changePass } from '../../actions/AuthAction';
import { Link } from 'react-router-dom';
import '../../assets/css/TopLoaderService.css';

export const RecoveryPass = () => {
  const dispatch = useDispatch();

  const { findMail, recoveryState } = useSelector((state) => state.auth);

  const administrator = localStorage.getItem('identity') || '';

  const [formRecoveryValues, handleRecoveryInputChange] = UseForm({
    email: '',
    code: '',
    password0: '',
    password1: ''
  });

  const { email, code, password0, password1 } = formRecoveryValues;

  const handleSetRecoveryKey = (e) => {
    e.preventDefault();
    dispatch(setRecoveryKey(email, 1));
  };

  const handleSetVerifyKey = (e) => {
    e.preventDefault();
    dispatch(verifyRecoveryKey(findMail, code, 2));
  };

  const handleChangePass = (e) => {
    e.preventDefault();

    if (password0 !== password1) {
      return Swal.fire('Error', 'Las contraseñas deben de ser iguales', 'error');
    }

    dispatch(changePass(findMail, password0, 3));
  };

  if (recoveryState !== 3) {
    return (
      <section
        className="m-0 p-0  box-border relative h-screen w-full text-white bg-cover bg-center"
        style={{ backgroundImage: `url(${!administrator && bgLogin})` }}
      >
        <div className="container mx-auto flex flex-col px-5 justify-center items-center">
          <div className="w-full md:w-2/3 mt-20 flex flex-col mb-16 items-center text-center bg-black bg-opacity-70 rounded-2xl md:p-4">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-200">
              {administrator ? 'Cambiar contraseña' : 'Sistema de recuperación'}
            </h1>
            <form
              onSubmit={(() => {
                if (recoveryState === 0) {
                  return handleSetRecoveryKey;
                } else if (recoveryState === 1) {
                  return handleSetVerifyKey;
                } else {
                  return handleChangePass;
                }
              })()}
              className="flex w-full justify-center items-end"
            >
              {recoveryState === 0 && (
                <div className="relative mr-4 lg:w-full xl:w-1/2 w-2/4 md:w-full text-left">
                  <label className="leading-7 text-sm text-white">Correo electrónico</label>
                  <input
                    required
                    type="email"
                    name="email"
                    className="w-full bg-gray-100 bg-opacity-50 rounded focus:ring-2 focus:ring-green-200 focus:bg-white border border-gray-300 focus:border-green-500 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    value={email}
                    onChange={handleRecoveryInputChange}
                  />
                </div>
              )}

              {recoveryState === 1 && (
                <div className="relative mr-4 lg:w-full xl:w-1/2 w-2/4 md:w-full text-left">
                  <label htmlFor="code" className="leading-7 text-sm text-white">
                    Código recibido por correo
                  </label>
                  <input
                    required
                    type="number"
                    id="code"
                    name="code"
                    className="w-full bg-gray-100 bg-opacity-50 rounded focus:ring-2 focus:ring-green-200 focus:bg-white border border-gray-300 focus:border-green-500 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    value={code}
                    onChange={handleRecoveryInputChange}
                  />
                </div>
              )}

              {recoveryState === 2 && (
                <div className="relative mr-4 lg:w-full xl:w-1/2 w-2/4 md:w-full text-left">
                  <label htmlFor="code" className="leading-7 text-sm text-white">
                    Nueva contraseña
                  </label>
                  <input
                    required
                    type="password"
                    id="password0"
                    name="password0"
                    className="w-full bg-gray-100 bg-opacity-50 rounded focus:ring-2 focus:ring-green-200 focus:bg-white border border-gray-300 focus:border-green-500 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    value={password0}
                    onChange={handleRecoveryInputChange}
                  />
                  <label htmlFor="code" className="leading-7 text-sm text-white">
                    Repetir contraseña
                  </label>

                  <input
                    required
                    type="password"
                    id="password1"
                    name="password1"
                    className="w-full bg-gray-100 bg-opacity-50 rounded focus:ring-2 focus:ring-green-200 focus:bg-white border border-gray-300 focus:border-green-500 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    value={password1}
                    onChange={handleRecoveryInputChange}
                  />
                </div>
              )}

              <button
                type="submit"
                className="inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg"
              >
                Enviar
              </button>
            </form>

            {recoveryState === 0 && (
              <p className="text-sm mt-2 text-gray-300 mb-8 w-full">
                *Se enviara un mensaje al correo proporcionado, por favor seguir instruciones.
              </p>
            )}

            <Link
              className="text-white border-0 text-4xl m-8 focus:outline-none hover:text-gray-400 rounded text-lg"
              to={administrator ? '/administradores' : '/ingresar'}
            >
              <i className="fas fa-arrow-circle-left"></i>
            </Link>
          </div>
        </div>
      </section>
    );
  }
};
