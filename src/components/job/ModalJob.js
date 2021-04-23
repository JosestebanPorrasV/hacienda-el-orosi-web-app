import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  registerJob,
  editOneJob,
  jobClearActive,
} from "../../actions/JobAction";

import { uiCloseModalJob } from "../../actions/UIAction";

const initEvent = {
  name: "",
  description: "",
  work_hours: "",
  price_extra_hours: "",
  price_day: "",
};

export const ModalJob = () => {
  const dispatch = useDispatch();

  const { currentJob } = useSelector((state) => state.job);
  const { modalJobOpen } = useSelector((state) => state.ui);

  const [formValues, setFormValues] = useState(initEvent);

  const {
    name,
    description,
    work_hours,
    price_extra_hours,
    price_day,
  } = formValues;

  useEffect(() => {
    if (currentJob) {
      setFormValues(currentJob);
    } else {
      setFormValues(initEvent);
    }
  }, [currentJob, setFormValues]);

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const closeModal = () => {
    dispatch(uiCloseModalJob());
    dispatch(jobClearActive());
    clearForm();
  };

  const clearForm = () => {
    setFormValues(initEvent);
  };

  const handleJobForm = (e) => {
    e.preventDefault();

    if (currentJob) {
      dispatch(editOneJob(currentJob._id, formValues));
      closeModal();
    } else {
      dispatch(registerJob(formValues));
    }

  };

  return (
    <>
      {modalJobOpen ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-6xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h3
                    className={`${
                      currentJob ? "text-yellow-400" : "text-blue-400"
                    } text-3xl font-semibold mb-2`}
                  >
                    {`${
                      currentJob
                        ? "Editar datos del trabajo"
                        : "Registrar trabajo"
                    }`}
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
                <form onSubmit={handleJobForm}>
                  <section className="max-w-4xl p-6 mx-auto bg-white dark:bg-gray-800">
                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                      <div>
                        <label className="text-gray-700 dark:text-gray-200">
                          Nombre del trabajo
                        </label>
                        <input
                          required
                          name="name"
                          value={name}
                          onChange={handleInputChange}
                          type="text"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                          placeholder="Requerido"
                        />
                      </div>
                      <div>
                        <label
                          className="text-gray-700 dark:text-gray-200"
                          htmlFor="price_extra_hours"
                        >
                          Precio de la hora extra
                        </label>
                        <input
                          id="price_extra_hours"
                          name="price_extra_hours"
                          value={price_extra_hours}
                          onChange={handleInputChange}
                          type="number"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        />
                      </div>
                      <div>
                        <label
                          className="text-gray-700 dark:text-gray-200"
                          htmlFor="price_day"
                        >
                          Pagó por día
                        </label>
                        <input
                          id="price_day"
                          name="price_day"
                          value={price_day}
                          onChange={handleInputChange}
                          type="number"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        />
                      </div>
                      <div>
                        <label
                          className="text-gray-700 dark:text-gray-200"
                          htmlFor="work_hours"
                        >
                          Duración de horas del trabajo
                        </label>
                        <input
                          id="work_hours"
                          name="work_hours"
                          value={work_hours}
                          onChange={handleInputChange}
                          type="number"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        />
                      </div>
                      <div>
                        <label className="text-gray-700 dark:text-gray-200">
                          Descripción del trabajo
                        </label>
                        <input
                          name="description"
                          value={description}
                          onChange={handleInputChange}
                          type="text"
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
                      Regresar
                    </button>
                    <button
                      className={`${
                        currentJob
                          ? "bg-yellow-400 text-white active:bg-yellow-600 hover:bg-yellow-900"
                          : "bg-blue-400 text-white active:bg-blue-600 hover:bg-blue-900"
                      } font-bold uppercase text-sm px-6 py-3 rounded shadow  outline-none focus:outline-none mr-1 mb-1"
                      `}
                      type="submit"
                      style={{ transition: "all .15s ease" }}
                    >
                      {currentJob ? "Modificar" : "Añadir"}
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
