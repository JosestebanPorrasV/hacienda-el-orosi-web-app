import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { paymentStartLoading } from '../../actions/PaymentAction';
import { Link } from 'react-router-dom';

import MaterialTable from 'material-table';
import { TableIcons, TableLocalization } from '../../helpers/TableInit';

export const PaymentScreen = () => {
  const dispatch = useDispatch();
  const { payments } = useSelector((state) => state.payment);

  useEffect(() => {
    dispatch(paymentStartLoading());
  }, [dispatch]);

  return (
    <>
      <div className="container px-4 py-4 mx-auto flex flex-wrap flex-col md:flex-row items-center">
        <Link
          to="/colaboradores"
          className="inline-flex flex-col justify-center items-center px-1 rounded-lg"
        >
          <i className="fas fa-arrow-circle-left text-green-900 text-2xl hover:text-green-600 "></i>
        </Link>
        <span className="text-xl text-green-600">Colaboradores</span>

        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center md:flex md:space-x-4 space-y-2 md:space-y-0"></nav>
        <span className="text-xl text-green-600"> Herramientas</span>
        <Link
          to="/herramientas"
          className="inline-flex flex-col justify-center items-center px-1 rounded-lg"
        >
          <i className="fas fa-arrow-circle-right text-green-900 text-2xl hover:text-green-600"></i>
        </Link>
      </div>

      <MaterialTable
        title={<h2 className={`text-green-700 text-xl font-bold`}>PAGOS</h2>}
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
        options={{
          headerStyle: { background: '#404A59', color: 'white' },
          rowStyle: {
            color: '#1F3A8A'
          },
          pageSizeOptions: [5, 10, 30, 50, 100],
          actionsColumnIndex: -1,
          pageSize: 10,
          exportButton: true
        }}
      />
    </>
  );
};
