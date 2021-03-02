import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiCloseModal } from "../../actions/UIAction";
import { lendClearActive } from "../../actions/LendAction";

import { FeesByLendStartLoading, feesClean } from "../../actions/LendAction";
import ReactPaginate from "react-paginate";

export const ModalFee = () => {
  const dispatch = useDispatch();

  const { modalOpen } = useSelector((state) => state.ui);
  const { fees, feeCount, currentLend } = useSelector((state) => state.lend);

  const closeModal = () => {
    dispatch(lendClearActive());
    dispatch(uiCloseModal());
    dispatch(feesClean());
  };

  return (
    <>
      {modalOpen ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-6xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h3 className="text-3xl text-blue-900 font-semibold">
                    Cuotas
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => closeModal()}
                  >
                    <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="overflow-x-auto">
                    <div className="align-middle inline-block min-w-full overflow-hidden">
                      <table className="bg-gray-700 min-w-full">
                        <thead className="text-left text-xs bg-gray-600">
                          <tr>
                            <th className="py-2 px-2">indice</th>
                            <th className="py-2 px-2">Fecha</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-600 text-blue-100 text-opacity-80 whitespace-nowrap">
                          {fees.map((fee, index) => (
                            <tr key={fee._id}>
                              <td className="py-3 px-2">{index + 1}</td>
                              <td className="py-3 px-2">{fee.date_fee}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <ReactPaginate
                  pageCount={Math.ceil(feeCount / 5)}
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
                  onPageChange={(data) =>
                    dispatch(
                      FeesByLendStartLoading(currentLend._id, data.selected + 1)
                    )
                  }
                  containerClassName={"sm:flex m-4 p-3"}
                />
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={() => closeModal()}
                  >
                    Cerrar
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
