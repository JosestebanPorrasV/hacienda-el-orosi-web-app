import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ReactPaginate from 'react-paginate';

import { paymentByCollaboratorLoading, paymentStartLoading } from '../../actions/PaymentAction';
import { Link } from 'react-router-dom';
import { collaboratorClearActive } from '../../actions/CollaboratorAction';

export const PaymentScreen = () => {
  const dispatch = useDispatch();
  const { payments, count } = useSelector((state) => state.payment);
  const { currentCollaborator } = useSelector((state) => state.collaborator);

  useEffect(() => {
    if (currentCollaborator) {
      dispatch(paymentByCollaboratorLoading(currentCollaborator._id));
    } else {
      dispatch(paymentStartLoading());
    }
  }, [dispatch, currentCollaborator]);

  return (
    <>
      <div className="container px-4 py-4 mx-auto flex flex-wrap flex-col md:flex-row items-center">
        <Link
          to="/colaboradores"
          className="inline-flex flex-col justify-center items-center px-1 rounded-lg"
        >
          <i className="fas fa-arrow-circle-left text-green-900 text-2xl hover:text-green-200 "></i>
        </Link>
        <span className="text-xl text-green-200">Colaboradores</span>

        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center md:flex md:space-x-4 space-y-2 md:space-y-0">
          <button
            hidden={!currentCollaborator}
            className="bg-green-500 text-white active:bg-gray-600 font-bold uppercase text-sm px-4 py-2 rounded-2xl shadow transform hover:scale-110 motion-reduce:transform-none mr-1 mb-1"
            type="button"
            style={{ transition: 'all .15s ease' }}
            onClick={() => dispatch(collaboratorClearActive())}
          >
            Mostrar todos
          </button>
        </nav>
        <span className="text-xl text-green-200"> Herramientas</span>
        <Link
          to="/herramientas"
          className="inline-flex flex-col justify-center items-center px-1 rounded-lg"
        >
          <i className="fas fa-arrow-circle-right text-green-900 text-2xl hover:text-green-200"></i>
        </Link>
      </div>

      <div className="bg-gray-700 rounded-lg px-4 lg:px-8 py-4 lg:py-6 mt-8">
        <h2 className="text-xl text-blue-200 font-bold mb-4 lg:mb-6">
          {currentCollaborator
            ? `${currentCollaborator.name} ${currentCollaborator.surname}`
            : 'Pagos'}
        </h2>
        <span className={`md:ml-2 py-1 px-1 rounded-t-lg  inline-block text-center uppercase`}>
          <i className="fas fa-box-open"></i> {`total: ${count}`}
        </span>
        <div className="overflow-x-auto">
          <div className="align-middle inline-block min-w-full overflow-hidden">
            <table className="min-w-full">
              <thead className="text-left bg-gray-600">
                <tr>
                  <th className="py-2 px-3">Cedula</th>
                  <th className="py-2 px-3">Nombre</th>
                  <th className="py-2 px-3">Trabajo</th>
                  <th className="py-2 px-3">Pago</th>
                  <th className="py-2 px-3">Fecha</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-600 text-blue-100 text-opacity-80 whitespace-nowrap">
                {payments.map((payment) => (
                  <tr key={payment._id}>
                    <td className="py-3 px-3">{payment.collaborator.document_id}</td>
                    <td className="py-3 px-3">{`${payment.collaborator.name} ${payment.collaborator.surname}`}</td>
                    <td className="py-3 px-3">{payment.collaborator_job_name}</td>
                    <td className="py-3 px-3">
                      {new Intl.NumberFormat('en-EN').format(payment.total_salary)} ₡
                    </td>
                    <td className="py-3 px-3">{payment.pay_date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <ReactPaginate
          pageCount={Math.ceil(count / 5)}
          marginPagesDisplayed={1}
          pageRangeDisplayed={2}
          previousLabel={'Atras'}
          activeClassName={'bg-green-900 rounded-full my-1'}
          breakClassName={'text-grey-900 pl-4'}
          nextLabel={'Adelante'}
          breakLabel={'...'}
          pageLinkClassName={
            'flex items-center px-4 py-2 mx-1 text-white text-bold transition-colors duration-200 transform bg-gray-900 rounded-full my-1'
          }
          previousClassName={
            'flex items-center px-4 py-2 mx-1 text-white text-bold transition-colors duration-200 transform bg-green-700 rounded-full hover:bg-green-900'
          }
          nextClassName={
            'flex items-center px-4 py-2 mx-1 text-white text-bold transition-colors duration-200 transform bg-green-700 rounded-full hover:bg-green-900'
          }
          onPageChange={(data) => dispatch(paymentStartLoading(data.selected + 1))}
          containerClassName={'sm:flex m-4 p-3 text-sm'}
        />
      </div>
    </>
  );
};
