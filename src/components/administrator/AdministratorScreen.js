import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  AdministratorsLoading,
  administratorClearActive,
  deleteAdmin,
  changeStatus
} from '../../actions/AdministratorAction';
import { UseForm } from '../../hooks/UseForm';
import SearchResults from 'react-filter-search';
import { uiOpenModalAdministrator } from '../../actions/UIAction';
import { ModalAdministrator } from './ModalAdministrator';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export const AdministratorScreen = () => {
  const dispatch = useDispatch();
  const { administrators } = useSelector((state) => state.administrator);

  const [currentAdministrator, setCurrentAdministrator] = React.useState(null);
  useEffect(() => {
    dispatch(AdministratorsLoading());
  }, [dispatch]);

  const [formValues, handleInputChange] = UseForm({
    filter: ''
  });

  const { filter } = formValues;

  const addAdmin = () => {
    setCurrentAdministrator(null);
    dispatch(administratorClearActive());
    dispatch(uiOpenModalAdministrator());
  };

  const updateAdmin = (administrator) => {
    setCurrentAdministrator(administrator);
    dispatch(uiOpenModalAdministrator());
  };

  const removeAdmin = (admin) => {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'El administrador no se volerá a recuperar',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#A0A0A0',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        dispatch(deleteAdmin(admin));
      } else {
        dispatch(administratorClearActive());
      }
    });
  };

  return (
    <>
      <div className="container px-4 py-4 mx-auto flex flex-wrap flex-col md:flex-row items-center">
        <Link
          to="/colaboradores"
          className="inline-flex justify-center items-center px-1 rounded-lg"
        >
          <i className="fas fa-arrow-circle-left text-blue-500 text-2xl hover:text-blue-900 "></i>{' '}
          <span className="text-xl text-blue-500 hover:underline ml-1">Colaboradores</span>
        </Link>

        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center md:flex md:space-x-4 space-y-2 md:space-y-0">
          <button
            onClick={() => addAdmin()}
            className="bg-green-500 text-white active:bg-gray-600 font-bold uppercase text-sm px-4 py-2 rounded-2xl shadow transform hover:scale-110 motion-reduce:transform-none mr-1 mb-1"
            type="button"
            style={{ transition: 'all .15s ease' }}
          >
            Registrar administrator
          </button>
          <Link
            to="/editar-cuenta"
            className="bg-green-500 text-white active:bg-gray-600 font-bold uppercase text-sm px-4 py-2 rounded-2xl shadow transform hover:scale-110 motion-reduce:transform-none mr-1 mb-1"
            type="button"
            style={{ transition: 'all .15s ease' }}
          >
            Cambiar contraseña
          </Link>
        </nav>
        <Link to="/ganado" className="inline-flex justify-center items-center px-1 rounded-lg">
          <span className="text-xl text-blue-500 hover:underline mr-1 ">Ganado</span>
          <i className="fas fa-arrow-circle-right text-blue-500 text-2xl hover:text-blue-900"></i>
        </Link>
      </div>

      <div className="flex flex-col text-center w-full mt-4 mb-4">
        <h1 className="sm:text-3xl text-2xl font-medium title-font text-green-700">
          ADMINISTRADORES
        </h1>
        <h2 className="text-xs text-green-700 tracking-widest font-medium title-font mb-1">
          DE HACIENDA EL OROSI
        </h2>
      </div>

      <div className="bg-gray-200 rounded-lg px-4 lg:px-8 py-4 lg:py-6 mt-8 ">
        <input
          type="text"
          name="filter"
          className="rounded-t-lg w-1/4 h-4 p-4 placeholder-blue-800 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-60"
          placeholder="Filtrar por ..."
          value={filter}
          onChange={handleInputChange}
        />
        <span className="bg-blue-200 text-green-900 md:ml-2 py-1 px-1 rounded-t-lg  inline-block text-center uppercase">
          <i className="fas fa-users"></i> {`total: ${administrators.length}`}
        </span>

        <div className="overflow-x-auto">
          <div className="align-middle inline-block min-w-full overflow-hidden">
            <SearchResults
              value={filter}
              data={administrators}
              renderResults={(results) => (
                <table id="table-tools" className="min-w-full">
                  <thead className="bg-gray-600">
                    <tr className="bg-gray-600 text-white text-lg">
                      <th className="py-2 px-4">
                        <i className="fas fa-id-card"></i> Cédula
                      </th>
                      <th className="py-2 px-4">
                        <i className="fas fa-user"></i> Nombre
                      </th>
                      <th className="py-2 px-4">
                        <i className="fas fa-user"></i> Apellido
                      </th>
                      <th className="py-2 px-3">
                        <i className="fas fa-envelope-square"></i> Correo Electronico
                      </th>
                      <th className="py-2 px-3">
                        <i className="fas fa-user-tie"></i> Cargo
                      </th>
                      <th className="py-2 px-3">
                        <i className="fas fa-cash-register"></i> Acción
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-900 text-opacity-80 whitespace-nowrap">
                    {results.map((administrator) => (
                      <tr key={administrator._id}>
                        <th className="py-3 px-3">{administrator.document_id}</th>
                        <th className="py-3 px-3">{administrator.name}</th>
                        <th className="py-3 px-3">{administrator.surname}</th>

                        <th className="py-3 px-3">{administrator.email}</th>
                        <th className="py-3 px-3" hidden={administrator.role === 'Dueño'}>
                          <div>
                            <select
                              value="value"
                              className="font-bold  py-2 px-2 rounded-lg inline-flex"
                              onChange={(e) =>
                                dispatch(changeStatus(administrator._id, e.target.value))
                              }
                            >
                              <option value={administrator.role}>{administrator.role}</option>
                              <option
                                value="Recursos Humanos"
                                className="pt-6 bg-gray-300 text-base text-gray-700 font-semibold"
                              >
                                Recursos Humanos
                              </option>
                              <option
                                value="Encargado del ganado"
                                className="bg-gray-300 text-base text-gray-700 font-semibold"
                              >
                                Encargado del ganado
                              </option>
                            </select>
                          </div>
                        </th>
                        <th hidden={administrator.role !== 'Dueño'} className="py-3 px-3 ">
                         Dueño
                        </th>

                        <th className="py-3 px-3">
                          <button
                            hidden={administrator.role === 'Dueño'}
                            className="bg-red-500 hover:bg-red-700 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow outline-none focus:outline-none mr-1 mb-1"
                            type="button"
                            style={{ transition: 'all .15s ease' }}
                            onClick={() => removeAdmin(administrator)}
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>

                          <button
                            className="bg-yellow-500 hover:bg-yellow-700 text-white active:bg-yellow-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow outline-none focus:outline-none mr-1 mb-1"
                            type="button"
                            style={{ transition: 'all .15s ease' }}
                            onClick={() => updateAdmin(administrator)}
                          >
                            <i className="fas fa-edit"></i>
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

      <ModalAdministrator currentAdministrator={currentAdministrator} />
    </>
  );
};
