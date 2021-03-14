import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiCloseModalActive } from "../../actions/UIAction";
import SearchResults from "react-filter-search";
import { UseForm } from "../../hooks/UseForm";
import {
  addToolSelected,
  toolsLoading,
  removeInSelectedTools,
  activeToolByCollaboratorLoading,
} from "../../actions/ToolAction";
import { collaboratorClearActive } from "../../actions/CollaboratorAction";

import { Link } from "react-router-dom";

export const ModalActive = () => {
  const dispatch = useDispatch();

  const { modalActiveOpen } = useSelector((state) => state.ui);
  const { currentCollaborator } = useSelector((state) => state.collaborator);
  const { tools, selectedTools, count } = useSelector((state) => state.tool);

  const closeModal = () => {
    dispatch(uiCloseModalActive());
    dispatch(collaboratorClearActive());
  };

  const [formValues, handleInputChange] = UseForm({
    filter1: "",
    filter2: "",
  });

  const { filter1, filter2 } = formValues;

  useEffect(() => {
    dispatch(toolsLoading());
    if (currentCollaborator) {
      dispatch(activeToolByCollaboratorLoading(currentCollaborator._id));
    }
  }, [dispatch, currentCollaborator]);

  const selectTool = (tool) => {
    let validate = true;
    for (let index = 0; index < selectedTools.length; index++) {
      if (selectedTools[index].tool_id === tool._id) {
        validate = false;
      }
    }
    if (validate) {
      dispatch(
        addToolSelected({
          collaborator_id: currentCollaborator._id,
          tool_id: tool._id,
          name: tool.name,
          active_num: tool.active_num,
        })
      );
    }
  };

  return (
    <>
      {modalActiveOpen ? (
        <>
          <div className="absolute inset-0  z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-6xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none bg-hwite">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blue-100  text-blue-800 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Menu de herramientas
                  </h3>
                  <button
                    className="p-1 ml-auto border-0 text-white float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => closeModal()}
                  >
                    <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6">
                  <section className="max-w-4xl mx-auto bg-white">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label
                          className="text-gray-700 dark:text-gray-200"
                          htmlFor="document_id"
                        >
                          Cedula del colaborador
                        </label>
                        <input
                          disabled={true}
                          value={
                            currentCollaborator &&
                            currentCollaborator.document_id
                          }
                          name="document_id"
                          type="number"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        />
                      </div>

                      <div>
                        <label
                          className="text-gray-700 dark:text-gray-200"
                          htmlFor="nameCollaborator"
                        >
                          Nombre del colaborador
                        </label>
                        <input
                          disabled={true}
                          value={
                            currentCollaborator &&
                            `${currentCollaborator.name} ${currentCollaborator.surname}`
                          }
                          id="nameCollaborator"
                          type="text"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        />
                      </div>
                    </div>
                  </section>
                  <section className="text-gray-600 body-font overflow-hidden">
                    <div className="container px-5  mx-auto">
                      <div className="flex flex-wrap">
                        <div className="p-12 md:w-1/2 flex flex-col items-center">
                          <span className="inline-block py-1 px-2 rounded bg-gray-200 text-gray-500 text-xl font-medium tracking-widest">
                            EN BODEGA
                          </span>
                          <section className="relative w-full pt-4">
                            <div className="relative">
                              <input
                                type="text"
                                name="filter1"
                                className="w-full py-3 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                placeholder="Buscar"
                                value={filter1}
                                onChange={handleInputChange}
                              />
                            </div>

                            <SearchResults
                              value={filter1}
                              data={tools}
                              renderResults={(results) => (
                                <div className="static inset-x-0 px-6 py-3  mt-4 overflow-y-auto bg-white border border-gray-300 rounded-md h-72 divide-y-2 divide-fuchsia-600">
                                  {results.map((stockTools) => (
                                    <button
                                      className="md:flex  pb-4 pt-4 hover:bg-gray-300 w-full"
                                      key={stockTools._id}
                                      onClick={() => selectTool(stockTools)}
                                    >
                                      <div className="ml-2 font-semibold text-green-800">
                                        {stockTools.name}
                                      </div>
                                      <div className="ml-4 text-gray-600">
                                        Código: {stockTools.active_num}
                                      </div>
                                    </button>
                                  ))}
                                </div>
                              )}
                            />
                          </section>
                          <div className="flex items-center flex-wrap pb-4 mb-4 border-b-2 border-gray-100 w-full">
                            <Link
                              to="/listar-herramientas"
                              className="text-green-500 font-semibold inline-flex items-center hover:underline"
                            >
                              Ir a herramientas
                              <svg
                                className="w-4 h-4 ml-2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M5 12h14"></path>
                                <path d="M12 5l7 7-7 7"></path>
                              </svg>
                            </Link>
                            <span className="text-gray-400 mr-3 inline-flex items-center ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                              <svg
                                className="w-4 h-4 mr-1"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                viewBox="0 0 24 24"
                              >
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                              </svg>
                              Total en bodega: {count}
                            </span>
                          </div>
                        </div>
                        <div className="p-12 md:w-1/2 flex flex-col items-center">
                          <span className="inline-block py-1 px-2 rounded bg-green-200 text-green-500 text-xl font-medium tracking-widest">
                            PARA ASIGNAR
                          </span>
                          <section className="relative w-full pt-4">
                            <div className="relative">
                              <input
                                type="text"
                                name="filter2"
                                className="w-full py-3 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                placeholder="Filtrar"
                                value={filter2}
                                onChange={handleInputChange}
                              />
                            </div>

                            <SearchResults
                              value={filter2}
                              data={selectedTools}
                              renderResults={(results) => (
                                <div className="static inset-x-0 px-6 py-3  mt-4 overflow-y-auto bg-white border border-gray-300 rounded-md max-h-72 divide-y-2 divide-fuchsia-600 h-72">
                                  {results.map((activeTools, index) => (
                                    <div
                                      className="md:flex  pb-4 pt-4"
                                      key={index}
                                    >
                                      <span
                                        onClick={() =>
                                          dispatch(
                                            removeInSelectedTools(
                                              activeTools.tool_id
                                            )
                                          )
                                        }
                                        className="text-red-500 h-6 w-6 rounded-full ml-2"
                                      >
                                        <i className="fas fa-trash-alt"></i>
                                      </span>

                                      <span className="ml-2  text-green-800">
                                        {activeTools.name}
                                      </span>
                                      <span className="ml-4 text-gray-400">
                                        Código: {activeTools.active_num}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            />
                          </section>
                          <div className="flex items-center flex-wrap pb-4 mb-4 border-b-2 border-gray-100 mt-auto w-full">
                            <a className="text-green-500 inline-flex items-center">
                              Ir a Activos
                              <svg
                                className="w-4 h-4 ml-2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M5 12h14"></path>
                                <path d="M12 5l7 7-7 7"></path>
                              </svg>
                            </a>
                            <span className="text-gray-400 mr-3 inline-flex items-center ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                              <svg
                                className="w-4 h-4 mr-1"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                viewBox="0 0 24 24"
                              >
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                              </svg>
                              Total asignadas: {selectedTools.length}
                            </span>
                          </div>
                          <a className="inline-flex items-center">
                            <span className="flex-grow flex flex-col pl-4">
                              <button
                                className="bg-green-600 text-white active:bg-green-600 font-bold uppercase text-sm py-2 rounded shadow hover:bg-green-700 hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                type="button"
                                style={{ transition: "all .15s ease" }}
                                onClick={() => closeModal()}
                              >
                                CONFIRMAR
                              </button>
                              <span className="text-green-700 text-xs tracking-widest mt-0.5">
                                Se asignaran estas herramientas
                              </span>
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                  <button
                    className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={() => closeModal()}
                  >
                    Volver
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};
