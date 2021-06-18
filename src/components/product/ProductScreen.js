import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ModalProduct } from './ModalProduct';
import MaterialTable from 'material-table';
import { TableIcons, TableLocalization, TableOptions } from '../../helpers/TableInit';

import DeleteOutline from '@material-ui/icons/DeleteOutline';

import {
  ProductsLoaded,
  productClearActive,
  oneProductDelete,
  productSetActive
} from '../../actions/ProductAction';

import { uiOpenModalProduct } from '../../actions/UIAction';
import Swal from 'sweetalert2';

export const ProductScreen = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const { role } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(ProductsLoaded());
  }, [dispatch]);

  const onSelectAddEditProduct = (productId) => {
    dispatch(productSetActive(productId));
    openModalProduct();
  };

  const openModalProduct = () => {
    dispatch(uiOpenModalProduct());
  };

  const onSelectProductOneDelete = (product) => {
    dispatch(productSetActive(product));
    deleteProduct(product);
  };

  const deleteProduct = (productId) => {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'El producto no se volerá a recuperar',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#A0A0A0',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        dispatch(oneProductDelete(productId));
      } else {
        dispatch(productClearActive());
      }
    });
  };

  return (
    <>
      <div
        className={`${
          role === 'Encargado del ganado' && 'hidden'
        } container px-4 py-4 mx-auto flex flex-wrap flex-col md:flex-row items-center`}
      >
        <Link to="/dietas" className="inline-flex justify-center items-center px-1 rounded-lg">
          <i className="fas fa-arrow-circle-left text-blue-600 text-2xl hover:text-blue-800 "></i>
          <span className="text-xl text-blue-600 hover:underline ml-1">Dieta</span>
        </Link>

        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center md:flex md:space-x-4 space-y-2 md:space-y-0"></nav>
        <Link to="/ganado-detallado" className="inline-flex justify-center items-center px-1 rounded-lg">
          <span className="text-xl text-blue-600 hover:underline mr-1">Ganado</span>
          <i className="fas fa-arrow-circle-right text-blue-600 text-2xl hover:text-blue-800"></i>
        </Link>
      </div>

      <div className="flex flex-col text-center w-full mt-4 mb-4">
        <h1 className="sm:text-3xl text-2xl font-medium title-font text-green-700 uppercase">
          PRODUCTOS
        </h1>
        <h2 className="text-xs text-green-700 tracking-widest font-medium title-font mb-1">
          Registrados
        </h2>
      </div>

      <button
        onClick={() => onSelectAddEditProduct()}
        className="bg-green-500 text-white active:bg-gray-600 font-bold uppercase text-sm px-4 py-2 rounded-2xl shadow transform hover:scale-110 motion-reduce:transform-none mr-1 mb-1"
        type="button"
        style={{ transition: 'all .15s ease' }}
      >
        Agregar Producto
      </button>
      <MaterialTable
        title="PRODUCTOS"
        icons={TableIcons}
        localization={TableLocalization}
        columns={[
          { title: 'Producto', field: 'name', editable: 'never' },
          { title: 'Código', field: 'active_num', editable: 'never' },
          {
            title: 'Kilogramos',
            field: 'kilograms',
            editable: 'never',
            render: (rowData) => (
              <>
                {rowData.kilograms ? (
                  <span>{rowData.kilograms}</span>
                ) : (
                  <i className="fas fa-ban"></i>
                )}
              </>
            )
          },
          {
            title: 'Litros',
            field: 'liters',
            editable: 'never',
            render: (rowData) => (
              <>{rowData.liters ? <span>{rowData.liters}</span> : <i className="fas fa-ban"></i>}</>
            )
          },
          {
            title: 'Precio c/u',
            field: 'price',
            editable: 'never',
            type: 'currency',
            currencySetting: {
              locale: 'es-CR',
              currencyCode: 'CRC'
            }
          }
        ]}
        data={products}
        actions={[
          {
            icon: DeleteOutline,
            tooltip: 'Eliminar',
            onClick: (event, rowData) => onSelectProductOneDelete(rowData)
          }
        ]}
        options={TableOptions}
      />
      <ModalProduct />
    </>
  );
};
