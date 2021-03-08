import React from "react";
import Popper from "popper.js";
import {
  collaboratorSetActive,
  collaboratorClearActive,
} from "../../actions/CollaboratorAction";
import { useDispatch } from "react-redux";
import { uiOpenModalAddLend } from "../../actions/UIAction";
import { uiOpenModalActive } from "../../actions/UIAction";

const Dropdown = ({ collaborator }) => {
  const dispatch = useDispatch();

  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    new Popper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
    dispatch(collaboratorSetActive(collaborator));
  };
  const closeDropdownPopover = () => {
    dispatch(collaboratorClearActive());
    setDropdownPopoverShow(false);
  };

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full">
          <div className="static">
            <button
              className={`font-bold uppercase text-sm px-6 py-3 rounded shadow ${
                dropdownPopoverShow
                  ? " bg-blue-600 text-white "
                  : " text-gray-700 "
              } hover:bg-blue-600 hover:text-white outline-none focus:outline-none mr-1 mb-1 bg-white`}
              style={{ transition: "all .15s ease" }}
              type="button"
              ref={btnDropdownRef}
              onClick={() => {
                dropdownPopoverShow
                  ? closeDropdownPopover()
                  : openDropdownPopover();
              }}
            >
              <i className="fas fa-cogs"></i> Menu
            </button>
            <div
              ref={popoverDropdownRef}
              className={
                (dropdownPopoverShow ? "block " : "hidden ") +
                "bg-gray-300 text-gray-700 font-bold z-50 float-left py-2  text-left rounded shadow-lg mt-1"
              }
              style={{ minWidth: "12rem" }}
              onClick={() => setDropdownPopoverShow(false)}
            >
              <a
                href="#pablo"
                className="py-2 px-4 font-bold block w-full whitespace-no-wrap hover:bg-blue-800 hover:text-white"
                onClick={(e) => e.preventDefault()}
              >
                <i className="fas fa-money-bill-wave"></i> Pagos
              </a>

              <a
                href="#pablo"
                className="py-2 px-4 font-bold block w-full whitespace-no-wrap hover:bg-blue-800 hover:text-white"
                onClick={(e) => e.preventDefault()}
              >
                <i className="far fa-handshake"></i> Liquidar
              </a>

              <a
                href="#pablo"
                className="py-2 px-4 font-bold block w-full whitespace-no-wrap hover:bg-blue-800 hover:text-white"
                onClick={(e) => e.preventDefault()}
              >
                <i className="fas fa-user-edit"></i> Editar datos
              </a>
              <button
                
                className="py-2 px-4 font-bold block w-full whitespace-no-wrap hover:bg-blue-800 hover:text-white"
                onClick={() => dispatch(uiOpenModalActive())}
              >
                <i className="fas fa-tools"></i> Herramientas
              </button>

              <button
                onClick={() => dispatch(uiOpenModalAddLend())}
                className="py-2 px-4 font-bold block w-full whitespace-no-wrap hover:bg-blue-800 hover:text-white"
              >
                <i className="fas fa-hand-holding-usd"></i> Realizar prestemo
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default function DropdownRender({ collaborator }) {
  return (
    <>
      <Dropdown collaborator={collaborator} />
    </>
  );
}
