import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModalAliment } from '../../actions/UIAction';
import Swal from 'sweetalert2';
import MaterialTable from 'material-table';
import { TableIcons, TableLocalization } from '../../helpers/TableInit';

import Edit from '@material-ui/icons/Edit';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

import {
  alimentClearActive,
  addAliment,
  editAliment,
  oneAlimentDelete,
  alimentSetActive,
  dietClearActive
} from '../../actions/DietAction';
import { searchProduct, productClearActive } from '../../actions/ProductAction';

const initEvent = {
  product: '',
  quantity_supplied: ''
};

export const ModalAliment = () => {
  const dispatch = useDispatch();

  const { modalAlimentOpen } = useSelector((state) => state.ui);
  const { aliments, currentAliment, currentDiet } = useSelector((state) => state.diet);
  const { currentProduct } = useSelector((state) => state.product);

  const [formValues, setFormValues] = useState(initEvent);

  const { product, quantity_supplied } = formValues;

  useEffect(() => {
    if (currentAliment) {
      setFormValues(currentAliment);
    } else {
      setFormValues(initEvent);
    }
  }, [currentAliment, setFormValues]);

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    });
  };

  const handleAddAliment = async (e) => {
    e.preventDefault();
    await dispatch(addAliment(currentDiet, formValues));
    await setFormValues(initEvent);
  };

  const closeModal = () => {
    dispatch(uiCloseModalAliment());
    clearForm();
  };

  const clearForm = () => {
    dispatch(alimentClearActive());
    dispatch(productClearActive());
    dispatch(dietClearActive());
    setFormValues(initEvent);
  };

  const onSelectAlimentOneDelete = (aliment) => {
    dispatch(alimentSetActive(aliment));
    deleteAliment(aliment);
  };

  const onSelectAlimentEdit = (aliment) => {
    dispatch(alimentSetActive(aliment));
  };

  const editAliment = async (aliment) => {
    const { value: newQuantity } = await Swal.fire({
      title: 'Cambiar cantidad administrada',
      input: 'number',
      inputLabel: 'Nueva cantidad',
      inputPlaceholder: 'Ingrese',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#A0A0A0',
      confirmButtonText: 'Si, cambiar',
      cancelButtonText: 'Cancelar'
    });

    if (newQuantity) {
      dispatch(editAliment(aliment, newQuantity));
    } else {
      dispatch(alimentClearActive());
    }
  };

  const deleteAliment = (alimentId) => {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'El alimento se eliminara de la lista',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#A0A0A0',
      confirmButtonText: 'Si, eliminar!!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        dispatch(oneAlimentDelete(alimentId));
      } else {
        dispatch(alimentClearActive());
      }
    });
  };

  return (
    <>
      {modalAlimentOpen ? (
        <>
          <div className="justify-center items-center  overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-2xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h3 className="text-3xl text-gray-700 font-semibold">Alimentos de la dieta</h3>
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
                <section className="max-w-4xl p-4 mx-auto bg-white dark:bg-gray-800">
                  <form onSubmit={handleAddAliment}>
                    <section className="max-w-4xl mx-auto bg-white p-4 rounded-t">
                      <h2 className="text-2xl text-blue-700 font-bold m-1">Agregar Alimentos</h2>
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                          <label className="text-gray-700 dark:text-gray-200" htmlFor="product">
                            Producto
                          </label>
                          <input
                            required
                            value={product}
                            name="product"
                            onChange={handleInputChange}
                            type="text"
                            className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                          />
                          <button
                            hidden={!product}
                            onClick={() => dispatch(searchProduct(product))}
                            className="bg-blue-500 text-white active:bg-blue-600 uppercase text-sm px-2 py-1 rounded-b shadow hover:bg-blue-900 outline-none focus:outline-none mr-1 mb-1"
                            type="button"
                            style={{ transition: 'all .15s ease' }}
                          >
                            <i className="fas fa-search"></i> Buscar
                          </button>
                          <button
                            hidden={!product}
                            onClick={() => clearForm()}
                            className="text-gray-500 active:bg-gray-600  text-sm px-2 py-1 rounded-b  hover:text-red-900 outline-none focus:outline-none mr-1 mb-1"
                            type="button"
                          >
                            <i className="fas fa-eraser"></i>
                          </button>
                        </div>
                        <div>
                          <label
                            className="text-gray-700 dark:text-gray-200"
                            htmlFor="quantity_supplied"
                          >
                            Cantidad suministrada
                          </label>
                          <input
                            required
                            disabled={!currentProduct}
                            value={quantity_supplied}
                            name="quantity_supplied"
                            onChange={handleInputChange}
                            type="text"
                            className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                          />
                        </div>
                      </div>
                    </section>
                    <div className="flex items-center justify-end p-2 border-t border-solid border-gray-300 rounded-b">
                      <button
                        disabled={!currentProduct}
                        className="bg-blue-500 text-white font-bold uppercase text-sm px-2 py-2 rounded hover:bg-blue-900 mr-1 mb-1"
                        type="submit"
                        style={{ transition: 'all .15s ease' }}
                      >
                        Añadir
                      </button>
                    </div>
                  </form>

                  <MaterialTable
                    title={
                      <h2 className={`text-green-700 text-xl font-bold`}>LISTA DE ALIMENTOS</h2>
                    }
                    icons={TableIcons}
                    localization={TableLocalization}
                    columns={[
                      { title: 'Producto', field: 'product.name', editable: 'never' },
                      {
                        title: 'Cantidad suministrada',
                        field: 'quantity_supplied',
                        editable: 'never'
                      }
                    ]}
                    data={aliments}
                    actions={[
                      {
                        icon: Edit,
                        tooltip: 'Editar'
                      },
                      {
                        icon: DeleteOutline,
                        tooltip: 'Eliminar',
                        onClick: (event, rowData) => onSelectAlimentOneDelete(rowData)
                      }
                    ]}
                    options={{
                      headerStyle: { background: '#404A59', color: 'white' },
                      rowStyle: {
                        color: '#1F3A8A'
                      },
                      pageSizeOptions: [5, 10, 30, 50, 100],
                      actionsColumnIndex: -1,
                      pageSize: 5,
                      exportButton: true
                    }}
                  />
                </section>

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                  <button
                    className="bg-gray-500 text-white active:bg-gray-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:bg-gray-700 outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: 'all .15s ease' }}
                    onClick={() => closeModal()}
                  >
                    Regresar
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
