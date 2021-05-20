import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MaterialTable from 'material-table';
import { TableIcons, TableLocalization } from '../../helpers/TableInit';

import DeleteOutline from '@material-ui/icons/DeleteOutline';

import {
  activesToolsLoaded,
  removeTools,
  addActiveSelected,
  removeInSelectedActives
} from '../../actions/ToolAction';
import Swal from 'sweetalert2';

export const ActiveScreen = () => {
  const dispatch = useDispatch();
  const { actives, selectedActives } = useSelector((state) => state.tool);
  const { role } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(activesToolsLoaded());
  }, [dispatch]);
  

  const toggleCheckbox = (e, active) => {
    if (e.target.checked) {
      dispatch(addActiveSelected({ active_id: active._id, tool_id: active.tool._id }));
    } else {
      dispatch(removeInSelectedActives(active._id));
    }
  };

  const removeManyTool = () => {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'Las herramientas se regresaran a Bodega',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#A0A0A0',
      confirmButtonText: 'Si, eliminar de activos',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        dispatch(removeTools(selectedActives));
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
        title="HERRAMIENTAS EN USO"
        icons={TableIcons}
        localization={TableLocalization}
        columns={[
          { title: 'Nombre completo', field: 'collaborator.name', editable: 'never' },
          { title: 'Cédula', field: 'collaborator.document_id', editable: 'never' },
          { title: 'Herramienta', field: 'tool.name', editable: 'never' },
          { title: 'Código', field: 'tool.active_num', editable: 'never' },
          { title: 'Registrada', field: 'date_active', editable: 'never' }
        ]}
        data={actives}
        actions={[
          {
            icon: DeleteOutline,
            tooltip: 'Eliminar',
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
          - ( Sin herramientas activas ) -
        </span>
      )}
    </>
  );
};
