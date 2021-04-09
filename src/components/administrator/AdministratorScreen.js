import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AdministratorsLoading, administratorSetActive } from "../../actions/AdministratorAction";
import { UseForm } from "../../hooks/UseForm";
import SearchResults from "react-filter-search";
import { uiOpenModalAdministrator } from "../../actions/UIAction";
import { ModalAdministrator } from "./ModalAdministrator";

export const AdministratorScreen = () => {
  const dispatch = useDispatch();

  const { administrators } = useSelector((state) => state.administrator);

  useEffect(() => {
    dispatch(AdministratorsLoading());
  }, [dispatch]);

  const [formValues, handleInputChange] = UseForm({
    filter: "",
  });

  const { filter } = formValues;

  const onSelectAddChangeAdministrator = (administrator) => {
    dispatch(administratorSetActive(administrator));
    openModalAdministrator();
  };

  const openModalAdministrator = () => {
    dispatch(uiOpenModalAdministrator());
  };

  return (
    <>
      <div className="bg-gradient-to-r from-blue-200 rounded-lg px-4 lg:px-8 py-4 lg:py-6 mt-8 flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-12">
        <div className="text-gray-900">
          <h2 className="text-2xl">ADMINISTRADORES</h2>
          <p className=" opacity-70">Funcionalidades principales</p>
        </div>
        <nav className="md:flex md:space-x-4 space-y-2 md:space-y-0">
          <button 
          onClick={() => onSelectAddChangeAdministrator()}
          className="inline-flex flex-col justify-center items-center m-1 px-3 py-3 bg-gray-900 rounded-lg hover:bg-gray-800 w-35">
            <i className="fas fa-plus-circle"></i>
            <span className="text-white font-bold">Agregar Administrador</span>
          </button>
          <button className="inline-flex flex-col justify-center items-center m-1 px-3 py-3 bg-gray-900 rounded-lg hover:bg-gray-800 w-35">
            <i className="fas fa-address-book"></i>
            <span className="text-white font-bold">Listar Administradores</span>
          </button>
          <button 
          onClick={() => (openModalAdministrator())}
          className="inline-flex flex-col justify-center items-center m-1 px-3 py-3 bg-gray-900 rounded-lg hover:bg-gray-800 w-35">
            <i className="fas fa-user-edit"></i>
            <span className="text-white font-bold">Editar Gerente</span>
          </button>
        </nav>
      </div>

      <div className="bg-gray-700 rounded-lg px-4 lg:px-8 py-4 lg:py-6 mt-8 ">
        <h2 className="text-blue-200 text-xl font-bold mb-2">
          ADMINISTRADORES DE HACIENDA EL OROSI
        </h2>
        <input
          type="text"
          name="filter"
          className="rounded-t-lg w-1/4 h-4 p-4 placeholder-blue-800 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-60"
          placeholder="Filtrar por ..."
          value={filter}
          onChange={handleInputChange}
        />
        <span className="bg-blue-200 text-gray-900 md:ml-2 py-1 px-1 rounded-t-lg  inline-block text-center uppercase">
          <i className="fas fa-users"></i> {`total: ${administrators.length}`}
        </span>

        <div className="overflow-x-auto py-4">
          <div className="align-middle inline-block min-w-full overflow-hidden">
            <SearchResults
              value={filter}
              data={administrators}
              renderResults={(results) => (
                <table id="table-tools" className="min-w-full">
                  <thead className="bg-gray-600">
                    <tr className="bg-gray-600 text-white text-lg">
                      <th className="py-2 px-4">
                        <i className="fas fa-id-card"></i> Cedula
                      </th>
                      <th className="py-2 px-4">
                        <i className="fas fa-user"></i> Nombre
                      </th>
                      <th className="py-2 px-4">
                        <i className="fas fa-user"></i> Apellido
                      </th>
                      <th className="py-2 px-3">
                        <i class="fas fa-envelope-square"></i> Correo
                        Electronico
                      </th>
                      <th className="py-2 px-3">
                        <i class="fas fa-user-tie"></i> Gerente
                      </th>
                      <th className="py-2 px-3">
                        <i className="fas fa-cash-register"></i> Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-blue-100 text-opacity-80 whitespace-nowrap">
                    {results.map((administrator) => (
                      <tr key={administrator._id}>
                        <th className="py-3 px-3">
                          {administrator.document_id}
                        </th>
                        <th className="py-3 px-3">{administrator.name}</th>
                        <th className="py-3 px-3">{administrator.surname}</th>

                        <th className="py-3 px-3">{administrator.email}</th>
                        <th className="py-3 px-3">
                          {administrator.role === "RESOURCES_ROLE"
                            ? "Recursos Humanos"
                            : administrator.role === "GENERAL_ROLE"
                            ? "Dueño"
                            : "Gestor de Ganado"}
                        </th>

                        <th className="py-3 px-3">
                          <button
                            className={`
                            ${
                              administrator.role === "GENERAL_ROLE"
                                ? "bg-gray-500 "
                                : "bg-red-500 hover:bg-red-600"
                            }
                           text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow outline-none focus:outline-none mr-1 mb-1`}
                            disabled={true}
                            type="button"
                            style={{ transition: "all .15s ease" }}
                          >
                            {administrator.role === "Dueño" ? (
                              <i className="fas fa-user-slash"></i>
                            ) : (
                              <i className="fas fa-trash-alt"></i>
                            )}
                          </button>
                        </th>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            />
          </div>
        </div>
      </div>

      <ModalAdministrator/>
    </>
  );
};
