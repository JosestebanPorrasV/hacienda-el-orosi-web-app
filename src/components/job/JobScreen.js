import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchResults from "react-filter-search";
import { ModalJob } from "./ModalJob";

import {
  JobsLoaded,
  oneJobDelete,
  jobSetActive,
  jobClearActive,
} from "../../actions/JobAction";
import { UseForm } from "../../hooks/UseForm";
import Swal from "sweetalert2";
import { uiOpenModalJob } from "../../actions/UIAction";

export const JobScreen = () => {
  const dispatch = useDispatch();
  const { jobs } = useSelector((state) => state.job);

  useEffect(() => {
    dispatch(JobsLoaded());
  }, [dispatch]);

  const [formValues, handleInputChange] = UseForm({
    filter: "",
  });

  const { filter } = formValues;

  const onSelectJobOneDelete = (job) => {
    dispatch(jobSetActive(job));
    deleteJob(job);
  };

  const onSelectAddEditJob = (jobId) => {
    dispatch(jobSetActive(jobId));
    openModalJob();
  };

  const openModalJob = () => {
    dispatch(uiOpenModalJob());
  };

  const deleteJob = (job) => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "El trabajo no se volerá a recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#A0A0A0",
      confirmButtonText: "Si, eliminar!!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        dispatch(oneJobDelete(job));
      } else {
        dispatch(jobClearActive());
      }
    });
  };

  return (
    <>
      <div className="bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900  rounded-lg px-4 lg:px-8 py-4 lg:py-6 mt-8 flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-12">
        <div>
          <h2 className="text-2xl">TRABAJOS DE LA HACIENDA</h2>
          <p className="text-blue-100 opacity-70">
            Funcionalidades principales
          </p>
        </div>
        <nav className="md:flex md:space-x-4 space-y-2 md:space-y-0">
          <button
            onClick={() => onSelectAddEditJob()}
            className="inline-flex flex-col justify-center items-center m-1 px-3 py-3 bg-purple-200 rounded-lg hover:bg-gray-900 w-35"
          >
            <i className="fas fa-plus-circle"></i>
            <span className="text-indigo-600 hover:text-indigo-200 font-bold">
              Agregar Trabajo
            </span>
          </button>
        </nav>
      </div>

      <div className="bg-gray-700 rounded-lg px-4 lg:px-8 py-4 lg:py-6 mt-8 ">
        <h2 className="text-green-400 text-xl font-bold mb-2">
          LISTA DE TRABAJOS
        </h2>
        <input
          type="text"
          name="filter"
          className="rounded-t-lg w-1/4 h-4 p-4 placeholder-blue-800 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-60"
          placeholder="Filtrar por ..."
          value={filter}
          onChange={handleInputChange}
        />
        <span className="bg-green-200 text-green-900 md:ml-2 py-1 px-1 rounded-t-lg  inline-block text-center uppercase">
          <i className="fas fa-file-contract"></i> {`total: ${jobs.length}`}
        </span>

        <div className="overflow-x-auto py-4">
          <div className="align-middle inline-block min-w-full overflow-hidden">
            <SearchResults
              value={filter}
              data={jobs}
              renderResults={(results) => (
                <table className="min-w-full">
                  <thead className="bg-gray-600">
                    <tr className="bg-gray-600 text-white text-lg">
                      <th className="py-2 px-5">
                        <i className="fas fa-user-clock"></i> Trabajo
                      </th>
                      <th className="p-5 w-1/6">
                        <i className="fas fa-clock"></i> Horas
                      </th>
                      <th className="p-5 w-1/6">
                        <i className="far fa-money-bill-alt"></i> Precio dia
                      </th>
                      <th className="p-5 w-1/6">
                        <i className="far fa-money-bill-alt"></i> Hora extra
                      </th>
                      <th className="py-2 px-5">
                        <i className="fas fa-info-circle"></i> Descripcion
                      </th>
                      <th className="py-2 px-12">
                        <i className="far fa-caret-square-down"></i> Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-blue-100 text-opacity-80">
                    {results.map((job) => (
                      <tr key={job._id}>
                        <th className="py-5 px-8">{`${job.name}`}</th>
                        <th className="py-3 px-3">{job.work_hours} horas</th>
                        <th className="py-3 px-3">
                          {new Intl.NumberFormat("en-EN").format(job.price_day)}
                          ₡
                        </th>
                        <th className="py-3 px-3">
                  
                          {new Intl.NumberFormat("en-EN").format(
                            job.price_extra_hours
                          )}₡
                        </th>
                        <th className="whitespace-pre-line">
                          {job.description}
                        </th>
                        <th className="py-3 px-3">
                          <button
                            onClick={() => onSelectAddEditJob(job)}
                            className="bg-yellow-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:bg-yellow-600 outline-none focus:outline-none mr-1 mb-1"
                            type="button"
                            style={{ transition: "all .15s ease" }}
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            onClick={() => onSelectJobOneDelete(job)}
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
      <ModalJob />
    </>
  );
};
