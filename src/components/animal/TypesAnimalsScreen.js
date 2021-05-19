import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { regType, typeDelete, TypesLoading } from '../../actions/AnimalAction';
import { UseForm } from '../../hooks/UseForm';

import SearchResults from 'react-filter-search';
import Swal from 'sweetalert2';

export const TypesAnimalsScreen = () => {
  const dispatch = useDispatch();
  const { animalsTypes } = useSelector((state) => state.animal);
  const { role } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(TypesLoading());
  }, [dispatch]);

  const [formValues, handleInputChange] = UseForm({
    filter: ''
  });

  const { filter } = formValues;

  const register = async () => {
    const { value: values } = await Swal.fire({
      title: 'Registrar tipo de animal',
      html:
        ` <label className="text-gray-700 text-bold">Nombre</label> <br/>` +
        '<input id="swal-input1" type="text" class="swal2-input"> <br/>',
      input: 'select',
      inputOptions: {
        Hembra: 'Hembra',
        Macho: 'Macho'
      },
      inputPlaceholder: 'Seleccionar genero',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, registrar',
      cancelButtonText: 'Cancelar',
      focusConfirm: false,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value && document.getElementById('swal-input1').value) {
            resolve();
          } else {
            resolve('Llena los comapos');
          }
        });
      }
    });
    if (values) {
      dispatch(regType(document.getElementById('swal-input1').value, values));
    }
  };

  const deleteType = (type) => {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'El tipo de animal no se volerá a recuperar',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#A0A0A0',
      confirmButtonText: 'Si, eliminar!!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        dispatch(typeDelete(type));
      }
    });
  };

  return (
    <>
      <div
        className={`${
          role === 'Recursos Humanos' && 'hidden'
        } bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900  rounded-lg px-4 lg:px-8 py-4 lg:py-6 mt-8 flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-12`}
      >
        <div>
          <h2 className="text-2xl">Tipos de ganado</h2>
        </div>
        <nav className="md:flex md:space-x-4 space-y-2 md:space-y-0">
          <button
            onClick={() => register()}
            className="inline-flex flex-col justify-center items-center m-1 px-3 py-3 bg-black rounded-lg hover:bg-gray-800 w-35"
          >
            <span className="text-gray-200 font-bold">Agregar tipo</span>
          </button>
        </nav>
      </div>
      {animalsTypes.length !== 0 ? (
        <>
          <div className="bg-gray-700 rounded-lg px-4 lg:px-8 py-4 lg:py-6 mt-8 ">
            <input
              type="text"
              name="filter"
              className="rounded-t-lg h-4 p-4 placeholder-blue-800 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-60"
              placeholder="Buscar"
              value={filter}
              onChange={handleInputChange}
            />
            <span className="bg-green-200 text-green-900 md:ml-2 py-1 px-1 rounded-t-lg  inline-block text-center uppercase">
              <i className="fas fa-file-contract"></i> {`total: ${animalsTypes.length}`}
            </span>

            <div className="overflow-x-auto">
              <div className="align-middle inline-block min-w-full overflow-hidden">
                <SearchResults
                  value={filter}
                  data={animalsTypes}
                  renderResults={(results) => (
                    <table className="min-w-full">
                      <thead className="bg-gray-600">
                        <tr className="bg-gray-600 text-white text-lg">
                          <th className="py-2 w-1/6">
                            <i className="fas fa-sort"></i>
                          </th>
                          <th className="p-5 w-1/6">
                            <i className="fas fa-signature"></i>
                          </th>
                          <th className="p-5 w-1/6">
                            <i className="fas fa-venus-mars"></i>
                          </th>
                          <th hidden={role === 'Recursos Humanos'} className="py-2 w-1/6">
                            <i className="far fa-caret-square-down"></i>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-blue-100 text-opacity-80">
                        {results.map((type, index) => (
                          <tr key={type._id}>
                            <th className="py-5 px-8">{index + 1}</th>
                            <th className="py-5 px-8">{`${type.name}`}</th>
                            <th className="py-5 px-8">{`${type.gender}`}</th>
                            <th hidden={role === 'Recursos Humanos'} className="py-3 px-3">
                              <button
                                onClick={() => deleteType(type)}
                                className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:bg-red-600 outline-none focus:outline-none mr-1 mb-1"
                                type="button"
                                style={{ transition: 'all .15s ease' }}
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
      ) : (
        <span className="ml-2 text-gray-400 whitespace-nowrap italic">
          - ( No se encontraron tipos de trabajos ) -
        </span>
      )}
    </>
  );
};
