import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { FeesStartLoading } from "../../actions/LendAction";

export const FeeScreen = () => {
  const dispatch = useDispatch();

  const { lends, count } = useSelector((state) => state.lend);

  useEffect(
    (id) => {
    dispatch(FeesStartLoading(id));
  }, [dispatch]);
  return (
    <div className="main-content flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5">
      <div className="bg-gradient-to-b from-gray-300 to-gray-100 uppercase text-gray-800 border-b-2 border-gray-300 rounded-tl-lg rounded-tr-lg p-5">
        <h5 className="font-bold uppercase text-gray-600">Historial de Cuotas</h5>
      </div>
      <div className="p-5">
        <table className="w-full p-5 text-gray-700">
          <thead className="justify-between">
            <tr className="bg-gray-800 text-gray-300">
              <th>Colaborador</th>
              <th className="px-16 py-2">Monto prestado</th>
              <th className="px-16 py-2">Fecha de registro</th>
              <th className="px-16 py-2">Estado</th>
            </tr>
          </thead>
          <tbody className="bg-gray-200">
            {lends.map((item, index) => (
              <tr
                key={index}
                className="bg-white border-4 border-gray-200 text-center ml-2 font-semibold"
              >
                <th className="px-16 py-2">{item.collaborator}</th>
                <th className="px-16 py-2">{item.amount}</th>
                <th className="px-16 py-2">{item.date_issued}</th>
                <th className="px-16 py-2">{item.status}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
