import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  administratorClearActive,
  registerAdministrator,
} from "../../actions/AdministratorAction";

import { uiCloseModalAdministrator } from "../../actions/UIAction";

const initEvent = {
  document_id: "",
  password: "",
  email: "",
  name: "",
  surname: "",
  role: "",
};

export const ModalAdministrator = () => {
  const dispatch = useDispatch();

  const { modalAdministratorOpen } = useSelector((state) => state.ui);

  const closeModal = () => {
    dispatch(administratorClearActive());
    dispatch(uiCloseModalAdministrator());
  };

  const [formValues, setFormValues] = useState(initEvent);
  const { document_id, password, email, name, surname, role } = formValues;

  useEffect(() => {
    setFormValues(initEvent);
  }, []);

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!role || role === "DEFAULT") {
      return Swal.fire("Error", "Por favor elige un trabjo", "warning");
    }
    dispatch(registerAdministrator(formValues));
  };

  return (
    <>
      {modalAdministratorOpen ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-sm">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h5 className="text-blue-400 text-xl font-bold mb-2">
                    Registrar nuevo administrador
                  </h5>
                  <hr />
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => closeModal()}
                  >
                    <span className="bg-transparent text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <form onSubmit={handleSubmitForm}>
                  <section className="max-w-4xl p-6 mx-auto bg-white dark:bg-gray-800">
                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                      <div>
                        <label className="text-gray-700 dark:text-gray-200">
                          Cédula
                        </label>
                        <input
                          required
                          value={document_id}
                          name="document_id"
                          onChange={handleInputChange}
                          type="text"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        />
                      </div>
                      <div>
                        <label className="text-gray-700 dark:text-gray-200">
                          Correo electrónico
                        </label>
                        <input
                          required
                          value={email}
                          name="email"
                          onChange={handleInputChange}
                          type="text"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        />
                      </div>
                      <div>
                        <label className="text-gray-700 dark:text-gray-200">
                          contraseña
                        </label>
                        <input
                          required
                          value={password}
                          name="password"
                          onChange={handleInputChange}
                          type="password"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        />
                      </div>
                      <div>
                        <label className="text-gray-700 dark:text-gray-200">
                          Nombre
                        </label>
                        <input
                          required
                          value={name}
                          name="name"
                          onChange={handleInputChange}
                          type="text"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        />
                      </div>
                      <div>
                        <label className="text-gray-700 dark:text-gray-200">
                          Apellidos
                        </label>
                        <input
                          required
                          value={surname}
                          name="surname"
                          onChange={handleInputChange}
                          type="text"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        />
                      </div>
                      <div>
                        <label className="text-gray-700 dark:text-gray-200">
                          Cargo
                        </label>
                        <select
                          value={role}
                          onChange={handleInputChange}
                          name="role"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md"
                        >
                          <option value="DEFAULT">Elegir</option>
                          <option value="Recursos Humanos">
                            Recursos Humano
                          </option>
                          <option value="Encargado del ganado">
                            Encargado del ganado
                          </option>
                          <option value="Dueño">Dueño</option>
                        </select>
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
                      Regresar
                    </button>
                    <button
                      className={` bg-blue-400 text-white active:bg-blue-600 hover:bg-blue-900 font-bold uppercase text-sm px-6 py-3 rounded shadow outline-none focus:outline-none mr-1 mb-1"
                      `}
                      type="submit"
                      style={{ transition: "all .15s ease" }}
                    >
                      Registrar
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
