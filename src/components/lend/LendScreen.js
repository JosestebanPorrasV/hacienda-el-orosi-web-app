import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { lendStartLoading } from "../../actions/LendAction";

export const LendScreen = () => {
  const dispatch = useDispatch();

  const { lends } = useSelector((state) => state.lend);

  useEffect(() => {
    dispatch(lendStartLoading());
  }, [dispatch]);

  return (
    <div className="main-content flex-1 bg-gray-100 mt-20 md:mt-2 pb-5 md:pb-5">
      <div className="bg-green-900 pt-20">
        <div className="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
          <h3 className="font-bold pl-2">Prestamos Activos</h3>
        </div>
      </div>
      <div className="p-5">
        <table className="w-full p-5 text-gray-700 border-separate">
          <thead className="justify-between">
            <tr className="bg-gray-800 text-gray-300">
              <th>Colaborador</th>
              <th className="px-16 py-2">Cedula del colaborador</th>
              <th className="px-16 py-2">Monto prestado</th>
              <th className="px-16 py-2">Fecha de registro</th>
            </tr>
          </thead>
          <tbody className="bg-gray-200">
            {lends.map((lend) => (
              <tr
                key={lend._id}
                className="bg-white border-4 border-gray-200 text-center ml-2 font-semibold"
              >
                <th className="px-16 py-2">{lend.collaborator ? `${lend.collaborator.name} ${lend.collaborator.surname}` : "No existe colaborador"}</th>
                <th className="px-16 py-2">{lend.collaborator ? lend.collaborator.document_id : "No existe colaborador"}</th>
                <th className="px-16 py-2">{lend.amount}</th>
                <th className="px-16 py-2">{lend.date_issued}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};