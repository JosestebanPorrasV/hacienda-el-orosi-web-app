import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchResults from "react-filter-search";
import { UseForm } from "../../hooks/UseForm";
import { contractsLoading } from "../../actions/ContractAction";
import ReactPaginate from "react-paginate";

export const ContractScreen = () => {
  const dispatch = useDispatch();
  const { contracts, count } = useSelector((state) => state.contract);

  const [formValues] = UseForm({
    filter: "",
  });

  const { filter } = formValues;

  useEffect(() => {
    dispatch(contractsLoading());
  }, [dispatch]);
  return (
    <>
      <div className="bg-gradient-to-r from-purple-200 rounded-lg px-4 lg:px-8 py-4 lg:py-6 mt-8 flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-12">
        <div>
          <h2 className="text-2xl text-purple-900">CONTRATOS</h2>
          <p className="text-purple-900 opacity-70">
            Funcionalidades principales
          </p>
        </div>
        <nav className="md:flex md:space-x-4 space-y-2 md:space-y-0 text-lg text-gray-200">
          <button className="inline-flex flex-col justify-center items-center m-1 px-3 py-3 bg-black rounded-lg hover:bg-gray-800 w-35 fas fa-plus">
            <span> Añadir Contrato</span>
          </button>
          <button
            onClick={() => dispatch(contractsLoading("Activo"))}
            className="inline-flex flex-col justify-center items-center m-1 px-3 py-3 bg-black  rounded-lg hover:bg-gray-800 w-35 fas fa-list-alt"
          >
            <span> Listar contratos activos</span>
          </button>
          <button
            onClick={() => dispatch(contractsLoading("Cancelado"))}
            className="inline-flex flex-col justify-center items-center m-1 px-3 py-3 bg-black  rounded-lg hover:bg-gray-800 w-35 fas fa-list-alt"
          >
            <span> Listar contratos terminados</span>
          </button>
        </nav>
      </div>
      {contracts.length !== 0 ? (
        <>
          <div className="bg-gray-700 rounded-lg px-4 lg:px-8 py-4 lg:py-6 mt-8 ">
            <h2 className="text-green-400text-xl font-bold mb-2">ACTIVOS</h2>

            <span className="bg-purple-200 text-purple-600 md:ml-2 py-1 px-1 rounded-t-lg  inline-block text-center uppercase">
              <i class="fas fa-file-contract"></i> {`total: ${count}`}
            </span>
            <div className="overflow-x-auto">
              <div className="align-middle inline-block min-w-full overflow-hidden">
                <SearchResults
                  value={filter}
                  data={contracts}
                  renderResults={(results) => (
                    <table className="min-w-full">
                      <thead className="bg-gray-600">
                        <tr className="bg-gray-600 text-white text-lg">
                          <th className="py-2 px-3">
                            <i className="fas fa-user"></i> Contratista
                          </th>
                          <th className="py-2 px-3">
                            <i className="fas fa-id-card"></i> Cedula
                          </th>
                          <th className="py-2 px-3">₡ Monto del Contrato</th>
                          <th className="py-2 px-3">
                            <i className="fas fa-calendar-day"></i> Fecha de
                            inicio
                          </th>
                          <th className="py-2 px-3">
                            <i className="fas fa-calendar-day"></i> Fecha final
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-blue-100 text-opacity-80 whitespace-nowrap">
                        {results.map((contract) => (
                          <tr key={contract._id}></tr>
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
            activeClassName={"bg-purple-900 rounded-full my-1"}
            breakClassName={"text-2xl text-grey-900 pl-4"}
            nextLabel={"Adelante"}
            breakLabel={"..."}
            pageLinkClassName={
              "flex items-center px-4 py-2 mx-1 text-white text-bold transition-colors duration-200 transform bg-gray-900 rounded-full my-1"
            }
            previousClassName={
              "flex items-center px-4 py-2 mx-1 text-white text-bold transition-colors duration-200 transform bg-purple-500 rounded-full hover:bg-purple-900"
            }
            nextClassName={
              "flex items-center px-4 py-2 mx-1 text-white text-bold transition-colors duration-200 transform bg-purple-500 rounded-full hover:bg-purple-900"
            }
            containerClassName={"sm:flex m-4 p-3"}
          />
        </>
      ) : (
        <span className="ml-2 text-gray-400 whitespace-nowrap italic">
          - ( No se encontraron contratos ) -
        </span>
      )}
    </>
  );
};
