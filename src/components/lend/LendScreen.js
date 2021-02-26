import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SearchResults from "react-filter-search";

import { lendsStartLoading } from "../../actions/LendAction";

export const LendScreen = () => {
  const dispatch = useDispatch();

  const { lends } = useSelector((state) => state.lend);

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

  return (
    <>
      <div className="bg-green-700 rounded-lg px-4 lg:px-8 py-4 lg:py-6 mt-8 flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-12">
        <div>
          <h2 className="text-xl text-white font-bold mb-2">PRESTAMOS</h2>
          <p className="text-blue-100 opacity-70">
            Funcionalidades principales
          </p>
        </div>
        <nav className="md:flex md:space-x-4 space-y-2 md:space-y-0">
          <button className="inline-flex flex-col justify-center items-center m-1 px-3 py-3 bg-green-800 rounded-lg hover:bg-gray-800 w-35">
            <i class="fas fa-hand-holding-usd"></i>
            <span className="text-white font-bold">Realizar prestamo</span>
          </button>
          <button
            onClick={() => getLendsActive()}
            className="inline-flex flex-col justify-center items-center m-1 px-3 py-3 bg-green-800 rounded-lg hover:bg-gray-800 w-35"
          >
            <i class="fas fa-chart-line"></i>
            <span className="text-white font-bold">Listar activos</span>
          </button>
          <button
            onClick={() => getLendsCancel()}
            className="inline-flex flex-col justify-center items-center m-1 px-3 py-3 bg-green-800 rounded-lg hover:bg-gray-800 w-35"
          >
            <i class="fas fa-strikethrough"></i>
            <span className="text-white font-bold">Listar cancelados</span>
          </button>
        </nav>
      </div>

      <input
        type="text"
        className="bg-gray-600 rounded-lg w-full h-10 p-6 mt-10 placeholder-white text-blue-100 text-xl  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-60"
        placeholder="Filtrar por ..."
        value={value}
        onChange={handleChange}
      />

      <div className="bg-gray-700 rounded-lg px-4 lg:px-8 py-4 lg:py-6 mt-8">
        <div className="overflow-x-auto">
          <div className="align-middle inline-block min-w-full overflow-hidden">
            <SearchResults
              value={value}
              data={lends}
              renderResults={(results) => (
                <table className="min-w-full">
                  <thead className="bg-gray-600">
                    <tr className="bg-gray-600 text-white text-lg">
                      <th className="py-2 px-3">
                        <i class="fas fa-signal"></i> Estado
                      </th>
                      <th className="py-2 px-3">
                        <i class="fas fa-user"></i> Colaborador
                      </th>
                      <th className="py-2 px-3">
                        <i class="fas fa-id-card"></i> Cedula
                      </th>
                      <th className="py-2 px-3">
                        <i class="fas fa-funnel-dollar"></i> Monto
                      </th>
                      <th className="py-2 px-3">
                        <i class="fas fa-comments-dollar"></i> Cuota semanal
                      </th>
                      <th className="py-2 px-3">
                        <i class="fas fa-calendar-day"></i> Registrado
                      </th>
                      <th className="py-2 px-3">
                        <i class="fas fa-cash-register"></i> Cuotas
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-600 text-blue-100 text-opacity-80 whitespace-nowrap">
                    {results.map((lend) => (
                      <tr key={lend._id}>
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
                        <th
                          className="py-3 px-3"
                          hidden={lend.status === "cancel"}
                        >
                          <button
                            class="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:bg-blue-600 outline-none focus:outline-none mr-1 mb-1"
                            type="button"
                            style={{ transition: "all .15s ease" }}
                          >
                            <i class="fas fa-calculator"></i> Agregar
                          </button>
                          <button
                            class="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:bg-red-600 outline-none focus:outline-none mr-1 mb-1"
                            type="button"
                            style={{ transition: "all .15s ease" }}
                          >
                            <i class="far fa-eye"></i> Ver
                          </button>
                        </th>
                        <th
                          className="py-3 px-3"
                          hidden={lend.status === "active"}
                        >
                          <i class="fas fa-exclamation-triangle"></i>
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
