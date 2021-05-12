import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import SearchResults from 'react-filter-search';
import { Link } from 'react-router-dom';

import {
  changeStatus,
  collaboratorClearActive,
  collaboratorSetActive,
  CollaboratorsLoading
} from '../../actions/CollaboratorAction';
import { UseForm } from '../../hooks/UseForm';
import { ModalInfo } from './ModalInfo';
import {
  uiOpenModalInfoCollaborator,
  uiOpenModalCollaborator,
  uiOpenModalActive
} from '../../actions/UIAction';
import { ModalLend } from '../lend/ModalLend';
import { ModalActive } from '../tool/ModalActive';
import { ModalCollaborator } from './ModalCollaborator';
import Swal from 'sweetalert2';
import { registerTodayPresence } from '../../actions/PaymentAction';
import { PaymentModal } from '../payment/PaymentModal';
import ModalMenu from './ModalMenu';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { Report } from './Report';

export const CollaboratorScreen = () => {
  const dispatch = useDispatch();

  const { collaborators, collaboratorsState, countCollaborators } = useSelector(
    (state) => state.collaborator
  );
  const { modalPaymentOpen, modalActiveOpen } = useSelector((state) => state.ui);
  const { role } = useSelector((state) => state.auth);

  const { currentCollaborator } = useSelector((state) => state.collaborator);

  useEffect(() => {
    dispatch(CollaboratorsLoading());
  }, [dispatch]);

  const [formValues, handleInputChange] = UseForm({
    filter: ''
  });

  const onSelectCollaborator = (collaborator) => {
    dispatch(collaboratorSetActive(collaborator));
    openModalInfo();
  };

  const openModalInfo = () => {
    dispatch(uiOpenModalInfoCollaborator());
  };

  const registerPresence = async (collaborator) => {
    const total_overtime = await Swal.fire({
      title: 'Registrar dia laboral ',
      input: 'number',
      inputLabel: 'Horas extras',
      inputPlaceholder: 'Escriba',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#A0A0A0',
      confirmButtonText: 'Si, registrar',
      cancelButtonText: 'Cancelar'
    });

    if (total_overtime.isConfirmed) {
      dispatch(
        registerTodayPresence(collaborator, !total_overtime.value ? 0 : total_overtime.value)
      );
    }
  };

  const changeStatusCollaborator = async (collaborator) => {
    Swal.fire({
      title: '¿Estas seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#A0A0A0',
      confirmButtonText: 'Si, seguro',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        dispatch(
          changeStatus(collaborator._id, collaborator.status === 'Activo' ? 'Inactivo' : 'Activo')
        );
      }
    });
  };

  const contractCollaborator = () => {
    dispatch(collaboratorClearActive());
    dispatch(uiOpenModalCollaborator());
  };

  const showActiveModal = (collaborator) => {
    dispatch(collaboratorSetActive(collaborator));
    dispatch(uiOpenModalActive());
  };

  const { filter } = formValues;

  let dateNow = new Date();

  return (
    <>
      <div
        className={`${
          role === 'Encargado del ganado' && 'hidden'
        } container px-4 py-4 mx-auto flex flex-wrap flex-col md:flex-row items-center`}
      >
        <Link
          to="/trabajos"
          className="inline-flex flex-col justify-center items-center px-1 rounded-lg"
        >
          <i className="fas fa-arrow-circle-left text-green-900 text-2xl hover:text-green-200 "></i>
        </Link>
        <span className="text-xl text-green-200">Trabajos</span>

        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center md:flex md:space-x-4 space-y-2 md:space-y-0">
          <button
            className="bg-green-500 text-white active:bg-gray-600 font-bold uppercase text-sm px-4 py-2 rounded-2xl shadow transform hover:scale-110 motion-reduce:transform-none mr-1 mb-1"
            type="button"
            style={{ transition: 'all .15s ease' }}
            onClick={() => contractCollaborator()}
          >
            Contratar
          </button>

          <button
            className="bg-green-500 text-white active:bg-gray-600 font-bold uppercase text-sm px-4 py-2 rounded-2xl shadow transform hover:scale-110 motion-reduce:transform-none mr-1 mb-1"
            style={{ transition: 'all .15s ease' }}
            onClick={() => dispatch(CollaboratorsLoading('Activo'))}
          >
            <span>Activos</span>
          </button>

          <button
            className="bg-green-500 text-white active:bg-gray-600 font-bold uppercase text-sm px-4 py-2 rounded-2xl shadow transform hover:scale-110 motion-reduce:transform-none mr-1 mb-1"
            style={{ transition: 'all .15s ease' }}
            onClick={() => dispatch(CollaboratorsLoading('Inactivo'))}
          >
            <span>Inactivos</span>
          </button>
          <ReactHTMLTableToExcel
            className="bg-green-500 text-white active:bg-gray-600 font-bold uppercase text-sm px-4 py-2 rounded-2xl shadow transform hover:scale-110 motion-reduce:transform-none mr-1 mb-1"
            table="collaborator-table-to-xls"
            filename={`Reporte-colaboradores-${
              collaboratorsState
                ? collaboratorsState === 'Activo'
                  ? 'activos'
                  : 'inactivos'
                : null
            }-${dateNow.getFullYear()}-${dateNow.getMonth()}-${dateNow.getDate()}`}
            sheet={`${
              collaboratorsState
                ? collaboratorsState === 'Activo'
                  ? 'activos'
                  : 'inactivos'
                : null
            }`}
            buttonText={`Reporte ${
              collaboratorsState
                ? collaboratorsState === 'Activo'
                  ? 'activos'
                  : 'inactivos'
                : null
            }`}
          />

          <Link
            to="/pagos"
            className="bg-green-500 text-white active:bg-gray-600 font-bold uppercase text-sm px-4 py-2 rounded-2xl shadow transform hover:scale-110 motion-reduce:transform-none mr-1 mb-1"
          >
            Pagos
          </Link>
        </nav>
        <span className="text-xl text-green-200">Herramientas</span>
        <Link
          to="/herramientas"
          className="inline-flex flex-col justify-center items-center px-1 rounded-lg"
        >
          <i className="fas fa-arrow-circle-right text-green-900 text-2xl hover:text-green-200"></i>
        </Link>
      </div>
      <div className="mt-4 bg-gray-700 rounded-lg">
        <span className="pl-2 pt-1 flex text-gray-300 space-x-4 italic">
          {'Fecha actual: ' +
            dateNow.getFullYear() +
            '-' +
            (dateNow.getMonth() + 1) +
            '-' +
            dateNow.getDate()}
        </span>
        {collaborators.length !== 0 ? (
          <>
            <h2 className={`p-2 text-xl text-green-500 font-bold`}>{`COLABORADORES`}</h2>
            <input
              type="text"
              name="filter"
              className="rounded-t-lg w-1/4 h-4 p-4 placeholder-blue-800 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-60"
              placeholder="Buscar"
              value={filter}
              onChange={handleInputChange}
            />
            <span
              className={`${
                collaboratorsState === 'Activo'
                  ? 'bg-green-200 text-green-600'
                  : collaboratorsState === 'Inactivo'
                  ? 'bg-red-200 text-red-600'
                  : 'bg-yellow-200 text-yellow-600'
              } md:ml-2 py-1 px-1 rounded-t-lg  inline-block text-center uppercase`}
            >
              <i className="fas fa-box-open"></i> {`total: ${countCollaborators}`}
            </span>
            <div className="overflow-x-auto">
              <SearchResults
                value={filter}
                data={collaborators}
                renderResults={(results) => (
                  <table className="text-center items-center w-full">
                    <thead className="bg-gray-800 flex text-white w-full">
                      <tr className="flex w-full">
                        <th
                          className="p-4 w-1/4"
                          hidden={
                            collaboratorsState === 'Inactivo' ||
                            !collaboratorsState ||
                            role === 'Encargado del ganado'
                          }
                        >
                          <i className="fas fa-check"></i>
                        </th>
                        <th className="p-4 w-1/4" hidden={collaboratorsState}>
                          <i className="fas fa-signal"></i>
                        </th>
                        <th className="p-4 w-1/4">
                          <i className="fas fa-user"></i>
                        </th>
                        <th className="p-4 w-1/4">
                          <i className="fas fa-hammer"></i>
                        </th>
                        <th className="p-4 w-1/4">
                          <i className="fas fa-id-card"></i>
                        </th>
                        <th className="p-4 w-1/4">
                          <i className="fas fa-user-lock"></i>
                        </th>
                        <th className="p-4 w-1/4">
                          <i className="fas fa-toggle-on"></i>
                        </th>
                        <th
                          className="p-4 w-1/4"
                          hidden={
                            collaboratorsState === 'Inactivo' ||
                            !collaboratorsState ||
                            role === 'Encargado del ganado'
                          }
                        >
                          <i className="fas fa-caret-square-down"></i>
                        </th>
                      </tr>
                    </thead>
                    <tbody
                      className="text-blue-100 flex-col justify-between overflow-y-scroll w-full"
                      style={{ height: '50vh' }}
                    >
                      {results.map((collaborator) => (
                        <tr className="flex w-full" key={collaborator._id}>
                          <th
                            className="p-4 w-1/4"
                            hidden={
                              collaboratorsState === 'Inactivo' ||
                              !collaboratorsState ||
                              role === 'Encargado del ganado'
                            }
                          >
                            <button
                              hidden={collaborator.validatePresence}
                              onClick={() => registerPresence(collaborator)}
                              className="px-4 py-2 text-sm font-medium tracking-wide text-white transition-colors duration-200 transform bg-green-700 rounded-md hover:bg-green-600 "
                            >
                              <i className="far fa-calendar-check"></i> Registar día
                            </button>
                          </th>
                          <th className="p-4 w-1/4" hidden={collaboratorsState}>
                            <span
                              className={` ${
                                collaborator.status === 'Activo'
                                  ? 'bg-green-200 text-green-600'
                                  : 'bg-red-200 text-red-600'
                              }  text-xs rounded-full px-3 py-1 w-26 inline-block text-center uppercase`}
                            >
                              {collaborator.status === 'Activo' ? 'Activo' : 'Cancelado'}
                            </span>
                          </th>

                          <th className="p-4 w-1/4">
                            {`${collaborator.name} ${collaborator.surname}`}
                          </th>
                          <th className="p-4 w-1/4">{collaborator.job.name}</th>
                          <th className="p-4 w-1/4">{collaborator.document_id}</th>
                          <th className="p-4 w-1/4">
                            <button
                              onClick={() => onSelectCollaborator(collaborator)}
                              className="bg-blue-600 text-white  font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:bg-blue-400 hover:text-white outline-none"
                              type="button"
                            >
                              <i className="far fa-eye"></i>
                            </button>
                          </th>

                          <th className="p-4 w-1/4">
                            <span
                              className={` ${
                                collaborator.status === 'Activo'
                                  ? 'bg-green-200 text-green-600'
                                  : 'bg-red-200 text-red-600'
                              }  text-xs rounded-full px-3 py-1 w-26 inline-block text-center uppercase`}
                            >
                              {collaborator.status === 'Activo' ? 'Activo' : 'Inactivo'}
                            </span>
                            <button
                              onClick={() => changeStatusCollaborator(collaborator)}
                              className="px-3 py-1 w-26 inline-block text-center uppercase"
                            >
                              <i className="fas fa-edit text-xl text-gray-400" />
                            </button>
                          </th>
                          <th
                            className="p-4 w-1/4"
                            hidden={
                              collaboratorsState === 'Inactivo' ||
                              !collaboratorsState ||
                              role === 'Encargado del ganado'
                            }
                          >
                            <ModalMenu collaborator={collaborator} />
                          </th>
                          <th className="p-4 w-1/4" hidden={role !== 'Encargado del ganado'}>
                            <button
                              className="py-2 font-semibold  block w-full hover:bg-blue-700 hover:text-white"
                              onClick={() => showActiveModal(collaborator)}
                            >
                              <i className="fas fa-tools"></i> Herramientas
                            </button>
                          </th>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              />
            </div>
          </>
        ) : (
          <span className="ml-2 text-gray-400 whitespace-nowrap italic">
            - ( No se encontraron colaboradore ) -
          </span>
        )}
      </div>

      {currentCollaborator && <ModalInfo />}
      {currentCollaborator && <ModalLend />}
      {currentCollaborator && modalActiveOpen && <ModalActive />}
      {currentCollaborator && modalPaymentOpen && <PaymentModal />}
      <ModalCollaborator />
      <Report collaborator={collaborators} />
    </>
  );
};
