import React, { useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { animalsByTypeLoading } from "../../actions/AnimalAction";
import SearchResults from "react-filter-search";
import { UseForm } from "../../hooks/UseForm";
import { Link } from "react-router-dom";

export const AnimalsScreen = () => {
  const dispatch = useDispatch();
  const { animals, animalsState, animalsType, total } = useSelector(
    (state) => state.animal
  );

  useEffect(() => {
    dispatch(animalsByTypeLoading());
  }, [dispatch]);

  const [formValues, handleInputChange] = UseForm({
    filter: "",
  });

  const { filter } = formValues;

  return (
    <>
      <div className="bg-green-700 rounded-lg px-4 lg:px-8 py-4 lg:py-6 mt-8 flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-12">
        <div>
          <h2 className="text-2xl">ANIMALES</h2>
          <p className="text-blue-100 opacity-70">
            Funcionalidades principales
          </p>
        </div>
        <nav className="md:flex md:space-x-4 space-y-2 md:space-y-0 text-lg text-gray-200">
          <button className="inline-flex flex-col justify-center items-center m-1 px-3 py-3 bg-green-800 rounded-lg hover:bg-gray-800 w-35 fas fa-hand-holding-usd">
            <span>Realizar algo</span>
          </button>
          <button className="inline-flex flex-col justify-center items-center m-1 px-3 py-3 bg-green-800 rounded-lg hover:bg-gray-800 w-35 fas fa-chart-line">
            <span>Listar algo</span>
          </button>
          <button className="inline-flex flex-col justify-center items-center m-1 px-3 py-3 bg-green-800 rounded-lg hover:bg-gray-800 w-35 fas fa-strikethrough">
            <span>Listar algo2</span>
          </button>
        </nav>
      </div>

      <div className="flex flex-col text-center w-full mt-6 mb-6">
        <h2 className="text-sm text-green-500 tracking-widest font-medium title-font mb-1">
          Listar por:
        </h2>

        <div>
          <select className="bg-gray-200 text-gray-700 font-bold text-xl py-2 px-2 rounded-lg inline-flex  group-hover:bg-green-600 group-hover:text-white uppercase">
            <option className="pt-6 bg-gray-300 text-gray-700 font-semibold">
              Ganado estabulado
            </option>
            <option className="bg-gray-300 text-gray-700 font-semibold">
              Vaca lechera
            </option>
            <option className="bg-gray-300 text-gray-700 font-semibold">
              Vaca de cria
            </option>
            <option className="bg-gray-300 text-gray-700 font-semibold">
              Toro padrote
            </option>
            <option className="bg-gray-300 text-gray-700 font-semibold">
              Ternero
            </option>
            <option className="bg-gray-300 text-gray-700 font-semibold">
              Novilla
            </option>
            <option className="bg-gray-300 text-gray-700 font-semibold">
              Caballo
            </option>
            <option className="bg-gray-300 text-gray-700 font-semibold">
              Mula
            </option>
            <option className="bg-gray-300 text-gray-700 font-semibold">
              Yegua
            </option>
            <option className="bg-gray-300 text-gray-700 font-semibold">
              Burro
            </option>
          </select>
        </div>
      </div>

      <div className="mt-6">
        <input
          type="text"
          name="filter"
          className="rounded-t-lg h-6 p-5 placeholder-blue-800 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-60"
          placeholder="Filtrar por ..."
          value={filter}
          onChange={handleInputChange}
        />
        <span
          className={`text-white md:ml-2 rounded-t-lg  inline-block text uppercase`}
        >
          <i className="fas fa-box-open"></i> {`total: ${total}`}
        </span>
        <SearchResults
          value={filter}
          data={animals}
          renderResults={(results) => (
            <div>
              {results.map((animal) => (
                <section className="bg-gray-700 body-font mb-6 rounded-lg overflow-hidden">
                  <div className="container px-5 py-4 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                      <div className="lg:w-1/2 w-full lg:pr-10 lg:py-1 mb-2 lg:mb-0">
                        <h1 className="title-font font-bold">
                          <span
                            className={`bg-green-200 text-green-700 rounded-full px-3 py-1 inline-block text-center uppercase`}
                          >
                            Numero de chapa: {animal.plate_number}
                          </span>
                        </h1>
                        <div className="flex mb-4">
                          <Link
                            to="/"
                            className="flex-grow border-b-2 border-green-500 py-2 text-lg px-1"
                          >
                            Informacion
                          </Link>
                          <Link
                            to="/"
                            hidden={animal.gender === "Hembra"}
                            className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1"
                          >
                            Registro de peso
                          </Link>
                          <Link
                            to="/"
                            hidden={
                              animal.gender === "Macho" &&
                              animal.gender !== "Vaca lechera"
                            }
                            className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1"
                          >
                            Leche
                          </Link>
                          <Link
                            to="/"
                            hidden={animal.gender === "Macho"}
                            className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1"
                          >
                            Partos
                          </Link>
                        </div>
                        <div className="overflow-y-auto h-72 bg-gray-600 rounded-lg">
                          <div className="flex py-2">
                            <span className="ml-2">Estado</span>
                            <span className="ml-auto mr-2">
                              {animal.status}
                            </span>
                          </div>
                          <div className="flex border-t border-gray-200 py-2">
                            <span className="ml-2">Fecha de registro</span>
                            <span className="ml-auto mr-2">
                              {animal.date_admission}
                            </span>
                          </div>
                          <div className="flex border-t border-gray-200 py-2">
                            <span className="ml-2">Registrado por</span>
                            <span className="ml-auto mr-2">{`${animal.administrator.name} ${animal.administrator.surname}`}</span>
                          </div>
                          <div
                            className={`flex border-t border-gray-200 py-2 ${
                              !animal.race && "hidden"
                            }`}
                          >
                            <span className="ml-2">Raza</span>
                            <span className="ml-auto mr-2">{animal.race}</span>
                          </div>

                          <div
                            className={`flex border-t border-gray-200 py-2 ${
                              !animal.photo_register && "hidden"
                            }`}
                          >
                            <span className="ml-2">Foto de registro</span>
                            <span className="ml-auto mr-2">
                              {animal.photo_register}
                            </span>
                          </div>

                          <div
                            className={`flex border-t border-gray-200 py-2 ${
                              !animal.name && "hidden"
                            }`}
                          >
                            <span className="ml-2">Nombre</span>
                            <span className="ml-auto mr-2">{animal.name}</span>
                          </div>
                          <div
                            className={`flex border-t border-gray-200 py-2 ${
                              !animal.next_due_date && "hidden"
                            }`}
                          >
                            <span className="ml-2">Proximo parto</span>
                            <span className="ml-auto mr-2">
                              {animal.next_due_date}
                            </span>
                          </div>
                          <div
                            className={`flex border-t border-gray-200 py-2 ${
                              !animal.age && "hidden"
                            }`}
                          >
                            <span className="ml-2">Edad</span>
                            <span className="ml-auto mr-2">{animal.age}</span>
                          </div>

                          <div
                            className={`flex border-t border-gray-200 py-2 ${
                              !animal.daughter_of && "hidden"
                            }`}
                          >
                            <span className="ml-2">
                              {animal.gender === "Macho"
                                ? "Hijo de"
                                : "Hija de"}
                            </span>
                            <span className="ml-auto mr-2">
                              {animal.daughter_of
                                ? animal.daughter_of.plate_number
                                : "Sin padres"}
                            </span>
                          </div>
                          <div
                            className={`flex border-t border-gray-200 py-2 ${
                              !animal.starting_weight && "hidden"
                            }`}
                          >
                            <span className="ml-2">Peso inical</span>
                            <span className="ml-auto mr-2">
                              {new Intl.NumberFormat("en-EN").format(
                                animal.starting_weight
                              )}{" "}
                              kg
                            </span>
                          </div>

                          <div
                            className={`flex border-t border-gray-200 py-2 ${
                              !animal.place_origin && "hidden"
                            }`}
                          >
                            <span className="ml-2">Lugar de origen </span>
                            <span className="ml-auto mr-2">
                              {animal.place_origin}
                            </span>
                          </div>

                          <div
                            className={`flex border-t border-gray-200 py-2 ${
                              !animal.gender && "hidden"
                            }`}
                          >
                            <span className="ml-2">Genero</span>
                            <span className="ml-auto mr-2">
                              {animal.gender}
                            </span>
                          </div>
                        </div>
                        <div className="flex pt-4">
                          <span className="title-font font-medium text-2xl ">
                            $58.00
                          </span>
                          <button className="flex ml-auto text-white font-semibold bg-yellow-600 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded">
                            Editar
                          </button>
                        </div>
                      </div>
                      <img
                        alt="ecommerce"
                        className="lg:w-1/2 w-full lg:h-96 h-64 sm:mt-14 object-cover object-center rounded"
                        src="https://picsum.photos/seed/cow/300/300"
                      />
                    </div>
                  </div>
                </section>
              ))}
            </div>
          )}
        />
      </div>
    </>
  );
};
