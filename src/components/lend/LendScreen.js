import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  addFee,
  deleteOneLend,
  lendClearActive,
  lendsByCollaboratorLoading,
  lendsStartLoading,
  changeFee,
  FeeByLendLoading
} from '../../actions/LendAction';
import { ModalFee } from './ModalFee';
import { uiOpenModalFee, uiOpenModalAddLend } from '../../actions/UIAction';
import { UseForm } from '../../hooks/UseForm';
import Swal from 'sweetalert2';
import { ModalLend } from './ModalLend';
import MaterialTable from 'material-table';
import { TableIcons, TableLocalization } from '../../helpers/TableInit';

import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

export const LendScreen = () => {
  const dispatch = useDispatch();

  const { lends } = useSelector((state) => state.lend);

  useEffect(() => {
    dispatch(lendsStartLoading());
  }, [dispatch]);

  const onSelectLend = (lend) => {
    dispatch(FeeByLendLoading(lend._id));
    openModalFee();
  };

  const openModalFee = () => {
    dispatch(uiOpenModalFee());
  };

  const openModalAddLend = () => {
    dispatch(uiOpenModalAddLend());
  };

  const lendChangeFee = async (lend) => {
    const { value: newFee } = await Swal.fire({
      title: 'Cambiar cuotas',
      input: 'number',
      inputLabel: 'Nueva cuota',
      inputPlaceholder: 'Ingrese',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#A0A0A0',
      confirmButtonText: 'Si, cambiar',
      cancelButtonText: 'Cancelar'
    });

    if (newFee) {
      dispatch(changeFee(lend, newFee));
    } else {
      dispatch(lendClearActive());
    }
  };

  const oneDeleteLend = (lend) => {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'El prestamo no se podra recuperar',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#A0A0A0',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        dispatch(deleteOneLend(lend._id));
      } else {
        dispatch(lendClearActive());
      }
    });
  };

  const lendAddFee = (lend) => {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'Se agregara una nueva cuota',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#A0A0A0',
      confirmButtonText: 'Si, agregar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        dispatch(addFee(lend));
      } else {
        dispatch(lendClearActive());
      }
    });
  };

  return (
    <>
      <div className="container px-4 py-4 mx-auto flex flex-wrap flex-col md:flex-row items-center">
        <Link
          to="/ganado"
          className="inline-flex flex-col justify-center items-center px-1 rounded-lg"
        >
          <i className="fas fa-arrow-circle-left text-green-900 text-2xl hover:text-green-600 "></i>
        </Link>
        <span className="text-xl text-green-600">Ganado</span>

        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center md:flex md:space-x-4 space-y-2 md:space-y-0">
          <button
            className="bg-green-500 text-white active:bg-gray-600 font-bold uppercase text-sm px-4 py-2 rounded-2xl shadow transform hover:scale-110 motion-reduce:transform-none mr-1 mb-1"
            type="button"
            style={{ transition: 'all .15s ease' }}
            onClick={() => openModalAddLend()}
          >
            Realizar prestamo
          </button>
          <button
            className="bg-green-500 text-white active:bg-gray-600 font-bold uppercase text-sm px-4 py-2 rounded-2xl shadow transform hover:scale-110 motion-reduce:transform-none mr-1 mb-1"
            type="button"
            style={{ transition: 'all .15s ease' }}
            onClick={() => dispatch(lendsStartLoading('ACTIVO'))}
          >
            Listar activos
          </button>
          <button
            className="bg-green-500 text-white active:bg-gray-600 font-bold uppercase text-sm px-4 py-2 rounded-2xl shadow transform hover:scale-110 motion-reduce:transform-none mr-1 mb-1"
            type="button"
            style={{ transition: 'all .15s ease' }}
            onClick={() => dispatch(lendsStartLoading('CANCELADO'))}
          >
            Listar cancelados
          </button>
        </nav>
        <span className="text-xl text-green-600"> Salud</span>
        <Link
          to="/salud"
          className="inline-flex flex-col justify-center items-center px-1 rounded-lg"
        >
          <i className="fas fa-arrow-circle-right text-green-900 text-2xl hover:text-green-600"></i>
        </Link>
      </div>

      <MaterialTable
        title="PRESTAMOS"
        icons={TableIcons}
        localization={TableLocalization}
        columns={[
          { title: 'Estado', field: 'status', editable: 'never' },
          { title: 'Nombre', field: 'collaborator.name', editable: 'never' },
          { title: 'Apellido', field: 'collaborator.surname', editable: 'never' },
          { title: 'Cedula', field: 'collaborator.document_id', editable: 'never' },
          { title: 'Registro', field: 'date_issued', editable: 'never' },
          {
            title: 'Monto',
            field: 'initial_amount',
            editable: 'never',
            type: 'currency',
            currencySetting: {
              locale: 'es-CR',
              currencyCode: 'CRC'
            }
          },
          {
            title: 'Restante',
            field: 'amount',
            editable: 'never',
            type: 'currency',
            currencySetting: {
              locale: 'es-CR',
              currencyCode: 'CRC'
            }
          },
          {
            title: 'Cuota',
            editable: 'never',
            field: 'fee',
            type: 'currency',
            currencySetting: {
              locale: 'es-CR',
              currencyCode: 'CRC'
            }
          }
        ]}
        data={lends}
        actions={[
          {
            icon: AddToPhotosIcon,
            tooltip: 'Registrar cuota',
            onClick: (event, rowData) => lendAddFee(rowData)
          },
          {
            icon: VisibilityIcon,
            tooltip: 'Ver cuotas',
            onClick: (event, rowData) => onSelectLend(rowData)
          },
          {
            icon: DeleteForeverIcon,
            tooltip: 'Eliminar prestamo',
            onClick: (event, rowData) => oneDeleteLend(rowData)
          },
          {
            icon: LocalAtmIcon,
            tooltip: 'Cambiar cuota',
            onClick: (event, rowData) => lendChangeFee(rowData)
          }
        ]}
        options={{
          headerStyle: { background: '#404A59', color: 'white' },
          rowStyle: {
            color: '#1F3A8A'
          },
          pageSizeOptions: [5, 10, 30, 50, 100],
          actionsColumnIndex: -1,
          pageSize: 10,
          exportButton: true
        }}
      />

      <ModalFee />
      <ModalLend />
    </>
  );
};
