import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchResults from "react-filter-search";
import { Link } from "react-router-dom";
import { ModalDiet } from "./ModalDiet";

import {
  DietsLoaded,
} from "../../actions/DietAction";
import { UseForm } from "../../hooks/UseForm";
import { uiOpenModalDiet } from "../../actions/UIAction";

export const DietScreen = () => {
  const dispatch = useDispatch();
  const { diets } = useSelector((state) => state.diet);

  useEffect(() => {
    dispatch(DietsLoaded());
  }, [dispatch]);

  const [formValues, handleInputChange] = UseForm({
    filter: "",
  });

  const { filter } = formValues;

  return (
    <>
      <div className="bg-gradient-to-r from-green-400 rounded-lg px-4 lg:px-8 py-4 lg:py-6 mt-4 flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-12">
        <div>
          <h2 className="text-2xl text-green-900">DIETAS DE LA HACIENDA</h2>
          <p className="text-green-900 opacity-70">
            Funcionalidades principales
          </p>
        </div>
        <nav className="md:flex md:space-x-4 space-y-2 md:space-y-0">
        <Link
          to="/animales"
            className="inline-flex flex-col justify-center items-center m-1 px-5 py-18 bg-green-900 rounded-lg hover:bg-green-700 w-35"
          >
            <i className="fas fa-arrow-circle-left"></i> 
          </Link>
          <button
          onClick={() => dispatch(uiOpenModalDiet())}
            className="inline-flex flex-col justify-center items-center m-1 px-3 py-3 bg-green-900 rounded-lg hover:bg-green-700 w-35"
          >
            <i className="fas fa-plus-circle"></i>
            <span className="text-green-600 hover:text-indigo-200 font-bold">
              Agregar Dieta
            </span>
          </button>
          <Link
          to="/producto"
            className="inline-flex flex-col justify-center items-center m-1 px-3 py-3 bg-green-900 rounded-lg hover:bg-green-700 w-35"
          >
            <i className="fas fa-leaf"></i>
            <span className="text-green-600 hover:text-indigo-200 font-bold">
              Listar Productos
            </span>
          </Link>
        </nav>
      </div>

      <div className="bg-gray-700 rounded-lg px-4 lg:px-8 py-4 lg:py-6 mt-8 ">
        <h2 className="text-green-400 text-xl font-bold mb-2">
          LISTA DE DIETAS
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
          <i className="fas fa-file-contract"></i> {`total: ${diets.length}`}
        </span>

        <div className="overflow-x-auto py-4">
          <div className="align-middle inline-block min-w-full overflow-hidden">
            <SearchResults
              value={filter}
              data={diets}
              renderResults={(results) => (
                <table className="min-w-full">
                  <thead className="bg-gray-600">
                    <tr className="bg-gray-600 text-white text-lg">
                      <th className="py-2 px-5">
                      <i className="far fa-bookmark"></i> Nombre de la Dieta
                      </th>
                      <th className="p-5 w-1/4">
                        <i className="fas fa-leaf"></i> Descripción
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-blue-100 text-opacity-80">
                    {results.map((diet) => (
                      <tr key={diet._id}>
                        <th className="py-5 px-8">{`${diet.diet_name}`}</th>
                        <th className="py-5 px-8">{`${diet.description}`}</th>
                    
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            />
          </div>
        </div>
      </div>
      <ModalDiet />
    </>
  );
};
