import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import SearchResults from "react-filter-search";
import { Link } from "react-router-dom";

import {
  collaboratorClearActive,
  collaboratorSetActive,
  CollaboratorsLoading,
} from "../../actions/CollaboratorAction";
import { UseForm } from "../../hooks/UseForm";
import { ModalInfo } from "./ModalInfo";
import {
  uiOpenModalInfoCollaborator,
  uiOpenModalCollaborator,
  uiOpenModalActive,
} from "../../actions/UIAction";
import { ModalLend } from "../lend/ModalLend";
import { ModalActive } from "../tool/ModalActive";
import { ModalCollaborator } from "./ModalCollaborator";
import Swal from "sweetalert2";
import { registerTodayPresence } from "../../actions/PaymentAction";
import { PaymentModal } from "../payment/PaymentModal";
import ModalMenu from "./ModalMenu";

export const CollaboratorScreen = () => {
  const dispatch = useDispatch();

  const { collaborators, collaboratorsState, countCollaborators } = useSelector(
    (state) => state.collaborator
  );
  const { modalPaymentOpen, modalActiveOpen } = useSelector(
    (state) => state.ui
  );
  const { role } = useSelector((state) => state.auth);

  const { currentCollaborator } = useSelector((state) => state.collaborator);

  useEffect(() => {
    dispatch(CollaboratorsLoading());
  }, [dispatch]);

  const [formValues, handleInputChange] = UseForm({
    filter: "",
  });

  const onSelectCollaborator = (collaborator) => {
    dispatch(collaboratorSetActive(collaborator));
    openModalInfo();
  };

  const openModalInfo = () => {
    dispatch(uiOpenModalInfoCollaborator());
  };

  const registerPresence = async (collaborator) => {
    const total_overtime = await Swal.fire({
      title: "Registrar dia laboral ",
      input: "number",
      inputLabel: "Horas extras",
      inputPlaceholder: "Escriba",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#A0A0A0",
      confirmButtonText: "Si, registrar",
      cancelButtonText: "Cancelar",
    });

    if (total_overtime.isConfirmed) {
      dispatch(
        registerTodayPresence(
          collaborator,
          !total_overtime.value ? 0 : total_overtime.value
        )
      );
    }
  };

  const contractCollaborator = () => {
    dispatch(collaboratorClearActive());
    dispatch(uiOpenModalCollaborator());
  };

  const showActiveModal = (collaborator) => {
    dispatch(collaboratorSetActive(collaborator));
    dispatch(uiOpenModalActive());
  };

  const { filter } = formValues;

  let dateNow = new Date();

  return (
    <>
      <div
        className={`${
          role === "Encargado del ganado" && "hidden"
        } bg-gradient-to-r from-blue-200 rounded-lg px-4 lg:px-8 py-4 lg:py-6 mt-8 flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-12`}
      >
        <div>
          <h2 className="text-2xl">COLABORADORES</h2>
          <p className="text-gray-600">Funcionalidades principales</p>
        </div>
        <nav className="md:flex md:space-x-4 space-y-2 md:space-y-0 text-lg text-gray-200">
          <button
            onClick={() => contractCollaborator()}
            className="inline-flex flex-col justify-center items-center m-1 px-3 py-3 bg-black rounded-lg hover:bg-gray-700 w-35 fas fa-user-plus"
          >
            <span>Contratar nuevo</span>
          </button>
          <button
            onClick={() => dispatch(CollaboratorsLoading("Activo"))}
            className="inline-flex flex-col justify-center items-center m-1 px-3 py-3 bg-black rounded-lg hover:bg-gray-700  w-35 fas fa-chart-line"
          >
            <span>Listar activos</span>
          </button>
          <button
            onClick={() => dispatch(CollaboratorsLoading("Inactivo"))}
            className="inline-flex flex-col justify-center items-center m-1 px-3 py-3 bg-black rounded-lg  hover:bg-gray-700  w-35 fas fa-stop-circle"
          >
            <span>Listar inactivos</span>
          </button>
          <a
            href={`https://hacienda-el-orosi-bucket.s3.amazonaws.com/reporte-colaboradores-${
              collaboratorsState === "Activo" ? "activos" : "inactivos"
            }.pdf`}
            className="inline-flex flex-col justify-center items-center m-1 px-3 py-3 bg-black rounded-lg  hover:bg-gray-700  w-35 fas fa-cloud-download-alt"
          >
            <span>
              {" "}
              {`Reporte de ${
                collaboratorsState
                  ? collaboratorsState === "Activo"
                    ? "activos"
                    : "inactivos"
                  : null
              }`}
            </span>
          </a>

          <Link
            to="/trabajos"
            className="inline-flex flex-col justify-center items-center m-1 px-3 py-3 bg-black rounded-lg hover:bg-gray-700 w-35 fas fa-building"
          >
            <span>Trabajos</span>
          </Link>
        </nav>
      </div>

      <div className="mt-8 bg-gray-700 rounded-lg">
        <span className="pl-4 pt-2 text-lg flex space-x-4">
          {"Fecha actual: " +
            dateNow.getDate() +
            "-" +
            (dateNow.getMonth() + 1) +
            "-" +
            dateNow.getFullYear()}
        </span>
        {collaborators.length !== 0 ? (
          <>
            <h2
              className={`p-4 ${
                collaboratorsState === "Activo"
                  ? "text-green-400"
                  : collaboratorsState === "Inactivo"
                  ? "text-red-400"
                  : "text-yellow-400"
              } text-xl font-bold mb-2`}
            >{`COLABORADORES ${
              collaboratorsState === "Activo"
                ? "ACTIVOS"
                : collaboratorsState === "Inactivo"
                ? "INACTIVOS"
                : "REGISTRADOS"
            }`}</h2>
            <input
              type="text"
              name="filter"
              className="rounded-t-lg w-1/4 h-4 p-4 placeholder-blue-800 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-60"
              placeholder="Filtrar por ..."
              value={filter}
              onChange={handleInputChange}
            />
            <span
              className={`${
                collaboratorsState === "Activo"
                  ? "bg-green-200 text-green-600"
                  : collaboratorsState === "Inactivo"
                  ? "bg-red-200 text-red-600"
                  : "bg-yellow-200 text-yellow-600"
              } md:ml-2 py-1 px-1 rounded-t-lg  inline-block text-center uppercase`}
            >
              <i className="fas fa-box-open"></i>{" "}
              {`total: ${countCollaborators}`}
            </span>
            <div className=" overflow-x-auto ">
              <SearchResults
                value={filter}
                data={collaborators}
                renderResults={(results) => (
                  <table className="text-center items-center w-full">
                    <thead className="bg-gray-800 flex text-white w-full">
                      <tr className="flex w-full">
                        <div hidden={role === "Encargado del ganado"}></div>
                        <th
                          className="p-4 w-1/4"
                          hidden={
                            collaboratorsState === "Inactivo" ||
                            !collaboratorsState ||
                            role === "Encargado del ganado"
                          }
                        >
                          <i className="fas fa-check"></i> Asistencia
                        </th>
                        <th className="p-4 w-1/4" hidden={collaboratorsState}>
                          <i className="fas fa-signal"></i> Estado
                        </th>
                        <th className="p-4 w-1/4">
                          <i className="fas fa-user"></i> Nombre completo
                        </th>
                        <th className="p-4 w-1/4">
                          <i className="fas fa-user"></i> Trabajo
                        </th>
                        <th className="p-4 w-1/4">
                          <i className="fas fa-id-card"></i> Cedula
                        </th>
                        <th className="p-4 w-1/4">
                          <i className="fas fa-user-lock"></i> Datos personales
                        </th>
                        <th
                          className="p-4 w-1/4"
                          hidden={
                            collaboratorsState === "Inactivo" ||
                            !collaboratorsState ||
                            role === "Encargado del ganado"
                          }
                        >
                          <i className="fas fa-caret-square-down"></i> Acciones
                        </th>

                        <th
                          className="p-4 w-1/4 pr-10"
                          hidden={
                            collaboratorsState === "Activo" ||
                            !collaboratorsState ||
                            role === "Encargado del ganado"
                          }
                        >
                          <i className="fas fa-caret-square-down"></i> Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody
                      className="text-blue-100 flex-col justify-between overflow-y-scroll w-full"
                      style={{ height: "50vh" }}
                    >
                      {results.map((collaborator) => (
                        <tr className="flex w-full" key={collaborator._id}>
                          <th
                            className="p-4 w-1/4"
                            hidden={
                              collaboratorsState === "Inactivo" ||
                              !collaboratorsState ||
                              role === "Encargado del ganado"
                            }
                          >
                            <button
                              hidden={collaborator.validatePresence}
                              onClick={() => registerPresence(collaborator)}
                              className="px-4 py-2 text-sm font-medium tracking-wide text-white transition-colors duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                            >
                              <i className="far fa-calendar-check"></i> Registar
                              día
                            </button>
                          </th>
                          <th className="p-4 w-1/4" hidden={collaboratorsState}>
                            <span
                              className={` ${
                                collaborator.status === "Activo"
                                  ? "bg-green-200 text-green-600"
                                  : "bg-red-200 text-red-600"
                              }  text-xs rounded-full px-3 py-1 w-26 inline-block text-center uppercase`}
                            >
                              {collaborator.status === "Activo"
                                ? "Activo"
                                : "Cancelado"}
                            </span>
                          </th>

                          <th className="p-4 w-1/4">
                            {`${collaborator.name} ${collaborator.surname}`}
                          </th>
                          <th className="p-4 w-1/4">
                            {`${collaborator.job.name}`}
                          </th>
                          <th className="p-4 w-1/4">
                            {collaborator.document_id}
                          </th>
                          <th className="p-4 w-1/4">
                            <button
                              onClick={() => onSelectCollaborator(collaborator)}
                              className="bg-blue-600 text-white  font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:bg-blue-400 hover:text-white outline-none"
                              type="button"
                            >
                              <i className="far fa-eye"></i> ver
                            </button>
                          </th>
                          <th
                            className="p-4 w-1/4 "
                            hidden={
                              collaboratorsState === "Inactivo" ||
                              !collaboratorsState ||
                              role === "Encargado del ganado"
                            }
                          >
                            <ModalMenu collaborator={collaborator} />
                          </th>

                          <th
                            className="p-4 w-1/4"
                            hidden={
                              collaboratorsState === "Activo" ||
                              !collaboratorsState ||
                              role === "Encargado del ganado"
                            }
                          >
                            <button
                              onClick={() => onSelectCollaborator(collaborator)}
                              className="bg-green-400 text-green-900  font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:bg-green-400 hover:text-white outline-none"
                              type="button"
                            >
                              <i className="fas fa-user-plus"></i> contratar
                            </button>
                          </th>
                          <th
                            className="p-4 w-1/4"
                            hidden={role !== "Encargado del ganado"}
                          >
                            <button
                              className="py-2 font-semibold  block w-full hover:bg-blue-700 hover:text-white"
                              onClick={() => showActiveModal(collaborator)}
                            >
                              <i className="fas fa-tools"></i> Herramientas
                            </button>
                          </th>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              />
            </div>
          </>
        ) : (
          <span className="ml-2 text-gray-400 whitespace-nowrap italic">
            - ( No se encontraron colaboradore ) -
          </span>
        )}
      </div>

      {currentCollaborator && <ModalInfo />}
      {currentCollaborator && <ModalLend />}
      {currentCollaborator && modalActiveOpen && <ModalActive />}
      {currentCollaborator && modalPaymentOpen && <PaymentModal />}
      <ModalCollaborator />
    </>
  );
};
