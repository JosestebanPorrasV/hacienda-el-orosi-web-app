import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ModalProduct } from './ModalProduct';
import MaterialTable from 'material-table';
import { TableIcons, TableLocalization } from '../../helpers/TableInit';

import Edit from '@material-ui/icons/Edit';
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
      confirmButtonText: 'Si, eliminar!!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        dispatch(oneProductDelete(productId));
      } else {
        dispatch(productClearActive());
      }
    });
  };

  let dateNow = new Date();

  return (
    <>
      <div
        className={`${
          role === 'Encargado del ganado' && 'hidden'
        } container px-4 py-4 mx-auto flex flex-wrap flex-col md:flex-row items-center`}
      >
        <Link
          to="/dietas"
          className="inline-flex flex-col justify-center items-center px-1 rounded-lg"
        >
          <i className="fas fa-arrow-circle-left text-green-900 text-2xl hover:text-green-500 "></i>
        </Link>
        <span className="text-xl text-green-600">Dieta</span>

        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center md:flex md:space-x-4 space-y-2 md:space-y-0">
          <button
            onClick={() => onSelectAddEditProduct()}
            className="bg-green-500 text-white active:bg-gray-600 font-bold uppercase text-sm px-4 py-2 rounded-2xl shadow transform hover:scale-110 motion-reduce:transform-none mr-1 mb-1"
            type="button"
            style={{ transition: 'all .15s ease' }}
          >
            Agregar Producto
          </button>
        </nav>
        <span className="text-xl text-green-600">Ganado</span>
        <Link
          to="/animales"
          className="inline-flex flex-col justify-center items-center px-1 rounded-lg"
        >
          <i className="fas fa-arrow-circle-right text-green-900 text-2xl hover:text-green-500"></i>
        </Link>
      </div>
      <span className="flex px-6 text-gray-600 space-x-4 italic mt-10">
        {'Fecha actual: ' +
          dateNow.getFullYear() +
          '-' +
          (dateNow.getMonth() + 1) +
          '-' +
          dateNow.getDate()}
      </span>

      <MaterialTable
        title="LISTA DE PRODUCTOS"
        icons={TableIcons}
        localization={TableLocalization}
        columns={[
          { title: 'Producto', field: 'name', editable: 'never' },
          { title: 'Kilogramos', field: 'kilograms', editable: 'never' },
          { title: 'Litros del Producto', field: 'liters', editable: 'never' },
          { title: 'Precio por Producto', field: 'price', editable: 'never' }
        ]}
        data={products}
        actions={[
          {
            icon: Edit,
            tooltip: 'Editar',
            onClick: (event, rowData) => onSelectAddEditProduct(rowData)
          },
          {
            icon: DeleteOutline,
            tooltip: 'Eliminar',
            onClick: (event, rowData) => onSelectProductOneDelete(rowData)
          }
        ]}
        options={{
          headerStyle: { color: '#076046' },
          pageSizeOptions: [5, 10, 30, 50, 100],
          actionsColumnIndex: -1,
          pageSize: 10,
          exportButton: true
        }}
      />
      <ModalProduct />
    </>
  );
};
