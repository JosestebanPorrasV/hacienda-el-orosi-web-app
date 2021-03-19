import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchResults from "react-filter-search";
import { Link } from "react-router-dom";

import { JobsLoaded } from "../../actions/JobAction";
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
  return (
    <>
      <div className="bg-indigo-700 rounded-lg px-4 lg:px-8 py-4 lg:py-6 mt-8 flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-12">
        <div>
          <h2 className="text-2xl">TRABAJOS DE LA HACIENDA</h2>
          <p className="text-blue-100 opacity-70">
            Funcionalidades principales
          </p>
        </div>
        <nav className="md:flex md:space-x-4 space-y-2 md:space-y-0">
          <Link
            to="/herramientas"
            className="inline-flex flex-col justify-center items-center m-1 px-3 py-3 bg-indigo-900 rounded-lg hover:bg-gray-800 w-35"
          >
            <i className="fas fa-arrow-circle-left"></i>
            <span className="text-white font-bold">Agregar Trabajo</span>
          </Link>
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
        <span className="bg-green-200 text-green-600 md:ml-2 py-1 px-1 rounded-t-lg  inline-block text-center uppercase">
          <i className="fas fa-tools"></i> {`total: ${jobs.length}`}
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
                      <th className="py-2 px-3">
                        <i className="fas fa-user"></i> Trabajo
                      </th>
                      <th className="py-2 px-3">
                        <i className="fas fa-wrench"></i> Horas
                      </th>
                      <th className="py-2 px-3">
                        <i class="far fa-money-bill-alt"></i> Hora extra
                      </th>
                      <th className="py-2 px-3">
                        <i class="far fa-money-bill-alt"></i> Precio dia
                      </th>
                      <th className="py-2 px-3">
                        <i className="fas fa-id-card"></i> Descripcion
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-blue-100 text-opacity-80">
                    {results.map((job) => (
                      <tr key={job._id}>
                        <th className="py-5 px-3">{`${job.name_job}`}</th>
                        <th className="py-3 px-3">{job.work_hours}</th>
                        <th className="py-3 px-3">{job.price_extra_hours}</th>
                        <th className="py-3 px-3">{job.price_day}</th>
                        <th className="whitespace-pre-line">
                          {job.description}
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
