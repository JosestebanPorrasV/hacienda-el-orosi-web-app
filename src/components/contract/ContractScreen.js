import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { contractsLoading } from "../../actions/ContractAction";

export const ContractScreen = () => {
  const dispatch = useDispatch();
  const { contracts } = useSelector((state) => state.contract);

  useEffect(() => {
    dispatch(contractsLoading());
  }, [dispatch]);
  return (
    <>
    <div className="bg-gradient-to-r from-yellow-200 rounded-lg px-4 lg:px-8 py-4 lg:py-6 mt-8 flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-12">
      <div>
        <h2 className="text-2xl text-yellow-900">CONTRATOS</h2>
        <p className="text-yellow-900 opacity-70">
          Funcionalidades principales
        </p>
      </div>
      <nav className="md:flex md:space-x-4 space-y-2 md:space-y-0 text-lg text-gray-200">
        <button
          className="inline-flex flex-col justify-center items-center m-1 px-3 py-3 bg-black rounded-lg hover:bg-gray-800 w-35 fas fa-hand-holding-usd"
        >
          <span>Añadir Contrato</span>
        </button>
        <button
          onClick={() => dispatch(contractsLoading("Activo"))}
          className="inline-flex flex-col justify-center items-center m-1 px-3 py-3 bg-black  rounded-lg hover:bg-gray-800 w-35 fas fa-chart-line"
        >
          <span>Listar contratos activos</span>
        </button>
        <button
          onClick={() => dispatch(contractsLoading("Cancelado"))}
          className="inline-flex flex-col justify-center items-center m-1 px-3 py-3 bg-black  rounded-lg hover:bg-gray-800 w-35 fas fa-strikethrough"
        >
          <span>Listar contratos terminados</span>
        </button>
      </nav>
    </div>
    {contracts.length !== 0 ? (
      <>
      
        <div className="bg-gray-700 rounded-lg px-4 lg:px-8 py-4 lg:py-6 mt-8 ">
          <h2
            className="text-green-400text-xl font-bold mb-2"
          >
          Activos</h2>

          <span
            className="bg-green-200 text-green-600 md:ml-2 py-1 px-1 rounded-t-lg  inline-block text-center uppercase"
          >
            <i className="fas fa-box-open"></i> {`total: ${count}`}
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
                          <i className="fas fa-comments-dollar"></i> Cuota
                          semanal
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
                      {results.map((contract) => (
                        <tr key={contract._id}>
                          
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
