import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { collaboratorClearActive, collaboratorSetActive } from '../../actions/CollaboratorAction';
import { uiOpenModalAddLend } from '../../actions/UIAction';
import {
  uiOpenModalActive,
  uiOpenModalCollaborator,
  uiOpenModalPayment
} from '../../actions/UIAction';

export default function ModalMenu({ collaborator }) {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = React.useState(false);
  const { currentCollaborator } = useSelector((state) => state.collaborator);

  const modalClose = () => {
    dispatch(collaboratorClearActive());
    setShowModal(false);
  };

  const modalOpen = () => {
    setShowModal(true);
    dispatch(collaboratorSetActive(collaborator));
  };

  return (
    <>
      <button
        onClick={() => modalOpen()}
        className="text-gray-300 text-2xl font-bold hover:text-white"
      >
        <i className="fas fa-cogs"></i>
      </button>

      {showModal && currentCollaborator ? (
        <>
          <div
            onClick={() => setShowModal(false)}
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-sm">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-900 outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 rounded-t">
                  <h3 className="text-2xl font-semibold">
                    {currentCollaborator
                      ? `${currentCollaborator.name} ${currentCollaborator.surname}`
                      : 'Menu'}
                  </h3>
                </div>
                {/*body*/}

                <button
                  onClick={() => dispatch(uiOpenModalPayment())}
                  className="py-2 px-2 font-semibold block w-full hover:bg-blue-700 hover:text-white "
                >
                  <i className="fas fa-money-bill-wave"></i> Pagos
                </button>

                <button
                  className="py-2 font-semibold  block w-full hover:bg-blue-700 hover:text-white"
                  onClick={() => dispatch(uiOpenModalActive())}
                >
                  <i className="fas fa-tools"></i> Herramientas
                </button>

                <button
                  className="py-2 font-semibold  block w-full hover:bg-blue-700 hover:text-white"
                  onClick={() => dispatch(uiOpenModalCollaborator())}
                >
                  <i className="fas fa-user-edit"></i> Editar Contrato
                </button>
                <Link
                  to="/pagos"
                  className="py-2 font-semibold block w-full hover:bg-blue-700 hover:text-white "
                >
                  <i className="fas fa-dollar-sign"></i> Historial de pago
                </Link>

                <button
                  onClick={() => dispatch(uiOpenModalAddLend())}
                  className="py-2 font-semibold block w-full hover:bg-blue-700 hover:text-white "
                >
                  <i className="fas fa-hand-holding-usd"></i> Realizar prestemo
                </button>

                {/*footer*/}
                <div className="flex items-center justify-end p-6 rounded-b">
                  <button
                    className="text-gray-400 font-bold text-3xl hover:text-gray-200"
                    type="button"
                    style={{ transition: 'all .15s ease' }}
                    onClick={() => modalClose()}
                  >
                    <i className="fas fa-arrow-circle-left"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
