import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import SearchResults from "react-filter-search";

import {
  collaboratorSetActive,
  CollaboratorsLoading,
} from "../../actions/CollaboratorAction";
import { UseForm } from "../../hooks/UseForm";
import { ModalInfo } from "./ModalInfo";
import { uiOpenModalInfoCollaborator } from "../../actions/UIAction";
import DropdownRender from "./Dropdown";
import { ModalLend } from "../lend/ModalLend";

export const CollaboratorScreen = () => {
  const dispatch = useDispatch();

  const { collaborators, collaboratorsState, countCollaborators } = useSelector(
    (state) => state.collaborator
  );

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

  const getCollaboratorsInactive = () => {
    dispatch(CollaboratorsLoading("inactive"));
  };
  const getCollaboratorsActive = () => {
    dispatch(CollaboratorsLoading("active"));
  };

  const { filter } = formValues;

  let dateNow = new Date();

  return (
    <>
      <div className="bg-blue-900 rounded-lg px-4 lg:px-8  lg:py-6 mt-8 flex flex-col lg:flex-row  lg:space-y-0 lg:space-x-12">
        <div>
          <h2 className="text-2xl">COLABORADORES</h2>
          <p className="text-blue-100 opacity-70">
            Funcionalidades principales
          </p>
        </div>
        <nav className="md:flex md:space-x-4 space-y-2 md:space-y-0 text-lg text-gray-200">
          <button className="inline-flex flex-col justify-center items-center m-1 px-3 py-3 bg-gray-900 rounded-lg hover:bg-gray-700 w-35 fas fa-user-plus">
            <span>Contratar nuevo</span>
          </button>
          <button
            onClick={() => getCollaboratorsActive()}
            className="inline-flex flex-col justify-center items-center m-1 px-3 py-3 bg-gray-900 rounded-lg hover:bg-gray-800 w-35 fas fa-chart-line"
          >
            <span>Listar activos</span>
          </button>
          <button
            onClick={() => getCollaboratorsInactive()}
            className="inline-flex flex-col justify-center items-center m-1 px-3 py-3 bg-gray-900 rounded-lg hover:bg-gray-800 w-35 fas fa-stop-circle"
          >
            <span>Listar inactivos</span>
          </button>
          <button className="inline-flex flex-col justify-center items-center m-1 px-3 py-3 bg-gray-900 rounded-lg hover:bg-gray-800 w-35 fas fa-cloud-download-alt">
            <span>Descargar Activos</span>
          </button>
        </nav>
      </div>

      <div className="mt-8 overflow-x-auto bg-gray-700 rounded-lg">
        <span className="pl-4 pt-2 text-lg flex space-x-4">
          {"Fecha actual: " +
            dateNow.getDate() +
            "-" +
            (dateNow.getMonth() + 1) +
            "-" +
            dateNow.getFullYear()}
        </span>
        <h2
          className={`p-4 ${
            collaboratorsState === "active"
              ? "text-green-400"
              : collaboratorsState === "inactive"
              ? "text-red-400"
              : "text-yellow-400"
          } text-xl font-bold mb-2`}
        >{`COLABORADORES ${
          collaboratorsState === "active"
            ? "ACTIVOS"
            : collaboratorsState === "inactive"
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
            collaboratorsState === "active"
              ? "bg-green-200 text-green-600"
              : collaboratorsState === "inactive"
              ? "bg-red-200 text-red-600"
              : "bg-yellow-200 text-yellow-600"
          } md:ml-2 py-1 px-1 rounded-t-lg  inline-block text-center uppercase`}
        >
          <i className="fas fa-box-open"></i> {`total: ${countCollaborators}`}
        </span>
        <SearchResults
          value={filter}
          data={collaborators}
          renderResults={(results) => (
            <table className="text-center items-center w-full">
              <thead className="bg-gray-800 flex text-white w-full">
                <tr className="flex w-full ">
                  <th
                    className="p-4 w-1/4"
                    hidden={
                      collaboratorsState === "inactive" || !collaboratorsState
                    }
                  >
                    <i className="fas fa-check"></i> Asistencia
                  </th>
                  <th className="p-4 w-1/4" hidden={collaboratorsState}>
                    <i className="fas fa-signal"></i> Estado
                  </th>
                  <th className="p-4 w-1/4">
                    <i className="fas fa-user"></i> Nombre
                  </th>
                  <th className="p-4 w-1/4">
                    <i className="fas fa-user"></i> Apellido
                  </th>
                  <th className="p-4 w-1/4">
                    <i className="fas fa-id-card"></i> Cedula
                  </th>
                  <th className="p-4 w-1/4">
                    <i className="fas fa-user-lock"></i> Datos personales
                  </th>
                  <th
                    className="p-4 w-1/4 pr-10"
                    hidden={
                      collaboratorsState === "inactive" || !collaboratorsState
                    }
                  >
                    <i className="fas fa-caret-square-down"></i> Acciones
                  </th>

                  <th
                    className="p-4 w-1/4 pr-10"
                    hidden={
                      collaboratorsState === "active" || !collaboratorsState
                    }
                  >
                    <i className="fas fa-caret-square-down"></i> Acciones
                  </th>
                </tr>
              </thead>
              <tbody
                className=" divide-y divide-gray-500 divide-solid text-blue-100 bg-grey-light flex flex-col justify-between overflow-y-scroll w-full"
                style={{ height: "50vh" }}
              >
                {results.map((collaborator) => (
                  <tr className="flex w-full " key={collaborator._id}>
                    <th
                      className="p-4 w-1/4"
                      hidden={
                        collaboratorsState === "inactive" || !collaboratorsState
                      }
                    >
                      <label className="inline-flex items-center mt-3">
                        <input
                          type="checkbox"
                          className="form-checkbox h-5 w-5 text-green-600"
                          defaultChecked={false}
                        />
                      </label>
                    </th>
                    <th className="p-4 w-1/4" hidden={collaboratorsState}>
                      <span
                        className={` ${
                          collaborator.status === "active"
                            ? "bg-green-200 text-green-600"
                            : "bg-red-200 text-red-600"
                        }  text-xs rounded-full px-3 py-1 w-26 inline-block text-center uppercase`}
                      >
                        {collaborator.status === "active"
                          ? "Activo"
                          : "Cancelado"}
                      </span>
                    </th>

                    <th className="p-4 w-1/4">
                      {collaborator
                        ? `${collaborator.name}`
                        : "No existe colaborador"}
                    </th>
                    <th className="p-4 w-1/4">
                      {collaborator
                        ? `${collaborator.surname}`
                        : "No existe colaborador"}
                    </th>
                    <th className="p-4 w-1/4">
                      {collaborator.document_id
                        ? collaborator.document_id
                        : "No existe colaborador"}
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
                      className="p-4 w-1/4"
                      hidden={
                        collaboratorsState === "inactive" || !collaboratorsState
                      }
                    >
                      <DropdownRender collaborator={collaborator} />
                    </th>

                    <th
                      className="p-4 w-1/4"
                      hidden={
                        collaboratorsState === "active" || !collaboratorsState
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
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        />
      </div>

      <ModalInfo />
      <ModalLend />
    </>
  );
};
