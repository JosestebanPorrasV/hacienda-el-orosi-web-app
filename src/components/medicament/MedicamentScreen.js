import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MaterialTable from 'material-table';
import { TableIcons, TableLocalization, TableOptions } from '../../helpers/TableInit';
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
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        dispatch(medicamentDelete(medicament));
      } else {
        dispatch(medicamentClearActive());
      }
    });
  };

  return (
    <>
      <div
        className={`${
          role === 'Encargado del ganado' && 'hidden'
        } container px-4 py-4 mx-auto flex flex-wrap flex-col md:flex-row items-center`}
      >
        <Link to="/ganado-detallado" className="inline-flex justify-center items-center px-1 rounded-lg">
          <i className="fas fa-arrow-circle-left text-blue-600 text-2xl hover:text-blue-800 "></i>{' '}
          <span className="text-xl text-blue-600 hover:underline ml-1">Ganado</span>
        </Link>

        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center md:flex md:space-x-4 space-y-2 md:space-y-0"></nav>

        <Link to="/salud" className="inline-flex justify-center items-center px-1 rounded-lg">
          <span className="text-xl text-blue-600 hover:underline mr-1">Salud</span>
          <i className="fas fa-arrow-circle-right text-blue-600 text-2xl hover:text-blue-800"></i>
        </Link>
      </div>

      <div className="flex flex-col text-center w-full mt-4 mb-4">
        <h1 className="sm:text-3xl text-2xl font-medium title-font text-green-700">Medicamentos</h1>
        <h2 className="text-xs text-green-700 tracking-widest font-medium title-font mb-1">
          REGISTRADOS
        </h2>
      </div>

      <button
        onClick={() => onSelectMedicament()}
        className="bg-green-500 text-white active:bg-gray-600 font-bold uppercase text-sm px-4 py-2 rounded-2xl shadow transform hover:scale-110 motion-reduce:transform-none mr-1 mb-1"
        type="button"
        style={{ transition: 'all .15s ease' }}
      >
        Añadir Medicamento
      </button>
      <MaterialTable
        title="MEDICAMENTOS"
        icons={TableIcons}
        localization={TableLocalization}
        columns={[
          { title: 'Código', field: 'active_num', editable: 'never' },
          { title: 'Medicamento', field: 'name', editable: 'never' },
          { title: 'Cantidad de unidades', field: 'quantity', editable: 'never' },
          { title: 'Unidad mL c/u', field: 'milliliters', editable: 'never' },
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
          {
            icon: DeleteOutlineIcon,
            tooltip: 'Eliminar',
            onClick: (event, rowData) => onSelectMedicamentDelete(rowData)
          }
        ]}
        options={TableOptions}
      />
      <ModalMedicament />
    </>
  );
};
