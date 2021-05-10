import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchResults from "react-filter-search";
import { Link } from "react-router-dom";

import {
  activesToolsLoaded,
  removeTools,
  addActiveSelected,
  removeInSelectedActives,
} from "../../actions/ToolAction";
import { UseForm } from "../../hooks/UseForm";
import Swal from "sweetalert2";

export const ActiveScreen = () => {
  const dispatch = useDispatch();
  const { actives, selectedActives } = useSelector((state) => state.tool);
  const { role } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(activesToolsLoaded());
  }, [dispatch]);

  const [formValues, handleInputChange] = UseForm({
    filter: "",
  });

  const { filter } = formValues;

  const toggleCheckbox = (e, active) => {
    if (e.target.checked) {
      dispatch(
        addActiveSelected({ active_id: active._id, tool_id: active.tool._id })
      );
    } else {
      dispatch(removeInSelectedActives(active._id));
    }
  };

  const removeManyTool = () => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Las herramientas se regresaran a Bodega",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#A0A0A0",
      confirmButtonText: "Si, eliminar de activos",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        dispatch(removeTools(selectedActives));
      }
    });
  };
  let dateNow = new Date();
  return (
    <>
      <nav className="md:flex md:space-x-4 space-y-2 md:space-y-0">
        <Link
          to="/herramientas"
          className="inline-flex flex-col justify-center items-center m-1 px-3 py-3 bg-black rounded-lg hover:bg-gray-500 w-35"
        >
          <i className="fas fa-arrow-circle-left"></i>
          <span className="text-white font-bold">Ir a Herramientas</span>
        </Link>
      </nav>
      {actives.length !== 0 ? (
        <div className="bg-gray-700 rounded-lg px-4 lg:px-8 py-4 lg:py-6 mt-8 ">
          <span className="pb-2 flex space-x-4 italic">
            {"Fecha actual: " +
              dateNow.getFullYear() +
              "-" +
              (dateNow.getMonth() + 1) +
              "-" +
              dateNow.getDate()}
          </span>
          <h2 className="text-green-400 text-xl font-bold mb-2">
            HERRAMIENTAS EN USO
          </h2>
          <input
            type="text"
            name="filter"
            className="rounded-t-lg w-1/4 h-4 p-4 placeholder-blue-800 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-60"
            placeholder="Filtrar por ..."
            value={filter}
            onChange={handleInputChange}
          />
          <span className="bg-green-200 text-green-600 md:ml-2 py-1 px-1 rounded-t-lg  inline-block text-center uppercase">
            <i className="fas fa-tools"></i> {`total: ${actives.length}`}
          </span>

          <div className="overflow-x-auto">
            <button
              onClick={() => removeManyTool()}
              className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:bg-red-600 outline-none focus:outline-none mr-1 mb-1"
              type="button"
              hidden={selectedActives.length === 0}
              style={{ transition: "all .15s ease" }}
            >
              <i className="fas fa-trash-alt"></i> Eliminar marcados
            </button>

            <div className="align-middle inline-block min-w-full overflow-hidden">
              <SearchResults
                value={filter}
                data={actives}
                renderResults={(results) => (
                  <table className="min-w-full">
                    <thead className="bg-gray-600">
                      <tr className="bg-gray-600 text-white text-lg">
                        <th
                          hidden={role === "Encargado del ganado"}
                          className="py-2 px-4"
                        >
                          <i className="fas fa-check"></i> Marcar
                        </th>
                        <th className="p-4 w-1/4">
                          <i className="fas fa-user"></i> Nombre completo
                        </th>
                        <th className="py-2 px-4">
                          <i className="fas fa-id-card"></i> Cédula
                        </th>
                        <th className="py-2 px-3">
                          <i className="fas fa-wrench"></i> Herramienta
                        </th>
                        <th className="py-2 px-3"># Código</th>
                        <th className="py-2 px-3">
                          <i className="far fa-calendar-alt"></i> Registrada
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-blue-100 text-opacity-80 whitespace-nowrap">
                      {results.map((active) => (
                        <tr key={active._id}>
                          <th
                            hidden={role === "Encargado del ganado"}
                            className="py-3 px-2"
                          >
                            <label className="inline-flex items-center mt-3 ">
                              <input
                                type="checkbox"
                                className="form-checkbox h-5 w-5"
                                defaultChecked={false}
                                onChange={(e) => toggleCheckbox(e, active)}
                              />
                            </label>
                          </th>
                          <th className="py-3 px-3">{`${active.collaborator.name} ${active.collaborator.surname}`}</th>
                          <th className="py-3 px-3">
                            {active.collaborator.document_id}
                          </th>

                          <th className="py-3 px-3">{active.tool.name}</th>
                          <th className="py-3 px-3">
                            {active.tool.active_num}
                          </th>
                          <th className="py-3 px-3">{active.date_active}</th>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              />
            </div>
          </div>
        </div>
      ) : (
        <span className="ml-2 text-gray-400 whitespace-nowrap italic">
          - ( Sin herramientas activas ) -
        </span>
      )}
    </>
  );
};
