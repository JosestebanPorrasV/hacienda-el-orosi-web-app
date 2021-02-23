import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiOpenMenu, uiCloseMenu } from "../../actions/UIAction";

export const Navbar = () => {

  const dispatch = useDispatch();
  const { name, surname, role } = useSelector((state) => state.auth);
  const { menuOpen } = useSelector((state) => state.ui);

  const menu = () => {
    if (menuOpen){
      dispatch(uiCloseMenu());
    }else{
      dispatch(uiOpenMenu());
    }
  }

  return (
    <div class="bg-green-900 py-2 px-4 flex items-center justify-between lg:hidden text-white">
      <button onClick={() => menu()} >
        <i class="fas fa-bars"></i>
      </button>
      <div class="flex flex-row items-center justify-center xl:justify-start space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-60">
        <i class="pl-3 fas fa-briefcase"></i>
        <span class="font-bold text-blue-100 text-xs">{role === 'GENERAL_ROLE' ? 'Dueño' : role === 'RESOURCES_ROLE' ? 'Recursos Humanos': 'Encargado de Ganado'}</span>
        <i class="fas fa-user"></i>
        <span class="font-bold text-blue-100 text-xs">{`${name} ${surname}`}</span>
      </div>
    </div>
  );
};
