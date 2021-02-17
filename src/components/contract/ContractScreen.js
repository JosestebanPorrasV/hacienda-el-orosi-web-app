import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { contractLoading } from "../../actions/ContractAction";

export const ContractScreen = () => {
  const dispatch = useDispatch();
  const { contracts } = useSelector((state) => state.contract);

  useEffect(() => {
    dispatch(contractLoading());
  }, [dispatch]);
  return (
    <div className="main-content flex-1 bg-gray-100 mt-20 md:mt-2 pb-5 md:pb-5">
      <div className="bg-green-900 pt-20">
        <div className="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
          <h3 className="font-bold pl-2">Contratos Activos</h3>
        </div>
      </div>
      <div className="p-5">
        <table className="w-full p-5 text-gray-700 border-separate">
          <thead className="justify-between">
            <tr className="bg-gray-800 text-gray-300">
            <th className="px-16 py-2"> Contratado </th>
              <th className="px-16 py-2"> Fecha de contrato </th>
              <th className="px-16 py-2"> Dia de pago </th>
              <th className="px-16 py-2"> Precio </th>
              <th className="px-16 py-2"> Telefono de contacto </th>
            </tr>
          </thead>
          <tbody className="bg-gray-200">
            {contracts.map((item, index) => (
              <tr
                key={index}
                className="bg-white border-4 border-gray-200 text-center ml-2 font-semibold"
              >
                <th className="px-16 py-2">{item.name_contracted}</th>
                <th className="px-16 py-2">{item.date_contract}</th>
                <th className="px-16 py-2">{item.date_pay}</th>
                <th className="px-16 py-2">{item.amount}</th>
                <th className="px-16 py-2">{item.number_phone}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
