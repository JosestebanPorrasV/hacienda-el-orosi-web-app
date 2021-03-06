import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  addFee,
  deleteOneLend,
  lendClearActive,
  lendsStartLoading,
  changeFee,
  FeeByLendLoading
} from '../../actions/LendAction';
import { ModalFee } from './ModalFee';
import { uiOpenModalFee, uiOpenModalAddLend } from '../../actions/UIAction';
import Swal from 'sweetalert2';
import { ModalLend } from './ModalLend';
import MaterialTable from 'material-table';
import { TableIcons, TableLocalization, TableOptions } from '../../helpers/TableInit';

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
        <Link to="/ganado-detallado" className="inline-flex justify-center items-center px-1 rounded-lg">
          <i className="fas fa-arrow-circle-left text-blue-600 text-2xl hover:text-blue-800 "></i>{' '}
          <span className="text-xl text-blue-600 ml-1 hover:underline">Ganado</span>
        </Link>

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

        <Link
          to="/salud"
          className="inline-flex justify-center items-center px-1 rounded-lg"
        >
          <span className="text-xl text-blue-600 mr-1 hover:underline"> Salud</span>
          <i className="fas fa-arrow-circle-right text-blue-600 text-2xl hover:text-blue-800"></i>
        </Link>
      </div>

      <div className="flex flex-col text-center w-full mt-4 mb-4">
        <h1 className="sm:text-3xl text-2xl font-medium title-font text-green-700 uppercase">
          Prestamos
        </h1>
        <h2 className="text-xs text-green-700 tracking-widest font-medium title-font mb-1">
          Registrados
        </h2>
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
          { title: 'Registro', field: 'date_issued', type: 'date', editable: 'never' },
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
          (rowData) => ({
            icon: AddToPhotosIcon,
            tooltip: 'Registrar cuota',
            hidden: rowData.status === 'CANCELADO',
            onClick: (event, rowData) => lendAddFee(rowData)
          }),
          {
            icon: VisibilityIcon,
            tooltip: 'Ver cuotas',
            onClick: (event, rowData) => onSelectLend(rowData)
          },
          (rowData) => ({
            icon: DeleteForeverIcon,
            tooltip: 'Eliminar prestamo',
            hidden: rowData.status === 'CANCELADO',
            onClick: (event, rowData) => oneDeleteLend(rowData)
          }),
          (rowData) => ({
            icon: LocalAtmIcon,
            tooltip: 'Cambiar cuota',
            hidden: rowData.status === 'CANCELADO',
            onClick: (event, rowData) => lendChangeFee(rowData)
          }),
        ]}
        options={TableOptions}
      />

      <ModalFee />
      <ModalLend />
    </>
  );
};
