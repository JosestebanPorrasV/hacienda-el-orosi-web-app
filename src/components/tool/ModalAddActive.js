import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiCloseModalAddActive } from "../../actions/UIAction";
import {
  removeInSelectedActives,
  registerOneActiveTool,
} from "../../actions/ToolAction";
import {
  collaboratorClearActive,
  searchCollaborator,
} from "../../actions/CollaboratorAction";

export const ModalAddActive = () => {
  const dispatch = useDispatch();

  const { modalAddActiveOpen } = useSelector((state) => state.ui);
  const { selectedActives } = useSelector((state) => state.tool);

  const closeModal = () => {
    dispatch(uiCloseModalAddActive());
    clearForm();
  };

  const clearForm = () => {
    dispatch(collaboratorClearActive());
    dispatch(removeInSelectedActives());
  };

  const initEvent = {
    collaborator_id: "",
    name: "",
    active_num: "",
  };

  const [formValues, setFormValues] = useState(initEvent);

  const { collaborator_id, name, active_num } = formValues;

  useEffect(() => {
      setFormValues(selectedActives);
  }, [selectedActives, setFormValues]);

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const handleAddOneActive = async (e) => {
    e.preventDefault();
    await dispatch(registerOneActiveTool(selectedActives._id));
    await clearForm();
  };
  console.log(selectedActives._id);
  return (
    <>
      {modalAddActiveOpen ? (
        <>
          <div className="absolute inset-0  z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-6xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none bg-hwite">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blue-100  text-blue-800 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Asignar Herramienta
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
                <form onSubmit={handleAddOneActive}>
                  <section className="max-w-4xl mx-auto bg-white">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label
                          className="text-gray-700 dark:text-gray-200"
                          htmlFor="active_num"
                        >
                          Codigo de la herramienta
                        </label>
                        <input
                          disabled={true}
                          value={selectedActives.active_num}
                          name="active_num"
                          type="number"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        />
                        
                      </div>

                      <div>
                        <label
                          className="text-gray-700 dark:text-gray-200"
                          htmlFor="name"
                        >
                          Nombre de la herramienta
                        </label>
                        <input
                          disabled={true}
                          value={name}
                          onChange={handleInputChange}
                          id="name"
                          type="text"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        />
                      </div>
                      <div>
                        <label
                          className="text-gray-700 dark:text-gray-200"
                          htmlFor="collaborator_id"
                        >
                          Cedula del colaborador
                        </label>
                        <input
                          required
                          value={collaborator_id}
                          onChange={handleInputChange}
                          name="collaborator_id"
                          type="number"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border-2 border-blue-500  dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                          placeholder="Requerido"
                        />
                        <button
                          onClick={() => dispatch(searchCollaborator(collaborator_id)) }
                          className="bg-blue-500 text-white active:bg-blue-600 uppercase text-sm px-2 py-1 rounded-b shadow hover:bg-blue-900 outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                          style={{ transition: "all .15s ease" }}
                        >
                          <i className="fas fa-search"></i> Buscar
                        </button>
                        <button
                          hidden={!collaborator_id}
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
                          htmlFor="nameCollaborator"
                        >
                          Nombre del colaborador
                        </label>
                        <input
                          disabled={true}
                          value={
                            collaborator_id
                              ? `${collaborator_id.name} ${collaborator_id.surname}`
                              : ""
                          }
                          id="nameCollaborator"
                          type="text"
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
                    onClick={() => handleAddOneActive()}
                  >
                    Asignar
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
