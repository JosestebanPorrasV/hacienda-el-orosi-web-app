import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MaterialTable from 'material-table';
import {
  changeStatus,
  collaboratorClearActive,
  collaboratorSetActive,
  CollaboratorsLoading
} from '../../actions/CollaboratorAction';
import { ModalInfo } from './ModalInfo';
import {
  uiOpenModalActive,
  uiOpenModalAddLend,
  uiOpenModalCollaborator,
  uiOpenModalPayment
} from '../../actions/UIAction';
import { ModalLend } from '../lend/ModalLend';
import { ModalActive } from '../tool/ModalActive';
import { ModalCollaborator } from './ModalCollaborator';
import Swal from 'sweetalert2';
import { registerTodayPresence } from '../../actions/PaymentAction';
import { PaymentModal } from '../payment/PaymentModal';

import { TableIcons, TableLocalization } from '../../helpers/TableInit';

import VisibilityIcon from '@material-ui/icons/Visibility';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import BuildIcon from '@material-ui/icons/Build';
import MoneyIcon from '@material-ui/icons/Money';

export const CollaboratorScreen = () => {
  const dispatch = useDispatch();

  const { collaborators } = useSelector((state) => state.collaborator);
  const { modalPaymentOpen, modalActiveOpen } = useSelector((state) => state.ui);
  const { role } = useSelector((state) => state.auth);
  const { currentCollaborator } = useSelector((state) => state.collaborator);

  useEffect(() => {
    dispatch(CollaboratorsLoading());
  }, [dispatch]);

  const registerPresence = async (collaborator) => {
    console.log(collaborator);

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
          changeStatus(collaborator._id, collaborator.status === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO')
        );
      }
    });
  };

  const contractCollaborator = () => {
    dispatch(collaboratorClearActive());
    dispatch(uiOpenModalCollaborator());
  };

  const paymentCollaborator = (collaborator) => {
    dispatch(collaboratorSetActive(collaborator));
    dispatch(uiOpenModalPayment());
  };
  const toolCollaborator = (collaborator) => {
    dispatch(collaboratorSetActive(collaborator));
    dispatch(uiOpenModalActive());
  };
  const lendCollaborator = (collaborator) => {
    dispatch(collaboratorSetActive(collaborator));
    dispatch(uiOpenModalAddLend());
  };

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
          <i className="fas fa-arrow-circle-left text-green-900 text-2xl hover:text-green-500 "></i>
        </Link>
        <span className="text-xl text-green-600">Trabajos</span>

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
            onClick={() => dispatch(CollaboratorsLoading('ACTIVO'))}
          >
            <span>Activos</span>
          </button>

          <button
            className="bg-green-500 text-white active:bg-gray-600 font-bold uppercase text-sm px-4 py-2 rounded-2xl shadow transform hover:scale-110 motion-reduce:transform-none mr-1 mb-1"
            style={{ transition: 'all .15s ease' }}
            onClick={() => dispatch(CollaboratorsLoading('INACTIVO'))}
          >
            <span>Inactivos</span>
          </button>

          <Link
            to="/pagos"
            className="bg-green-500 text-white active:bg-gray-600 font-bold uppercase text-sm px-4 py-2 rounded-2xl shadow transform hover:scale-110 motion-reduce:transform-none mr-1 mb-1"
          >
            Pagos
          </Link>
        </nav>
        <span className="text-xl text-green-600">Herramientas</span>
        <Link
          to="/herramientas"
          className="inline-flex flex-col justify-center items-center px-1 rounded-lg"
        >
          <i className="fas fa-arrow-circle-right text-green-900 text-2xl hover:text-green-500"></i>
        </Link>
      </div>
      <span className="flex px-6 text-gray-600 space-x-4 italic mt-10">
        {'Fecha actual: ' +
          dateNow.getFullYear() +
          '-' +
          (dateNow.getMonth() + 1) +
          '-' +
          dateNow.getDate()}
      </span>
      <MaterialTable
        title="COLABORADORES"
        icons={TableIcons}
        localization={TableLocalization}
        columns={[
          { title: 'Nombre', field: 'name', editable: 'never' },
          { title: 'Trabajo', field: 'job.name', editable: 'never' },
          { title: 'Cedula', field: 'document_id', editable: 'never' },
          {
            title: 'Estado',
            field: 'status',
            lookup: { ACTIVO: 'ACTIVO', INACTIVO: 'INACTIVO' }
          }
        ]}
        data={collaborators}
        cellEditable={{
          onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
            return new Promise((resolve, reject) => {
              changeStatusCollaborator(rowData);
              setTimeout(resolve, 1000);
            });
          }
        }}
        detailPanel={[
          {
            icon: VisibilityIcon,
            tooltip: 'Mostrar datos',
            render: (rowData) => {
              return <ModalInfo currentCollaborator={rowData} />;
            }
          }
        ]}
        actions={[
          {
            icon: EventAvailableIcon,
            tooltip: 'Registrar dia',
            onClick: (event, rowData) => registerPresence(rowData)
          },
          {
            icon: AttachMoneyIcon,
            tooltip: 'Realizar pagos',
            onClick: (event, rowData) => paymentCollaborator(rowData)
          },
          {
            icon: BuildIcon,
            tooltip: 'Asignar herramientas',
            onClick: (event, rowData) => toolCollaborator(rowData)
          },
          (rowData) => ({
            icon: MoneyIcon,
            tooltip: 'Realizar prestamo',
            hidden: rowData.status === 'INACTIVO',
            onClick: (event, rowData) => lendCollaborator(rowData)
          })
        ]}
        onRowClick={(event, rowData, togglePanel) => togglePanel()}
        options={{
          headerStyle: { color: '#076046' },
          pageSizeOptions: [5, 10, 30, 50, 100],
          actionsColumnIndex: -1,
          pageSize: 10,
          exportButton: true
        }}
      />
      {currentCollaborator && <ModalLend />}
      {currentCollaborator && modalActiveOpen && <ModalActive />}
      {currentCollaborator && modalPaymentOpen && <PaymentModal />}
      <ModalCollaborator />
    </>
  );
};
