import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import SearchResults from "react-filter-search";

import {
  removeTools,
  toolsLoading,
  changeStatus,
  toolSetActive,
} from "../../actions/ToolAction";
import {
  uiOpenModalAddTool,
  uiOpenModalAddActive,
} from "../../actions/UIAction";
import { UseForm } from "../../hooks/UseForm";
import Swal from "sweetalert2";
import { ModalTool } from "./ModalTool";
import { ModalAddActive } from "./ModalAddActive";

export const ToolScreen = () => {
  const dispatch = useDispatch();
  const { tools, actives, count, toolsState, currentTool } = useSelector(
    (state) => state.tool
  );
  const { currentCollaborator } = useSelector((state) => state.collaborator);

  useEffect(() => {
    dispatch(toolsLoading());
  }, [dispatch]);

  const [formValues, handleInputChange] = UseForm({
    filter: "",
  });

  const { filter } = formValues;

  const addOneToolActive = (tool) => {
    dispatch(uiOpenModalAddActive());
    dispatch(toolSetActive(tool));
  };

  const deleteInBulk = () => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "La herramienta se regresara a Bodega",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#A0A0A0",
      confirmButtonText: "Si, eliminar de activos",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        if (actives.length > 0) {
          dispatch(removeTools(currentCollaborator._id, actives));
        } else {
          Swal.fire("Cuidado", "Primero dale check a algun registro", "error");
        }
      }
    });
  };

  return (
    <>
      <div className="bg-gradient-to-r from-blue-300 rounded-lg px-4 lg:px-8 py-4 lg:py-6 mt-8 flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-12">
        <div>
          <h2 className="text-2xl text-blue-900">HERRAMIENTAS</h2>
          <p className="text-blue-900 opacity-90">
            Funcionalidades principales
          </p>
        </div>
        <nav className="md:flex md:space-x-4 space-y-2 md:space-y-0">
          <button
            onClick={() => dispatch(uiOpenModalAddTool())}
            className="inline-flex flex-col justify-center items-center m-1 px-3 py-3 bg-black rounded-lg hover:bg-blue-800 w-35"
          >
            <i className="fas fa-plus-circle"></i>
            <span className="text-white font-bold">Agregar Herramienta</span>
          </button>
          <button
            onClick={() => dispatch(toolsLoading("Activo"))}
            className="inline-flex flex-col justify-center items-center m-1 px-3 py-3 bg-black  rounded-lg hover:bg-blue-800 w-35"
          >
            <i className="fas fa-chart-line"></i>
            <span className="text-white font-bold">Listar activas</span>
          </button>
          <button
            onClick={() => dispatch(toolsLoading("En bodega"))}
            className="inline-flex flex-col justify-center items-center m-1 px-3 py-3 bg-black rounded-lg hover:bg-blue-800 w-35"
          >
            <i className="fas fa-toolbox"></i>
            <span className="text-white font-bold">Listar En Bodega</span>
          </button>
          <button
            onClick={() => dispatch(toolsLoading("En reparacion"))}
            className="inline-flex flex-col justify-center items-center m-1 px-3 py-3 bg-black  rounded-lg hover:bg-blue-800 w-35"
          >
            <i className="fas fa-toolbox"></i>
            <span className="text-white font-bold">Listar En reparacion</span>
          </button>
          <button
            onClick={() => dispatch(toolsLoading("De baja"))}
            className="inline-flex flex-col justify-center items-center m-1 px-3 py-3 bg-black  rounded-lg hover:bg-blue-800 w-35"
          >
            <i className="fas fa-toolbox"></i>
            <span className="text-white font-bold">De baja</span>
          </button>
        </nav>
      </div>
      {tools.length !== 0 ? (
        <div className="bg-gray-700 rounded-lg px-4 lg:px-8 py-4 lg:py-6 mt-8 ">
          <h2
            className={`${
              toolsState === "Activo"
                ? "text-green-400"
                : toolsState === "En bodega"
                ? "text-gray-200"
                : "text-yellow-400"
            } text-xl font-bold mb-2`}
          >{`Herramientas ${
            toolsState === "Activo" ? "Activas" : toolsState
          }`}</h2>
          <input
            type="text"
            name="filter"
            className="rounded-t-lg w-1/4 h-4 p-4 placeholder-blue-800 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-60"
            placeholder="Filtrar por ..."
            value={filter}
            onChange={handleInputChange}
          />
          <span
            className={`${
              toolsState === "Activo"
                ? "bg-green-200 text-green-600"
                : toolsState === "En bodega"
                ? "bg-gray-200 text-gray-600"
                : "bg-yellow-200 text-yellow-600"
            } md:ml-2 py-1 px-1 rounded-t-lg  inline-block text-center uppercase`}
          >
            <i className="fas fa-tools"></i> {`total: ${count}`}
          </span>

          <div className="overflow-x-auto">
            <SearchResults
              value={filter}
              data={tools}
              renderResults={(results) => (
                <table className="text-center items-center w-full ">
                  <thead className="bg-gray-600 flex text-white w-full">
                    <tr className="flex w-full text-lg">
                      <th className="py-2 px-12">
                        <i className="fas fa-signal"></i> Estado
                      </th>
                      <th className="py-2 px-12">
                        <i className="fas fa-wrench"></i> Herramienta
                      </th>
                      <th className="py-2 px-12"># Codigo</th>
                      <th className="py-2 px-12">
                        <i className="far fa-calendar-alt"></i> Registrada
                      </th>
                      <th className="py-2 px-12">
                        <i className="fas fa-cash-register"></i> Activos
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    className="text-blue-100 flex flex-col justify-between overflow-y-scroll w-full"
                    style={{ height: "50vh" }}
                  >
                    {results.map((tool) => (
                      <tr className="flex w-full" key={tool._id}>
                        <th
                          className="py-2 px-16"
                          hidden={
                            toolsState === "De baja" || toolsState === "Activo"
                          }
                        >
                          <div className="flex flex-col text-center w-full mt-6 mb-6">
                            <div>
                              <select
                                onChange={(e) =>
                                  dispatch(
                                    changeStatus(tool._id, e.target.value)
                                  )
                                }
                                className="bg-blue-500 text-gray-100 font-bold text-xs py-2 px-2 rounded-lg inline-flex  group-hover:bg-blue-600 group-hover:text-white uppercase"
                              >
                                <option
                                  value="En bodega"
                                  className="pt-6 bg-gray-300 text-base text-gray-700 font-semibold"
                                >
                                  En bodega
                                </option>
                                <option
                                  value="En reparacion"
                                  className="bg-gray-300 text-base text-gray-700 font-semibold"
                                >
                                  En reparacion
                                </option>
                                <option
                                  value="De baja"
                                  className="bg-gray-300 text-base text-gray-700 font-semibold"
                                >
                                  De baja
                                </option>
                              </select>
                            </div>
                          </div>
                        </th>

                        <th className="py-2 px-12">{tool.name}</th>
                        <th className="py-2 px-20">#{tool.active_num}</th>
                        <th className="py-2 px-12">{tool.date}</th>
                        <th className="py-2 px-20">
                          <button
                            className={`${
                              tool.status === "En bodega"
                                ? "bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:bg-blue-600 outline-none focus:outline-none mr-1 mb-1"
                                : "hidden"
                            }`}
                            onClick={() => addOneToolActive(tool)}
                            type="button"
                            style={{ transition: "all .15s ease" }}
                          >
                            <i className="fas fa-plus"></i>
                          </button>
                          <button
                            hidden={tool.status === "En bodega"}
                            onClick={() => deleteInBulk()}
                            className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:bg-red-600 outline-none focus:outline-none mr-1 mb-1"
                            type="button"
                            style={{ transition: "all .15s ease" }}
                          >
                            <i className="fas fa-trash-alt"></i>
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
      ) : (
        <span className="ml-2 text-gray-400 whitespace-nowrap italic">
          - ( No se encontraron herramientas ) -
        </span>
      )}
      <ModalTool />
      {currentTool && <ModalAddActive />}
    </>
  );
};
