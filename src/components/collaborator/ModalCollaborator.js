import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  collaboratorClearActive,
  registerCollaborator,
  editOneCollaborator,
} from "../../actions/CollaboratorAction";
import { JobsLoaded } from "../../actions/JobAction";
import { uiCloseModalCollaborator } from "../../actions/UIAction";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";

registerLocale("es", es);

const initEvent = {
  document_id: "",
  job_id: "",
  nationality: "",
  name: "",
  surname: "",
  direction: "",
  tel: "",
  cel: "",
};

export const ModalCollaborator = () => {
  const dispatch = useDispatch();
  const [date_admission, setDate_admission] = useState();
  const [dispatch_date, setDispatch_date] = useState();

  const { modalCollaboratorOpen } = useSelector((state) => state.ui);
  const { currentCollaborator } = useSelector((state) => state.collaborator);
  const { jobs } = useSelector((state) => state.job);

  useEffect(() => {
    if (currentCollaborator) {
      setFormValues(currentCollaborator);
    } else {
      setFormValues(initEvent);
    }
  }, [dispatch, currentCollaborator]);

  const [formValues, setFormValues] = useState(initEvent);
  const {
    document_id,
    job,
    nationality,
    name,
    surname,
    direction,
    tel,
    cel,
  } = formValues;

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    if (currentCollaborator) {
      dispatch(
        editOneCollaborator(
          currentCollaborator._id,
          !job ? currentCollaborator.job._id : job,
          formValues,
          date_admission ? date_admission : currentCollaborator.date_admission,
          dispatch_date ? dispatch_date : currentCollaborator.dispatch_date
        )
      );
      dispatch(uiCloseModalCollaborator());
      dispatch(collaboratorClearActive());
    } else {
      if (!job) {
        return Swal.fire("Error", "Por favor elige un trabjo", "warning");
      }
      dispatch(registerCollaborator(formValues, date_admission, dispatch_date));
    }

    setDate_admission(null);
    setDispatch_date(null);
  };

  return (
    <>
      {modalCollaboratorOpen ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-sm">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h5
                    className={`${
                      currentCollaborator ? "text-yellow-400" : "text-blue-400"
                    } text-xl font-bold mb-2`}
                  >{`${
                    currentCollaborator
                      ? "Editar contrato del colaborador"
                      : "Contratar colaborador"
                  }`}</h5>
                  <hr />
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => dispatch(uiCloseModalCollaborator())}
                  >
                    <span className="bg-transparent text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <form onSubmit={handleSubmitForm}>
                  <section className="max-w-4xl p-4 mx-auto bg-white dark:bg-gray-800">
                    <div className="grid grid-cols-1 gap-4  sm:grid-cols-2">
                      <div hidden={!currentCollaborator}>
                        <label className="text-gray-700 dark:text-gray-200">
                          Registrado el:
                        </label>
                        <input
                          defaultValue={
                            currentCollaborator &&
                            currentCollaborator.date_admission
                          }
                          className="text-gray-700"
                        />
                      </div>

                      <div hidden={!currentCollaborator}>
                        <label className="text-gray-700 dark:text-gray-200">
                          Finaliza el:
                        </label>
                        <input
                          defaultValue={
                            currentCollaborator &&
                            currentCollaborator.dispatch_date
                          }
                          className="text-gray-700"
                        />
                      </div>

                      <div>
                        <label className="text-gray-700 dark:text-gray-200">
                          Cedula
                        </label>
                        <input
                          required
                          value={document_id}
                          name="document_id"
                          onChange={handleInputChange}
                          type="number"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        />
                      </div>
                      <div
                        onClick={() =>
                          jobs.length === 0 && dispatch(JobsLoaded())
                        }
                      >
                        <label
                          className="text-gray-700 dark:text-gray-200"
                          htmlFor="tel"
                        >
                          Trabajo
                        </label>
                        <Link
                          to="/trabajos"
                          className="ml-2 text-blue-500 inline-flex items-center"
                        >
                          Ir
                          <svg
                            className="w-4 h-4"
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
                        <select
                          defaultValue={!job && "DEFAULT"}
                          onChange={handleInputChange}
                          name="job"
                          required
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md"
                        >
                          <option value="DEFAULT">
                            {currentCollaborator
                              ? currentCollaborator.job.name
                              : "Elegir"}
                          </option>
                          {jobs.map((option) => (
                            <option
                              key={option._id}
                              value={option._id}
                              className="text-gray-700 rounded-lg font-semibold"
                            >
                              {option.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-gray-700 dark:text-gray-200">
                          Nacionalidad
                        </label>
                        <input
                          required
                          value={nationality}
                          name="nationality"
                          onChange={handleInputChange}
                          type="text"
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
                          Direccion
                        </label>
                        <input
                          required
                          value={direction}
                          name="direction"
                          onChange={handleInputChange}
                          type="text"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        />
                      </div>
                      <div>
                        <label
                          className="text-gray-700 dark:text-gray-200"
                          htmlFor="tel"
                        >
                          Telefono
                        </label>
                        <input
                          required
                          value={tel}
                          name="tel"
                          onChange={handleInputChange}
                          id="tel"
                          type="number"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        />
                      </div>
                      <div>
                        <label
                          className="text-gray-700 dark:text-gray-200"
                          htmlFor="cel"
                        >
                          Celular
                        </label>
                        <input
                          required
                          value={cel}
                          name="cel"
                          onChange={handleInputChange}
                          id="cel"
                          type="number"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        />
                      </div>
                      <div>
                        <label className="text-gray-700 dark:text-gray-200">
                          {`${
                            currentCollaborator
                              ? "Cambiar ficha inicial"
                              : "Fecha inicial"
                          }`}
                        </label>
                        <DatePicker
                          locale="es"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                          selected={date_admission}
                          onChange={(date) => setDate_admission(date)}
                        />
                      </div>

                      <div>
                        <label className="text-gray-700 dark:text-gray-200">
                          {`${
                            currentCollaborator
                              ? "Cambiar ficha final"
                              : "Fecha final"
                          }`}
                        </label>
                        <DatePicker
                          locale="es"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                          selected={dispatch_date}
                          onChange={(date) => setDispatch_date(date)}
                        />
                      </div>

                      <div hidden={!currentCollaborator}>
                        <Link
                          to={`/contrato/${
                            currentCollaborator &&
                            `${currentCollaborator.name}-${currentCollaborator.surname}`
                          }`}
                          className="text-blue-900 font-semibold inline-flex items-center hover:underline"
                        >
                          <i className="fas fa-file-contract"></i> Ver contrato
                        </Link>
                      </div>
                    </div>
                  </section>

                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                    <button
                      className="bg-gray-500 text-white active:bg-gray-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:bg-gray-700 outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      style={{ transition: "all .15s ease" }}
                      onClick={() => dispatch(uiCloseModalCollaborator())}
                    >
                      Regresar
                    </button>
                    <button
                      disabled={
                        !currentCollaborator &&
                        !dispatch_date &&
                        !date_admission
                      }
                      className={`${
                        currentCollaborator
                          ? "bg-yellow-400 text-white active:bg-yellow-600 hover:bg-yellow-900"
                          : "bg-blue-400 text-white active:bg-blue-600 hover:bg-blue-900"
                      } font-bold uppercase text-sm px-6 py-3 rounded shadow outline-none focus:outline-none mr-1 mb-1"
                      `}
                      type="submit"
                      style={{ transition: "all .15s ease" }}
                    >
                      {currentCollaborator ? "Modificar" : "Contratar"}
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