import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MaterialTable from 'material-table';
import { TableIcons, TableLocalization } from '../../helpers/TableInit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

import {
  MedicamentsLoaded,
  medicamentSetActive,
  medicamentClearActive,
  medicamentDelete
} from '../../actions/MedicamentAction';

import Swal from 'sweetalert2';
import { ModalMedicament } from './ModalMedicament';
import { uiOpenModalMedicament } from '../../actions/UIAction';

export const MedicamentScreen = () => {
  const dispatch = useDispatch();
  const { medicaments } = useSelector((state) => state.medicament);
  const { role } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(MedicamentsLoaded());
  }, [dispatch]);

  const onSelectMedicament = (medicament) => {
    dispatch(medicamentSetActive(medicament));
    openModalMedicament();
  };

  const openModalMedicament = () => {
    dispatch(uiOpenModalMedicament());
  };

  const onSelectMedicamentDelete = (medicament) => {
    dispatch(medicamentSetActive(medicament));
    deleteMedicament(medicament);
  };

  const deleteMedicament = (medicament) => {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'El medicamento no se volerá a recuperar',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#A0A0A0',
      confirmButtonText: 'Si, eliminar!!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        dispatch(medicamentDelete(medicament));
      } else {
        dispatch(medicamentClearActive());
      }
    });
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
          to="/animales"
          className="inline-flex flex-col justify-center items-center px-1 rounded-lg"
        >
          <i className="fas fa-arrow-circle-left text-green-900 text-2xl hover:text-green-500 "></i>
        </Link>
        <span className="text-xl text-green-600">Ganado</span>

        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center md:flex md:space-x-4 space-y-2 md:space-y-0">
          <button
            onClick={() => onSelectMedicament()}
            className="bg-green-500 text-white active:bg-gray-600 font-bold uppercase text-sm px-4 py-2 rounded-2xl shadow transform hover:scale-110 motion-reduce:transform-none mr-1 mb-1"
            type="button"
            style={{ transition: 'all .15s ease' }}
          >
            Añadir Medicamento
          </button>
        </nav>
        <span className="text-xl text-green-600">Salud</span>
        <Link
          to="/salud"
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
        title="MEDICAMENTOS"
        icons={TableIcons}
        localization={TableLocalization}
        columns={[
          { title: 'Medicamento', field: 'name', editable: 'never' },
          { title: 'Cantidad de unidades', field: 'quantity', editable: 'never' },
          { title: 'Unidad ml', field: 'milliliters', editable: 'never' },
          {
            title: 'Precio por unidad',
            field: 'unit_price',
            editable: 'never',
            type: 'currency',
            currencySetting: {
              locale: 'es-CR',
              currencyCode: 'CRC'
            }
          }
        ]}
        data={medicaments}
        actions={[
          /* {
              icon: Edit,
              tooltip: 'Editar',
              onClick: (event, rowData) => onSelectAddEditJob(rowData)
            },*/
          {
            icon: DeleteOutlineIcon,
            tooltip: 'Eliminar',
            onClick: (event, rowData) => onSelectMedicamentDelete(rowData)
          }
        ]}
        options={{
          headerStyle: { background: '#404A59', color: 'white' },
          rowStyle: {
            color: '#1F3A8A'
          },
          pageSizeOptions: [5, 10, 30, 50, 100],
          pageSize: 10,
          exportButton: true
        }}
      />
      <ModalMedicament />
    </>
  );
};
