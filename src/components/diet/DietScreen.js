import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchResults from 'react-filter-search';
import { Link } from 'react-router-dom';
import { ModalDiet } from './ModalDiet';
import { ModalAliment } from './ModalAliment';

import {
  DietsLoaded,
  oneDietDelete,
  AlimentsLoaded,
  dietSetActive,
  dietClearActive
} from '../../actions/DietAction';
import { UseForm } from '../../hooks/UseForm';
import { uiOpenModalDiet, uiOpenModalAliment } from '../../actions/UIAction';
import Swal from 'sweetalert2';

export const DietScreen = () => {
  const dispatch = useDispatch();
  const { diets } = useSelector((state) => state.diet);

  useEffect(() => {
    dispatch(DietsLoaded());
  }, [dispatch]);

  const [formValues, handleInputChange] = UseForm({
    filter: ''
  });

  const { filter } = formValues;

  const onSelectAliment = (diet) => {
    dispatch(AlimentsLoaded(diet._id));
    dispatch(dietSetActive(diet));
    dispatch(uiOpenModalAliment());
  };
  const onSelectDeleteOneDiet = (diet) => {
    dispatch(dietSetActive(diet));
    deleteDiet(diet);
  };

  const deleteDiet = (dietId) => {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'La dieta no se volerá a recuperar',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#A0A0A0',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        dispatch(oneDietDelete(dietId));
      } else {
        dispatch(dietClearActive());
      }
    });
  };

  return (
    <>
      <div className="container px-4 lg:px-8 py-4 lg:py-6 mt-4 mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link
          to="/ganado"
          className="inline-flex justify-center items-center m-3 px-1 py-18 rounded-lg"
        >
          <i className="fas fa-arrow-circle-left text-blue-600 text-2xl hover:text-blue-800 "></i>
          <span className="text-xl text-blue-600 hover:underline ml-1">Animales</span>
        </Link>

        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center md:flex md:space-x-4 space-y-2 md:space-y-0"></nav>

        <Link
          to="/productos"
          className="inline-flex justify-center items-center m-3 px-1 py-18 rounded-lg"
        >
          <span className="text-xl text-blue-600 hover:underline mr-1">Productos</span>
          <i className="fas fa-arrow-circle-right text-blue-600 text-2xl hover:text-blue-800"></i>
        </Link>
      </div>
      <section className="text-gray-600 body-font">
        <div className="container px-4 py-4 mx-auto">
          <div className="flex flex-col text-center w-full mb-4">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-green-700">Dietas</h1>
            <h2 className="text-xs text-green-700 tracking-widest font-medium title-font mb-1">
              PARA EL GANADO
            </h2>
          </div>

          <button
            onClick={() => dispatch(uiOpenModalDiet())}
            className="bg-green-500 text-white active:bg-gray-600 font-bold uppercase text-sm px-4 py-2 rounded-2xl shadow transform hover:scale-110 motion-reduce:transform-none mr-1 mb-1"
            type="button"
            style={{ transition: 'all .15s ease' }}
          >
            Crear dieta
          </button>

          <input
            type="text"
            name="filter"
            className="rounded-lg w-1/4 h-4 p-4 placeholder-blue-gray-600 text-black focus:outline-none bg-gray-200"
            placeholder="Buscar"
            value={filter}
            onChange={handleInputChange}
          />
          <SearchResults
            value={filter}
            data={diets}
            renderResults={(results) => (
              <div className="flex flex-wrap m-2">
                {results.map((diet) => (
                  <div key={diet._id} className="p-4 md:w-1/3">
                    <div className="flex rounded-lg h-full bg-gray-600 p-8 flex-col group">
                      <div className="flex items-center ">
                        <div className="mr-2 inline-flex group-hover:text-red-400 items-center justify-center rounded-full text-gray-600 flex-shrink-0 ">
                          <button
                            onClick={() => onSelectDeleteOneDiet(diet)}
                            className="text-gray text-xl"
                            type="button"
                            style={{ transition: 'all .50s ease' }}
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </div>

                        <h2 className="text-white text-lg title-font font-medium">
                          {diet.diet_name}
                        </h2>
                      </div>

                      <div className="flex-grow mb-3">
                        <p className="leading-relaxed text-base text-gray-200">
                          {diet.description}
                        </p>
                        <button
                          onClick={() => onSelectAliment(diet)}
                          className="mt-3 text-green-500 inline-flex items-center hover:text-green-200"
                        >
                          Alimentos
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
                        </button>
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
      <ModalAliment />
    </>
  );
};
