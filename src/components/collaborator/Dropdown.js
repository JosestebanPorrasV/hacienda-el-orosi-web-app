import React from "react";
import { useDispatch } from "react-redux";
import { uiOpenModalAddLend } from "../../actions/UIAction";
import {
  uiOpenModalActive,
  uiOpenModalCollaborator,
} from "../../actions/UIAction";

export const Dropdown = () => {
  const dispatch = useDispatch();

  return (
    <div className="dropdown relative group ">
      <button className="bg-gray-300 text-gray-700 font-bold py-2 px-2 rounded inline-flex items-center group-hover:bg-gray-800 group-hover:text-white">
        <i className="fas fa-cogs"></i> <span className="ml-1 mr-1">Menu</span>
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />{" "}
        </svg>
      </button>
      <div className="dropdown-menu absolute hidden text-gray-700 z-50 bg-gray-200 w-full">
        <button
          className="py-2 font-semibold  block w-full hover:bg-blue-700 hover:text-white"
          onClick={() => dispatch(uiOpenModalCollaborator())}
        >
          <i className="fas fa-money-bill-wave"></i> Pagos
        </button>
        <button
          className="py-2 font-semibold  w-full hover:bg-blue-700 hover:text-white"
          onClick={() => dispatch(uiOpenModalCollaborator())}
        >
          <i className="far fa-handshake"></i> Liquidar
        </button>
        <button
          className="py-2 font-semibold  block w-full hover:bg-blue-700 hover:text-white"
          onClick={() => dispatch(uiOpenModalCollaborator())}
        >
          <i className="fas fa-user-edit"></i> Editar datos
        </button>
        <button
          className="py-2 font-semibold  block w-full hover:bg-blue-700 hover:text-white"
          onClick={() => dispatch(uiOpenModalActive())}
        >
          <i className="fas fa-tools"></i> Herramientas
        </button>

        <button
          onClick={() => dispatch(uiOpenModalAddLend())}
          className="py-2 px-2 font-semibold block w-full hover:bg-blue-700 hover:text-white "
        >
          <i className="fas fa-hand-holding-usd"></i> Realizar prestemo
        </button>
      </div>
    </div>
  );
};