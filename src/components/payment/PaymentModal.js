import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiCloseModalPayment } from "../../actions/UIAction";
import SearchResults from "react-filter-search";
import { UseForm } from "../../hooks/UseForm";

import { liquidateCleanActive } from "../../actions/CollaboratorAction";
import { Link } from "react-router-dom";
import {
  paymentRegister,
  presenceByCollaboratorLoading,
  cleanPresenceByCollaborator,
} from "../../actions/PaymentAction";
import Swal from "sweetalert2";

export const PaymentModal = () => {
  const dispatch = useDispatch();

  const { modalPaymentOpen } = useSelector((state) => state.ui);

  const { currentCollaborator, liquidate } = useSelector(
    (state) => state.collaborator
  );
  const { lends, count } = useSelector((state) => state.lend);
  const {
    presenceDayByCollaborator,
    totalOvertimeByCollaborator,
  } = useSelector((state) => state.payment);

  useEffect(() => {
    dispatch(presenceByCollaboratorLoading());
  }, [dispatch]);

  const closeModal = () => {
    dispatch(uiCloseModalPayment());
    dispatch(cleanPresenceByCollaborator());
    dispatch(liquidateCleanActive());
  };

  const [formValues, handleInputChange] = UseForm({
    filter1: "",
    filter2: "",
  });

  const { filter1, filter2 } = formValues;

  const paymentReg = {
    collaborator_job_name: currentCollaborator.job.name,
    total_days_worked:
      presenceDayByCollaborator.length > 0
        ? presenceDayByCollaborator.length
        : 0,
    total_hours_worked:
      presenceDayByCollaborator.length * currentCollaborator.job.work_hours,
    total_extra_hours_price:
      totalOvertimeByCollaborator * currentCollaborator.job.price_extra_hours,

    extra_hours_price: currentCollaborator.job.price_extra_hours,
    price_day: currentCollaborator ? currentCollaborator.job.price_day : 0,

    net_salary:
      presenceDayByCollaborator.length * currentCollaborator.job.price_day,
    total_salary:
      presenceDayByCollaborator.length * currentCollaborator.job.price_day +
      totalOvertimeByCollaborator * currentCollaborator.job.price_extra_hours,
  };

  const registerPayment = () => {
    Swal.fire({
      title: "¿Realizara pago?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#A0A0A0",
      confirmButtonText: "Si, agregar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        dispatch(paymentRegister(paymentReg));
      } else {
      }
    });
  };

  return (
    <>
      {modalPaymentOpen ? (
        <>
          <div className="absolute inset-0  z-50 outline-none focus:outline-none">
            <div className="relative w-auto mx-auto max-w-6xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none bg-white">
                {/*header*/}
                <div className="flex items-start justify-between p-2 text-green-800 rounded-t">
                  <h3 className="text-2xl font-semibold">
                    {liquidate ? "Liquidar colaborador" : "Realizar pago"}
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
                <section className="text-green-700 body-font border-t border-gray-200">
                  <div className="container px-5 py-2 mx-auto">
                    <div className="flex flex-wrap -m-4 text-center">
                      <div className="p-4 sm:w-1/4 w-1/2">
                        <p className="leading-relaxed">Nombre</p>
                        <h2 className="title-font font-medium sm:text-2xl text-2xl text-gray-700">
                          {`${currentCollaborator.name} ${currentCollaborator.surname}`}
                        </h2>
                      </div>
                      <div className="p-4 sm:w-1/4 w-1/2">
                        <p className="leading-relaxed">Cedula</p>
                        <h2 className="title-font font-medium sm:text-xl text-2xl text-gray-700">
                          {`${currentCollaborator.document_id}`}
                        </h2>
                      </div>
                      <div className="p-4 sm:w-1/4 w-1/2">
                        <p className="leading-relaxed">Trabajo</p>
                        <h2 className="title-font font-medium sm:text-xl text-2xl text-gray-700">
                          {`${currentCollaborator.job.name}`}
                        </h2>
                      </div>
                      <div className="p-4 sm:w-1/4 w-1/2">
                        <p className="leading-relaxed">Precio del dia</p>
                        <h2 className="title-font font-medium sm:text-2xl text-xl text-gray-700">
                          {`${new Intl.NumberFormat("en-EN").format(
                            currentCollaborator.job.price_day
                          )}`}
                          ₡
                        </h2>
                      </div>
                    </div>
                  </div>
                </section>
                <div className="relative  pl-4 pr-4 border-t border-gray-200 w-full">
                  <section className="text-gray-600  body-font py-4 overflow-hidden">
                    <div className="container px-5 mx-auto">
                      <div className="flex flex-wrap">
                        <div className="pr-1 md:w-1/2 flex flex-col items-center w-full">
                          <span className="inline-block py-1 px-2 rounded-t bg-gray-200 text-white-500 text-lg font-medium tracking-widest">
                            Dias pendientes de pago
                          </span>
                          <section className="relative w-full">
                            <div className="relative">
                              <input
                                type="text"
                                name="filter1"
                                className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-t-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                placeholder="Filtrar"
                                value={filter1}
                                onChange={handleInputChange}
                              />
                            </div>
                            {presenceDayByCollaborator.length !== 0 ? (
                              <SearchResults
                                value={filter1}
                                data={presenceDayByCollaborator}
                                renderResults={(results) => (
                                  <div className="static inset-x-0 px-6 overflow-y-auto bg-white border border-gray-300 rounded-b-lg h-52 divide-y-2 divide-fuchsia-600">
                                    {results.map((presenceDay, index) => (
                                      <div
                                        className="md:flex  pb-4 pt-4"
                                        key={presenceDay._id}
                                      >
                                        <span className="ml-2  text-gray-400 whitespace-nowrap">
                                          <i className="far fa-hand-point-right"></i>{" "}
                                          {index + 1} =
                                        </span>

                                        <span className="ml-2 text-red-800 whitespace-nowrap">
                                          <i className="fas fa-calendar-day"></i>{" "}
                                          Dia:
                                          <span className="ml-2  text-red-80">
                                            {presenceDay.date}
                                          </span>
                                        </span>

                                        <span className="ml-2 text-gray-500 whitespace-nowrap">
                                          Horas extras:
                                          <span className="ml-2 text-gray-500">
                                            {new Intl.NumberFormat(
                                              "en-EN"
                                            ).format(
                                              presenceDay.total_overtime
                                            )}
                                          </span>
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              />
                            ) : (
                              <div className="static inset-x-0  bg-white border border-gray-300 rounded-b-lg h-52 italic">
                                <span className="ml-2 text-gray-400 whitespace-nowrap">
                                  - ( Sin dias pendientes de pago ) -
                                </span>
                              </div>
                            )}
                          </section>
                          <div className="flex items-center flex-wrap pb-4 mb-4 border-b-2 border-gray-100 w-full">
                            <Link
                              to="/herramientas"
                              className="text-green-500 font-semibold inline-flex items-center hover:underline"
                            >
                              Ver historial
                              <svg
                                className="w-4 h-4 ml-2"
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
                            <span className="text-gray-900 mr-3 inline-flex items-center ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                              <svg
                                className="w-4 h-4 mr-1"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                viewBox="0 0 24 24"
                              >
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                              </svg>
                              Dias laborados: {presenceDayByCollaborator.length}
                            </span>
                          </div>
                        </div>
                        <div className="pl-1 md:w-1/2 flex flex-col items-center w-full ">
                          <span className="inline-block py-1 px-2 rounded-t bg-gray-200 text-white-500 text-lg font-medium tracking-widest">
                            Prestamos activos
                          </span>
                          <section className="relative w-full">
                            <div className="relative">
                              <input
                                type="text"
                                name="filter2"
                                className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-t-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                placeholder="Filtrar"
                                value={filter2}
                                onChange={handleInputChange}
                              />
                            </div>
                            {lends.length !== 0 ? (
                              <SearchResults
                                value={filter2}
                                data={lends}
                                renderResults={(results) => (
                                  <div className="static inset-x-0 px-6 overflow-y-auto bg-white border border-gray-300 rounded-b-lg  divide-y-2 divide-fuchsia-600 h-52">
                                    {results.map((activeLend, index) => (
                                      <div
                                        className="md:flex  pb-4 pt-4"
                                        key={activeLend._id}
                                      >
                                        <span className="ml-2 text-gray-400 whitespace-nowrap">
                                          <i className="fas fa-hand-point-right"></i>{" "}
                                          {index + 1}
                                        </span>

                                        <span className="ml-2 text-blue-800 whitespace-nowrap">
                                          Monto actual:
                                          <span className="ml-2 text-gray-700">
                                            {new Intl.NumberFormat(
                                              "en-EN"
                                            ).format(activeLend.amount)}
                                          </span>
                                        </span>
                                        <span className="ml-2 text-blue-800 whitespace-nowrap">
                                          Cuota:
                                          <span className="ml-2 text-gray-700">
                                            {new Intl.NumberFormat(
                                              "en-EN"
                                            ).format(activeLend.fee)}
                                          </span>
                                        </span>
                                        <span className="ml-2 text-blue-800 whitespace-nowrap">
                                          <i className="fas fa-calendar-day"></i>
                                          <span className="ml-2  text-gray-700">
                                            {activeLend.date_issued}
                                          </span>
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              />
                            ) : (
                              <div className="static inset-x-0  bg-white border border-gray-300 rounded-b-lg h-52 italic">
                                <span className="ml-2 text-gray-400 whitespace-nowrap">
                                  - ( Sin prestamos activos ) -
                                </span>
                              </div>
                            )}
                          </section>
                          <div className="flex items-center flex-wrap pb-4 mb-4 border-b-2 border-gray-100 mt-auto w-full">
                            <Link
                              to="/prestamos"
                              className="text-green-500 font-semibold inline-flex items-center hover:underline"
                            >
                              Ver prestamos
                              <svg
                                className="w-4 h-4 ml-2"
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
                            <span className="text-gray-900 mr-3 inline-flex items-center ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                              <svg
                                className="w-4 h-4 mr-1"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                viewBox="0 0 24 24"
                              >
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                              </svg>
                              Prestamos activos: {count}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  <div className="w-full">
                    <h1 className="text-blue-900 text-lg title-font font-medium ">
                      DESGLOSE SE PAGO
                    </h1>

                    <div className="flex py-2">
                      <span className="text-gray-500">Horas laboradas</span>
                      <span className="ml-auto text-gray-900">
                        {paymentReg.total_hours_worked}
                      </span>
                    </div>
                    <div className="flex border-t border-gray-200 py-2">
                      <span className="text-gray-500">
                        Horas de trabajo por dia
                      </span>
                      <span className="ml-auto text-gray-900">
                        {currentCollaborator.job.work_hours}
                      </span>
                    </div>

                    <div className="flex border-t border-gray-200 py-2">
                      <span className="text-gray-500">
                        Cantidad de horas extras
                      </span>
                      <span className="ml-auto text-gray-900">
                        {totalOvertimeByCollaborator}
                      </span>
                    </div>

                    <div className="flex border-t-2 border-yellow-700 py-2">
                      <span className="text-gray-900">
                        Precio de hora extra
                      </span>
                      <span className="ml-auto text-gray-900">
                        {new Intl.NumberFormat("en-EN").format(
                          currentCollaborator.job.price_extra_hours
                        )}
                        ₡
                      </span>
                    </div>

                    <div className="flex border-t border-gray-200 py-2">
                      <span className="text-gray-900">
                        Total de horas extras
                      </span>
                      <span className="ml-auto text-gray-900">
                        +
                        {new Intl.NumberFormat("en-EN").format(
                          paymentReg.total_extra_hours_price
                        )}
                        ₡
                      </span>
                    </div>

                    <div className="flex border-t border-gray-200 py-2">
                      <span className="text-gray-900">Salario bruto:</span>
                      <span className="ml-auto text-gray-900">
                        {new Intl.NumberFormat("en-EN").format(
                          paymentReg.net_salary
                        )}
                        ₡
                      </span>
                    </div>

                    <div className="flex border-t border-b mb-6 border-gray-200 py-2">
                      <span className="text-gray-900">Salario Total: </span>
                      <span className="ml-auto text-gray-900">
                        {new Intl.NumberFormat("en-EN").format(
                          paymentReg.total_salary
                        )}
                        ₡
                      </span>
                    </div>

                    <div className="flex pb-2">
                      <button
                        className="bg-gray-500 text-white active:bg-gray-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:bg-gray-700 outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                        style={{ transition: "all .15s ease" }}
                        onClick={() => closeModal()}
                      >
                        Volver
                      </button>
                      <button
                        onClick={() => registerPayment()}
                        className={`flex ml-auto text-lg text-white ${
                          paymentReg.total_salary === 0 && "hidden"
                        } bg-green-500 border-0 py-2 px-3 focus:outline-none hover:bg-green-600 rounded`}
                      >
                        Realizar pago
                      </button>
                    </div>
                  </div>
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
