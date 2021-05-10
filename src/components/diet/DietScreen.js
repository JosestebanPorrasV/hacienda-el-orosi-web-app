import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchResults from "react-filter-search";
import { Link } from "react-router-dom";
import { ModalDiet } from "./ModalDiet";

import { DietsLoaded } from "../../actions/DietAction";
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
      <div className="container px-4 lg:px-8 py-4 lg:py-6 mt-4 mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link
          to="/animales"
          className="inline-flex flex-col justify-center items-center m-3 px-1 py-18 rounded-lg"
        >
          <i className="fas fa-arrow-circle-left text-green-900 text-2xl hover:text-green-200 "></i>
        </Link>
        <span className="text-xl text-green-200">Animales</span>

        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center md:flex md:space-x-4 space-y-2 md:space-y-0">
          <button
            onClick={() => dispatch(uiOpenModalDiet())}
            className="bg-green-500 text-white active:bg-gray-600 font-bold uppercase text-sm px-4 py-2 rounded-2xl shadow transform hover:scale-110 motion-reduce:transform-none mr-1 mb-1"
            type="button"
            style={{ transition: "all .15s ease" }}
          >
            Agregar
          </button>
        </nav>

        <span className="text-xl text-green-200">Productos</span>
        <Link
          to="/producto"
          className="inline-flex flex-col justify-center items-center m-3 px-1 py-18 rounded-lg"
        >
          <i className="fas fa-arrow-circle-right text-green-900 text-2xl hover:text-green-200"></i>
        </Link>
      </div>

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-18 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-green-50">
              Dietas
            </h1>
            <h2 className="text-xs text-green-700 tracking-widest font-medium title-font mb-1">
              PARA LOS ANIMALES
            </h2>
          </div>

          <SearchResults
            value={filter}
            data={diets}
            renderResults={(results) => (
              <div className="flex flex-wrap -m-4">
                {results.map(({ _id, diet_name, description }) => (
                  <div key={_id} className="p-4 md:w-1/3">
                    <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col group">
                      <div className="flex items-center ">

                        <div class="mr-2 inline-flex group-hover:text-red-900 items-center justify-center rounded-full text-gray-100 flex-shrink-0 ">
                          <button
                            className="text-gray text-xl"
                            type="button"
                            style={{ transition: "all .50s ease" }}
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </div>

                        <h2 className="text-gray-900 text-lg title-font font-medium">
                          {diet_name}
                        </h2>
                      </div>

                      <div className="flex-grow mb-3">
                        <p className="leading-relaxed text-base">
                          {description}
                        </p>
                        <a className="mt-3 text-green-500 inline-flex items-center">
                          Lista de productos
                          <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="w-4 h-4 ml-2"
                            viewBox="0 0 24 24"
                          >
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                          </svg>
                        </a>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            )}
          />
        </div>
      </section>
      <ModalDiet />
    </>
  );
};
