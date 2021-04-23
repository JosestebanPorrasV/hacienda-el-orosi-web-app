import React from "react";
import DatePicker from "react-datepicker";
import { UseForm } from "../../hooks/UseForm";
import Swal from "sweetalert2";
import { regCalving } from "../../actions/AnimalAction";
import { useDispatch } from "react-redux";

export default function RegisterCalving({ currentAnimal }) {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = React.useState(false);
  const [calving, setCalving] = React.useState(null);

  const [formValues, handleInputChange] = UseForm({
    complications: "",
  });

  const { complications } = formValues;

  const registerCalving = async () => {
    if (calving) {
      dispatch(regCalving(currentAnimal._id, calving, complications));
    } else {
      return Swal.fire("Error", "Rellenar los compos", "warning");
    }
  };

  return (
    <>
      <button
        className="flex text-white font-semibold bg-white text-gray-800 border-0 py-1 px-2 focus:outline-none hover:bg-blue-400 rounded"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Registrar parto
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-700 outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Partos</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div>
                    <label className="text-gray-200 dark:text-gray-200">
                      Fecha de parto
                      <br />
                    </label>
                    <DatePicker
                      locale="es"
                      className={`py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md`}
                      selected={calving}
                      onChange={(date) => setCalving(date)}
                    />
                  </div>

                  <div>
                    <label className="text-gray-200 dark:text-gray-200">
                      Complicaciones (si las hubo)
                    </label>
                    <textarea
                      value={complications}
                      name="complications"
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
                    style={{ transition: "all .15s ease" }}
                  >
                    Volver
                  </button>
                  <button
                    onClick={() => registerCalving()}
                    className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-2 py-2 rounded shadow hover:bg-green-900 outline-none focus:outline-none mr-1 mb-1 mt-6"
                    type="submit"
                    style={{ transition: "all .15s ease" }}
                  >
                    Guardar
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
}
