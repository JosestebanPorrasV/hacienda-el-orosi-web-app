import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MaterialTable from 'material-table';
import { TableIcons, TableLocalization, TableOptions } from '../../helpers/TableInit';

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

  const deleteInBulk = (data) => {
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
        dispatch(removeTools([ {tool: data}] ));
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
          className="inline-flex justify-center items-center px-1 rounded-lg"
        >
          <i className="fas fa-arrow-circle-left text-blue-600 text-2xl hover:text-green-800 "></i>{' '}
          <span className="text-xl text-blue-600 hover:underline ml-1">Colaboradores</span>
        </Link>

        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center md:flex md:space-x-4 space-y-2 md:space-y-0">
          <button
            onClick={() => dispatch(uiOpenModalAddTool())}
            className="bg-green-500 text-white active:bg-gray-600 font-bold uppercase text-sm px-4 py-2 rounded-2xl shadow transform hover:scale-110 motion-reduce:transform-none mr-1 mb-1"
            type="button"
            style={{ transition: 'all .15s ease' }}
          >
            Agregar
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

        <Link to="/ganado" className="inline-flex justify-center items-center px-1 rounded-lg">
          <span className="text-xl text-blue-600 hover:underline mr-1">Ganado</span>
          <i className="fas fa-arrow-circle-right text-blue-600 text-2xl hover:text-blue-800"></i>
        </Link>
      </div>

      <div className="flex flex-col text-center w-full mt-4 mb-4">
        <h1 className="sm:text-3xl text-2xl font-medium title-font text-green-700 uppercase">
          herramientas registradas
        </h1>
        <h2 className="text-xs text-green-700 tracking-widest font-medium title-font mb-1">
          {'Fecha actual: ' +
            dateNow.getFullYear() +
            '-' +
            (dateNow.getMonth() + 1) +
            '-' +
            dateNow.getDate()}
        </h2>
      </div>
      <MaterialTable
        title="HERRAMIENTAS"
        icons={TableIcons}
        localization={TableLocalization}
        columns={[
          { title: 'Herramienta', field: 'name', editable: 'never' },
          { title: 'Código', field: 'active_num', editable: 'never' },
          { title: 'Registrada', field: 'date', type: 'date', editable: 'never' },
          {
            title: 'Estado',
            field: 'status',
            lookup: {
              BODEGA: 'BODEGA',
              ACTIVO: 'ACTIVO',
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
            hidden: toolsState === 'BAJA' || toolsState === 'BODEGA',
            onClick: (event, rowData) => deleteInBulk(rowData)
          }
        ]}
        options={TableOptions}
      />
      <ModalTool />
      {currentTool && <ModalAddActive />}
    </>
  );
};
