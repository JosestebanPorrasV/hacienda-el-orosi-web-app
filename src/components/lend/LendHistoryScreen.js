import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { lendCanceltLoading } from "../../actions/LendAction";

export const LendHistoryScreen = () => {
  const dispatch = useDispatch();

  const { lends, count } = useSelector((state) => state.lend);

  useEffect(() => {
    dispatch(lendCanceltLoading(1));
  }, [dispatch]);
  return (

    <div class="main-content flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5">
     <div class="bg-green-900 pt-20">
                <div class="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
                    <h3 class="font-bold pl-2">Historial de Prestamos Cancelados</h3>
                </div>
            </div>
    <div class="p-5">
      <table class="w-full p-5 text-gray-700 border-separate">
        <thead class="justify-between">
          <tr class="bg-gray-800 text-gray-300">
            <th>Colaborador</th>
            <th class="px-16 py-2">Monto prestado</th>
            <th class="px-16 py-2">Fecha de registro</th>
            <th class="px-16 py-2">Estado</th>
          </tr>
        </thead>
        <tbody class="bg-gray-200">
          {lends.map((item, index) => (
            <tr
              key={index}
              class="bg-white border-4 border-gray-200 text-center ml-2 font-semibold"
            >
              <th class="px-16 py-2">{item.collaborator}</th>
              <th class="px-16 py-2">{item.amount}</th>
              <th class="px-16 py-2">{item.date_issued}</th>
              <th class="px-16 py-2">{item.status}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
};
