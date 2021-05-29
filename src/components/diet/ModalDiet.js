import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModalDiet } from '../../actions/UIAction';
import { saveDiet, dietClearActive } from '../../actions/DietAction';

const initEvent = {
  diet_name: '',
  description: ''
};

export const ModalDiet = () => {
  const dispatch = useDispatch();

  const { modalDietOpen } = useSelector((state) => state.ui);
  const { currentDiet } = useSelector((state) => state.diet);

  const closeModal = () => {
    dispatch(uiCloseModalDiet());
    clearForm();
  };

  const clearForm = () => {
    dispatch(dietClearActive());
    setFormValues(initEvent);
  };

  const [formValues, setFormValues] = useState(initEvent);

  const { diet_name, description } = formValues;

  useEffect(() => {
    if (currentDiet) {
      setFormValues(currentDiet);
    } else {
      setFormValues(initEvent);
    }
  }, [currentDiet, setFormValues]);

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    });
  };

  const handleSaveDiet = () => {
    dispatch(saveDiet(formValues));
    setFormValues(initEvent);
  };

  return (
    <>
      {modalDietOpen ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-6xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h3 className="text-3xl text-green-900 font-semibold"> Guardar Dieta </h3>
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
                <form onSubmit={handleSaveDiet}>
                  <section className="max-w-4xl p-6 mx-auto bg-white dark:bg-gray-800">
                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                      <div>
                        <label className="text-gray-700 dark:text-gray-200">
                          Nombre de la dieta
                        </label>
                        <input
                          required
                          value={diet_name}
                          onChange={handleInputChange}
                          name="diet_name"
                          id="diet_name"
                          type="text"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        />
                      </div>
                      <div>
                        <label className="text-gray-700 dark:text-gray-200"> Descripción </label>
                        <input
                          required
                          value={description}
                          onChange={handleInputChange}
                          name="description"
                          id="description"
                          type="text"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        />
                      </div>
                    </div>
                  </section>

                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                    <button
                      className="bg-gray-500 text-white active:bg-gray-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:bg-gray-700 outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      style={{
                        transition: 'all .15s ease'
                      }}
                      onClick={() => closeModal()}
                    >
                      Regresar
                    </button>
                    <button
                      className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                      type="summit"
                      style={{
                        transition: 'all .15s ease'
                      }}
                    >
                      Agregar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"> </div>{' '}
        </>
      ) : null}{' '}
    </>
  );
};
