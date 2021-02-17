import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import {
  collaboratorStartLoading
} from "../../actions/CollaboratorAction";

export const CollaboratorScreen = () => {
    const dispatch = useDispatch();

  const { collaborators } = useSelector(
    (state) => state.collaborator
  );

    useEffect(() => {
      dispatch(collaboratorStartLoading(1));
    }, [dispatch]);
  
  return(
      <div className="main-content flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5">
         <div className="bg-green-900 pt-20">
                <div className="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
                    <h3 className="font-bold pl-2">Lista de Colaboradores</h3>
                </div>
            </div>
      <div className="p-5">
          <table className="w-full p-5 text-gray-700 border-separate">
        <thead  className="justify-between">
          <tr className="bg-gray-800 text-gray-300">
            <th className="px-16 py-2">Colaborador</th>
            <th className="px-16 py-2">Apellidos</th>
            <th className="px-16 py-2">Cedula</th>
            <th className="px-16 py-2">Dirección</th>
            <th className="px-16 py-2">Celular</th>
            <th className="px-16 py-2">Telefono</th>
          </tr>
        </thead>
        <tbody className="bg-gray-200">
          {collaborators.map((item, index) => (
            <tr key={index} className="bg-white border-4 border-gray-200 text-center ml-2 font-semibold">
              <th className="px-16 py-2">{item.name}</th>
              <th className="px-16 py-2">{item.surname}</th>
              <th className="px-16 py-2">{item.document_id}</th>
              <th className="px-16 py-2">{item.direction}</th>
              <th className="px-16 py-2">{item.cel}</th>
              <th className="px-16 py-2">{item.tel}</th>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      </div>
  )
}
