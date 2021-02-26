import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchResults from "react-filter-search";

import { lendsStartLoading } from "../../actions/LendAction";
import ReactPaginate from "react-paginate";

export const LendScreen = () => {
  const dispatch = useDispatch();

  const { lends, count, lendsState } = useSelector((state) => state.lend);

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
          <h2>PRESTAMOS</h2>
          <p className="text-blue-100 opacity-70">
            Funcionalidades principales
          </p>
        </div>
        <nav className="md:flex md:space-x-4 space-y-2 md:space-y-0">
          <button className="inline-flex flex-col justify-center items-center m-1 px-3 py-3 bg-green-800 rounded-lg hover:bg-gray-800 w-35">
            <i className="fas fa-hand-holding-usd"></i>
            <span className="text-white font-bold">Realizar prestamo</span>
          </button>
          <button
            onClick={() => getLendsActive()}
            className="inline-flex flex-col justify-center items-center m-1 px-3 py-3 bg-green-800 rounded-lg hover:bg-gray-800 w-35"
          >
            <i className="fas fa-chart-line"></i>
            <span className="text-white font-bold">Listar activos</span>
          </button>
          <button
            onClick={() => getLendsCancel()}
            className="inline-flex flex-col justify-center items-center m-1 px-3 py-3 bg-green-800 rounded-lg hover:bg-gray-800 w-35"
          >
            <i className="fas fa-strikethrough"></i>
            <span className="text-white font-bold">Listar cancelados</span>
          </button>
        </nav>
      </div>

      <div className="flex flex-col mt-8 space-y-3 sm:space-y-0 sm:flex-row sm:justify-center sm:space-x-4">
        <input
          id="email"
          type="text"
          className="px-4 py-2 text-blue-900 border-4 border-blue-900  placeholder-blue-800  rounded-md focus:border-blue-500 focus:outline-none focus:ring"
          placeholder="Buscar por cedula"
        />

        <button className="px-4 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
          <i className="fas fa-search-dollar"></i> Buscar
        </button>
      </div>

      <div className="bg-gray-700 rounded-lg px-4 lg:px-8 py-4 lg:py-6 mt-8 ">
        <h2
          className={`${
            lendsState === "active" ? "text-green-400" : "text-red-400"
          } text-xl font-bold mb-2`}
        >{`PRESTAMOS ${
          lendsState === "active" ? "ACTIVOS" : "CANCELADOS"
        }`}</h2>
        <input
          type="text"
          className="rounded-t-lg w-2/4 h-4 p-4 placeholder-blue-800 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-60"
          placeholder="Filtrar por ..."
          value={value}
          onChange={handleChange}
        />
        <span
          className={`${
            lendsState === "active"
              ? "bg-green-200 text-green-600"
              : "bg-red-200 text-red-600"
          } md:ml-2 py-1 px-1 rounded-t-lg  inline-block text-center uppercase`}
        >
          <i className="fas fa-box-open"></i> {`total: ${count}`}
        </span>
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
                        <i className="fas fa-signal"></i> Estado
                      </th>
                      <th className="py-2 px-3">
                        <i className="fas fa-user"></i> Colaborador
                      </th>
                      <th className="py-2 px-3">
                        <i className="fas fa-id-card"></i> Cedula
                      </th>
                      <th className="py-2 px-3">
                        <i className="fas fa-funnel-dollar"></i> Monto
                      </th>
                      <th className="py-2 px-3">
                        <i className="fas fa-comments-dollar"></i> Cuota semanal
                      </th>
                      <th className="py-2 px-3">
                        <i className="fas fa-calendar-day"></i> Registrado
                      </th>
                      <th className="py-2 px-3">
                        <i className="fas fa-cash-register"></i> Cuotas
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-grey-600 divide-solid text-blue-100 text-opacity-80 whitespace-nowrap">
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
                        <th className="py-3 px-3">
                          {new Intl.NumberFormat("en-EN").format(
                            lend.initial_amount
                          )}
                        </th>
                        <th className="py-3 px-3">
                          <button hidden={lend.status === "cancel"}>
                            <i className="fas fa-edit text-xl text-white" />
                          </button>
                          {new Intl.NumberFormat("en-EN").format(lend.fee)}
                        </th>
                        <th className="py-3 px-3">{lend.date_issued}</th>
                        <th
                          className="py-3 px-3"
                          hidden={lend.status === "cancel"}
                        >
                          <button
                            className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:bg-blue-600 outline-none focus:outline-none mr-1 mb-1"
                            type="button"
                            style={{ transition: "all .15s ease" }}
                          >
                            <i className="fas fa-calculator"></i> Agregar
                          </button>
                          <button
                            className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:bg-red-600 outline-none focus:outline-none mr-1 mb-1"
                            type="button"
                            style={{ transition: "all .15s ease" }}
                          >
                            <i className="far fa-eye"></i> Ver
                          </button>
                        </th>
                        <th
                          className="py-3 px-3"
                          hidden={lend.status === "active"}
                        >
                          <i className="fas fa-exclamation-triangle"></i>
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
      <ReactPaginate
        pageCount={Math.ceil(count / 5)}
        marginPagesDisplayed={1}
        pageRangeDisplayed={2}
        previousLabel={"Atras"}
        breakClassName={"text-2xl text-grey-900 pl-4"}
        nextLabel={"Adelante"}
        breakLabel={". . ."}
        pageLinkClassName={
          "flex items-center px-4 py-2 mx-1 text-white text-bold transition-colors duration-200 transform bg-gray-900 rounded-full my-1"
        }
        previousClassName={
          "flex items-center px-4 py-2 mx-1 text-white text-bold transition-colors duration-200 transform bg-green-700 rounded-full hover:bg-green-900"
        }
        nextClassName={
          "flex items-center px-4 py-2 mx-1 text-white text-bold transition-colors duration-200 transform bg-green-700 rounded-full hover:bg-green-900"
        }
        onPageChange={(data) =>
          dispatch(lendsStartLoading(lendsState, data.selected + 1))
        }
        containerClassName={"sm:flex m-4 p-3"}
      />
    </>
  );
};
