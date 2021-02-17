import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { UseForm } from "../../hooks/UseForm";

import {
  collaboratorStartLoading
} from "../../actions/CollaboratorAction";

export const CollaboratorScreen = () => {
    const dispatch = useDispatch();

  const { collaborators, count } = useSelector(
    (state) => state.collaborator
  );

  
  useEffect(
    (page) => {
      dispatch(collaboratorStartLoading(1));
    },
    [dispatch]
  );
  return(
      <div class="main-content flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5">
         <div class="bg-green-900 pt-20">
                <div class="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
                    <h3 class="font-bold pl-2">Lista de Colaboradores</h3>
                </div>
            </div>
      <div class="p-5">
          <table class="w-full p-5 text-gray-700 border-separate">
        <thead  class="justify-between">
          <tr class="bg-gray-800 text-gray-300">
            <th class="px-16 py-2">Colaborador</th>
            <th class="px-16 py-2">Apellidos</th>
            <th class="px-16 py-2">Cedula</th>
            <th class="px-16 py-2">Dirección</th>
            <th class="px-16 py-2">Celular</th>
            <th class="px-16 py-2">Telefono</th>
          </tr>
        </thead>
        <tbody class="bg-gray-200">
          {collaborators.map((item, index) => (
            <tr key={index} class="bg-white border-4 border-gray-200 text-center ml-2 font-semibold">
              <th class="px-16 py-2">{item.name}</th>
              <th class="px-16 py-2">{item.surname}</th>
              <th class="px-16 py-2">{item.document_id}</th>
              <th class="px-16 py-2">{item.direction}</th>
              <th class="px-16 py-2">{item.cel}</th>
              <th class="px-16 py-2">{item.tel}</th>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      </div>
  )
}
