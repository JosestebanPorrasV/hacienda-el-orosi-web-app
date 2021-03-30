import React, { useEffect, Component } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import SearchResults from "react-filter-search";
import { createPopper } from "@popperjs/core";

import {
  removeTools,
  toolsLoading,
  changeStatus,
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

  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  const ToolChangeStatus = async (tool_id, status) => {
    const { value: currentTool } = await Swal.fire({
      title: "Cambiar estado",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, cambiar",
      cancelButtonText: "Cancelar",
    });

    if (currentTool) {
      dispatch(changeStatus(tool_id, status));
    } else {
    }
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
      <div className="bg-indigo-700 rounded-lg px-4 lg:px-8 py-4 lg:py-6 mt-8 flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-12">
        <div>
          <h2 className="text-2xl">HERRAMIENTAS</h2>
          <p className="text-blue-100 opacity-70">
            Funcionalidades principales
          </p>
        </div>
        <nav className="md:flex md:space-x-4 space-y-2 md:space-y-0">
          <button
            onClick={() => dispatch(uiOpenModalAddTool())}
            className="inline-flex flex-col justify-center items-center m-1 px-3 py-3 bg-indigo-900 rounded-lg hover:bg-gray-800 w-35"
          >
            <i className="fas fa-plus-circle"></i>
            <span className="text-white font-bold">Agregar Herramienta</span>
          </button>
          <button
            onClick={() => dispatch(toolsLoading("Activo"))}
            className="inline-flex flex-col justify-center items-center m-1 px-3 py-3 bg-indigo-900 rounded-lg hover:bg-gray-800 w-35"
          >
            <i className="fas fa-chart-line"></i>
            <span className="text-white font-bold">Listar activas</span>
          </button>
          <button
            onClick={() => dispatch(toolsLoading("En bodega"))}
            className="inline-flex flex-col justify-center items-center m-1 px-3 py-3 bg-indigo-900 rounded-lg hover:bg-gray-800 w-35"
          >
            <i className="fas fa-toolbox"></i>
            <span className="text-white font-bold">Listar En Bodega</span>
          </button>
          <button
            onClick={() => dispatch(toolsLoading("En reparacion"))}
            className="inline-flex flex-col justify-center items-center m-1 px-3 py-3 bg-indigo-900 rounded-lg hover:bg-gray-800 w-35"
          >
            <i className="fas fa-toolbox"></i>
            <span className="text-white font-bold">Listar En reparacion</span>
          </button>
          <button
            onClick={() => dispatch(toolsLoading("De baja"))}
            className="inline-flex flex-col justify-center items-center m-1 px-3 py-3 bg-indigo-900 rounded-lg hover:bg-gray-800 w-35"
          >
            <i className="fas fa-toolbox"></i>
            <span className="text-white font-bold">De baja</span>
          </button>
        </nav>
      </div>

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

                      <th className="py-2 px-3">
                        <i className="fas fa-cash-register"></i> Activos
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-blue-100 text-opacity-80 whitespace-nowrap">
                    {results.map((tool) => (
                      <tr key={tool._id}>
                        <th className="py-3 px-3" hidden={toolsState === "De baja" || toolsState === "Activo"}>
                          <button
                            className={
                              "text-white font-bold bg-blue-600 uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 "
                            }
                            type="button"
                            ref={btnDropdownRef}
                            onClick={() => {
                              dropdownPopoverShow
                                ? closeDropdownPopover()
                                : openDropdownPopover();
                            }}
                          >
                            {tool.status}
                          </button>
                          <div
                            ref={popoverDropdownRef}
                            className={
                              (dropdownPopoverShow ? "block " : "hidden ") +
                              "text-base bg-gray-900 z-50 py-2 list-none text-left rounded shadow-lg mt-1"
                            }
                            style={{ minWidth: "12rem" }}
                          >
                            <a
                              className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent " 
                              
                              onClick={() => ToolChangeStatus(tool._id, "En bodega")}
                            >
                              En bodega
                            </a>
                            <a
                                className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent " 
                              onClick={() =>ToolChangeStatus(tool._id, "En reparacion")}
                            >
                              En reparacion
                            </a>
                            <a
                               className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent " 
                              onClick={() => ToolChangeStatus(tool._id, "De baja")}
                            >
                              De baja
                            </a>
                           
                          </div>
                        </th>
                        <th className="py-3 px-3">{tool.name}</th>
                        <th className="py-3 px-3">{tool.active_num}</th>
                        <th className="py-3 px-3">{tool.date}</th>
                        <th className="py-3 px-3">
                          <button
                            className={`${
                              tool.status === "En bodega"
                                ? "bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:bg-blue-600 outline-none focus:outline-none mr-1 mb-1"
                                : "hidden"
                            }`}
                            onClick={() => dispatch(uiOpenModalAddActive())}
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
      </div>

      <ModalTool />
      <ModalAddActive />
    </>
  );
};
