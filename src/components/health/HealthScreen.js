import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MaterialTable from 'material-table';
import { TableIcons, TableLocalization } from '../../helpers/TableInit';

import { ModalHealth } from './ModalHealth';
import { HealthsLoaded, healthSetActive } from '../../actions/HealthAction';
import { uiOpenModalHealth } from '../../actions/UIAction';

export const HealthScreen = () => {
  const dispatch = useDispatch();
  const { healths } = useSelector((state) => state.health);
  const { role } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(HealthsLoaded());
  }, [dispatch]);

  const onSelectHealth = (healthId) => {
    dispatch(healthSetActive(healthId));
    openModalHealth();
  };

  const openModalHealth = () => {
    dispatch(uiOpenModalHealth());
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
            onClick={() => onSelectHealth()}
            className="bg-green-500 text-white active:bg-gray-600 font-bold uppercase text-sm px-4 py-2 rounded-2xl shadow transform hover:scale-110 motion-reduce:transform-none mr-1 mb-1"
            type="button"
            style={{ transition: 'all .15s ease' }}
          >
            Añadir Registro
          </button>
        </nav>
        <span className="text-xl text-green-600">Medicamentos</span>
        <Link
          to="/medicamentos"
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
        title={<h2 className={`text-green-700 text-xl font-bold`}>REGISTRO MEDICO</h2>}
        icons={TableIcons}
        localization={TableLocalization}
        columns={[
          { title: 'Chapa', field: 'animal.plate_number', editable: 'never' },
          { title: 'Animal', field: 'animal.name', editable: 'never' },
          { title: 'Medicamento', field: 'medicament.name', editable: 'never' },
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
      <ModalHealth />
    </>
  );
};
