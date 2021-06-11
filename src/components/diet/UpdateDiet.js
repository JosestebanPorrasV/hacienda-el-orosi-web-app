import React from 'react';
import { UseForm } from '../../hooks/UseForm';
import { updateDiet } from '../../actions/DietAction';
import { useDispatch } from 'react-redux';

export default function UpdateDiet({ currentDiet }) {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = React.useState(false);

  const [formValues, handleInputChange] = UseForm({
    diet_name: ' ',
    description: ''
  });

  const { description, diet_name } = formValues;

  const handleUpdateDiet = (e) => {
    e.preventDefault();
    dispatch(updateDiet(currentDiet._id, formValues));
  };
  return (
    <>
      <button
        className=" text-yellow-300 font-bold text-sm px-4 py-2 rounded-2xl hover:text-green-200 mr-1 mb-1 mt-5"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Editar
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-200 outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 text-blue-800 rounded-t">
                  <h3 className="text-3xl font-semibold">{currentDiet.diet_name}</h3>
                </div>
                {/*body*/}
                <form onSubmit={handleUpdateDiet}>
                  <div className="relative p-6 flex-auto">
                    <div>
                      <label className="text-gray-700 dark:text-gray-200">Nombre</label>
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
                      <label className="text-gray-700 dark:text-gray-200">Descripción</label>
                      <textarea
                        value={description}
                        name="description"
                        onChange={handleInputChange}
                        type="text"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                      />
                    </div>
                  </div>

                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      onClick={() => setShowModal(false)}
                      className="bg-gray-500 text-white active:bg-green-600 font-bold uppercase text-sm px-2 py-2 rounded shadow hover:bg-gray-900 outline-none focus:outline-none mr-1 mb-1 mt-6"
                      type="submit"
                      style={{ transition: 'all .15s ease' }}
                    >
                      Volver
                    </button>
                    <button
                      className="bg-blue-500 text-white active:bg-green-600 font-bold uppercase text-sm px-2 py-2 rounded shadow hover:bg-green-900 outline-none focus:outline-none mr-1 mb-1 mt-6"
                      type="submit"
                      style={{ transition: 'all .15s ease' }}
                    >
                      Actualizar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
