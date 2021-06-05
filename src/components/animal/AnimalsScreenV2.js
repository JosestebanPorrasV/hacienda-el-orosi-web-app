import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  animalsByTypeLoading,
  animalsByStatusLoading,
  animalsByStatusAndTypeLoading,
  regMilk,
  regWeight,
  typeClearActive,
  typeSetActive,
  TypesLoading,
  animalSetActive,
  searchSetActive,
  animalClearActive,
  changeStatus,
  deleteRegisterWeight,
  deleteRegisterMilk,
  deleteRegisterCalving
} from '../../actions/AnimalAction';
import SearchResults from 'react-filter-search';
import { UseForm } from '../../hooks/UseForm';
import Swal from 'sweetalert2';
import { uiOpenModalAnimal } from '../../actions/UIAction';
import { Link } from 'react-router-dom';
import { ModalAnimal } from './ModalAnimal';
import moment from 'moment';
import UploadImgProfile from './UploadImgProfile';
import RegisterCalving from './RegisterCalving';
import ChangeNextDueDate from './ChangeNextDueDate';

export const AnimalsScreenV2 = () => {
  const dispatch = useDispatch();
  const [openTab, setOpenTab] = React.useState(1);

  const { animals, animalsTypes, currentType, animalState } = useSelector((state) => state.animal);

  useEffect(() => {
    dispatch(TypesLoading());
    dispatch(animalsByTypeLoading());
  }, [dispatch]);

  const [formValues, handleInputChange] = UseForm({
    filter: '',
    filterInWeight: '',
    filterMilk: '',
    filterCalving: ''
  });

  const { filter, filterInWeight, filterMilk, filterCalving } = formValues;

  const registerMilk = async (animalID) => {
    const { value: formValues } = await Swal.fire({
      title: 'Registrar litros de leche',
      html:
        ` <label className="text-gray-700 text-bold">Litros</label>` +
        '<input id="swal-inputMilk" class="swal2-input">',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, registrar',
      cancelButtonText: 'Cancelar',
      focusConfirm: false,
      preConfirm: () => {
        return document.getElementById('swal-inputMilk').value;
      }
    });

    if (formValues) {
      dispatch(regMilk(animalID, formValues, moment(new Date()).format('YYYY-MM-DD')));
    }
  };

  const registerWeight = async (animalID) => {
    const { value: formValues } = await Swal.fire({
      title: 'Registrar peso',
      html:
        ` <label className="text-gray-700 text-bold">Peso</label> <br/>` +
        '<input id="swal-input1Weight" type="number" class="swal2-input"> <br/>' +
        ` <label className="text-gray-700 text-bold">Observaciones</label> <br/>` +
        '<input id="swal-inputObs" type="textarea" class="swal2-input">',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, registrar',
      cancelButtonText: 'Cancelar',
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById('swal-input1Weight').value,
          document.getElementById('swal-inputObs').value
        ];
      }
    });

    if (formValues) {
      dispatch(regWeight(animalID, formValues, moment(new Date()).format('YYYY-MM-DD')));
    }
  };

  const regAnimal = () => {
    dispatch(typeClearActive());
    dispatch(animalClearActive());
    dispatch(uiOpenModalAnimal());
  };

  const editAnimal = (animal) => {
    dispatch(typeSetActive(animal.type._id));
    animal.daughter_of && dispatch(searchSetActive(animal.daughter_of));
    dispatch(animalSetActive(animal));
    dispatch(uiOpenModalAnimal());
  };

  const setTypeActive = (typeID) => {
    dispatch(typeClearActive);
    dispatch(typeSetActive(typeID));
    dispatch(animalsByTypeLoading(typeID));
  };

  const oneDeleteWeight = (animalId, weightId) => {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'El peso no se podra recuperar',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#A0A0A0',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        dispatch(deleteRegisterWeight(animalId, weightId));
      }
    });
  };

  const oneDeleteMilk = (animalId, milkId) => {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'El registro de leche no se podra recuperar',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#A0A0A0',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        dispatch(deleteRegisterMilk(animalId, milkId));
      }
    });
  };

  const oneDeleteCalving = (animalId, calvingId) => {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'El parto no se podra recuperar',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#A0A0A0',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        dispatch(deleteRegisterCalving(animalId, calvingId));
      }
    });
  };

  return (
    <>
      <div className="container px-4 py-4 mx-auto flex flex-wrap flex-col md:flex-row items-center">
        <Link
          to="/herramientas"
          className="inline-flex justify-center items-center px-1 rounded-lg"
        >
          <i className="fas fa-arrow-circle-left text-blue-600 text-2xl hover:text-blue-800 "></i>
          <span className="text-xl text-blue-600 hover:underline ml-1">Herramientas</span>
        </Link>

        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center md:flex md:space-x-4 space-y-2 md:space-y-0">
          <Link
            to="/ganado-funcional"
            className="bg-green-500 text-white active:bg-gray-600 font-bold uppercase text-sm px-4 py-2 rounded-2xl shadow transform hover:scale-110 motion-reduce:transform-none mr-1 mb-1"
            type="button"
            style={{ transition: 'all .15s ease' }}
          >
            Cambiar vista
          </Link>
          <button
            className="bg-green-500 text-white active:bg-gray-600 font-bold uppercase text-sm px-4 py-2 rounded-2xl shadow transform hover:scale-110 motion-reduce:transform-none mr-1 mb-1"
            type="button"
            style={{ transition: 'all .15s ease' }}
            onClick={() => regAnimal()}
          >
            Registrar
          </button>
          <Link
            to="/tipos-de-ganado"
            className="bg-green-500 text-white active:bg-gray-600 font-bold uppercase text-sm px-4 py-2 rounded-2xl shadow transform hover:scale-110 motion-reduce:transform-none mr-1 mb-1"
            type="button"
            style={{ transition: 'all .15s ease' }}
          >
            Tipos
          </Link>

          <button
            onClick={() =>
              dispatch(
                currentType
                  ? animalsByStatusAndTypeLoading(currentType._id, 'FINCA')
                  : animalsByStatusLoading('FINCA')
              )
            }
            className="bg-green-500 text-white active:bg-gray-600 font-bold uppercase text-sm px-4 py-2 rounded-2xl shadow transform hover:scale-110 motion-reduce:transform-none mr-1 mb-1"
            style={{ transition: 'all .15s ease' }}
          >
            <span>En finca</span>
          </button>

          <button
            onClick={() =>
              dispatch(
                currentType
                  ? animalsByStatusAndTypeLoading(currentType._id, 'ELIMINADO')
                  : animalsByStatusLoading('ELIMINADO')
              )
            }
            className="bg-green-500 text-white active:bg-gray-600 font-bold uppercase text-sm px-4 py-2 rounded-2xl shadow transform hover:scale-110 motion-reduce:transform-none mr-1 mb-1"
            style={{ transition: 'all .15s ease' }}
          >
            <span>De baja</span>
          </button>

          <button
            onClick={() =>
              dispatch(
                currentType
                  ? animalsByStatusAndTypeLoading(currentType._id, 'VENDIDO')
                  : animalsByStatusLoading('VENDIDO')
              )
            }
            className="bg-green-500 text-white active:bg-gray-600 font-bold uppercase text-sm px-4 py-2 rounded-2xl shadow transform hover:scale-110 motion-reduce:transform-none mr-1 mb-1"
            style={{ transition: 'all .15s ease' }}
          >
            <span>Vendidos</span>
          </button>
        </nav>
        <Link to="/dietas" className="inline-flex justify-center items-center px-1 rounded-lg">
          <span className="text-xl text-blue-600 hover:underline mr-1"> Dietas</span>
          <i className="fas fa-arrow-circle-right text-blue-600 text-2xl hover:text-blue-800"></i>
        </Link>
      </div>

      <div className="flex flex-col text-center w-full mt-4 mb-4">
        <h2 className="text-sm text-green-500 tracking-widest font-medium title-font mb-1">
          Listar por:
        </h2>

        <div>
          <select
            onChange={(e) => setTypeActive(e.target.value)}
            name="types"
            className="bg-gray-200 text-gray-900 font-semibold  py-1 px-1 rounded-lg inline-flex  group-hover:bg-green-700 group-hover:text-white uppercase"
          >
            {animalsTypes.map((option) => (
              <option
                key={option._id}
                value={option._id}
                className="bg-gray-300 text-gray-700 font-semibold"
              >
                {option.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {animals.length !== 0 ? (
        <div className="overflow-y-auto h-screen bg-white text-gray-800 mt-2">
          <input
            type="text"
            name="filter"
            className="px-4 py-2 text-blue-900 border-2 border-gray-400  placeholder-blue-800 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
            placeholder="Buscar"
            value={filter}
            onChange={handleInputChange}
          />
          <span className={`text-gray-800 md:ml-2 rounded-t-lg  inline-block text uppercase`}>
            <i className="fas fa-box-open"></i>{' '}
            {animalState ? `${animalState}, total: ${animals.length}` : `total: ${animals.length}`}
          </span>
          <SearchResults
            value={filter}
            data={animals}
            renderResults={(results) => (
              <>
                {results.map((animal) => (
                  <section
                    className="bg-gradient-to-l from-gray-400  border-gray-400 rounded-lg mb-4 overflow-hidden "
                    key={animal._id}
                  >
                    <div className="container px-5 py-2 mx-auto">
                      <div className="mx-auto flex flex-wrap">
                        <div className="lg:w-1/2 w-full lg:pr-5">
                          <h1 className="title-font font-bold">
                            <span
                              className={`${
                                animal.plate_color === '#FFFFFF'
                                  ? 'text-gray-800'
                                  : 'text-gray-200 '
                              } rounded-full px-3 py-1 mt-2 mb-2 inline-block text-center uppercase`}
                              style={{ backgroundColor: animal.plate_color }}
                            >
                              Número de chapa: {animal.plate_number}
                            </span>
                          </h1>
                          <div className="flex mb-4">
                            <a
                              className={`flex-grow border-b-2 ${
                                openTab === 1 && `border-green-600`
                              } px-1`}
                              onClick={(e) => {
                                e.preventDefault();
                                setOpenTab(1);
                              }}
                              data-toggle="tab"
                              href={1}
                            >
                              Información
                            </a>
                            <a
                              className={`flex-grow border-b-2 ${
                                openTab === 2 && `border-green-600`
                              } py-2 px-1`}
                              onClick={(e) => {
                                e.preventDefault();
                                setOpenTab(2);
                              }}
                              data-toggle="tab"
                              href={2}
                            >
                              Peso
                            </a>
                            <a
                              hidden={
                                animal.type.gender === 'Macho' &&
                                animal.type.gender !== 'Vaca lechera'
                              }
                              className={`flex-grow border-b-2 ${
                                openTab === 3 && `border-green-600`
                              } py-2 px-1`}
                              onClick={(e) => {
                                e.preventDefault();
                                setOpenTab(3);
                              }}
                              data-toggle="tab"
                              href={3}
                            >
                              Leche
                            </a>
                            <a
                              hidden={animal.type.gender === 'Macho'}
                              className={`flex-grow border-b-2 ${
                                openTab === 4 && `border-green-600`
                              } py-2 px-1`}
                              onClick={(e) => {
                                e.preventDefault();
                                setOpenTab(4);
                              }}
                              data-toggle="tab"
                              href={4}
                            >
                              Partos
                            </a>
                          </div>

                          <div
                            className={`overflow-y-auto rounded-lg ${
                              openTab === 1 ? 'block' : 'hidden'
                            }`}
                          >
                            <div className="flex py-2">
                              <span className="ml-2">Estado</span>

                              <select
                                onChange={(e) => dispatch(changeStatus(animal._id, e.target.value))}
                                name="type_animal"
                                className="ml-auto mr-2 hover:underline font-bold bg-transparent"
                              >
                                <option value={animal.status}> {animal.status}</option>
                                <option value="Vendido">Vendido</option>
                                <option value="En finca">En finca</option>
                                <option value="De baja">De baja</option>
                              </select>
                            </div>
                            <div className="flex border-t border-green-800 py-2">
                              <span className="ml-2">Categoría</span>
                              <span className="ml-auto mr-2">{animal.type.name}</span>
                            </div>
                            <div className="flex border-t border-green-800 py-2">
                              <span className="ml-2">Fecha de registro</span>
                              <span className="ml-auto mr-2">{animal.date_admission}</span>
                            </div>

                            <div
                              className={`flex border-t border-green-800 py-2 ${
                                !animal.race && 'hidden'
                              }`}
                            >
                              <span className="ml-2">Raza</span>
                              <span className="ml-auto mr-2">{animal.race}</span>
                            </div>

                            <div
                              className={`flex border-t border-green-800 py-2 ${
                                !animal.photo_register && 'hidden'
                              }`}
                            >
                              <span className="ml-2">Foto de registro</span>
                              <a
                                className="ml-auto mr-2 hover:underline"
                                href={animal.photo_register}
                              >
                                <span>DESCARGAR</span>
                              </a>
                            </div>

                            <div
                              className={`flex border-t border-green-800 py-2 ${
                                !animal.name && 'hidden'
                              }`}
                            >
                              <span className="ml-2">Nombre</span>
                              <span className="ml-auto mr-2">{animal.name}</span>
                            </div>
                            <div
                              className={`flex border-t border-green-800 py-2 ${
                                !animal.next_due_date && 'hidden'
                              }`}
                            >
                              <span className="ml-2">Próximo parto</span>
                              <span className="ml-auto mr-2">{animal.next_due_date}</span>
                              <ChangeNextDueDate animal={animal} />
                            </div>
                            <div
                              className={`flex border-t border-green-800 py-2 ${
                                !animal.age && 'hidden'
                              }`}
                            >
                              <span className="ml-2">Edad</span>
                              <span className="ml-auto mr-2">{animal.age}</span>
                            </div>

                            <div
                              className={`flex border-t border-green-800 py-2 ${
                                !animal.daughter_of && 'hidden'
                              }`}
                            >
                              <span className="ml-2">
                                {animal.gender === 'Macho' ? 'Hijo de' : 'Hija de'}
                              </span>
                              <span className="ml-auto mr-2">
                                {animal.daughter_of
                                  ? animal.daughter_of.plate_number
                                  : 'Sin padres'}
                              </span>
                            </div>
                            <div
                              className={`flex border-t border-green-800 py-2 ${
                                !animal.starting_weight && 'hidden'
                              }`}
                            >
                              <span className="ml-2">Peso inical</span>
                              <span className="ml-auto mr-2">
                                {new Intl.NumberFormat('en-EN').format(animal.starting_weight)}
                                kg
                              </span>
                            </div>

                            <div
                              className={`flex border-t border-green-800 py-2 ${
                                !animal.place_origin && 'hidden'
                              }`}
                            >
                              <span className="ml-2">Lugar de origen </span>
                              <span className="ml-auto mr-2">{animal.place_origin}</span>
                            </div>

                            <div className={`flex border-t border-green-800 py-2`}>
                              <span className="ml-2">Género</span>
                              <span className="ml-auto mr-2">{animal.type.gender}</span>
                            </div>
                          </div>
                          <div
                            className={`overflow-y-auto h-72 text-white rounded-lg ${
                              openTab === 2 ? 'block' : 'hidden'
                            }`}
                          >
                            <input
                              type="text"
                              name="filterInWeight"
                              className="h-6 p-2 w-full placeholder-blue-800 text-black mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-60"
                              placeholder="Buscar"
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
                                        <span className="ml-auto mr-2">{weight.date}</span>
                                      </div>
                                      <div className="flex border-t border-gray-400">
                                        <span className="ml-2">Peso</span>
                                        <span className="ml-auto mr-2">{weight.weight} kg</span>
                                      </div>
                                      <div className="flex border-t ml-2 mr-2 border-gray-400">
                                        {weight.observations}
                                      </div>

                                      <div className="flex text-lg">
                                        <button
                                          onClick={() => oneDeleteWeight(animal._id, weight._id)}
                                          className="ml-auto mr-2 hover:text-red-500"
                                        >
                                          <i className="fas fa-trash-alt"></i>
                                        </button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            />
                          </div>

                          <div
                            className={`overflow-y-auto text-white h-72 rounded-lg ${
                              openTab === 3 ? 'block' : 'hidden'
                            }`}
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
                                        <span className="ml-auto mr-2">{milk.liters}L</span>
                                      </div>
                                      <div className="flex text-lg">
                                        <button
                                          onClick={() => oneDeleteMilk(animal._id, milk._id)}
                                          className="ml-auto mr-2 hover:text-red-500"
                                        >
                                          <i className="fas fa-trash-alt"></i>
                                        </button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            />
                          </div>

                          <div
                            className={`overflow-y-auto text-white h-72 rounded-lg ${
                              openTab === 4 ? 'block' : 'hidden'
                            }`}
                          >
                            <input
                              type="text"
                              name="filterCalving"
                              className="h-6 p-2 w-full placeholder-blue-800 text-black mb-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-60"
                              placeholder="Buscar"
                              value={filterCalving}
                              onChange={handleInputChange}
                            />
                            <SearchResults
                              value={filterCalving}
                              data={animal.calving}
                              renderResults={(results) => (
                                <div>
                                  {results.map((calving, index) => (
                                    <div
                                      key={calving._id}
                                      className="rounded-lg m-2 text-sm  bg-gray-600"
                                    >
                                      <div className="flex">
                                        <span className="ml-2">Fecha</span>
                                        <span className="ml-auto mr-2">{calving.date}</span>
                                      </div>
                                      <div className="flex border-t border-gray-400">
                                        <span className="ml-2">Parto</span>
                                        <span className="ml-auto mr-2">{index + 1}</span>
                                      </div>
                                      <div className="flex ml-2 border-t border-gray-400">
                                        {calving.complications}
                                      </div>
                                      <div className="flex text-lg">
                                        <button
                                          onClick={() => oneDeleteCalving(animal._id, calving._id)}
                                          className="ml-auto mr-2 hover:text-red-500"
                                        >
                                          <i className="fas fa-trash-alt"></i>
                                        </button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            />
                          </div>
                          <div className="flex pt-4">
                            <span hidden={openTab !== 2} className="text-semibold">
                              {`Registros: ${animal.weight.length}`}
                            </span>
                            <span hidden={openTab !== 3} className="text-semibold">
                              {`Registros: ${animal.milk.length}`}
                            </span>
                            <span hidden={openTab !== 4} className="text-semibold">
                              {`Registros: ${animal.calving.length}`}
                            </span>
                            <div hidden={openTab !== 1} className="ml-auto">
                              <button
                                onClick={() => editAnimal(animal)}
                                className="flex text-white font-bold text-xl bg-white text-gray-800 border-0 py-1 px-2 focus:outline-none hover:bg-gray-400 rounded"
                              >
                                <i className="fas fa-edit"></i>
                              </button>
                            </div>
                            <div hidden={openTab !== 2} className="ml-auto">
                              <button
                                onClick={() => registerWeight(animal._id)}
                                className="flex text-white font-semibold bg-white text-gray-800 border-0 py-1 px-2 focus:outline-none hover:bg-gray-400 rounded"
                              >
                                Registrar peso
                              </button>
                            </div>
                            <div
                              hidden={openTab !== 3 || animal.type.gender === 'Macho'}
                              className="ml-auto"
                            >
                              <button
                                onClick={() => registerMilk(animal._id)}
                                className="flex text-white font-semibold bg-white text-gray-800 border-0 py-1 px-2 focus:outline-none hover:bg-gray-400 rounded"
                              >
                                Registrar leche
                              </button>
                            </div>
                            <div
                              hidden={openTab !== 4 || animal.type.gender === 'Macho'}
                              className="ml-auto"
                            >
                              <RegisterCalving currentAnimal={animal} />
                            </div>
                          </div>
                        </div>
                        <UploadImgProfile animal={animal} />
                      </div>
                    </div>
                  </section>
                ))}
              </>
            )}
          />
        </div>
      ) : (
        <span className="ml-2 text-gray-400 whitespace-nowrap italic">
          - ( No se encontraron ganado registrados ) -
        </span>
      )}

      <ModalAnimal />
    </>
  );
};
