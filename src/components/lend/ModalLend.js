import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiCloseModalAddLend } from "../../actions/UIAction";
import {
  collaboratorClearActive,
  searchCollaborator,
} from "../../actions/CollaboratorAction";
import { registerLend } from "../../actions/LendAction";

export const ModalLend = () => {
  const dispatch = useDispatch();

  const { modalAddLendOpen } = useSelector((state) => state.ui);
  const { currentCollaborator } = useSelector((state) => state.collaborator);

  const initEvent = {
    document_id: "",
    initial_amount: "",
    fee_amount: "",
  };

  const [formValues, setFormValues] = useState(initEvent);

  const { document_id, initial_amount, fee_amount } = formValues;

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const closeModal = () => {
    dispatch(uiCloseModalAddLend());
    clearForm();
  };

  const clearForm = () => {
    dispatch(collaboratorClearActive());
    setFormValues(initEvent);
  };

  const handleRegisterLend = async (e) => {
    e.preventDefault();
    await dispatch(registerLend(currentCollaborator._id, formValues));
    await setFormValues(initEvent); 
  };

  return (
    <>
      {modalAddLendOpen ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-6xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h3 className="text-3xl text-green-900 font-semibold">
                    Registrar prestamo
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => closeModal()}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <form onSubmit={handleRegisterLend}>
                  <section className="max-w-4xl p-6 mx-auto bg-white dark:bg-gray-800">
                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                      <div>
                        <label
                          className="text-gray-700 dark:text-gray-200"
                          htmlFor="document_id"
                        >
                          Cedula del colaborador
                        </label>
                        <input
                          required
                          value={currentCollaborator ? currentCollaborator.document_id: document_id}
                          onChange={handleInputChange}
                          name="document_id"
                          type="number"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border-2 border-blue-500  dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                          placeholder="Requerido"
                        />
                        <button
                          hidden={!document_id}
                          onClick={() => dispatch(document_id && searchCollaborator(document_id)) }
                          className="bg-blue-500 text-white active:bg-blue-600 uppercase text-sm px-2 py-1 rounded-b shadow hover:bg-blue-900 outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                          style={{ transition: "all .15s ease" }}
                        >
                          <i className="fas fa-search"></i> Buscar
                        </button>
                        <button
                          hidden={!currentCollaborator}
                          onClick={() => clearForm()}
                          className="text-gray-500 active:bg-gray-600  text-sm px-2 py-1 rounded-b  hover:text-red-900 outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <i className="fas fa-eraser"></i>
                        </button>
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
                            currentCollaborator
                              ? `${currentCollaborator.name} ${currentCollaborator.surname}`
                              : ""
                          }
                          id="nameCollaborator"
                          type="text"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        />
                      </div>
                      <div>
                        <label
                          className="text-gray-700 dark:text-gray-200"
                          htmlFor="amount"
                        >
                          Cantidad
                        </label>
                        <input
                          required
                          disabled={!currentCollaborator}
                          id="initial_amount"
                          name="initial_amount"
                          value={initial_amount}
                          onChange={handleInputChange}
                          type="number"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        />
                      </div>

                      <div>
                        <label
                          className="text-gray-700 dark:text-gray-200"
                          htmlFor="fee_amount"
                        >
                          Cuota por pago
                        </label>
                        <input
                          required
                          disabled={!currentCollaborator}
                          id="fee_amount"
                          name="fee_amount"
                          value={fee_amount}
                          onChange={handleInputChange}
                          type="number"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        />
                      </div>
                    </div>
                  </section>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                    <button
                      className="bg-gray-500 text-white active:bg-gray-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:bg-gray-700 outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      style={{ transition: "all .15s ease" }}
                      onClick={() => closeModal()}
                    >
                      Volver
                    </button>
                    <button
                      disabled={!currentCollaborator}
                      className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:bg-blue-900 outline-none focus:outline-none mr-1 mb-1"
                      type="submit"
                      style={{ transition: "all .15s ease" }}
                    >
                      Registrar prestamo
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};
