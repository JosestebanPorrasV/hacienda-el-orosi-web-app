import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MaterialTable from 'material-table';
import { TableIcons, TableLocalization } from '../../helpers/TableInit';

import AddBox from '@material-ui/icons/AddBox';
import Remove from '@material-ui/icons/Remove';

import {
  removeTools,
  toolsLoading,
  changeStatus,
  toolSetActive,
  toolClearActive
} from '../../actions/ToolAction';
import { uiOpenModalAddTool, uiOpenModalAddActive } from '../../actions/UIAction';
import Swal from 'sweetalert2';
import { ModalTool } from './ModalTool';
import { ModalAddActive } from './ModalAddActive';

export const ToolScreen = () => {
  const dispatch = useDispatch();
  const { tools, toolsState, currentTool } = useSelector((state) => state.tool);
  const { role } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(toolsLoading());
  }, [dispatch]);

  const changeStatusTool = async (tool, status) => {
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
        dispatch(changeStatus(tool._id, status));
      }
    });
  };

  const addOneToolActive = (tool) => {
    dispatch(uiOpenModalAddActive());
    dispatch(toolSetActive(tool));
  };

  const deleteInBulk = (tool) => {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'La herramienta se regresara a Bodega',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#A0A0A0',
      confirmButtonText: 'Si, regresar la herramienta',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        dispatch(removeTools([{ tool_id: tool._id }]));
      } else {
        toolClearActive();
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
            onClick={() => dispatch(uiOpenModalAddTool())}
            className="bg-green-500 text-white active:bg-gray-600 font-bold uppercase text-sm px-4 py-2 rounded-2xl shadow transform hover:scale-110 motion-reduce:transform-none mr-1 mb-1"
            type="button"
            style={{ transition: 'all .15s ease' }}
          >
            Añadir
          </button>

          <button
            onClick={() => dispatch(toolsLoading('ACTIVO'))}
            className="bg-green-500 text-white active:bg-gray-600 font-bold uppercase text-sm px-4 py-2 rounded-2xl shadow transform hover:scale-110 motion-reduce:transform-none mr-1 mb-1"
            style={{ transition: 'all .15s ease' }}
          >
            <span>Activas</span>
          </button>

          <button
            onClick={() => dispatch(toolsLoading('BODEGA'))}
            className="bg-green-500 text-white active:bg-gray-600 font-bold uppercase text-sm px-4 py-2 rounded-2xl shadow transform hover:scale-110 motion-reduce:transform-none mr-1 mb-1"
            style={{ transition: 'all .15s ease' }}
          >
            <span>En Bodega</span>
          </button>

          <button
            onClick={() => dispatch(toolsLoading('REPARACION'))}
            className="bg-green-500 text-white active:bg-gray-600 font-bold uppercase text-sm px-4 py-2 rounded-2xl shadow transform hover:scale-110 motion-reduce:transform-none mr-1 mb-1"
            style={{ transition: 'all .15s ease' }}
          >
            <span>En reparacion</span>
          </button>

          <button
            onClick={() => dispatch(toolsLoading('BAJA'))}
            className="bg-green-500 text-white active:bg-gray-600 font-bold uppercase text-sm px-4 py-2 rounded-2xl shadow transform hover:scale-110 motion-reduce:transform-none mr-1 mb-1"
            style={{ transition: 'all .15s ease' }}
          >
            <span>De baja</span>
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
        title={<h2 className={`text-green-700 text-xl font-bold`}>HERRAMIENTAS</h2>}
        icons={TableIcons}
        localization={TableLocalization}
        columns={[
          { title: 'Herramienta', field: 'name', editable: 'never' },
          { title: 'Código', field: 'active_num', editable: 'never' },
          { title: 'Registrada', field: 'date', editable: 'never' },
          {
            title: 'Estado',
            field: 'status',
            lookup: {
              BODEGA: 'BODEGA',
              Activo: 'ACTIVO',
              REPARACION: 'REPARACION',
              BAJA: 'BAJA'
            },
            validate: (rowData) => (rowData.status === 'BAJA' ? { isValid: false } : true)
          }
        ]}
        data={tools}
        cellEditable={{
          onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
            return new Promise((resolve, reject) => {
              changeStatusTool(rowData, newValue);
              setTimeout(resolve, 1000);
            });
          }
        }}
        actions={[
          {
            icon: AddBox,
            tooltip: 'Activar Herramienta',
            onClick: (event, rowData) => addOneToolActive(rowData),
            hidden: toolsState !== 'BODEGA'
          },
          {
            icon: Remove,
            tooltip: 'Regresar a bodega',
            onClick: (event, rowData) => deleteInBulk(rowData),
            hidden: toolsState === 'BAJA' || toolsState === 'BODEGA'
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
      <ModalTool />
      {currentTool && <ModalAddActive />}
    </>
  );
};
