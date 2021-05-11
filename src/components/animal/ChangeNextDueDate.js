import React from 'react';
import { useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'image-upload-react/dist/index.css';
import { changeNextDueDate } from '../../actions/AnimalAction';

export default function ChangeNextDueDate({ animal }) {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = React.useState(false);
  const [next_due_date, setNext_due_date] = React.useState();

  return (
    <>
      <button onClick={() => setShowModal(true)} className="hover:text-yellow-500">
        <i className="fas fa-edit"></i>
      </button>

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-sm">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}

                {/*body*/}
                <div className="p-2">
                  <label className="text-gray-800 text-xl">
                    Próximo parto
                    <br />
                  </label>
                  <DatePicker
                    locale="es"
                    className={`py-2 mt-2 text-gray-700 border border-gray-300`}
                    selected={next_due_date}
                    onChange={(date) => setNext_due_date(date)}
                  />
                </div>
                <button
                  disabled={!next_due_date}
                  className="bg-green-500 text-white font-bold uppercase text-sm  py-2 hover:bg-green-900 outline-none focus:outline-none  mt-6"
                  type="submit"
                  style={{ transition: 'all .15s ease' }}
                  onClick={() =>
                    dispatch(changeNextDueDate(animal._id, next_due_date)) && setShowModal(false)
                  }
                >
                  <i className="fas fa-edit"></i> Cambiar
                </button>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-gray-400 font-bold text-3xl hover:text-gray-800"
                    type="button"
                    style={{ transition: 'all .15s ease' }}
                    onClick={() => setShowModal(false)}
                  >
                    <i className="fas fa-arrow-circle-left"></i>
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
