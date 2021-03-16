import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  administratorClearActive,
  registerAdministrator,
  changeRole,
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
  const { currentAdministrator } = useSelector((state) => state.administrator);

  const closeModal = () => {
    dispatch(administratorClearActive());
    dispatch(uiCloseModalAdministrator());
  };

  const [formValues, setFormValues] = useState(initEvent);
  const {
    document_id,
    password,
    email,
    name,
    surname,
    role,
  } = formValues;

  useEffect(() => {
    if (currentAdministrator) {
      setFormValues(currentAdministrator);
    } else {
      setFormValues(initEvent);
    }
  }, [currentAdministrator, setFormValues]);

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    if (currentAdministrator) {
      dispatch(changeRole(currentAdministrator._id, role));
    } else {
      dispatch(registerAdministrator(formValues));
    }
    closeModal();
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
                  <h5
                    className={`${
                      currentAdministrator ? "text-yellow-400" : "text-green-400"
                    } text-xl font-bold mb-2`}
                  >{`${
                    currentAdministrator
                      ? "Cambiar role al administrator"
                      : "Registrar nuevo administrador"
                  }`}</h5>
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
                        <label
                          className="text-gray-700 dark:text-gray-200"
                          htmlFor="icon_prefix"
                        >
                          Cedula
                        </label>
                        <input
                          required
                          value={document_id}
                          name="document_id"
                          onChange={handleInputChange}
                          id="icon_prefix"
                          type="text"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        />
                      </div>
                      <div>
                        <label
                          className="text-gray-700 dark:text-gray-200"
                          htmlFor="icon_prefix"
                        >
                          Correo electronico
                        </label>
                        <input
                          required
                          value={email}
                          name="email"
                          onChange={handleInputChange}
                          id="icon_prefix"
                          type="text"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        />
                      </div>
                      <div>
                        <label
                          className="text-gray-700 dark:text-gray-200"
                          htmlFor="icon_prefix"
                        >
                          contraseña
                        </label>
                        <input
                          required
                          value={password}
                          name="password"
                          onChange={handleInputChange}
                          id="icon_prefix"
                          type="password"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        />
                      </div>
                      <div>
                        <label
                          className="text-gray-700 dark:text-gray-200"
                          htmlFor="icon_prefix"
                        >
                          Nombre
                        </label>
                        <input
                          required
                          value={name}
                          name="name"
                          onChange={handleInputChange}
                          id="icon_prefix"
                          type="text"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        />
                      </div>
                      <div>
                        <label
                          className="text-gray-700 dark:text-gray-200"
                          htmlFor="icon_prefix"
                        >
                          Apellidos
                        </label>
                        <input
                          required
                          value={surname}
                          name="surname"
                          onChange={handleInputChange}
                          id="icon_prefix"
                          type="text"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        />
                      </div>
                      <div>
                        <label
                          className="text-gray-700 dark:text-gray-200"
                          htmlFor="icon_prefix"
                        >
                          Role
                        </label>
                        <input
                          required
                          value={role}
                          name="role"
                          onChange={handleInputChange}
                          id="icon_prefix"
                          type="text"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        />
                      </div>
                      
                    </div>
                  </section>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                    <button
                      className="text-blue-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none hover:text-blue-900 focus:outline-none mr-1 mb-1"
                      type="button"
                      style={{ transition: "all .15s ease" }}
                      onClick={() => closeModal()}
                    >
                      Regresar
                    </button>
                    <button
                      className={`${
                        currentAdministrator
                          ? "bg-yellow-400 text-white active:bg-yellow-600 hover:bg-yellow-900"
                          : "bg-green-400 text-white active:bg-green-600 hover:bg-green-900"
                      } font-bold uppercase text-sm px-6 py-3 rounded shadow outline-none focus:outline-none mr-1 mb-1"
                      `}
                      type="submit"
                      style={{ transition: "all .15s ease" }}
                    >
                      {currentAdministrator ? "Modificar" : "Registrar"}
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
