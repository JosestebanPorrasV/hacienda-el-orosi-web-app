import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModalHealth } from '../../actions/UIAction';
import { animalClearActive, searchAllAnimals } from '../../actions/AnimalAction';
import { registerHealth } from '../../actions/HealthAction';
import DatePicker from 'react-datepicker';
import { searchMedicament } from '../../actions/MedicamentAction';

export const ModalHealth = () => {
  const dispatch = useDispatch();
  const [administrator_date, setAdministrator_date] = useState();
  const [human_consumed_date, setConsumed_date] = useState();

  const { modalHealthOpen } = useSelector((state) => state.ui);
  const { currentAnimal, currentSearch } = useSelector((state) => state.animal);

  const initEvent = {
    plate_number: '',
    name: '',
    medicamentId: '',
    dose: ''
  };

  const [formValues, setFormValues] = useState(initEvent);

  const { plate_number, name, medicamentId, dose } = formValues;

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    });
  };

  const closeModal = () => {
    dispatch(uiCloseModalHealth());
    clearForm();
  };

  const clearForm = () => {
    dispatch(animalClearActive());
    setFormValues(initEvent);
  };

  const handleRegisterHealth = async (e) => {
    e.preventDefault();
    await dispatch(
      registerHealth(currentAnimal._id, formValues, administrator_date, human_consumed_date)
    );
    await setFormValues(initEvent);
    setAdministrator_date(null);
    setConsumed_date(null);
  };

  return (
    <>
      {modalHealthOpen ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-6xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h3 className="text-3xl text-green-900 font-semibold">Registrar salud</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => closeModal()}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <form onSubmit={handleRegisterHealth}>
                  <section className="max-w-4xl p-6 mx-auto bg-white dark:bg-gray-800">
                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                      <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="plate_number">
                          Chapa del animal
                        </label>
                        <input
                          required
                          value={currentAnimal ? currentAnimal.plate_number : plate_number}
                          onChange={handleInputChange}
                          name="plate_number"
                          type="text"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border-2 border-blue-500  dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                          placeholder="Requerido"
                        />
                        <button
                          hidden={!plate_number}
                          onClick={() => dispatch(plate_number && searchAllAnimals(plate_number))}
                          className="bg-blue-500 text-white active:bg-blue-600 uppercase text-sm px-2 py-1 rounded-b shadow hover:bg-blue-900 outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                          style={{ transition: 'all .15s ease' }}
                        >
                          <i className="fas fa-search"></i> Buscar
                        </button>
                        <button
                          hidden={!plate_number}
                          onClick={() => dispatch(searchClearActive())}
                          className="text-gray-500 active:bg-gray-600  text-sm px-2 py-1 rounded-b  hover:text-red-900 outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <i className="fas fa-eraser"></i>
                        </button>
                      </div>

                      <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="nameAnimal">
                          Nombre del animal
                        </label>
                        <input
                          disabled={true}
                          value={currentSearch ? currentSearch.name : name} 
                          id="nameAnimal"
                          type="text"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        />
                      </div>
                      <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="medicamentId">
                          Medicamento
                        </label>
                        <input
                          required
                          value={medicamentId}
                          name="medicamentId"
                          onChange={handleInputChange}
                          type="text"
                          className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        />
                        <button
                          hidden={!medicamentId}
                          onClick={() => dispatch(searchMedicament(medicamentId))}
                          className="bg-blue-500 text-white active:bg-blue-600 uppercase text-sm px-2 py-1 rounded-b shadow hover:bg-blue-900 outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                          style={{ transition: 'all .15s ease' }}
                        >
                          <i className="fas fa-search"></i> Buscar
                        </button>
                        <button
                          hidden={!medicamentId}
                          onClick={() => clearForm()}
                          className="text-gray-500 active:bg-gray-600  text-sm px-2 py-1 rounded-b  hover:text-red-900 outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <i className="fas fa-eraser"></i>
                        </button>
                      </div>

                      <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="dose">
                          Dosis administrada
                        </label>
                        <input
                          required
                          disabled={!plate_number}
                          id="dose"
                          name="dose"
                          value={dose}
                          onChange={handleInputChange}
                          type="number"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        />
                      </div>
                      <div>
                        <label className="text-gray-700 dark:text-gray-200">
                          {`${currentAnimal ? 'Cambiar fecha administrada' : 'Fecha administrada'}`}
                          <br />
                        </label>
                        <DatePicker
                          locale="es"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                          selected={administrator_date}
                          onChange={(date) => setAdministrator_date(date)}
                        />
                      </div>

                      <div>
                        <label className="text-gray-700 dark:text-gray-200">
                          {`${currentAnimal ? 'Cambiar fecha de consumo' : 'Fecha consumo'}`}
                          <br />
                        </label>
                        <DatePicker
                          locale="es"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                          selected={human_consumed_date}
                          onChange={(date) => setConsumed_date(date)}
                        />
                      </div>
                    </div>
                  </section>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                    <button
                      className="bg-gray-500 text-white active:bg-gray-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:bg-gray-700 outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      style={{ transition: 'all .15s ease' }}
                      onClick={() => closeModal()}
                    >
                      Volver
                    </button>
                    <button
                      disabled={!currentAnimal}
                      className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:bg-blue-900 outline-none focus:outline-none mr-1 mb-1"
                      type="submit"
                      style={{ transition: 'all .15s ease' }}
                    >
                      Registrar salud
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
};
