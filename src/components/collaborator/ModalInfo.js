import React from 'react';
import { useDispatch } from 'react-redux';

import { collaboratorSetActive } from '../../actions/CollaboratorAction';
import { uiOpenModalCollaborator } from '../../actions/UIAction';

export const ModalInfo = ({ currentCollaborator }) => {
  const dispatch = useDispatch();
  return (
    <div className="relative p-6 flex-auto">
      <div className="px-4  text-lg">
        <div className="block py-1">
          <h3 className="font-medium text-gray-700">Fecha de ingreso</h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {currentCollaborator.date_admission}
          </p>
        </div>
        <div className="block py-1">
          <h3 className="font-medium text-gray-700">Dirección física</h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {currentCollaborator.direction}
          </p>
        </div>
        <div className="block py-1">
          <h3 className="font-medium text-gray-700">Nacionalidad</h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {currentCollaborator.nationality}
          </p>
        </div>
        <div className="block py-1">
          <h3 className="font-medium text-gray-700">Teléfono</h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{currentCollaborator.tel}</p>
        </div>
        <div className="block py-1">
          <h3 className="font-medium text-gray-700">Celular</h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{currentCollaborator.cel}</p>
        </div>
      </div>
      <button
        className="mt-4 bg-yellow-500 text-white active:bg-yellow-600 font-bold uppercase text-sm px-3 py-3 rounded shadow hover:bg-yellow-900 outline-none focus:outline-none mr-1 mb-1"
        type="submit"
        style={{ transition: 'all .15s ease' }}
        onClick={() =>
          dispatch(collaboratorSetActive(currentCollaborator), dispatch(uiOpenModalCollaborator()))
        }
      >
        <i className="fas fa-edit"></i> Editar
      </button>
    </div>
  );
};
