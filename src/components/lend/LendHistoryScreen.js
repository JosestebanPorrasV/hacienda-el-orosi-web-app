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
      <div class="bg-gradient-to-b from-gray-300 to-gray-100 uppercase text-gray-800 border-b-2 border-gray-300 rounded-tl-lg rounded-tr-lg p-5">
        <h5 class="font-bold uppercase text-gray-600">Prestamos Cancelados</h5>
      </div>
      <div class="p-5">
        <table class="w-full p-5 text-gray-700">
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
