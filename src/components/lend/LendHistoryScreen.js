import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { lendCancelLoading } from "../../actions/LendAction";

export const LendHistoryScreen = () => {
  const dispatch = useDispatch();

  const { lends } = useSelector((state) => state.lend);

  useEffect(() => {
    dispatch(lendCancelLoading(1));
  }, [dispatch]);

  return (
    <>
    <div className="bg-gray-700 rounded-lg px-4 lg:px-8 py-4 lg:py-6 mt-8 flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-12">
      <div>
        <h2 className="text-xl text-blue-200 font-bold mb-2">
          Acciones rapidas
        </h2>
        <p className="text-blue-100 opacity-70">
          Funcionalidades principales del modulo prestamos
        </p>
      </div>
      <nav className="md:flex md:space-x-4 space-y-2 md:space-y-0">
        <Link
          to="/"
          className="inline-flex flex-col justify-center items-center px-3 py-3 border border-gray-600 rounded-lg hover:bg-gray-800 w-35"
        >
           
          <span className="text-blue-100 opacity-70">Realizar prestamo</span>
        </Link>
        <Link
          to="/listar-prestamos"
          className="inline-flex flex-col justify-center items-center px-3 py-3 border border-gray-600 rounded-lg hover:bg-gray-800 w-32"
        >
          <svg
            className="w-8 h-8 text-blue-100"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="text-blue-100 opacity-70">Listar activos</span>
        </Link>
        <Link
          to="/prestamo-historial"
          className="inline-flex flex-col justify-center items-center px-3 py-3 border border-gray-600 rounded-lg hover:bg-gray-800 w-35"
        >
          <svg
            className="w-8 h-8 text-blue-100"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
          </svg>
          <span className="text-blue-100 opacity-70">Listar cancelados</span>
        </Link>
        <Link
          to="/listar-cuotas"
          className="inline-flex flex-col justify-center items-center px-3 py-3 border border-gray-600 rounded-lg hover:bg-gray-800 w-32"
        >
          <svg
            className="w-8 h-8 text-blue-100"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm9 4a1 1 0 10-2 0v6a1 1 0 102 0V7zm-3 2a1 1 0 10-2 0v4a1 1 0 102 0V9zm-3 3a1 1 0 10-2 0v1a1 1 0 102 0v-1z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="text-blue-100 opacity-70">Listar Cuotas</span>
        </Link>
      </nav>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 2xl:gap-8 pt-10">
      <div className="col-span-1 bg-gray-700 rounded-lg px-4 lg:px-8 py-4 lg:py-6">
        <h2 className="text-xl text-blue-200 font-bold mb-4 lg:mb-6">
          Total de monto prestado
        </h2>
        <div className="flex space-x-4 items-end mb-4 lg:mb-6">
          <div className="w-12 h-12 rounded-lg bg-blue-900 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-blue-100"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.736 6.979C9.208 6.193 9.696 6 10 6c.304 0 .792.193 1.264.979a1 1 0 001.715-1.029C12.279 4.784 11.232 4 10 4s-2.279.784-2.979 1.95c-.285.475-.507 1-.67 1.55H6a1 1 0 000 2h.013a9.358 9.358 0 000 1H6a1 1 0 100 2h.351c.163.55.385 1.075.67 1.55C7.721 15.216 8.768 16 10 16s2.279-.784 2.979-1.95a1 1 0 10-1.715-1.029c-.472.786-.96.979-1.264.979-.304 0-.792-.193-1.264-.979a4.265 4.265 0 01-.264-.521H10a1 1 0 100-2H8.017a7.36 7.36 0 010-1H10a1 1 0 100-2H8.472c.08-.185.167-.36.264-.521z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <span className="text-2xl mb-2 text-blue-100">&euro;21.291,09</span>
          <span className="text-blue-100 opacity-70 mb-2 whitespace-pre hidden xl:inline-block">
            / &euro;40.000
          </span>
        </div>
        <div className="rounded-full bg-gray-600 h-7 overflow-hidden">
          <div
            style={{ width: "65%" }}
            className="bg-green-400 h-7 rounded-full text-center text-green-50 flex items-center justify-center"
          >
            65%
          </div>
        </div>
      </div>

      <div className="col-span-1 bg-gray-700 rounded-lg px-4 lg:px-8 py-4 lg:py-6">
        <h2 className="text-xl text-blue-200 font-bold mb-4 lg:mb-6">
          Total de prestamos
        </h2>
        <div className="flex space-x-4 items-end mb-4 lg:mb-6">
          <div className="w-12 h-12 rounded-lg bg-blue-900 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-blue-100"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
            </svg>
          </div>
          <span className="text-2xl mb-2">491</span>
          <span className="text-green-600 text-base mb-2 bg-green-200 border-full  px-3 rounded-full">
            &#8605; 32
          </span>
        </div>
        <p>Ultimo mes</p>
      </div>

      <div className="col-span-1 bg-gray-700 rounded-lg px-4 lg:px-8 py-4 lg:py-6">
        <h2 className="text-xl text-blue-200 font-bold mb-4 lg:mb-6">
         Cuotas realizadas
        </h2>
        <div className="flex space-x-4 items-end mb-4 lg:mb-6">
          <div className="w-12 h-12 rounded-lg bg-blue-900 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-blue-100"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"></path>
            </svg>
          </div>
          <span className="text-2xl mb-2">230</span>
          <span className="text-red-600 text-base mb-2 bg-red-200 border-full  px-3 rounded-full">
            <span className="transform rotate-180 inline-block">&#8604;</span>
            12
          </span>
        </div>
        <p>Ultimo mes</p>
      </div>
    </div>

        <div className="col-span-1 bg-gray-700 rounded-lg px-4 lg:px-8 py-4 lg:py-6">
          <h2 className="text-xl text-blue-200 font-bold mb-4 lg:mb-6">
            Cuotas realizadas
          </h2>
          <div className="flex space-x-4 items-end mb-4 lg:mb-6">
            <div className="w-12 h-12 rounded-lg bg-blue-900 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-blue-100"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"></path>
              </svg>
            </div>
            <span className="text-2xl mb-2">230</span>
            <span className="text-red-600 text-base mb-2 bg-red-200 border-full  px-3 rounded-full">
              <span className="transform rotate-180 inline-block">&#8604;</span>
              12
            </span>
          </div>
          <p>Ultimo mes</p>
        </div>

      <div className="bg-gray-700 rounded-lg px-4 lg:px-8 py-4 lg:py-6 mt-8">
        <h3 className="text-xl text-blue-200 font-bold mb-4 lg:mb-6">
          Historial de Prestamos Cancelados
        </h3>

        <div className="overflow-x-auto">
          <div className="align-middle inline-block min-w-full overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-gray-600">
                <tr className="bg-gray-600 text-gray-300">
                  <th className="py-2 px-3">Colaborador</th>
                  <th className="py-2 px-3">Monto prestado</th>
                  <th className="py-2 px-3">Fecha de registro</th>
                  <th className="py-2 px-3">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-600 text-blue-100 text-opacity-80 whitespace-nowrap">
                {lends.map((item, index) => (
                  <tr key={index}>
                    <th className="py-3 px-3">{item.collaborator}</th>
                    <th className="py-3 px-3">{item.amount}</th>
                    <th className="py-3 px-3">{item.date_issued}</th>
                    <th className="py-3 px-3">{item.status}</th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
