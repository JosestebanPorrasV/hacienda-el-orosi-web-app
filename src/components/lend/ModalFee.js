import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModalFee } from '../../actions/UIAction';
import { lendClearActive } from '../../actions/LendAction';
import { feesClean } from '../../actions/LendAction';
import MaterialTable from 'material-table';
import { TableIcons, TableLocalization, TableOptions } from '../../helpers/TableInit';

export const ModalFee = () => {
  const dispatch = useDispatch();

  const { modalFeeOpen } = useSelector((state) => state.ui);
  const { fees } = useSelector((state) => state.lend);

  const closeModal = () => {
    dispatch(lendClearActive());
    dispatch(uiCloseModalFee());
    dispatch(feesClean());
  };

  return (
    <>
      {modalFeeOpen ? (
        <>
          <div className="justify-center items-center flex overflow-y-auto overflow-x-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-6xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white text-gray-700 outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 rounded-t">
                  <h3 className="text-3xl font-semibold">Cuotas</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => closeModal()}
                  >
                    <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}

                <MaterialTable
                  title="CUOTAS"
                  icons={TableIcons}
                  localization={TableLocalization}
                  columns={[
                    {
                      field: 'tableData.id',
                      title: 'Cuota',
                      render: (rowData) => <span> {rowData.tableData.id + 1} </span>
                    },
                    { title: 'Fecha', field: 'date_fee', type: 'date', editable: 'never' }
                  ]}
                  data={fees}
                  options={TableOptions}
                />
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                  <button
                    className="bg-gray-500 text-white active:bg-gray-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:bg-gray-700 outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: 'all .15s ease' }}
                    onClick={() => closeModal()}
                  >
                    volver
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
