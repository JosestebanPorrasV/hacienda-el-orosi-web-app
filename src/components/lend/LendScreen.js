import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchResults from "react-filter-search";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

import {
  addFee,
  deleteOneLend,
  lendClearActive,
  lendsByCollaboratorLoading,
  lendsStartLoading,
  changeFee,
  FeeByLendLoading,
} from "../../actions/LendAction";
import { ModalFee } from "./ModalFee";
import { uiOpenModalFee, uiOpenModalAddLend } from "../../actions/UIAction";
import ReactPaginate from "react-paginate";
import { UseForm } from "../../hooks/UseForm";
import Swal from "sweetalert2";
import { ModalLend } from "./ModalLend";

export const LendScreen = () => {
  const dispatch = useDispatch();
  let dateNow = new Date();

  const { lends, count, lendsState } = useSelector((state) => state.lend);

  useEffect(() => {
    dispatch(lendsStartLoading());
  }, [dispatch]);

  const [formValues, handleInputChange] = UseForm({
    filter: "",
    document_id: "",
  });

  const { filter, document_id } = formValues;

  const handleLendsByCollaborator = (e) => {
    e.preventDefault();
    dispatch(lendsByCollaboratorLoading(document_id));
  };

  const onSelectLend = (lend) => {
    dispatch(FeeByLendLoading(lend._id));
    openModalFee();
  };

  const openModalFee = () => {
    dispatch(uiOpenModalFee());
  };

  const openModalAddLend = () => {
    dispatch(uiOpenModalAddLend());
  };

  const lendChangeFee = async (lend) => {
    const { value: newFee } = await Swal.fire({
      title: "Cambiar cuotas",
      input: "number",
      inputLabel: "Nueva cuota",
      inputPlaceholder: "Ingrese",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, cambiar",
      cancelButtonText: "Cancelar",
    });

    if (newFee) {
      dispatch(changeFee(lend, newFee));
    } else {
      dispatch(lendClearActive());
    }
  };

  const oneDeleteLend = (lend) => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "El prestamo no se podra recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        dispatch(deleteOneLend(lend._id));
      } else {
        dispatch(lendClearActive());
      }
    });
  };

  const lendAddFee = (lend) => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Se agregara una nueva cuota",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, agregar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        dispatch(addFee(lend));
      } else {
        dispatch(lendClearActive());
      }
    });
  };

  return (
    <>
      <div className="bg-green-700 rounded-lg px-4 lg:px-8 py-4 lg:py-6 mt-8 flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-12">
        <div>
          <h2 className="text-2xl">PRESTAMOS</h2>
          <p className="text-blue-100 opacity-70">
            Funcionalidades principales
          </p>
        </div>
        <nav className="md:flex md:space-x-4 space-y-2 md:space-y-0 text-lg text-gray-200">
          <button
            onClick={() => openModalAddLend()}
            className="inline-flex flex-col justify-center items-center m-1 px-3 py-3 bg-green-800 rounded-lg hover:bg-gray-800 w-35 fas fa-hand-holding-usd"
          >
            <span>Realizar prestamo</span>
          </button>
          <button
            onClick={() => dispatch(lendsStartLoading("active"))}
            className="inline-flex flex-col justify-center items-center m-1 px-3 py-3 bg-green-800 rounded-lg hover:bg-gray-800 w-35 fas fa-chart-line"
          >
            <span>Listar activos</span>
          </button>
          <button
            onClick={() => dispatch(lendsStartLoading("cancel"))}
            className="inline-flex flex-col justify-center items-center m-1 px-3 py-3 bg-green-800 rounded-lg hover:bg-gray-800 w-35 fas fa-strikethrough"
          >
            <span>Listar cancelados</span>
          </button>

          <ReactHTMLTableToExcel
            className="inline-flex flex-col justify-center items-center m-1 px-3 py-3 bg-green-800 rounded-lg hover:bg-gray-800 w-35 fas fa-cloud-download-alt"
            table="table-lends"
            filename={`Prestamos${
              lendsState === "active"
                ? "_activos"
                : lendsState === "cancel"
                ? "_cancelados"
                : `_ced_${document_id}`
            }-${
              dateNow.getDate() +
              "_" +
              (dateNow.getMonth() + 1) +
              "_" +
              dateNow.getFullYear()
            }`}
            sheet="Prestamos"
            buttonText={`Descargar ${
              lendsState === "active"
                ? "activos"
                : lendsState === "cancel"
                ? "cancelados"
                : "prestamos"
            }`}
          />
        </nav>
      </div>

      <div className="flex flex-col mt-8 space-y-3 sm:space-y-0 sm:flex-row sm:justify-center sm:space-x-4">
        <input
          type="number"
          name="document_id"
          className="px-4 py-2 text-blue-900 border-4 border-blue-900  placeholder-blue-800  rounded-md focus:border-blue-500 focus:outline-none focus:ring"
          placeholder="Buscar por cedula"
          value={document_id}
          onChange={handleInputChange}
        />

        <button
          onClick={handleLendsByCollaborator}
          className="px-4 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
        >
          <i className="fas fa-search-dollar"></i> Buscar
        </button>
      </div>

      <div className="bg-gray-700 rounded-lg px-4 lg:px-8 py-4 lg:py-6 mt-8 ">
        <h2
          className={`${
            lendsState === "active"
              ? "text-green-400"
              : lendsState === "cancel"
              ? "text-red-400"
              : "text-yellow-400"
          } text-xl font-bold mb-2`}
        >{`PRESTAMOS ${
          lendsState === "active"
            ? "ACTIVOS"
            : lendsState === "cancel"
            ? "CANCELADOS"
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
            lendsState === "active"
              ? "bg-green-200 text-green-600"
              : lendsState === "cancel"
              ? "bg-red-200 text-red-600"
              : "bg-yellow-200 text-yellow-600"
          } md:ml-2 py-1 px-1 rounded-t-lg  inline-block text-center uppercase`}
        >
          <i className="fas fa-box-open"></i> {`total: ${count}`}
        </span>
        <div className="overflow-x-auto">
          <div className="align-middle inline-block min-w-full overflow-hidden">
            <SearchResults
              value={filter}
              data={lends}
              renderResults={(results) => (
                <table id="table-lends" className="min-w-full">
                  <thead className="bg-gray-600">
                    <tr className="bg-gray-600 text-white text-lg">
                      <th className="py-2 px-3" hidden={lendsState}>
                        <i className="fas fa-signal"></i> Estado
                      </th>
                      <th className="py-2 px-3">
                        <i className="fas fa-user"></i> Colaborador
                      </th>
                      <th className="py-2 px-3">
                        <i className="fas fa-id-card"></i> Cedula
                      </th>
                      <th className="py-2 px-3">
                        <i className="fas fa-calendar-day"></i> Registrado
                      </th>
                      <th className="py-2 px-3">
                        <i className="fas fa-funnel-dollar"></i> Monto
                      </th>
                      <th className="py-2 px-3">
                        <i className="fas fa-comments-dollar"></i> Cuota semanal
                      </th>
                      <th className="py-2 px-3">
                        <i className="fas fa-dollar-sign"></i> Restante
                      </th>
                      <th className="py-2 px-3">
                        <i className="fas fa-cash-register"></i> Cuotas
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-blue-100 text-opacity-80 whitespace-nowrap">
                    {results.map((lend) => (
                      <tr key={lend._id}>
                        <th className="py-3 px-3" hidden={lendsState}>
                          <span
                            className={` ${
                              lend.status === "active"
                                ? "bg-green-200 text-green-600"
                                : "bg-red-200 text-red-600"
                            }  text-xs rounded-full px-3 py-1 w-26 inline-block text-center uppercase`}
                          >
                            {lend.status === "active" ? "Activo" : "Cancelado"}
                          </span>
                        </th>

                        <th className="py-3 px-3">
                          {lend.collaborator
                            ? `${lend.collaborator.name} ${lend.collaborator.surname}`
                            : "No existe colaborador"}
                        </th>
                        <th className="py-3 px-3">
                          {lend.collaborator
                            ? lend.collaborator.document_id
                            : "No existe colaborador"}
                        </th>
                        <th className="py-3 px-3">{lend.date_issued}</th>
                        <th className="py-3 px-3">
                          {new Intl.NumberFormat("en-EN").format(
                            lend.initial_amount
                          )}
                        </th>
                        <th className="py-3 px-3">
                          <button
                            onClick={() => lendChangeFee(lend)}
                            hidden={lend.status === "cancel"}
                          >
                            <i className="fas fa-edit text-xl text-yellow-400" />
                          </button>
                          {new Intl.NumberFormat("en-EN").format(lend.fee)}
                        </th>
                        <th
                          className="py-3 px-3"
                          hidden={lend.status === "cancel"}
                        >
                          {new Intl.NumberFormat("en-EN").format(lend.amount)}
                        </th>
                        <th
                          className="py-3 px-3"
                          hidden={lend.status === "active"}
                        >
                          <i className="fas fa-check-circle"></i>
                        </th>
                        <th className="py-3 px-3">
                          <button
                            onClick={() => lendAddFee(lend)}
                            hidden={lend.status === "cancel"}
                            className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:bg-blue-600 outline-none focus:outline-none mr-1 mb-1"
                            type="button"
                            style={{ transition: "all .15s ease" }}
                          >
                            <i className="fas fa-plus"></i>
                          </button>
                          <button
                            onClick={() => onSelectLend(lend)}
                            className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:bg-green-600 outline-none focus:outline-none mr-1 mb-1"
                            type="button"
                            style={{ transition: "all .15s ease" }}
                          >
                            <i className="far fa-eye"></i>
                          </button>
                          <button
                            onClick={() => oneDeleteLend(lend)}
                            hidden={lend.status === "cancel"}
                            className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:bg-red-600 outline-none focus:outline-none mr-1 mb-1"
                            type="button"
                            style={{ transition: "all .15s ease" }}
                          >
                            <i className="fas fa-trash-alt"></i>
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
      <ReactPaginate
        pageCount={Math.ceil(count / 10)}
        marginPagesDisplayed={1}
        pageRangeDisplayed={2}
        previousLabel={"Atras"}
        activeClassName={"bg-green-900 rounded-full my-1"}
        breakClassName={"text-2xl text-grey-900 pl-4"}
        nextLabel={"Adelante"}
        breakLabel={"..."}
        pageLinkClassName={
          "flex items-center px-4 py-2 mx-1 text-white text-bold transition-colors duration-200 transform bg-gray-900 rounded-full my-1"
        }
        previousClassName={
          "flex items-center px-4 py-2 mx-1 text-white text-bold transition-colors duration-200 transform bg-green-700 rounded-full hover:bg-green-900"
        }
        nextClassName={
          "flex items-center px-4 py-2 mx-1 text-white text-bold transition-colors duration-200 transform bg-green-700 rounded-full hover:bg-green-900"
        }
        onPageChange={
          lendsState
            ? (data) =>
                dispatch(lendsStartLoading(lendsState, data.selected + 1))
            : (data) =>
                dispatch(
                  lendsByCollaboratorLoading(document_id, data.selected + 1)
                )
        }
        containerClassName={"sm:flex m-4 p-3"}
      />
      <ModalFee />
      <ModalLend />
    </>
  );
};
