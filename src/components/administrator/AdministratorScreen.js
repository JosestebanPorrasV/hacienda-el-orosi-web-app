import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AdministratorLoading } from "../../actions/AdministratorAction";

export const AdministratorScreen = () => {
  const dispatch = useDispatch();

  const { administrators } = useSelector((state) => state.administrator);

  useEffect(() => {
    dispatch(AdministratorLoading());
  }, [dispatch]);

  return (
    <div className="main-content flex-1 bg-gray-100 mt-20 md:mt-2 pb-5 md:pb-5">
      <div className="bg-green-900 pt-20">
        <div className="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
          <h3 className="font-bold pl-2">Administradores de la Hacienda Orosi</h3>
        </div>
      </div>
      <div className="p-5">
        <table className="w-full p-5 text-gray-700 border-separate">
          <thead className="justify-between">
            <tr className="bg-gray-800 text-gray-300">
              <th>Cedula</th>
              <th className="px-16 py-2">Nombre</th>
              <th className="px-16 py-2">Apellidos</th>
              <th className="px-16 py-2">Gmail</th>
              <th className="px-16 py-2">Encargado</th>
            </tr>
          </thead>
          <tbody className="bg-gray-200">
            {administrators.map((item, index) => (
              <tr
                key={index}
                className="bg-white border-4 border-gray-200 text-center ml-2 font-semibold"
              >
                <th className="px-16 py-2">{item.document_id}</th>
                <th className="px-16 py-2">{item.name}</th>
                <th className="px-16 py-2">{item.surname}</th>
                <th className="px-16 py-2">{item.email}</th>
                <th className="px-16 py-2">{item.role}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
