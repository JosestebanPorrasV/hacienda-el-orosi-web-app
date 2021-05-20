import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchResults from 'react-filter-search';
import { Link } from 'react-router-dom';
import { ModalProduct } from './ModalProduct';

import {
  ProductsLoaded,
  productClearActive,
  oneProductDelete,
  productSetActive
} from '../../actions/ProductAction';

import { UseForm } from '../../hooks/UseForm';
import { uiOpenModalProduct } from '../../actions/UIAction';
import Swal from 'sweetalert2';

export const ProductScreen = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const { role } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(ProductsLoaded());
  }, [dispatch]);

  const [formValues, handleInputChange] = UseForm({
    filter: ''
  });

  const { filter } = formValues;

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

  return (
    <>
      <div className="bg-gradient-to-r from-green-400 rounded-lg px-4 lg:px-8 py-4 lg:py-6 mt-4 flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-12">
        <div>
          <h2 className="text-2xl text-green-900">PRODUCTOS DE LA HACIENDA</h2>
          <p className="text-green-900 opacity-70">Funcionalidades principales</p>
        </div>
        <nav className="md:flex md:space-x-4 space-y-2 md:space-y-0">
          <button
            onClick={() => dispatch(uiOpenModalProduct())}
            className="inline-flex flex-col justify-center items-center m-1 px-3 py-3 bg-green-900 rounded-lg hover:bg-gray-900 w-35"
          >
            <i className="fas fa-plus-circle"></i>
            <span className="text-green-600 hover:text-indigo-200 font-bold">Agregar Producto</span>
          </button>
          <Link
            to="/dieta"
            className="inline-flex flex-col justify-center items-center m-1 px-3 py-3 bg-green-900 rounded-lg hover:bg-gray-900 w-35"
          >
            <i className="fas fa-seedling"></i>
            <span className="text-green-600 hover:text-indigo-200 font-bold">Listar Dieta</span>
          </Link>
          <button className="inline-flex flex-col justify-center items-center m-1 px-3 py-3 bg-green-900 rounded-lg hover:bg-gray-900 w-35">
            <i className="fas fa-leaf"></i>
            <span className="text-green-600 hover:text-indigo-200 font-bold">Listar Productos</span>
          </button>
        </nav>
      </div>

      <div className="bg-gray-700 rounded-lg px-4 lg:px-8 py-4 lg:py-6 mt-8 ">
        <h2 className="text-green-400 text-xl font-bold mb-2">LISTA DE PRODUCTOS</h2>
        <input
          type="text"
          name="filter"
          className="rounded-t-lg w-1/4 h-4 p-4 placeholder-blue-800 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-60"
          placeholder="Filtrar por ..."
          value={filter}
          onChange={handleInputChange}
        />
        <span className="bg-green-200 text-yellow-900 md:ml-2 py-1 px-1 rounded-t-lg  inline-block text-center uppercase">
          <i className="fas fa-file-contract"></i> {`total: ${products.length}`}
        </span>

        <div className="overflow-x-auto py-4">
          <div className="align-middle inline-block min-w-full overflow-hidden">
            <SearchResults
              value={filter}
              data={products}
              renderResults={(results) => (
                <table className="min-w-full">
                  <thead className="bg-gray-600">
                    <tr className="bg-gray-600 text-white text-lg">
                      <th className="p-5 w-1/4">Nombre del Producto</th>
                      <th className="p-5 w-1/4">Kilogramos</th>
                      <th className="p-5 w-1/4">Litros del Producto</th>
                      <th className="p-5 w-1/4">Precio del Producto</th>
                      <th hidden={role === 'Recursos Humanos'} className="p-5 w-1/4">
                        <i className="far fa-caret-square-down"></i> Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-blue-100 text-opacity-80">
                    {results.map((products) => (
                      <tr key={products._id}>
                        <th className="py-5 px-8">{`${products.name}`}</th>
                        <th className="py-5 px-8">
                          {`${!products.kilograms ? 0 : products.kilograms}`}kg
                        </th>
                        <th className="py-5 px-8">
                          {`${
                            !products.liters ? (
                              <i className="far fa-caret-square-down" />
                            ) : (
                              products.liters
                            )
                          }`}
                        </th>
                        <th className="py-3 px-3">₡{products.price}</th>
                        <th hidden={role === 'Recursos Humanos'} className="py-3 px-3">
                          <button
                            onClick={() => onSelectProductOneDelete(products)}
                            className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:bg-red-600 outline-none focus:outline-none mr-1 mb-1"
                            type="button"
                            style={{ transition: 'all .15s ease' }}
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
      <ModalProduct />
    </>
  );
};
