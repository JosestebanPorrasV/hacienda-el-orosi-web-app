import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiCloseModalAliment } from "../../actions/UIAction";
import {
    addAliment,
    alimentClearActive,
} from "../../actions/DietAction";

export const ModalAliment = () => {
  const dispatch = useDispatch();

  const { modalAlimentOpen } = useSelector((state) => state.ui);
  const { currentAliment } = useSelector((state) => state.diet);

  const closeModal = () => {
    dispatch(uiCloseModalAliment());
    clearForm();
  };

  const clearForm = () => {
    dispatch(alimentClearActive());
    setFormValues(initEvent);
  };

  const initEvent = {
    name_aliment: "",
    quantity_supplied: "",
    aliment_kg: "",
    price_aliment: "",
  };

  const [formValues, setFormValues] = useState(initEvent);

  const { name_aliment, quantity_supplied, aliment_kg, price_aliment } = formValues;

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

  const handleAddAliment = async () => {
    await dispatch(addAliment(formValues));
    await setFormValues(initEvent); 
  };

  return (
    <>
      {modalAlimentOpen ? (
        <>
          <div className="absolute inset-0  z-50 outline-none focus:outline-none">
            <div className="relative fixed w-full h-full top-0 left-0 flex items-center justify-center">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-3/4 bg-white outline-none focus:outline-none bg-hwite">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blue-100  text-blue-800 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Añadir Alimento
                  </h3>
                  <button
                    className="p-1 ml-auto border-0 text-white float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => closeModal()}
                  >
                    <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <form onSubmit={handleAddAliment}>
                  <section className="max-w-4xl mx-auto bg-white">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label
                          className="text-gray-700 dark:text-gray-200"
                          htmlFor="name_aliment"
                        >
                          Nombre del Alimento
                        </label>
                        <input
                          required
                          value={name_aliment}
                          name="name_aliment"
                          onChange={handleInputChange}
                          type="text"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        />
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
                          name="quantity_supplied"
                          value={quantity_supplied}
                          onChange={handleInputChange}
                          id="quantity_supplied"
                          type="number"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        />
                      </div>
                     
                      <div>
                        <label
                          className="text-gray-700 dark:text-gray-200"
                          htmlFor="aliment_kg"
                        >
                         Peso del Alimento
                        </label>
                        <input
                          required
                          name="aliment_kg"
                          value={aliment_kg}
                          onChange={handleInputChange}
                          id="aliment_kg"
                          type="number"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        />
                      </div>

                      <div>
                        <label
                          className="text-gray-700 dark:text-gray-200"
                          htmlFor="price_aliment"
                        >
                          Precio del Alimento
                        </label>
                        <input
                          required
                          name="price_aliment"
                          value={price_aliment}
                          onChange={handleInputChange}
                          id="price_aliment"
                          type="number"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        />
                      </div>

                    </div>
                  </section>
                </form>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                  <button
                    className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={() => handleAddAliment()}
                  >
                    Agregar
                  </button>

                  <button
                    className="bg-gray-500 text-white active:bg-gray-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:bg-gray-700 outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
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