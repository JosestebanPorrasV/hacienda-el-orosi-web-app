import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { collaboratorClearActive } from "../../actions/CollaboratorAction";

import { uiCloseModalInfoCollaborator } from "../../actions/UIAction";

export const ModalInfo = () => {
  const dispatch = useDispatch();

  const { modalCollaboratorInfoOpen } = useSelector((state) => state.ui);
  const { currentCollaborator } = useSelector((state) => state.collaborator);

  const closeModal = () => {
    dispatch(collaboratorClearActive());
    dispatch(uiCloseModalInfoCollaborator());
  };

  return (
    <>
      {modalCollaboratorInfoOpen ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-sm">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h3 className="text-3xl text-blue-900 font-semibold pr-8">{`Datos de ${currentCollaborator.name}`}</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => closeModal()}
                  >
                    <span className="bg-transparent text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="px-4  text-lg">
                    <div className="block py-1">
                      <h3 className="font-medium text-gray-700">
                        Fecha de ingreso
                      </h3>
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      {currentCollaborator.date_admission}
                      </p>
                    </div>
                    <div className="block py-1">
                      <h3 className="font-medium text-gray-700">
                        Direccion fisica
                      </h3>
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      {currentCollaborator.direction}
                      </p>
                    </div>
                    <div className="block py-1">
                      <h3 className="font-medium text-gray-700">
                        Nacionalidad
                      </h3>
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      {currentCollaborator.nationality}
                      </p>
                    </div>
                    <div className="block py-1">
                      <h3 className="font-medium text-gray-700">
                        Telefono
                      </h3>
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      {currentCollaborator.tel}
                      </p>
                    </div>
                    <div className="block py-1">
                      <h3 className="font-medium text-gray-700">
                        Celular
                      </h3>
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      {currentCollaborator.cel}
                      </p>
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={() => closeModal()}
                  >
                    Volver
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
};
