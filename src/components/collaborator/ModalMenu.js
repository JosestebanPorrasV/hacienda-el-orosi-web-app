import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  collaboratorClearActive,
  collaboratorSetActive,
  liquidateSetActive,
} from "../../actions/CollaboratorAction";
import { uiOpenModalAddLend } from "../../actions/UIAction";
import {
  uiOpenModalActive,
  uiOpenModalCollaborator,
  uiOpenModalPayment,
} from "../../actions/UIAction";

export default function ModalMenu({ collaborator }) {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = React.useState(false);
  const { currentCollaborator } = useSelector((state) => state.collaborator);

  const liquidate = () => {
    Swal.fire({
      title: "¿Esta seguro que desea Liquidar colaborador?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#A0A0A0",
      confirmButtonText: "Si, liquidar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        dispatch(liquidateSetActive());
        dispatch(uiOpenModalPayment());
      }
    });
  };

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
        className="bg-gray-300 text-gray-700 font-bold py-2 px-2 rounded inline-flex items-center hover:bg-gray-800 hover:text-white"
      >
        <i className="fas fa-cogs"></i> <span className="ml-1 mr-1">Menu</span>
      </button>

      {showModal && currentCollaborator ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-sm">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-900 outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 rounded-t">
                  <h3 className="text-2xl font-semibold">
                    {currentCollaborator
                      ? `${currentCollaborator.name} ${currentCollaborator.surname}`
                      : "Menu"}
                  </h3>
                  <button
                    className="p-1 ml-auto border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => modalClose()}
                  >
                    <span className="text-gray-200 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}

                <button
                  onClick={() => dispatch(uiOpenModalPayment())}
                  className="py-2 px-2 font-semibold block w-full hover:bg-blue-700 hover:text-white "
                >
                  <i className="fas fa-money-bill-wave"></i> Pagos
                </button>

                <button
                  className="py-2 font-semibold  w-full hover:bg-blue-700 hover:text-white"
                  onClick={() => liquidate()}
                >
                  <i className="far fa-handshake"></i> Liquidar
                </button>
                <Link
                  to={`/contrato/${
                    currentCollaborator &&
                    `${currentCollaborator.name}-${currentCollaborator.surname}`
                  }`}
                  className="py-2 font-semibold  block w-full hover:bg-blue-700 hover:text-white"
                >
                  <i className="fas fa-file-contract"></i> Ver contrato
                </Link>

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

                <button
                  onClick={() => dispatch(uiOpenModalAddLend())}
                  className="py-2 font-semibold block w-full hover:bg-blue-700 hover:text-white "
                >
                  <i className="fas fa-hand-holding-usd"></i> Realizar prestemo
                </button>

                {/*footer*/}
                <div className="flex items-center justify-end p-6 rounded-b">
                  <button
                    className="bg-gray-500 text-white active:bg-gray-600 font-semibold uppercase text-sm px-2 py-2 rounded shadow hover:bg-gray-800 outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={() => modalClose()}
                  >
                    Regresar
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
