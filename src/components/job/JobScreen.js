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

  const onSelectJobOneDelete = (jobId) => {
    dispatch(jobSetActive(jobId));
    deleteJob(jobId);
  };

  const onSelectEditJob = (jobId) => {
    dispatch(jobSetActive(jobId));
    <ModalJob />;
  };

  const deleteJob = (job) => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "El trabajo no se volerá a recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        dispatch(oneJobDelete(job._id));
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
          <ModalJob />
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
        <span className="bg-green-200 text-yellow-900 md:ml-2 py-1 px-1 rounded-t-lg  inline-block text-center uppercase">
          <i class="fas fa-file-contract"></i> {`total: ${jobs.length}`}
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
                        <i class="fas fa-user-clock"></i> Trabajo
                      </th>
                      <th className="p-5 w-1/6">
                        <i class="fas fa-clock"></i> Horas
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
                        <i class="far fa-caret-square-down"></i> Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-blue-100 text-opacity-80">
                    {results.map((job) => (
                      <tr key={job._id}>
                        <th className="py-5 px-8">{`${job.name_job}`}</th>
                        <th className="py-3 px-3">{job.work_hours} horas</th>
                        <th className="py-3 px-3">₡{job.price_day}</th>
                        <th className="py-3 px-3">₡{job.price_extra_hours}</th>
                        <th className="whitespace-pre-line">
                          {job.description}
                        </th>
                        <th className="py-3 px-3">
                          <button
                            onClick={() => onSelectEditJob(job)}
                            className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:bg-blue-600 outline-none focus:outline-none mr-1 mb-1"
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
    </>
  );
};
