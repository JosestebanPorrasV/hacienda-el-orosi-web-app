import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  typeSetActive,
  register,
  searchAnimal,
  update,
  searchClearActive,
} from "../../actions/AnimalAction";
import { uiCloseModalAnimal } from "../../actions/UIAction";

import { registerLocale } from "react-datepicker";

import es from "date-fns/locale/es";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import ImageUpload from "image-upload-react";

import "react-datepicker/dist/react-datepicker.css";
import "image-upload-react/dist/index.css";
import Swal from "sweetalert2";
import { UseForm } from "../../hooks/UseForm";

registerLocale("es", es);

const initEvent = {
  plate_number: "",
  plate_color: "",
  status: "",
  race: "",
  age: "",
  starting_weight: "",
  place_origin: "",
  name: "",
  next_due_date: "",
  photo: undefined,
};

export const ModalAnimal = () => {
  const dispatch = useDispatch();
  const [date_admission, setDate_admission] = useState();
  const [next_due_date, setNext_due_date] = useState();
  const [check, setCheck] = useState(false);
  const [imgReg, setImgReg] = useState();

  const { modalAnimalOpen } = useSelector((state) => state.ui);
  const {
    currentAnimal,
    currentSearch,
    currentType,
    animalsTypes,
  } = useSelector((state) => state.animal);

  useEffect(() => {
    if (currentAnimal) {
      setFormValues(currentAnimal);
      currentAnimal.daughter_of && setCheck(true);
    } else {
      setFormValues(initEvent);
    }
  }, [dispatch, currentAnimal, currentType]);

  const [formValues, setFormValues] = useState(initEvent);
  const {
    plate_number,
    plate_color,
    status,
    race,
    age,
    starting_weight,
    place_origin,
    name,
    photo,
  } = formValues;

  const [formInput, handleChange] = UseForm({
    searchA: "",
  });

  const { searchA } = formInput;

  const handleInputChange = ({ target }) => {
    console.log(target);
    if (target.files) {
      setImgReg(URL.createObjectURL(target.files[0]));
      setFormValues({
        ...formValues,
        photo: target.files[0],
      });
    } else {
      setFormValues({
        ...formValues,
        [target.name]: target.value,
      });
    }
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (currentAnimal) {
      if (
        !currentType ||
        !plate_color ||
        plate_color === "DEFAULT" ||
        !status ||
        status === "DEFAULT" ||
        !place_origin ||
        (place_origin === "DEFAULT") | !plate_number ||
        plate_number === "DEFAULT" ||
        !plate_number
      ) {
        return Swal.fire("Error", "Rellenar los compos", "warning");
      }

      dispatch(
        update(
          currentAnimal._id,
          formValues,
          currentType._id,
          date_admission ? date_admission : currentAnimal.date_admission,
          next_due_date ? next_due_date : currentAnimal.next_due_date,
          check
            ? currentSearch
              ? currentSearch._id
              : currentAnimal.daughter_of
            : null
        )
      );
    } else {
      if (
        !currentType ||
        !date_admission ||
        !plate_color ||
        plate_color === "DEFAULT" ||
        !status ||
        status === "DEFAULT" ||
        !place_origin ||
        (place_origin === "DEFAULT") | !plate_number ||
        plate_number === "DEFAULT" ||
        !plate_number
      ) {
        return Swal.fire("Error", "Rellenar los compos", "warning");
      }

      dispatch(
        register(
          formValues,
          currentType._id,
          date_admission,
          next_due_date && next_due_date,
          currentSearch && currentSearch._id
        )
      );
    }
    closeModal();
    setDate_admission(null);
  };

  const toggleCheckbox = (e) => {
    if (e.target.checked) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  };

  const closeModal = () => {
    setCheck(false);
    dispatch(searchClearActive());
    dispatch(uiCloseModalAnimal());
    setImgReg(null);
  };

  return (
    <>
      {modalAnimalOpen ? (
        <>
          <div className="justify-center items-center  overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-6xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h5
                    className={`${
                      currentAnimal ? "text-yellow-400" : "text-blue-400"
                    } text-xl font-bold mb-2`}
                  >{`${
                    currentAnimal
                      ? "Editar datos del animal"
                      : "Registrar animal"
                  }`}</h5>
                  <hr />
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => closeModal()}
                  >
                    <span className="bg-transparent text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <section className="max-w-4xl p-4 mx-auto bg-white dark:bg-gray-800">
                  {currentType && (
                    <div className="flex flex-wrap text-center text-black mb-8">
                      {currentAnimal && (
                        <div className="sm:w-1/4 w-1/2">
                          <p className="leading-relaxed">Registrado el</p>
                          <h2 className="title-font font-medium text-gray-700">
                            {currentAnimal.date_admission}
                          </h2>
                        </div>
                      )}

                      {currentAnimal && currentAnimal.next_due_date && (
                        <div className="sm:w-1/4 w-1/2">
                          <p className="leading-relaxed">próximo de parto</p>
                          <h2 className="title-font font-medium text-gray-700">
                            {currentAnimal.next_due_date}
                          </h2>
                        </div>
                      )}
                      {currentSearch && (
                        <>
                          <div className="sm:w-1/4 w-1/2">
                            <p className="leading-relaxed">Nombre de madre</p>
                            <h2 className="title-font font-medium text-gray-700">
                              {currentSearch.name}
                            </h2>
                          </div>
                          <div className="sm:w-1/4 w-1/2">
                            <p className="leading-relaxed">Chapa de madre</p>
                            <h2 className="title-font font-medium text-gray-700">
                              ${currentSearch.plate_number}
                            </h2>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                  <div className="grid grid-cols-1 gap-4  sm:grid-cols-2">
                    <div>
                      <label
                        className="text-gray-700 dark:text-gray-200"
                        htmlFor="tel"
                      >
                        Tipo de animal
                      </label>
                      <Link
                        to="/tipos-de-animales"
                        className="ml-2 text-blue-500 inline-flex items-center"
                      >
                        Ir
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5l7 7-7 7"></path>
                        </svg>
                      </Link>
                      <select
                        onChange={(e) =>
                          dispatch(typeSetActive(e.target.value))
                        }
                        name="type_animal"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md"
                      >
                        <option value="DEFAULT">
                          {currentAnimal ? currentAnimal.type.name : "Elegir"}
                        </option>
                        {animalsTypes.map((option) => (
                          <option
                            key={option._id}
                            value={option._id}
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                          >
                            {option.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {currentType && (
                      <>
                        <div>
                          <label className="inline-flex items-center text-gray-700 dark:text-gray-200">
                            Hij@ de (Si aplica)
                            <input
                              type="checkbox"
                              className="form-checkbox ml-3 h-5 w-5"
                              checked={check}
                              onChange={(e) => toggleCheckbox(e)}
                            />
                          </label>
                          <input
                            disabled={!check}
                            value={searchA}
                            onChange={handleChange}
                            name="searchA"
                            placeholder="Numero de chapa de la madre"
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                          />
                          <button
                            disabled={!check || !searchA}
                            onClick={() => dispatch(searchAnimal(searchA))}
                            className="px-1 py-1 text-sm tracking-wide text-white capitalize transition-colors duration-200 transform bg-gray-500 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-indigo-600"
                          >
                            Buscar
                          </button>
                          <button
                            hidden={!currentSearch}
                            onClick={() => dispatch(searchClearActive())}
                            className="text-gray-500 active:bg-gray-600  text-sm px-2 py-1 rounded-b  hover:text-red-900 outline-none focus:outline-none mr-1 mb-1"
                            type="button"
                          >
                            <i className="fas fa-eraser"></i>
                          </button>
                        </div>
                        <div>
                          <label className="text-gray-700 dark:text-gray-200">
                            Lugar de origen
                          </label>
                          <select
                            value={place_origin}
                            onChange={handleInputChange}
                            name="place_origin"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md"
                          >
                            <option value="DEFAULT">
                              {currentAnimal ? currentAnimal.status : "Elegir"}
                            </option>

                            <option value="Subasta">Subasta</option>
                            <option value="Criollo">Criollo</option>
                            <option value="En finca">En finca</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-gray-700 dark:text-gray-200">
                            Estado
                          </label>
                          <select
                            value={status}
                            onChange={handleInputChange}
                            name="status"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md"
                          >
                            <option value="DEFAULT">
                              {currentAnimal ? currentAnimal.status : "Elegir"}
                            </option>

                            <option value="Vendido">Vendido</option>
                            <option value="En finca">En finca</option>
                            <option value="Activo">Activo</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-gray-700 dark:text-gray-200">
                            Color de chapa
                          </label>
                          <select
                            value={plate_color}
                            onChange={handleInputChange}
                            name="plate_color"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md"
                          >
                            <option value="DEFAULT">Elegir</option>

                            <option value="#FFFFFF">Blanco</option>
                            <option value="#EECA06">Amarillo</option>
                            <option value="#C74C66">Salmon</option>
                            <option value="#B0316E">Rojo Lila</option>
                            <option value="#FF6B02">Naranja</option>
                            <option value="#DB885C">Naranja Oscuro</option>
                            <option value="#319404">verde</option>
                            <option value="#0367AB">Azul Cian</option>
                            <option value="#17277E">Azul Oscuro</option>
                            <option value="#F5075D">Magenta</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-gray-700 dark:text-gray-200">
                            Número de chapa
                          </label>
                          <input
                            value={plate_number}
                            name="plate_number"
                            onChange={handleInputChange}
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                          />
                        </div>
                        <div>
                          <label className="text-gray-700 dark:text-gray-200">
                            {`${
                              currentAnimal
                                ? "Cambiar fecha de ingreso"
                                : "Fecha de ingreso"
                            }`}
                            <br />
                          </label>
                          <DatePicker
                            locale="es"
                            className="py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md"
                            selected={date_admission}
                            onChange={(date) => setDate_admission(date)}
                          />
                        </div>

                        <div>
                          <label className="text-gray-700 dark:text-gray-200">
                            Próximo parto (Si aplica)
                            <br />
                          </label>
                          <DatePicker
                            locale="es"
                            disabled={
                              currentType.gender === "Macho" ? true : false
                            }
                            className={`py-2 mt-2 text-gray-700 ${
                              currentType.gender === "Macho"
                                ? "bg-gray-500"
                                : "bg-white"
                            }  border border-gray-300 rounded-md`}
                            selected={next_due_date}
                            onChange={(date) => setNext_due_date(date)}
                          />
                        </div>
                        <div>
                          <label className="text-gray-700 dark:text-gray-200">
                            Raza
                          </label>
                          <input
                            value={race}
                            name="race"
                            onChange={handleInputChange}
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                          />
                        </div>
                        <div>
                          <label className="text-gray-700 dark:text-gray-200">
                            Peso inicial (kg)
                          </label>
                          <input
                            placeholder="En kilos"
                            value={starting_weight}
                            name="starting_weight"
                            onChange={handleInputChange}
                            type="number"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                          />
                        </div>
                        <div>
                          <label className="text-gray-700 dark:text-gray-200">
                            Edad
                          </label>
                          <input
                            value={age}
                            name="age"
                            onChange={handleInputChange}
                            placeholder="e.j: 4 meses, 1 año/s"
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                          />
                        </div>
                        <div>
                          <label className="text-gray-700 dark:text-gray-200">
                            Nombre
                          </label>
                          <input
                            value={name}
                            name="name"
                            onChange={handleInputChange}
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                          />
                        </div>
                        <div className="pt-6">
                          <label className="text-gray-700 dark:text-gray-200">
                            Foto de registro (si la hay):
                          </label>

                          <ImageUpload
                            name="photo"
                            handleImageSelect={handleInputChange}
                            imageSrc={imgReg}
                            setImageSrc={setImgReg}
                            value={photo}
                            style={{
                              marginTop: 10,
                              width: "100%",
                              height: 315,
                              background: "#CDEDD3",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          />
                        </div>
                        {currentAnimal && currentAnimal.photo_register && (
                          <div className="mt-6">
                            <label className="text-gray-700 dark:text-gray-200">
                              Foto actual de registro (click){" "}
                              <i className="fas fa-cloud-download-alt"></i>
                            </label>
                            <a href={currentAnimal.photo_register}>
                              <img
                                alt="Hacienda El Orosi"
                                className="lg:h-80 h-64 mt-3 object-cover object-center rounded"
                                src={currentAnimal.photo_register}
                              />
                            </a>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </section>

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                  <button
                    className="bg-gray-500 text-white active:bg-gray-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:bg-gray-700 outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={() => closeModal()}
                  >
                    Regresar
                  </button>
                  <button
                    onClick={handleSubmitForm}
                    className={`${
                      currentAnimal
                        ? "bg-yellow-400 text-white active:bg-yellow-600 hover:bg-yellow-900"
                        : "bg-blue-400 text-white active:bg-blue-600 hover:bg-blue-900"
                    } font-bold uppercase text-sm px-6 py-3 rounded shadow outline-none focus:outline-none mr-1 mb-1"
                      `}
                    type="submit"
                    style={{ transition: "all .15s ease" }}
                  >
                    {currentAnimal ? "Modificar" : "Registrar"}
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
