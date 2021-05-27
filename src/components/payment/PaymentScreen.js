import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { paymentStartLoading } from '../../actions/PaymentAction';
import { Link } from 'react-router-dom';

import MaterialTable from 'material-table';
import { TableIcons, TableLocalization, TableOptions } from '../../helpers/TableInit';

export const PaymentScreen = () => {
  const dispatch = useDispatch();
  const { payments } = useSelector((state) => state.payment);
  let dateNow = new Date();

  useEffect(() => {
    dispatch(paymentStartLoading());
  }, [dispatch]);

  return (
    <>
      <div className="container px-4 py-4 mx-auto flex flex-wrap flex-col md:flex-row items-center">
        <Link
          to="/colaboradores"
          className="inline-flex justify-center items-center px-1 rounded-lg"
        >
          <i className="fas fa-arrow-circle-left text-blue-600 text-2xl hover:text-blue-800"></i>{' '}
          <span className="text-xl text-blue-600 ml-1 hover:underline">Colaboradores</span>
        </Link>

        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center md:flex md:space-x-4 space-y-2 md:space-y-0"></nav>
        <Link
          to="/herramientas"
          className="inline-flex justify-center items-center px-1 rounded-lg"
        >
          <span className="text-xl text-blue-600 mr-1 hover:underline"> Herramientas</span>
          <i className="fas fa-arrow-circle-right text-blue-600 text-2xl hover:text-blue-800"></i>
        </Link>
      </div>

      <div className="flex flex-col text-center w-full mt-4 mb-4">
        <h1 className="sm:text-3xl text-2xl font-medium title-font text-green-700 uppercase">
          Pagos registrados
        </h1>
        <h2 className="text-xs text-green-700 tracking-widest font-medium title-font mb-1">
          {'Fecha actual: ' +
            dateNow.getFullYear() +
            '-' +
            (dateNow.getMonth() + 1) +
            '-' +
            dateNow.getDate()}
        </h2>
      </div>

      <MaterialTable
        title="PAGOS"
        icons={TableIcons}
        localization={TableLocalization}
        columns={[
          { title: 'Cedula', field: 'collaborator.document_id', editable: 'never' },
          { title: 'Nombre', field: 'collaborator.name', editable: 'never' },
          { title: 'Apellido', field: 'collaborator.surname', editable: 'never' },
          { title: 'Trabajo', field: 'collaborator_job_name', editable: 'never' },
          { title: 'Fecha', field: 'pay_date', editable: 'never' },
          {
            title: 'Pago',
            field: 'total_salary',
            editable: 'never',
            type: 'currency',
            currencySetting: {
              locale: 'es-CR',
              currencyCode: 'CRC'
            }
          }
        ]}
        data={payments}
        options={TableOptions}
      />
    </>
  );
};
