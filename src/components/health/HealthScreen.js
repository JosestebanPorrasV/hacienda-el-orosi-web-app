import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MaterialTable from 'material-table';
import { TableIcons, TableLocalization, TableOptions } from '../../helpers/TableInit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Swal from 'sweetalert2';

import { ModalHealth } from './ModalHealth';
import {
  HealthsLoaded,
  healthSetActive,
  healthClearActive,
  healthDelete
} from '../../actions/HealthAction';
import { uiOpenModalHealth } from '../../actions/UIAction';

export const HealthScreen = () => {
  const dispatch = useDispatch();
  const { healths } = useSelector((state) => state.health);
  const { role } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(HealthsLoaded());
  }, [dispatch]);

  const onSelectHealthDelete = (health) => {
    dispatch(healthSetActive(health));
    deleteHealth(health);
  };

  const deleteHealth = (health) => {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'El registro de salud no se volerá a recuperar',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#A0A0A0',
      confirmButtonText: 'Si, eliminar!!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        dispatch(healthDelete(health));
      } else {
        dispatch(healthClearActive());
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
        <Link to="/ganado" className="inline-flex justify-center items-center px-1 rounded-lg">
          <i className="fas fa-arrow-circle-left text-blue-600 text-2xl hover:text-blue-800 "></i>{' '}
          <span className="text-xl text-blue-600 hover:underline ml-1">Ganado</span>
        </Link>

        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center md:flex md:space-x-4 space-y-2 md:space-y-0"></nav>

        <Link
          to="/medicamentos"
          className="inline-flex justify-center items-center px-1 rounded-lg"
        >
          <span className="text-xl text-blue-600 mr-1 hover:underline">Medicamentos</span>
          <i className="fas fa-arrow-circle-right text-blue-900 text-2xl hover:text-blue-500"></i>
        </Link>
      </div>

      <div className="flex flex-col text-center w-full mb-4">
        <h1 className="sm:text-3xl text-2xl font-medium title-font text-green-700">REGISTRO</h1>
        <h2 className="text-xs text-green-700 tracking-widest font-medium title-font mb-1">
          MEDICO
        </h2>
      </div>

      <button
        onClick={() => dispatch(uiOpenModalHealth())}
        className="bg-green-500 text-white active:bg-gray-600 font-bold uppercase text-sm px-4 py-2 rounded-2xl shadow transform hover:scale-110 motion-reduce:transform-none mr-1 mb-1"
        type="button"
        style={{ transition: 'all .15s ease' }}
      >
        Añadir Registro
      </button>
      <MaterialTable
        title="REGISTRO MEDICO"
        icons={TableIcons}
        localization={TableLocalization}
        columns={[
          { title: 'Chapa', field: 'animal.plate_number', editable: 'never' },
          { title: 'Animal', field: 'animal.name', editable: 'never' },
          { title: 'Medicamento', field: 'medicament.name', editable: 'never' },
          { title: 'Código', field: 'medicament.active_num', editable: 'never' },
          { title: 'Dosis Inyectada', field: 'dose', editable: 'never' },
          {
            title: 'Fecha Inyección',
            field: 'administrator_date',
            type: 'date',
            editable: 'never'
          },
          {
            title: 'Fecha para consumo',
            field: 'human_consumed_date',
            type: 'date',
            editable: 'never'
          }
        ]}
        data={healths}
        actions={[
          {
            icon: DeleteOutlineIcon,
            tooltip: 'Eliminar',
            onClick: (event, rowData) => onSelectHealthDelete(rowData)
          }
        ]}
        options={TableOptions}
      />
      <ModalHealth />
    </>
  );
};
