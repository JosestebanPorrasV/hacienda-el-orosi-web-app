import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import SearchResults from "react-filter-search";

import {
  toolsLoading, //BYSTATUS
  deleteBulk,
} from "../../actions/ToolAction";
import { uiOpenModalAddTool } from "../../actions/UIAction";
import { UseForm } from "../../hooks/UseForm";
import Swal from "sweetalert2";
import { ModalTool } from "./ModalTool";

export const ToolScreen = () => {
  const dispatch = useDispatch();
  const { tools, actives, count, toolsState } = useSelector((state) => state.tool);
  const { currentCollaborator } = useSelector((state) => state.collaborator);

  useEffect(() => {
    dispatch(toolsLoading());
  }, [dispatch]);

  const [formValues, handleInputChange] = UseForm({
    filter: "",
    document_id: "",
  });

  const { filter, document_id } = formValues;

  const getActivesTools = () => {
    dispatch(toolsLoading("active"));
  };

  const getToolsInStock = () => {
    dispatch(toolsLoading("stock"));
  };

  const OpenModalAddTool = () => {
    dispatch(uiOpenModalAddTool());
  };

  
  const deleteInBulk = () => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "La herramienta se regresara a Bodega",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar de activos",
      cancelButtonText: "Cancelar",
    })
    .then((result) => {
      if (result.value) {
        if (actives.length > 0) {
          dispatch(deleteBulk(currentCollaborator._id, actives));
        } else {
          console.log("primero dale check a algun registro");
        }
      } 
    });
  };

  return (
    <>
      <div className="bg-indigo-700 rounded-lg px-4 lg:px-8 py-4 lg:py-6 mt-8 flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-12">
        <div>
          <button
            className="bg-indigo-900 hover:bg-gray-800 text-white font-bold py-2 px-4 border-b-4 border-gray-900 hover:border-indigo-200 rounded"
          >
            HERRAMIENTAS
          </button>
          <p className="text-blue-100 opacity-70">
            Funcionalidades principales
          </p>
        </div>
        <nav className="md:flex md:space-x-4 space-y-2 md:space-y-0">
          <button
            onClick={() => OpenModalAddTool()}
            className="inline-flex flex-col justify-center items-center m-1 px-3 py-3 bg-indigo-900 rounded-lg hover:bg-gray-800 w-35"
          >
            <i className="fas fa-plus-circle"></i>
            <span className="text-white font-bold">Agregar Herramienta</span>
          </button>
          <button
            onClick={() => getActivesTools()}
            className="inline-flex flex-col justify-center items-center m-1 px-3 py-3 bg-indigo-900 rounded-lg hover:bg-gray-800 w-35"
          >
            <i className="fas fa-chart-line"></i>
            <span className="text-white font-bold">Listar activas</span>
          </button>
          <button
            onClick={() => getToolsInStock()}
            className="inline-flex flex-col justify-center items-center m-1 px-3 py-3 bg-indigo-900 rounded-lg hover:bg-gray-800 w-35"
          >
            <i className="fas fa-toolbox"></i>
            <span className="text-white font-bold">Listar En Bodega</span>
          </button>
        </nav>
      </div>

      <div className="bg-gray-700 rounded-lg px-4 lg:px-8 py-4 lg:py-6 mt-8 ">
        <h2
          className={`${
            toolsState === "active"
              ? "text-green-400"
              : toolsState === "stock"
              ? "text-red-200"
              : "text-yellow-400"
          } text-xl font-bold mb-2`}
        >{`HERRAMIENTAS ${
          toolsState === "active"
            ? "ACTIVAS"
            : toolsState === "stock"
            ? "EN BODEGA"
            : "REGISTRADAS"
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
            toolsState === "active"
              ? "bg-green-200 text-green-600"
              : toolsState === "stock"
              ? "bg-red-200 text-gray-600"
              : "bg-yellow-200 text-yellow-600"
          } md:ml-2 py-1 px-1 rounded-t-lg  inline-block text-center uppercase`}
        >
          <i className="fas fa-tools"></i> {`total: ${count}`}
        </span>

        <div className="overflow-x-auto py-4">
          <div className="align-middle inline-block min-w-full overflow-hidden">
            <SearchResults
              value={filter}
              data={tools}
              renderResults={(results) => (
                <table id="table-tools" className="min-w-full">
                  <thead className="bg-gray-600">
                    <tr className="bg-gray-600 text-white text-lg">
                      <th className="py-2 px-3">
                        <i className="fas fa-signal"></i> Estado
                      </th>
                      <th className="py-2 px-3">
                        <i className="fas fa-wrench"></i> Herramienta
                      </th>
                      <th className="py-2 px-3"># Codigo</th>
                      <th className="py-2 px-3">
                        <i className="far fa-calendar-alt"></i> Registrada
                      </th>
                      <th
                        hidden={toolsState === "active"}
                        className="py-2 px-3"
                      >
                        <i className="fas fa-prescription-bottle"></i> Litros
                      </th>

                      <th className="py-2 px-3">
                        <i className="fas fa-cash-register"></i> Activos
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-grey-600 divide-solid text-blue-100 text-opacity-80 whitespace-nowrap">
                    {results.map((tool) => (
                      <tr key={tool._id}>
                        <th className="py-3 px-3">
                          <span
                            className={` ${
                              tool.status === "active"
                                ? "bg-green-200 text-green-600"
                                : "bg-red-200 text-gray-600"
                            }  text-xs rounded-full px-3 py-1 w-26 inline-block text-center uppercase`}
                          >
                            {tool.status === "active" ? "Activo" : "Bodega"}
                          </span>
                        </th>
                        <th className="py-3 px-3">{tool.name}</th>
                        <th className="py-3 px-3">{tool.active_num}</th>
                        <th className="py-3 px-3">{tool.date}</th>
                        <th
                          hidden={tool.status === "active"}
                          className="py-3 px-3"
                        >
                          {tool.liters}
                        </th>
                        <th className="py-3 px-3">
                          <button
                            className={`${
                              tool.status === "stock"
                                ? "bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:bg-blue-600 outline-none focus:outline-none mr-1 mb-1"
                                : "hidden"
                            }`}
                            type="button"
                            style={{ transition: "all .15s ease" }}
                          >
                            <i className="fas fa-plus"></i>
                          </button>
                          <button
                            hidden={tool.status === "stock"}
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
      </div>

      <ModalTool />
    </>
  );
};
