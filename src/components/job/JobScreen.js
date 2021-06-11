import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ModalJob } from './ModalJob';
import { Link } from 'react-router-dom';
import MaterialTable from 'material-table';
import { TableIcons, TableLocalization, TableOptions } from '../../helpers/TableInit';

import Edit from '@material-ui/icons/Edit';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

import { JobsLoaded, oneJobDelete, jobSetActive, jobClearActive } from '../../actions/JobAction';
import Swal from 'sweetalert2';
import { uiOpenModalJob } from '../../actions/UIAction';

export const JobScreen = () => {
  const dispatch = useDispatch();
  const { jobs } = useSelector((state) => state.job);
  const { role } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(JobsLoaded());
  }, [dispatch]);

  const onSelectJobOneDelete = (job) => {
    dispatch(jobSetActive(job));
    deleteJob(job);
  };

  const onSelectAddEditJob = (jobId) => {
    dispatch(jobSetActive(jobId));
    openModalJob();
  };

  const openModalJob = () => {
    dispatch(uiOpenModalJob());
  };

  const deleteJob = (job) => {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'El trabajo no se volerá a recuperar',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#A0A0A0',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        dispatch(oneJobDelete(job));
      } else {
        dispatch(jobClearActive());
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
        <Link
          to="/colaboradores"
          className="inline-flex justify-center items-center px-1 rounded-lg"
        >
          <i className="fas fa-arrow-circle-left text-blue-500 text-2xl hover:text-blue-900 "></i>{' '}
          <span className="text-xl text-blue-500 hover:underline ml-1">Colaboradores</span>
        </Link>

        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center md:flex md:space-x-4 space-y-2 md:space-y-0"></nav>
        <Link to="/ganado" className="inline-flex justify-center items-center px-1 rounded-lg">
          <span className="text-xl text-blue-500 hover:underline mr-1 ">Ganado</span>
          <i className="fas fa-arrow-circle-right text-blue-500 text-2xl hover:text-blue-900"></i>
        </Link>
      </div>
      <div className="flex flex-col text-center w-full mt-4 mb-4">
        <h1 className="sm:text-3xl text-2xl font-medium title-font text-green-700">TRABAJOS</h1>
        <h2 className="text-xs text-green-700 tracking-widest font-medium title-font mb-1">
          REGISTRADOS
        </h2>
      </div>
      <button
        onClick={() => onSelectAddEditJob()}
        className="bg-green-500 text-white active:bg-gray-600 font-bold uppercase text-sm px-4 py-2 rounded-2xl shadow transform hover:scale-110 motion-reduce:transform-none mr-1 mb-1"
        type="button"
        style={{ transition: 'all .15s ease' }}
      >
        Registrar trabajo
      </button>
      <MaterialTable
        title="TRABAJOS"
        icons={TableIcons}
        localization={TableLocalization}
        columns={[
          { title: 'Trabajo', field: 'name', editable: 'never' },
          { title: 'Horas', field: 'work_hours', editable: 'never' },
          { title: 'Descripción', field: 'description', editable: 'never' },
          {
            title: 'Precio día',
            field: 'price_day',
            editable: 'never',
            type: 'currency',
            currencySetting: {
              locale: 'es-CR',
              currencyCode: 'CRC'
            }
          },
          {
            title: 'Hora extra',
            field: 'price_extra_hours',
            editable: 'never',
            type: 'currency',
            currencySetting: {
              locale: 'es-CR',
              currencyCode: 'CRC'
            }
          }
        ]}
        data={jobs}
        actions={[
          {
            icon: Edit,
            tooltip: 'Editar',
            onClick: (event, rowData) => onSelectAddEditJob(rowData)
          },
          {
            icon: DeleteOutline,
            tooltip: 'Eliminar',
            onClick: (event, rowData) => onSelectJobOneDelete(rowData)
          }
        ]}
        options={TableOptions}
      />
      <ModalJob />
    </>
  );
};
