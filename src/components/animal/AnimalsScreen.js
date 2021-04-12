import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  animalsByTypeLoading,
  regMilk,
  regWeight,
} from "../../actions/AnimalAction";
import SearchResults from "react-filter-search";
import { UseForm } from "../../hooks/UseForm";
import Swal from "sweetalert2";
import { moment } from "moment";
import { Link } from "react-router-dom";

export const AnimalsScreen = () => {
  const dispatch = useDispatch();
  const [openTab, setOpenTab] = React.useState(1);

  let dateNow = new Date();

  const { animals, total } = useSelector((state) => state.animal);

  useEffect(() => {
    dispatch(animalsByTypeLoading());
  }, [dispatch]);

  const [formValues, handleInputChange] = UseForm({
    filter: "",
    filterInWeight: "",
    filterMilk: "",
    filterCalving: "",
  });

  const { filter, filterInWeight, filterMilk, filterCalving } = formValues;

  const registerMilk = async (animalID) => {
    const { value: formValues } = await Swal.fire({
      title: "Registrar litros de leche",
      html:
        ` <label className="text-gray-700 text-bold">Litros</label>` +
        '<input id="swal-input1" class="swal2-input">',
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, registrar",
      cancelButtonText: "Cancelar",
      focusConfirm: false,
      preConfirm: () => {
        return document.getElementById("swal-input1").value;
      },
    });

    if (formValues) {
      dispatch(
        regMilk(animalID, formValues, moment(dateNow).format("YYYY-MM-DD"))
      );
    }
  };

  const registerWeight = async (animalID) => {
    const { value: formValues } = await Swal.fire({
      title: "Registrar litros de leche",
      html:
        ` <label className="text-gray-700 text-bold">Peso</label> <br/>` +
        '<input id="swal-input1" type="number" class="swal2-input"> <br/>' +
        ` <label className="text-gray-700 text-bold">Observaciones</label> <br/>` +
        '<input id="swal-input2" type="textarea" class="swal2-input">',
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, registrar",
      cancelButtonText: "Cancelar",
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById("swal-input1").value,
          document.getElementById("swal-input2").value,
        ];
      },
    });

    if (formValues) {
      dispatch(
        regWeight(animalID, formValues, moment(dateNow).format("YYYY-MM-DD"))
      );
    }
  };

  return (
    <>
      <div className="bg-gradient-to-r from-green-400 rounded-lg px-4 lg:px-8 py-4 lg:py-6 mt-8 flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-12">
        <div>
          <h2 className="text-2xl text-green-900">ANIMALES</h2>
          <p className="text-green-900 opacity-80">Funcionalidades principales</p>
        </div>
        <nav className="md:flex md:space-x-4 space-y-2 md:space-y-0 text-lg text-gray-200">
          <button className="inline-flex flex-col justify-center items-center m-1 px-3 py-3 bg-green-900 rounded-lg hover:bg-green-700 w-35 fas fa-hand-holding-usd">
            <span>Realizar algo</span>
          </button>
          <Link
            to="/dieta"
            className="inline-flex flex-col justify-center items-center m-1 px-3 py-3 bg-green-900 rounded-lg hover:bg-green-700 w-35 fas fa-seedling"
          >
            <span>Listar Dietas </span>
          </Link>
          <button className="inline-flex flex-col justify-center items-center m-1 px-3 py-3 bg-green-900 rounded-lg hover:bg-green-700 w-35 fas fa-strikethrough">
            <span>Listar algo2</span>
          </button>
        </nav>
      </div>

      <div className="flex flex-col text-center w-full mt-6 mb-6">
        <h2 className="text-sm text-green-500 tracking-widest font-medium title-font mb-1">
          Listar por:
        </h2>

        <div>
          <select
            onChange={(e) => dispatch(animalsByTypeLoading(e.target.value))}
            className="bg-gray-200 text-gray-900 font-bold text-xl py-2 px-2 rounded-lg inline-flex  group-hover:bg-green-700 group-hover:text-white uppercase"
          >
            <option
              value="Ganado estabulado"
              className="pt-6 bg-gray-300 text-base text-gray-700 font-semibold"
            >
              Ganado estabulado
            </option>
            <option
              value="Vaca lechera"
              className="bg-gray-300 text-base text-gray-700 font-semibold"
            >
              Vacas lecheras
            </option>
            <option
              value="Vaca de cria"
              className="bg-gray-300 text-base text-gray-700 font-semibold"
            >
              Vacas de cria
            </option>
            <option
              value="Toro padrote"
              className="bg-gray-300 text-base text-gray-700 font-semibold"
            >
              Toros padrote
            </option>
            <option
              value="Ternero"
              className="bg-gray-300 text-base text-gray-700 font-semibold"
            >
              Terneros
            </option>
            <option
              value="Novilla"
              className="bg-gray-300 text-base text-gray-700 font-semibold"
            >
              Novillas
            </option>
            <option
              value="Caballo"
              className="bg-gray-300 text-base text-gray-700 font-semibold"
            >
              Caballos
            </option>
            <option
              value="Mula"
              className="bg-gray-300 text-base text-gray-700 font-semibold"
            >
              Mulas
            </option>
            <option
              value="Yegua"
              className="bg-gray-300 text-base text-gray-700 font-semibold"
            >
              Yeguas
            </option>
            <option
              value="Burro"
              className="bg-gray-300 text-base text-gray-700 font-semibold"
            >
              Burros
            </option>
          </select>
        </div>
      </div>

      {animals.length !== 0 ? (
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
                  <section
                    className="bg-gray-700 body-font mb-6 rounded-lg overflow-hidden "
                    role="tablist"
                    key={animal._id}
                  >
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
                            <a
                              className={`flex-grow border-b-2 ${
                                openTab === 1 && `border-green-500`
                              } py-2 px-1`}
                              onClick={(e) => {
                                e.preventDefault();
                                setOpenTab(1);
                              }}
                              data-toggle="tab"
                              href="#link1"
                              role="tablist"
                            >
                              Informacion
                            </a>
                            <a
                              className={`flex-grow border-b-2 ${
                                openTab === 2 && `border-green-500`
                              } py-2 px-1`}
                              onClick={(e) => {
                                e.preventDefault();
                                setOpenTab(2);
                              }}
                              data-toggle="tab"
                              href="#link2"
                              role="tablist"
                            >
                              Peso
                            </a>
                            <a
                              hidden={
                                animal.gender === "Macho" &&
                                animal.gender !== "Vaca lechera"
                              }
                              className={`flex-grow border-b-2 ${
                                openTab === 3 && `border-green-500`
                              } py-2 px-1`}
                              onClick={(e) => {
                                e.preventDefault();
                                setOpenTab(3);
                              }}
                              data-toggle="tab"
                              href="#link3"
                              role="tablist"
                            >
                              Leche
                            </a>
                            <a
                              hidden={animal.gender === "Macho"}
                              className={`flex-grow border-b-2 ${
                                openTab === 4 && `border-green-500`
                              } py-2 px-1`}
                              onClick={(e) => {
                                e.preventDefault();
                                setOpenTab(4);
                              }}
                              data-toggle="tab"
                              href="#link4"
                              role="tablist"
                            >
                              Partos
                            </a>
                          </div>
                          <div
                            className={`overflow-y-auto h-72 bg-gray-600 rounded-lg ${
                              openTab === 1 ? "block" : "hidden"
                            }`}
                            id="link1"
                          >
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

                            <div
                              className={`flex border-t border-gray-200 py-2 ${
                                !animal.race && "hidden"
                              }`}
                            >
                              <span className="ml-2">Raza</span>
                              <span className="ml-auto mr-2">
                                {animal.race}
                              </span>
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
                              <span className="ml-auto mr-2">
                                {animal.name}
                              </span>
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
                          <div
                            className={`overflow-y-auto h-72 bg-gray-800 rounded-lg ${
                              openTab === 2 ? "block" : "hidden"
                            }`}
                            id="link2"
                          >
                            <input
                              type="text"
                              name="filterInWeight"
                              className="h-6 p-2 w-full placeholder-blue-800 text-black mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-60"
                              placeholder="Buscar por ..."
                              value={filterInWeight}
                              onChange={handleInputChange}
                            />
                            <SearchResults
                              value={filterInWeight}
                              data={animal.weight}
                              renderResults={(results) => (
                                <div>
                                  {results.map((weight) => (
                                    <div
                                      key={weight._id}
                                      className="rounded-lg m-1 text-sm  bg-gray-600"
                                    >
                                      <div className="flex">
                                        <span className="ml-2">Fecha</span>
                                        <span className="ml-auto mr-2">
                                          {weight.date}
                                        </span>
                                      </div>
                                      <div className="flex border-t border-gray-400">
                                        <span className="ml-2">Peso</span>
                                        <span className="ml-auto mr-2">
                                          {weight.weight} kg
                                        </span>
                                      </div>
                                      <div className="flex border-t ml-2 mr-2 border-gray-400">
                                        {weight.observations}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            />
                          </div>

                          <div
                            className={`overflow-y-auto h-72 bg-gray-800 rounded-lg ${
                              openTab === 3 ? "block" : "hidden"
                            }`}
                            id="link3"
                          >
                            <input
                              type="text"
                              name="filterMilk"
                              className="h-6 p-2 w-full placeholder-blue-800 text-black mb-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-60"
                              placeholder="Buscar por ..."
                              value={filterMilk}
                              onChange={handleInputChange}
                            />
                            <SearchResults
                              value={filterMilk}
                              data={animal.milk}
                              renderResults={(results) => (
                                <div>
                                  {results.map((milk) => (
                                    <div
                                      key={milk._id}
                                      className="rounded-lg m-2 text-sm  bg-gray-600"
                                    >
                                      <div className="flex">
                                        <span className="ml-2">Fecha</span>
                                        <span className="ml-auto mr-2">
                                          {milk.registration_date}
                                        </span>
                                      </div>
                                      <div className="flex border-t border-gray-400">
                                        <span className="ml-2">Litros</span>
                                        <span className="ml-auto mr-2">
                                          {milk.liters}L
                                        </span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            />
                          </div>

                          <div
                            className={`overflow-y-auto h-72 bg-gray-800 rounded-lg ${
                              openTab === 4 ? "block" : "hidden"
                            }`}
                            id="link4"
                          >
                            <input
                              type="text"
                              name="filterCalving"
                              className="h-6 p-2 w-full placeholder-blue-800 text-black mb-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-60"
                              placeholder="Buscar por ..."
                              value={filterCalving}
                              onChange={handleInputChange}
                            />
                            <SearchResults
                              value={filterCalving}
                              data={animal.calving}
                              renderResults={(results) => (
                                <div>
                                  {results.map((calving) => (
                                    <div
                                      key={calving._id}
                                      className="rounded-lg m-2 text-sm  bg-gray-600"
                                    >
                                      <div className="flex">
                                        <span className="ml-2">Fecha</span>
                                        <span className="ml-auto mr-2">
                                          {calving.date}
                                        </span>
                                      </div>
                                      <div className="flex border-t border-gray-400">
                                        <span className="ml-2">Parto</span>
                                        <span className="ml-auto mr-2">
                                          {calving.calving_number}
                                        </span>
                                      </div>
                                      <div className="flex ml-2 border-t border-gray-400">
                                        {calving.complications}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            />
                          </div>
                          <div className="flex pt-4">
                            <span
                              hidden={openTab !== 2}
                              className="text-semibold"
                            >
                              {`Registros: ${animal.weight.length}`}
                            </span>
                            <span
                              hidden={openTab !== 3}
                              className="text-semibold"
                            >
                              {`Registros: ${animal.milk.length}`}
                            </span>
                            <span
                              hidden={openTab !== 4}
                              className="text-semibold"
                            >
                              {`Registros: ${animal.calving.length}`}
                            </span>
                            <div hidden={openTab !== 1} className="ml-auto">
                              <button className="flex text-white font-semibold bg-white text-gray-800 border-0 py-1 px-2 focus:outline-none hover:bg-blue-400 rounded">
                                Editar
                              </button>
                            </div>
                            <div hidden={openTab !== 2} className="ml-auto">
                              <button
                                onClick={() => registerWeight(animal._id)}
                                className="flex text-white font-semibold bg-white text-gray-800 border-0 py-1 px-2 focus:outline-none hover:bg-blue-400 rounded"
                              >
                                Registrar peso
                              </button>
                            </div>
                            <div hidden={openTab !== 3} className="ml-auto">
                              <button
                                onClick={() => registerMilk(animal._id)}
                                className="flex text-white font-semibold bg-white text-gray-800 border-0 py-1 px-2 focus:outline-none hover:bg-blue-400 rounded"
                              >
                                Registrar leche
                              </button>
                            </div>
                            <div hidden={openTab !== 4} className="ml-auto">
                              <button className="flex text-white font-semibold bg-white text-gray-800 border-0 py-1 px-2 focus:outline-none hover:bg-blue-400 rounded">
                                Registrar parto
                              </button>
                            </div>
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
      ) : (
        <span className="ml-2 text-gray-400 whitespace-nowrap italic">
          - ( No se encontraron animales registrados ) -
        </span>
      )}
    </>
  );
};