import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { lendCancelLoading } from "../../actions/LendAction";

export const LendHistoryScreen = () => {
  const dispatch = useDispatch();

  const { lends } = useSelector((state) => state.lend);

  useEffect(() => {
    dispatch(lendCancelLoading(1));
  }, [dispatch]);

  return (

    <div className="main-content flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5">
     <div className="bg-green-900 pt-20">
                <div className="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
                    <h3 className="font-bold pl-2">Historial de Prestamos Cancelados</h3>
                </div>
            </div>
    <div className="p-5">
      <table className="w-full p-5 text-gray-700 border-separate">
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
