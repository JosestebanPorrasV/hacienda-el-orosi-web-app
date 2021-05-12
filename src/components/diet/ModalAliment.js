import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiCloseModalAliment } from "../../actions/UIAction";
import Swal from "sweetalert2";

import {
  alimentClearActive,
  addAliment,
  oneAlimentDelete,
  alimentSetActive,
  dietClearActive,
} from "../../actions/DietAction";
import { searchProduct, productClearActive } from "../../actions/ProductAction";

const initEvent = {
  product: "",
  quantity_supplied: "",
};

export const ModalAliment = () => {
  const dispatch = useDispatch();

  const { modalAlimentOpen } = useSelector((state) => state.ui);
  const { aliments, currentAliment, currentDiet } = useSelector(
    (state) => state.diet
  );
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
      [target.name]: target.value,
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

  const deleteAliment = (alimentId) => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "El alimento se eliminara de la lista",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#A0A0A0",
      confirmButtonText: "Si, eliminar!!",
      cancelButtonText: "Cancelar",
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
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-6xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h3 className="text-3xl text-gray-700 font-semibold">
                    Alimentos de la dieta
                  </h3>
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
                <form onSubmit={handleAddAliment}>
                  <section className="max-w-4xl mx-auto bg-white p-4 rounded-t">
                    <h2 className="text-2xl text-blue-700 font-bold m-1">
                      Agregar Alimentos
                    </h2>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label
                          className="text-gray-700 dark:text-gray-200"
                          htmlFor="product"
                        >
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
                          style={{ transition: "all .15s ease" }}
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
                      style={{ transition: "all .15s ease" }}
                    >
                      Añadir
                    </button>
                  </div>
                </form>

                <span
                  className={`bg-gray-400 text-green-900 py-1 px-1 font-bold rounded-t-lg text-center uppercase`}
                >
                  Lista de alimentos
                </span>

                <div className="overflow-auto h-72">
                  <div className="align-middle inline-block min-w-full overflow-hidden">
                    <table className="bg-gray-200 min-w-full ">
                      <thead className="text-left text-green-900 text-xl">
                        <tr>
                          <th className="py-2 px-6">Producto</th>
                          <th className="py-2 px-6">Cantidad suministrada</th>
                          <th className="py-2 px-6">
                            <i className="fas fa-caret-square-down"></i>{" "}
                            Acciones
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-center divide-y-2 divide-green-900 text-green-700 whitespace-nowrap">
                        {aliments.map((aliment) => (
                          <tr key={aliment._id}>
                            <td className="py-3 px-6">
                              {aliment.product.name}
                            </td>
                            <td className="py-3 px-6">
                              {" "}
                              {aliment.quantity_supplied} kg
                            </td>
                            <td className="py-3 px-6">
                              <button
                                className="bg-yellow-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:bg-yellow-600 outline-none focus:outline-none mr-1 mb-1"
                                type="button"
                                style={{ transition: "all .15s ease" }}
                              >
                                <i className="fas fa-edit"></i>
                              </button>
                              <button
                                onClick={() => onSelectAlimentOneDelete(aliment)}
                                className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:bg-red-600 outline-none focus:outline-none mr-1 mb-1"
                                type="button"
                                style={{ transition: "all .15s ease" }}
                              >
                                <i className="fas fa-trash-alt"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                  <button
                    className="bg-gray-500 text-white active:bg-gray-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:bg-gray-700 outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
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
