import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ModalJob } from './ModalJob';
import { Link } from 'react-router-dom';
import MaterialTable from 'material-table';
import { TableIcons, TableLocalization } from '../../helpers/TableInit';

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
      confirmButtonText: 'Si, eliminar!!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        dispatch(oneJobDelete(job));
      } else {
        dispatch(jobClearActive());
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
          to="/colaboradores"
          className="inline-flex flex-col justify-center items-center px-1 rounded-lg"
        >
          <i className="fas fa-arrow-circle-left text-green-900 text-2xl hover:text-green-500 "></i>
        </Link>
        <span className="text-xl text-green-600">Colaboradores</span>

        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center md:flex md:space-x-4 space-y-2 md:space-y-0">
          <button
            onClick={() => onSelectAddEditJob()}
            className="bg-green-500 text-white active:bg-gray-600 font-bold uppercase text-sm px-4 py-2 rounded-2xl shadow transform hover:scale-110 motion-reduce:transform-none mr-1 mb-1"
            type="button"
            style={{ transition: 'all .15s ease' }}
          >
            Añadir
          </button>
        </nav>
        <span className="text-xl text-green-600">Ganado</span>
        <Link
          to="/animales"
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
        title="TRABAJOS"
        icons={TableIcons}
        localization={TableLocalization}
        columns={[
          { title: 'Trabajo', field: 'name', editable: 'never' },
          { title: 'Horas', field: 'work_hours', editable: 'never' },
          { title: 'Precio día', field: 'price_day', editable: 'never' },
          { title: 'Hora extra', field: 'price_extra_hours', editable: 'never' },
          { title: 'Descripción', field: 'description', editable: 'never' }
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
        options={{
          headerStyle: { color: '#076046' },
          pageSizeOptions: [5, 10, 30, 50, 100],
          actionsColumnIndex: -1,
          pageSize: 10,
          exportButton: true
        }}
      />
      ) : (
      <span className="ml-2 text-gray-400 whitespace-nowrap italic">
        - ( No se encontraron trabajos ) -
      </span>
      )
      <ModalJob />
    </>
  );
};
