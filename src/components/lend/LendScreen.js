import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import SearchResults from "react-filter-search";

import { lendsStartLoading, FeesStartLoading } from "../../actions/LendAction";

export const LendScreen = () => {
  const dispatch = useDispatch();

  const { lends, count } = useSelector((state) => state.lend);

  useEffect(
    (page) => {
      dispatch(lendsStartLoading(page));
    },
    [dispatch]
  );

  const [value, setValue] = useState("");
  const handleChange = (e) => {
    const { value } = e.target;
    setValue(value);
  };

  const getLendsCancel = () => {
    dispatch(lendsStartLoading("cancel"));
  };
  const getLendsActive = () => {
    dispatch(lendsStartLoading("active"));
  };

  const selectFeesByCollaborator = (id) => {
    dispatch(FeesStartLoading(id));
  };

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
          <button
            onClick={() => getLendsActive()}
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
          </button>
          <button
            onClick={() => getLendsCancel()}
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
          </button>
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

      <input
        type="text"
        className="bg-gray-600 rounded-lg w-2/4 h-10 p-6 mt-10 placeholder-blue-200 placeholder-opacity-70 text-blue-100 text-xl font-bold  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-60"
        placeholder="Buscar por ..."
        value={value}
        onChange={handleChange}
      />

      <div className="bg-gray-700 rounded-lg px-4 lg:px-8 py-4 lg:py-6 mt-8">
        <h3 className="text-xl text-blue-200 font-bold mb-4 lg:mb-6">
          Prestamos
        </h3>

        <div className="overflow-x-auto">
          <div className="align-middle inline-block min-w-full overflow-hidden">
            <SearchResults
              value={value}
              data={lends}
              renderResults={(results) => (
                <table className="min-w-full">
                  <thead className="bg-gray-600">
                    <tr className="bg-gray-600 text-gray-300">
                      <th className="py-2 px-3">Colaborador</th>
                      <th className="py-2 px-3">Cedula</th>
                      <th className="py-2 px-3">Monto</th>
                      <th className="py-2 px-3">Cuota semanal</th>
                      <th className="py-2 px-3">Fecha de registro</th>
                      <th className="py-2 px-3">Estado</th>
                      <th className="py-2 px-3">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-600 text-blue-100 text-opacity-80 whitespace-nowrap">
                    {results.map((lend) => (
                      <tr key={lend._id}>
                        <th className="py-3 px-3">
                          {lend.collaborator
                            ? `${lend.collaborator.name} ${lend.collaborator.surname}`
                            : "No existe colaborador"}
                        </th>
                        <th className="py-3 px-3">
                          {lend.collaborator
                            ? lend.collaborator.document_id
                            : "No existe colaborador"}
                        </th>
                        <th className="py-3 px-3">{lend.initial_amount}</th>
                        <th className="py-3 px-3">{lend.fee}</th>
                        <th className="py-3 px-3">{lend.date_issued}</th>
                        <th className="py-3 px-3">
                          <span
                            className={` ${
                              lend.status === "active"
                                ? "bg-green-200 text-green-600"
                                : "bg-red-200 text-red-600"
                            }  text-xs rounded-full px-3 py-1 w-26 inline-block text-center uppercase`}
                          >
                            {lend.status === "active" ? "Activo" : "Cancelado"}
                          </span>
                        </th>
                        <th className="py-3 px-3">
                          <button
                            className="bg-teal-500 text-white active:bg-teal-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:bg-yellow-700 shadow-md outline-none focus:outline-none mr-1 mb-1"
                            type="button"
                          >
                            Agregar Cuota
                          </button>
                           | 
                           <button
                           onClick={() => selectFeesByCollaborator(lend.collaborator.id)}
                            className="bg-teal-500 text-white active:bg-teal-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:bg-yellow-700 shadow-md outline-none focus:outline-none mr-1 mb-1"
                            type="button"
                          >
                            Ver Cuotas
                          </button>
                        </th>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            />
          </div>
        </div>
      </div>
    </>
  );
};
