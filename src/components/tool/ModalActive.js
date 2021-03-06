import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiCloseModalActive } from "../../actions/UIAction";

export const ModalActive = () => {
  const dispatch = useDispatch();

  const { modalActiveOpen } = useSelector((state) => state.ui);
  const { actives } = useSelector((state) => state.tool);

  const closeModal = () => {
    dispatch(uiCloseModalActive());
  };

  return (
    <>
      {modalActiveOpen ? (
        <>
          <div className="w-full h-full justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50">
            <div className="relative w-auto my-6 mx-auto max-w-6xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h3 className="text-3xl text-gray-700 font-semibold">
                    Menu de Herramienta
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => closeModal()}
                  >
                    <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}

                <div className="flex-auto mb-4 ">
                  <div className="w-3/6">
                    <h3 className="text-xl text-gray-700 font-semibold">
                      Herramientas en bodega
                    </h3>
                    <div className="overflow-auto h-72">
                    <table className="rounded-t-lg m-5 w-5/6 mx-auto bg-gray-200 text-gray-800">
                      <tr className="text-left border-b-2 border-gray-300">
                        <th className="p-1 w-1/4">Asignar</th>
                        <th className="px-4 py-3">Herramienta</th>
                        <th className="px-4 py-3">Codigo</th>
                      </tr>

                      <tr className="bg-gray-100 border-b border-gray-200">
                        <th className="p-4 w-1/4">
                          <label className="inline-flex items-center mt-3 ">
                            <input
                              type="checkbox"
                              className="form-checkbox h-5 w-5"
                              defaultChecked={false}
                            />
                          </label>
                        </th>
                        <td className="px-4 py-3">Smith</td>
                        <td className="px-4 py-3">50</td>
                      </tr>
                      <tr className="bg-gray-100 border-b border-gray-200">
                        <th className="p-4 w-1/4">
                          <label className="inline-flex items-center mt-3 ">
                            <input
                              type="checkbox"
                              className="form-checkbox h-5 w-5"
                              defaultChecked={false}
                            />
                          </label>
                        </th>
                        <td className="px-4 py-3">Smith</td>
                        <td className="px-4 py-3">50</td>
                      </tr>
                      <tr className="bg-gray-100 border-b border-gray-200">
                        <th className="p-4 w-1/4">
                          <label className="inline-flex items-center mt-3 ">
                            <input
                              type="checkbox"
                              className="form-checkbox h-5 w-5"
                              defaultChecked={false}
                            />
                          </label>
                        </th>
                        <td className="px-4 py-3">Smith</td>
                        <td className="px-4 py-3">50</td>
                      </tr>
                    </table>
                    </div>
                  </div>

                  <div className="w-2/12 bg-gray-800 pt-20">
                    <button
                      className="bg-blue-600 text-white font-bold uppercase text-xs m-2 p-2 rounded-full shadow hover:bg-blue-400 hover:text-white outline-none"
                      onClick={() => closeModal()}
                    >
                      Asignar
                    </button>
                    <span className="mr-2">
                      <i class="fas fa-arrow-right"></i>
                    </span>
                  </div>

                  <div className=" w-3/6">
                    <h3 className="text-xl text-gray-700 font-semibold">
                      Herramientas asignadas
                    </h3>
                    <div className="overflow-auto h-72" >
                    <table className="rounded-t-lg m-5 w-5/6 mx-auto bg-gray-200 text-gray-800">
                      <tr className="text-left border-b-2 border-gray-300">
                        <th className="p-1 w-1/4">Remover</th>
                        <th className="px-4 py-3">Herramienta</th>
                        <th className="px-4 py-3">Codigo</th>
                      </tr>

                      <tr className="bg-gray-100 border-b border-gray-200">
                        <th className="p-4 w-1/4">
                          <label className="inline-flex items-center mt-3 ">
                            <input
                              type="checkbox"
                              className="form-checkbox h-5 w-5"
                              defaultChecked={false}
                            />
                          </label>
                        </th>
                        <td className="px-4 py-3">Smith</td>
                        <td className="px-4 py-3">50</td>
                      </tr>
                      <tr className="bg-gray-100 border-b border-gray-200">
                        <th className="p-4 w-1/4">
                          <label className="inline-flex items-center mt-3 ">
                            <input
                              type="checkbox"
                              className="form-checkbox h-5 w-5"
                              defaultChecked={false}
                            />
                          </label>
                        </th>
                        <td className="px-4 py-3">Smith</td>
                        <td className="px-4 py-3">50</td>
                      </tr>
                      <tr className="bg-gray-100 border-b border-gray-200">
                        <th className="p-4 w-1/4">
                          <label className="inline-flex items-center mt-3 ">
                            <input
                              type="checkbox"
                              className="form-checkbox h-5 w-5"
                              defaultChecked={false}
                            />
                          </label>
                        </th>
                        <td className="px-4 py-3">Smith</td>
                        <td className="px-4 py-3">50</td>
                      </tr>
                    </table>
                    </div>
                  </div>
                </div>

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                  <button
                    className="text-red-900 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={() => closeModal()}
                  >
                    regresar
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
