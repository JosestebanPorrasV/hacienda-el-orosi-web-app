import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchResults from "react-filter-search";
import { Link } from "react-router-dom";

import {
  AlimentsLoaded,
} from "../../actions/DietAction";
import { UseForm } from "../../hooks/UseForm";

export const AlimentScreen = () => {
  const dispatch = useDispatch();
  const { aliments } = useSelector((state) => state.diet);

  useEffect(() => {
    dispatch(AlimentsLoaded());
  }, [dispatch]);

  const [formValues, handleInputChange] = UseForm({
    filter: "",
  });

  const { filter } = formValues;

  return (
    <>
      <div className="bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900  rounded-lg px-4 lg:px-8 py-4 lg:py-6 mt-8 flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-12">
        <div>
          <h2 className="text-2xl">ALIMENTOS DE LA HACIENDA</h2>
          <p className="text-blue-100 opacity-70">
            Funcionalidades principales
          </p>
        </div>
        <nav className="md:flex md:space-x-4 space-y-2 md:space-y-0">
          <Link
          to="/dieta"
            className="inline-flex flex-col justify-center items-center m-1 px-3 py-3 bg-purple-200 rounded-lg hover:bg-gray-900 w-35"
          >
            <i className="fas fa-seedling"></i>
            <span className="text-indigo-600 hover:text-indigo-200 font-bold">
              Listar Dieta
            </span>
          </Link>
          <button
            className="inline-flex flex-col justify-center items-center m-1 px-3 py-3 bg-purple-200 rounded-lg hover:bg-gray-900 w-35"
          >
            <i class="fas fa-leaf"></i>
            <span className="text-indigo-600 hover:text-indigo-200 font-bold">
              Listar Alimentos
            </span>
          </button>
        </nav>
      </div>

      <div className="bg-gray-700 rounded-lg px-4 lg:px-8 py-4 lg:py-6 mt-8 ">
        <h2 className="text-green-400 text-xl font-bold mb-2">
          LISTA DE ALIMENTOS
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
          <i className="fas fa-file-contract"></i> {`total: ${aliments.length}`}
        </span>

        <div className="overflow-x-auto py-4">
          <div className="align-middle inline-block min-w-full overflow-hidden">
            <SearchResults
              value={filter}
              data={aliments}
              renderResults={(results) => (
                <table className="min-w-full">
                  <thead className="bg-gray-600">
                    <tr className="bg-gray-600 text-white text-lg">
                      <th className="p-5 w-1/4">
                        <i className="fas fa-leaf"></i> Nombre del Alimento
                      </th>
                      <th className="p-5 w-1/4">
                        # Cantidad Suministrada
                      </th>
                      <th className="p-5 w-1/4">
                      <i class="fas fa-horse-head"></i> Precio del Alimento
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-blue-100 text-opacity-80">
                    {results.map((aliment) => (
                      <tr key={aliment._id}>
                        <th className="py-5 px-8">{`${aliment.name_aliment}`}</th>
                        <th className="py-5 px-8">{`${aliment.quantity_supplied}`}kg</th>
                        <th className="py-3 px-3">₡{aliment.price_aliment}</th>
                    
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
